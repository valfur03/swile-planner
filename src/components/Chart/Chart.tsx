"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartData } from "@/components/Chart/shared/types/chart-data";

const chartConfig = {
  current: {
    label: "Current",
    color: "hsl(var(--chart-1))",
  },
  planned: {
    label: "Planned",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export type ChartProps = {
  data: ChartData;
};

export const Chart = ({ data }: ChartProps) => {
  const lineStrokeWidth = 2;
  const lineType = "monotone";
  const lineHasDot = false;

  return (
    <>
      <ChartContainer config={chartConfig} className="max-w-2xl min-h-[200px]">
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="amount.value"
            type={lineType}
            stroke="var(--color-current)"
            strokeWidth={lineStrokeWidth}
            dot={lineHasDot}
          />
          <Line
            dataKey="plannedAmount.value"
            type={lineType}
            stroke="var(--color-planned)"
            strokeWidth={lineStrokeWidth}
            dot={lineHasDot}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
};
