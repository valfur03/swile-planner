import { PropsWithChildren } from "react";

export type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="w-full flex flex-col justify-start md:justify-center items-center h-screen">
      {children}
    </main>
  );
}
