export type ChartData = Array<{
  date: string;
  amount: {
    value: number;
  } | null;
  plannedAmount: {
    value: number;
  };
}>;
