import {
  getDateTimeOfAllOperationsThisDay,
  getLatestSwileAccountCredit,
} from "@/lib/swile/operations";
import {
  ChartData,
  ChartDataByPeriod,
} from "@/components/Chart/shared/types/chart-data";
import { Temporal } from "@js-temporal/polyfill";
import { SwileOperation } from "@/types/swile";
import { defaultHolidays, fetchHolidays } from "@/lib/date/holidays";
import {
  areDateEqual,
  isDateOnHoliday,
  isDateOnWeekend,
} from "@/lib/date/compare";
import { DAILY_CREDIT } from "@/data/swile/constants";
import { getSumOfAllPaymentsThisDay } from "@/lib/swile/payments";
import {
  formatDateAsHumanReadable,
  formatDateForGraph,
} from "@/lib/date/string";
import { fromCentsToEur } from "@/lib/currency";
import {
  addOneDayToPlainDate,
  getDayFromString,
  getNextDayFromStringDate,
  isNowBeforeDate,
} from "@/lib/date/temporal";

export type GraphBuilderArgs = {
  operations: Array<SwileOperation>;
  currentData: ChartData;
  date: Temporal.PlainDate;
  isPlanned: boolean;
};

export function buildPlannedPaymentsGraphDataAmount({
  operations,
  currentData,
  date,
}: Pick<GraphBuilderArgs, "operations" | "currentData" | "date">) {
  return !isNowBeforeDate(date)
    ? {
        value:
          (currentData.length > 0
            ? (currentData[currentData.length - 1].amount?.value ?? 0)
            : 0) + getSumOfAllPaymentsThisDay(operations, date),
      }
    : null;
}

export function buildPlannedPaymentsGraphDataPlannedAmount({
  currentData,
  isPlanned,
}: Pick<GraphBuilderArgs, "currentData" | "isPlanned">) {
  return {
    value:
      (currentData.length > 0
        ? currentData[currentData.length - 1].plannedAmount.value
        : 0) + (isPlanned ? DAILY_CREDIT : 0),
  };
}

export async function buildPlannedPaymentsGraphData(
  operations: Array<SwileOperation>,
) {
  const latestAccountCredit = getLatestSwileAccountCredit(operations);
  if (latestAccountCredit === undefined) {
    return null;
  }
  const plannedDaysNbr =
    fromCentsToEur(latestAccountCredit.amount.value) / DAILY_CREDIT;
  const holidays = await fetchHolidays().then(defaultHolidays);
  const areCreditAndPaymentsOnSameDay = areDateEqual(
    getDayFromString(latestAccountCredit.date),
    getDayFromString(operations[operations.length - 2].date),
  );

  let i = areCreditAndPaymentsOnSameDay ? -1 : 0;
  let currentDate = areCreditAndPaymentsOnSameDay
    ? Temporal.PlainDate.from(latestAccountCredit.date)
    : getNextDayFromStringDate(latestAccountCredit.date);
  const endDate = Temporal.PlainDate.from(operations[0].date);
  const data: ChartDataByPeriod = {
    startingDate: latestAccountCredit.date,
    items: [],
  };
  while (i < plannedDaysNbr || isNowBeforeDate(endDate, currentDate)) {
    const isPlanned =
      !isDateOnWeekend(currentDate) &&
      isDateOnHoliday(holidays, currentDate) &&
      i < plannedDaysNbr &&
      i >= 0;

    data.items = data.items.concat({
      dateStr: formatDateForGraph(currentDate),
      dateLongStr: formatDateAsHumanReadable(currentDate),
      amount: buildPlannedPaymentsGraphDataAmount({
        operations,
        currentData: data.items,
        date: currentDate,
      }),
      plannedAmount: buildPlannedPaymentsGraphDataPlannedAmount({
        currentData: data.items,
        isPlanned,
      }),
      operationsDate: getDateTimeOfAllOperationsThisDay(
        operations,
        currentDate,
      ),
    });

    if (isPlanned || i < 0) {
      i += 1;
    }
    currentDate = addOneDayToPlainDate(currentDate);
  }

  return data;
}
