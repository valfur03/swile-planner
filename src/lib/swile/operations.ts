import {
  SwileFetchOperationsOkResponse,
  SwileFetchOperationsOptions,
  SwileFetchOperationsQueryParams,
  SwileOperation,
} from "@/types/swile";
import { Temporal } from "@js-temporal/polyfill";
import { TZ } from "@/data/date/constants";
import { fromCentsToEur } from "@/lib/currency";
import { getPaymentsOnDate } from "@/lib/swile/payments";

export function getLatestSwileAccountCredit(operations: Array<SwileOperation>) {
  return operations.find(({ amount }) => amount.value > 0);
}

export function getLatestSwileAccountCreditIndex(
  operations: Array<SwileOperation>,
) {
  return operations.findIndex(({ amount }) => amount.value > 0);
}

export async function fetchSwileOperations(
  options: SwileFetchOperationsQueryParams & SwileFetchOperationsOptions,
) {
  const {
    before = Temporal.Now.zonedDateTimeISO(TZ).add({ days: 1 }).toString({
      timeZoneName: "never",
    }),
    per = 20,
    token,
  } = options;

  const url = new URL("https://neobank-api.swile.co/api/v3/user/operations");
  url.searchParams.append("before", before);
  url.searchParams.append("per", String(per));

  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, fetchOptions)
    .then<SwileFetchOperationsOkResponse>((res) => {
      if (!res.ok) {
        throw new Error("Unexpected error on Swile operations fetch");
      }

      return res.json();
    })
    .catch(() => {
      return null;
    });
}

export async function getSwileOperationsUntilLatestCredit(
  options: SwileFetchOperationsQueryParams & SwileFetchOperationsOptions,
): Promise<Array<SwileOperation>> {
  let operations: Array<SwileOperation> = [];
  let latestCreditIndex = -1;
  let hasMore = true;

  while (latestCreditIndex < 0 && hasMore) {
    const response = await fetchSwileOperations(options);

    if (response === null) {
      throw new Error("Unexpected error on Swile operations fetch.");
    }

    const { has_more, items } = response;

    if (items.length === 0) {
      throw new Error("Unexpected empty response on Swile operations fetch.");
    }

    operations = operations.concat(items);

    latestCreditIndex = getLatestSwileAccountCreditIndex(operations);
    hasMore = has_more;
    options.before = operations[operations.length - 1].date;
  }

  return operations.slice(0, latestCreditIndex + 1);
}

export function getOperationsOnDate(
  operations: Array<SwileOperation>,
  searchedDate: Temporal.PlainDate,
) {
  return operations.filter(({ date }) => {
    const dateObj = Temporal.PlainDate.from(date);
    return dateObj.equals(searchedDate);
  });
}

export function getDateTimeOfAllOperationsThisDay(
  operations: Array<SwileOperation>,
  date: Temporal.PlainDate,
) {
  const paymentsThisDay = getOperationsOnDate(operations, date);

  return paymentsThisDay.map(({ date }) => date);
}
