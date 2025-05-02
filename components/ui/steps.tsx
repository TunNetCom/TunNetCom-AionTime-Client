import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description?: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
  return (
    <div className="relative mb-8 flex w-full justify-between">
      {/* Progress Bar */}
      <div className="absolute top-5 h-0.5 w-full bg-muted">
        <div
          className="h-0.5 bg-primary transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
        />
      </div>

      {/* Steps */}
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            "relative flex flex-col items-center",
            onStepClick && "cursor-pointer"
          )}
          onClick={() => onStepClick?.(index)}
        >
          <div
            className={cn(
              "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background transition-all",
              index <= currentStep
                ? "border-primary text-primary"
                : "border-muted-foreground text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <div className="mt-2 text-center">
            <div
              className={cn(
                "text-sm font-medium",
                index <= currentStep
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {step.title}
            </div>
            {step.description && (
              <div className="text-xs text-muted-foreground">
                {step.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 