import { PropsWithChildren } from "react";

export type EmptyChartProps = PropsWithChildren;

export const EmptyChart = ({
  children = <p>No data found.</p>,
}: EmptyChartProps) => {
  return (
    <div className="w-full max-w-[672px] md:h-[378px] h-[212px] bg-zinc-100 rounded-xl flex items-center justify-center border-dashed border-2 text-zinc-700">
      {children}
    </div>
  );
};
