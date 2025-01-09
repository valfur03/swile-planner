import { operations } from "@/data/swile/operations";
import { SwileOperation } from "@/types/swile";

export async function getSwileOperations(): Promise<{
  items: Array<SwileOperation>;
}> {
  return operations;
}

export function getLatestSwileAccountCredit(operations: Array<SwileOperation>) {
  return operations.find(({ amount }) => amount.value > 0);
}
