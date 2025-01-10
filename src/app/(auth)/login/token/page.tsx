import { TokenForm } from "@/components/TokenForm/TokenForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default async function TokenLogin() {
  return (
    <div className="max-w-md flex flex-col gap-4 w-full p-4">
      <Alert>
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Attention !</AlertTitle>
        <AlertDescription>
          Cette fonctionnalité est réservée aux utilisateurs qui la connaissent.
          Dans la majorité des cas, vous devriez vous connecter avec Swile.
        </AlertDescription>
      </Alert>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>Entrez votre access token Swile</CardDescription>
        </CardHeader>
        <CardContent>
          <TokenForm />
        </CardContent>
      </Card>
    </div>
  );
}
