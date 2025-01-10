import { useContext } from "react";
import { SessionContext, SessionProvider } from "@/contexts/session/provider";

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error(
      `${useSession.name} must be used with a ${SessionProvider.name}`,
    );
  }

  return context;
};
