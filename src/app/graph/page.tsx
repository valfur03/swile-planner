"use client";

import { getSwileOperationsUntilLatestCredit } from "@/lib/swile/operations";
import { buildPlannedPaymentsGraphData } from "@/lib/graph";
import { Chart } from "@/components/Chart/Chart";
import { EmptyChart } from "@/components/Chart/EmptyChart";
import { useEffect, useState } from "react";
import { ChartData } from "@/components/Chart/shared/types/chart-data";
import { LoadingChart } from "@/components/Chart/LoadingChart";
import { useRouter } from "next/navigation";
import { SWILE_TOKEN_LS_KEY } from "@/data/swile/constants";

export default function Graph() {
  const [graphData, setGraphData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const token = localStorage.getItem(SWILE_TOKEN_LS_KEY);

  useEffect(() => {
    if (token === null) {
      return router.replace("login");
    }

    setIsLoading(true);
    getSwileOperationsUntilLatestCredit({
      token,
    })
      .then((operations) => buildPlannedPaymentsGraphData(operations))
      .then((data) => setGraphData(data))
      .finally(() => setIsLoading(true));
  }, [router, token]);

  return (
    <>
      <header className="text-center w-full my-6 md:my-10 px-4 flex justify-center">
        <h1 className="max-w-xl">Qu&apos;ai-je utilisé sur ma Swile ?</h1>
      </header>
      <main className="w-full px-4 flex justify-center">
        {graphData !== null ? (
          <Chart data={graphData} />
        ) : isLoading ? (
          <LoadingChart />
        ) : (
          <EmptyChart />
        )}
      </main>
    </>
  );
}
