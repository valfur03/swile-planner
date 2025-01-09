import {
  SwileFetchOperationsOkResponse,
  SwileFetchOperationsQueryParams,
  SwileOperation,
} from "@/types/swile";
import { Temporal } from "@js-temporal/polyfill";
import { TZ } from "@/data/date/constants";
import { BEARER_TOKEN } from "@/data/swile/constants";

export function getLatestSwileAccountCredit(operations: Array<SwileOperation>) {
  return operations.find(({ amount }) => amount.value > 0);
}

export function getLatestSwileAccountCreditIndex(
  operations: Array<SwileOperation>,
) {
  return operations.findIndex(({ amount }) => amount.value > 0);
}

export async function fetchSwileOperations(
  queryParams: SwileFetchOperationsQueryParams = {},
) {
  const {
    before = Temporal.Now.zonedDateTimeISO(TZ).add({ days: 1 }).toString({
      timeZoneName: "never",
    }),
    per = 20,
  } = queryParams;

  const url = new URL("https://neobank-api.swile.co/api/v3/user/operations");
  url.searchParams.append("before", before);
  url.searchParams.append("per", String(per));

  const options = {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  return fetch(url, options)
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

export async function getSwileOperationsUntilLatestCredit(): Promise<
  Array<SwileOperation>
> {
  let operations: Array<SwileOperation> = [];
  let latestCreditIndex = -1;
  let hasMore = true;

  while (latestCreditIndex < 0 && hasMore) {
    const response = await fetchSwileOperations();

    if (response === null) {
      return operations;
    }

    const { has_more, items } = response;

    operations = operations.concat(items);

    latestCreditIndex = getLatestSwileAccountCreditIndex(items);
    hasMore = has_more;
  }

  return operations.slice(0, latestCreditIndex + 1);
}
