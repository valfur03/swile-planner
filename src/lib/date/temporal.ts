import { Temporal } from "@js-temporal/polyfill";
import { TZ } from "@/data/date/constants";

export function getNextDayFromStringDate(date: string) {
  return Temporal.PlainDate.from(date).add({
    days: 1,
  });
}

export function addOneDayToPlainDate(date: Temporal.PlainDate) {
  return date.add({ days: 1 });
}

export function isNowBeforeDate(
  date: Temporal.PlainDate,
  now: Temporal.PlainDate = Temporal.Now.zonedDateTimeISO(TZ).toPlainDate(),
) {
  return Temporal.PlainDate.compare(date, now) > 0;
}
