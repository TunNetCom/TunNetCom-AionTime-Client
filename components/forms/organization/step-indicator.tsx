"use client";
import { Icons } from "@/components/shared/icons";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex w-full items-center justify-center px-4 py-6">
      <div className="flex w-[240px] items-center justify-between">
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          const isActive = currentStep === step;
          const isCompleted = currentStep > step;
          
          return (
            <div key={step} className="flex items-center">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted-foreground/25 bg-background text-muted-foreground"
                }`}
              >
                {isCompleted ? <Icons.check className="size-4" /> : step}
              </div>
              {index < totalSteps - 1 && (
                <div className="mx-2 h-1 w-14 bg-muted">
                  {isCompleted && <div className="h-full bg-primary" style={{ width: '100%' }} />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 