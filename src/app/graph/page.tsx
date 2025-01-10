"use client";

import { getSwileOperationsUntilLatestCredit } from "@/lib/swile/operations";
import { buildPlannedPaymentsGraphData } from "@/lib/graph";
import { Chart } from "@/components/Chart/Chart";
import { EmptyChart } from "@/components/Chart/EmptyChart";
import { useEffect, useState } from "react";
import { LoadingChart } from "@/components/Chart/LoadingChart";
import { useRouter } from "next/navigation";
import { SWILE_TOKEN_LS_KEY } from "@/data/swile/constants";
import { PeriodControls } from "@/components/PeriodControls/PeriodControls";
import { usePeriodControls } from "@/hooks/use-period-controls";
import { ChartDataByPeriod } from "@/components/Chart/shared/types/chart-data";
import { HomeHeader } from "@/sections/HomeHeader/HomeHeader";

export default function Graph() {
  const [graphData, setGraphData] = useState<ChartDataByPeriod | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { signalHasNoMore, ...periodControls } = usePeriodControls({
    graphData,
  });
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem(SWILE_TOKEN_LS_KEY);
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem(SWILE_TOKEN_LS_KEY);
    setToken(token);
    if (token === null) {
      return router.replace("/login");
    }

    setIsLoading(true);
    getSwileOperationsUntilLatestCredit({
      before: periodControls.beforeDate,
      token,
    })
      .then((operations) => {
        if (!operations.hasMore) {
          signalHasNoMore();
        }
        return buildPlannedPaymentsGraphData(operations.items);
      })
      .then((data) => setGraphData(data))
      .catch(() =>
        setError("Une erreur est survenue, le token est peut-être invalide."),
      )
      .finally(() => setIsLoading(false));
  }, [router, signalHasNoMore, periodControls.beforeDate]);

  if (token === null) {
    return null;
  }

  return (
    <>
      <HomeHeader logout={logout} />
      <main className="w-full px-4 flex flex-col items-center">
        {isLoading ? (
          <LoadingChart />
        ) : graphData !== null ? (
          <Chart data={graphData.items} />
        ) : (
          <EmptyChart>
            {error !== null ? error : "Aucune donnée trouvée."}
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
