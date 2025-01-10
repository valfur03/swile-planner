import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function Login() {
  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-md mt-12 md:mt-0 p-4">
      <Button disabled>Se connecter avec Swile</Button>
      <Separator />
      <Button size="xs" variant="link" asChild>
        <Link href="/login/token">Entrer le token manuellement</Link>
      </Button>
    </div>
  );
}
