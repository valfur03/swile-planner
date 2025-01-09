import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="w-full flex justify-center items-center h-screen">
      <Button asChild>
        <Link href="/graph">Accéder au graph</Link>
      </Button>
    </main>
  );
}
