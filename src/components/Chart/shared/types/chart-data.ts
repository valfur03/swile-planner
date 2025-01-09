export type ChartData = Array<{
  dateStr: string;
  dateLongStr: string;
  amount: {
    value: number;
  } | null;
  plannedAmount: {
    value: number;
  };
  operationsDate: Array<string>;
}>;

export type ChartDataByPeriod = {
  startingDate: string;
  items: ChartData;
};
