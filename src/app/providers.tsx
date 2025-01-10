"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "@/contexts/session/provider";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export type ProvidersProps = PropsWithChildren;

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </>
  );
};
