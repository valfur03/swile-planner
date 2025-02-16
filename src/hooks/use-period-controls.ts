import { useCallback, useState } from "react";
import { ChartDataByPeriod } from "@/components/Chart/shared/types/chart-data";

export type UsePeriodControlsArgs = {
  graphData: ChartDataByPeriod | null;
};

export type UsePeriodControls = {
  beforeDate?: string;
  hasAfter: boolean;
  hasBefore: boolean;
  selectPreviousPeriod: () => void;
  selectNextPeriod: () => void;
  signalHasNoMore: (beforeDate?: string) => void;
};

export const usePeriodControls = ({
  graphData,
}: UsePeriodControlsArgs): UsePeriodControls => {
  const [periodsDate, setPeriodsDate] = useState<Array<string>>([]);
  const [periodIndex, setPeriodIndex] = useState(0);
  const [hasNoBefore, setHasNoBefore] = useState<string | null | undefined>(
    null,
  );

  const hasBefore = !(hasNoBefore === periodsDate[periodIndex]);
  const hasAfter = periodIndex < periodsDate.length;

  const selectPreviousPeriod = () => {
    if (!hasBefore || graphData === null || graphData.items.length < 1) {
      return;
    }

    if (periodsDate.includes(graphData.startingDate)) {
      setPeriodIndex((current) => current - 1);
    } else {
      setPeriodsDate((current) => [graphData.startingDate, ...current]);
      setPeriodIndex(0);
    }
  };
  const selectNextPeriod = () => {
    if (periodIndex + 1 > periodsDate.length) {
      return;
    }

    setPeriodIndex((current) => current + 1);
  };

  const signalHasNoMore = useCallback((beforeDate?: string) => {
    setHasNoBefore(beforeDate);
  }, []);

  return {
    beforeDate:
      periodIndex < periodsDate.length ? periodsDate[periodIndex] : undefined,
    hasAfter,
    hasBefore,
    selectPreviousPeriod,
    selectNextPeriod,
    signalHasNoMore,
  };
};
