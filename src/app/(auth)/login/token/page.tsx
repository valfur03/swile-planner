import { TokenForm } from "@/components/TokenForm/TokenForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function TokenLogin() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>Entrez votre access token Swile</CardDescription>
      </CardHeader>
      <CardContent>
        <TokenForm />
      </CardContent>
    </Card>
  );
}
