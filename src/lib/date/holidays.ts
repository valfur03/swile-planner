import { HolidaysMap } from "@/types/holidays";

export async function fetchHolidays() {
  // TODO include year
  return fetch("https://calendrier.api.gouv.fr/jours-feries/metropole.json")
    .then<HolidaysMap>((res) => {
      if (!res.ok) {
        throw new Error("Unexpected error on holidays fetch");
      }

      return res.json();
    })
    .catch(() => {
      return null;
    });
}

export function defaultHolidays(holidays: HolidaysMap | null) {
  return holidays ?? {};
}
