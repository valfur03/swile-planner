import { Button, ButtonProps } from "@/components/ui/button";
import { UsePeriodControls } from "@/hooks/use-period-controls";

export type PeriodControlsProps = Pick<
  UsePeriodControls,
  "hasBefore" | "hasAfter" | "selectPreviousPeriod" | "selectNextPeriod"
> & {
  isLoading?: boolean;
};

export const PeriodControls = ({
  hasBefore,
  hasAfter,
  selectPreviousPeriod,
  selectNextPeriod,
  isLoading,
}: PeriodControlsProps) => {
  const buttonVariant: ButtonProps["variant"] = "outline";

  return (
    <div className="flex w-full justify-between max-w-2xl mt-4 md:mt-8">
      <Button
        variant={buttonVariant}
        disabled={isLoading || !hasBefore}
        onClick={selectPreviousPeriod}
      >
        Précédent
      </Button>
      <Button
        variant={buttonVariant}
        disabled={isLoading || !hasAfter}
        onClick={selectNextPeriod}
      >
        Suivant
      </Button>
    </div>
  );
};
