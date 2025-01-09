import { Chart } from "@/components/Chart/Chart";
import { getSwileOperations } from "@/lib/swile/operations";
import { buildPlannedPaymentsGraphData } from "@/lib/graph";
import { EmptyChart } from "@/components/Chart/EmptyChart";

export default async function Home() {
  const operations = await getSwileOperations();
  const graphData = await buildPlannedPaymentsGraphData(operations.items);

  return (
    <>
      <header className="text-center w-full my-6 px-4 flex justify-center">
        <h1 className="max-w-xl">Qu&apos;ai-je utilisé sur ma Swile ?</h1>
      </header>
      <main className="text-center w-full px-4 flex justify-center">
        {graphData !== null ? <Chart data={graphData} /> : <EmptyChart />}
      </main>
    </>
  );
}
