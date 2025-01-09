import { operations } from "@/data/swile/operations";
import { SwileOperation } from "@/types/swile";

export function getLatestSwileAccountCredit(operations: Array<SwileOperation>) {
  return operations.find(({ amount }) => amount.value > 0);
}

export function getLatestSwileAccountCreditIndex(
  operations: Array<SwileOperation>,
) {
  return operations.findIndex(({ amount }) => amount.value > 0);
}

export async function getSwileOperationsUntilLatestCredit(): Promise<{
  items: Array<SwileOperation>;
}> {
  const latestCreditIndex = getLatestSwileAccountCreditIndex(operations.items);
  if (latestCreditIndex === -1) {
    return operations;
  }

  return {
    ...operations,
    items: operations.items.slice(0, latestCreditIndex + 1),
  };
}
