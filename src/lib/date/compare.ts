import { HolidaysMap } from "@/types/holidays";
import { Temporal } from "@js-temporal/polyfill";
import { getDateUnitsWithPaddedZeros } from "@/lib/date/string";

export function isDateOnWeekend(date: Temporal.PlainDate) {
  return date.dayOfWeek >= 6;
}

export function isDateOnHoliday(
  holidays: HolidaysMap,
  date: Temporal.PlainDate,
) {
  const [year, month, day] = getDateUnitsWithPaddedZeros(date);
  const dateStr: keyof HolidaysMap = `${year}-${month}-${day}`;

  return holidays[dateStr] === undefined;
}

export function areDateEqual(
  date1: Temporal.PlainDate,
  date2: Temporal.PlainDate,
) {
  return Temporal.PlainDate.compare(date1, date2) === 0;
}
