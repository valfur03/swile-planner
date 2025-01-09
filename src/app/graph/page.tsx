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
import { Button } from "@/components/ui/button";

export default function Graph() {
  const [graphData, setGraphData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
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
      token,
    })
      .then((operations) => buildPlannedPaymentsGraphData(operations))
      .then((data) => setGraphData(data))
      .finally(() => setIsLoading(true));
  }, [router]);

  if (token === null) {
    return null;
  }

  return (
    <>
      <header className="text-center w-full mt-2 mb-6 md:mb-10 md:mt-3 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full flex flex-col justify-center gap-2 items-end">
          <Button variant="link" onClick={logout}>
            Se déconnecter
          </Button>
          <h1>Qu&apos;ai-je utilisé sur ma Swile ?</h1>
        </div>
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
