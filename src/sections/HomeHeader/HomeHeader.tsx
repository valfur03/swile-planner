import { Button } from "@/components/ui/button";

export type HomeHeaderProps = {
  logout: () => void;
};

export const HomeHeader = ({ logout }: HomeHeaderProps) => {
  return (
    <header className="text-center w-full mt-2 mb-6 md:mb-10 md:mt-3 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full flex flex-col justify-center gap-2 items-end">
        <Button variant="link" onClick={logout}>
          Se déconnecter
        </Button>
        <h1>Qu&apos;ai-je utilisé sur ma Swile ?</h1>
      </div>
    </header>
  );
};
