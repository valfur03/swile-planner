import { PropsWithChildren } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export type LoadingChartProps = PropsWithChildren;

export const LoadingChart = ({}: LoadingChartProps) => {
  return <Skeleton className="w-full max-w-2xl md:h-[378px] h-[212px]" />;
};
