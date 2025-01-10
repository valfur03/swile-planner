"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "@/contexts/session/provider";

export type ProvidersProps = PropsWithChildren;

export const Providers = ({ children }: ProvidersProps) => {
  return <SessionProvider value={null}>{children}</SessionProvider>;
};
