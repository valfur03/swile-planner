import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="w-full flex flex-col justify-start md:justify-center items-center h-screen mt-12 md:mt-0 p-4">
      <Button asChild>
        <Link href="/graph">Accéder au graph</Link>
      </Button>
    </main>
  );
}
