import { Temporal } from "@js-temporal/polyfill";
import { LOCALE_CODE, WEEK_DAYS_NAME } from "@/data/date/constants";

export function getDateUnitsWithPaddedZeros(date: Temporal.PlainDate) {
  const { year, month, day } = date;
  return [year, month, day].map((nbr) => String(nbr).padStart(2, "0"));
}

export function getWeekDayName(date: Temporal.PlainDate) {
  return WEEK_DAYS_NAME[LOCALE_CODE][date.dayOfWeek - 1];
}

export function formatCurrentDateForGraph(date: Temporal.PlainDate) {
  const [, , day] = getDateUnitsWithPaddedZeros(date);

  return `${getWeekDayName(date).slice(0, 3)}. ${day}`;
}
