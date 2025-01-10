"use client";

import { getSwileOperationsUntilLatestCredit } from "@/lib/swile/operations";
import { buildPlannedPaymentsGraphData } from "@/lib/graph";
import { Chart } from "@/components/Chart/Chart";
import { EmptyChart } from "@/components/Chart/EmptyChart";
import { useEffect, useState } from "react";
import { LoadingChart } from "@/components/Chart/LoadingChart";
import { useRouter } from "next/navigation";
import { PeriodControls } from "@/components/PeriodControls/PeriodControls";
import { usePeriodControls } from "@/hooks/use-period-controls";
import { ChartDataByPeriod } from "@/components/Chart/shared/types/chart-data";
import { HomeHeader } from "@/sections/HomeHeader/HomeHeader";
import { useSession } from "@/contexts/session/hook";
import { useQuery } from "react-query";
import { SWILE_OPERATIONS_QUERY_KEY } from "@/data/swile/constants";

export default function Graph() {
  const [graphData, setGraphData] = useState<ChartDataByPeriod | null>(null);
  const { token, isLoading: isLoadingToken } = useSession();
  const { signalHasNoMore, ...periodControls } = usePeriodControls({
    graphData,
  });
  const router = useRouter();

  const {
    isLoading,
    error = null,
    data = null,
  } = useQuery({
    queryKey: [
      SWILE_OPERATIONS_QUERY_KEY,
      token,
      periodControls.beforeDate,
      signalHasNoMore,
    ],
    queryFn: async () => {
      if (token === null) {
        return null;
      }

      return getSwileOperationsUntilLatestCredit({
        before: periodControls.beforeDate,
        token,
      })
        .then((operations) => {
          if (!operations.hasMore) {
            signalHasNoMore();
          }
          return buildPlannedPaymentsGraphData(operations.items);
        })
        .catch(() => {
          throw new Error(
            "Une erreur est survenue, le token est peut-être invalide.",
          );
        });
    },
    retry: false,
  });

  useEffect(() => {
    if (token === null && !isLoadingToken) {
      return router.replace("/login");
    }
  }, [token, isLoadingToken, router]);

  useEffect(() => {
    setGraphData(data);
  }, [data]);

  if (token === null) {
    return null;
  }

  return (
    <>
      <HomeHeader />
      <main className="w-full px-4 flex flex-col items-center">
        {isLoading ? (
          <LoadingChart />
        ) : graphData !== null ? (
          <Chart data={graphData.items} />
        ) : (
          <EmptyChart>
            {error instanceof Error ? error.message : "Aucune donnée trouvée."}
          </EmptyChart>
        )}
        <PeriodControls
          isLoading={isLoading}
          error={error}
          {...periodControls}
        />
      </main>
    </>
  );
}
