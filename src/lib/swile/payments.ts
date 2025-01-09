import { Temporal } from "@js-temporal/polyfill";
import { SwileOperation } from "@/types/swile";
import { fromCentsToEur } from "@/lib/currency";

export function getPaymentsOnDate(
  operations: Array<SwileOperation>,
  searchedDate: Temporal.PlainDate,
) {
  return operations.filter(({ date, amount }) => {
    if (amount.value >= 0) {
      return false;
    }
    const dateObj = Temporal.PlainDate.from(date);
    return dateObj.equals(searchedDate);
  });
}

export function getSumOfAllPaymentsThisDay(
  operations: Array<SwileOperation>,
  date: Temporal.PlainDate,
) {
  const paymentsThisDay = getPaymentsOnDate(operations, date);

  return paymentsThisDay.reduce(
    (acc, { amount }) => acc + Math.abs(fromCentsToEur(amount.value)),
    0,
  );
}
