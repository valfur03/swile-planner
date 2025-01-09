import { Chart } from "@/components/Chart/Chart";
import { getSwileOperations } from "@/lib/swile/operations";
import { buildPlannedPaymentsGraphData } from "@/lib/graph";
import { EmptyChart } from "@/components/Chart/EmptyChart";

export default async function Home() {
  const operations = await getSwileOperations();
  const graphData = await buildPlannedPaymentsGraphData(operations.items);

  return (
    <main>
      {graphData !== null ? <Chart data={graphData} /> : <EmptyChart />}
    </main>
  );
}
