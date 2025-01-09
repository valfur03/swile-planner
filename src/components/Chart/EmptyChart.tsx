import { PropsWithChildren } from "react";

export type EmptyChartProps = PropsWithChildren;

export const EmptyChart = ({
  children = <p>No data found.</p>,
}: EmptyChartProps) => {
  return (
    <div className="w-[672px] h-[378px] bg-zinc-100 rounded-xl flex items-center justify-center border-dashed border-2 text-zinc-700">
      {children}
    </div>
  );
};
