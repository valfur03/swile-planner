import { PropsWithChildren } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export type LoadingChartProps = PropsWithChildren;

export const LoadingChart = ({}: LoadingChartProps) => {
  return (
    <div className="w-full max-w-2xl">
      <Skeleton className="w-full max-w-sm h-6 mb-2" />
      <Skeleton className="w-full max-w-2xl md:h-[378px] h-[212px]" />
    </div>
  );
};
