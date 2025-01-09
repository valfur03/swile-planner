import { getLatestSwileAccountCredit } from "@/lib/swile/operations";
import { ChartData } from "@/components/Chart/shared/types/chart-data";
import { Temporal } from "@js-temporal/polyfill";
import { SwileOperation } from "@/types/swile";
import { defaultHolidays, fetchHolidays } from "@/lib/date/holidays";
import { isDateOnHoliday, isDateOnWeekend } from "@/lib/date/compare";
import { DAILY_CREDIT } from "@/data/swile/constants";
import { getSumOfAllPaymentsThisDay } from "@/lib/swile/payments";
import { formatDateForGraph } from "@/lib/date/string";
import { fromCentsToEur } from "@/lib/currency";
import {
  addOneDayToPlainDate,
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

  let i = 0;
  let currentDate = getNextDayFromStringDate(latestAccountCredit.date);
  let data: ChartData = [];
  while (i < plannedDaysNbr) {
    const isPlanned =
      !isDateOnWeekend(currentDate) && isDateOnHoliday(holidays, currentDate);

    data = data.concat({
      date: formatDateForGraph(currentDate),
      amount: buildPlannedPaymentsGraphDataAmount({
        operations,
        currentData: data,
        date: currentDate,
      }),
      plannedAmount: buildPlannedPaymentsGraphDataPlannedAmount({
        currentData: data,
        isPlanned,
      }),
    });

    if (isPlanned) {
      i += 1;
    }
    currentDate = addOneDayToPlainDate(currentDate);
  }

  return data;
}
