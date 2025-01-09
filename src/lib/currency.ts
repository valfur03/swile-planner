import { CENTS_IN_EUR } from "@/data/currency";

export function fromCentsToEur(amount: number) {
  return amount / CENTS_IN_EUR;
}
