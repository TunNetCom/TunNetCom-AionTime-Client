import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

import { Icons } from "../shared/icons";

export default function IntegrationsSection() {
  return (
    <section className="relative py-20">
      {/* Gradient blobs */}
      <div
        className="absolute left-[10%] top-[5%] -z-10 size-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-1)" }}
      ></div>
      <div
        className="absolute right-[5%] top-[40%] -z-10 size-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--gradient-2)" }}
      ></div>
      <div className="background-gradient absolute bottom-[10%] left-[30%] -z-10 size-72 rounded-full opacity-10 blur-3xl"></div>

      <MaxWidthWrapper>
        <div className="grid items-center sm:grid-cols-2">
          <div className="relative mx-auto w-fit">
            <div className="absolute inset-0 z-10"></div>
            <div className="mx-auto mb-2 flex w-fit justify-center gap-2">
              <IntegrationCard>
                <Icons.azure />
              </IntegrationCard>
              <IntegrationCard>
                <Icons.jira />
              </IntegrationCard>
            </div>
            <div className="mx-auto my-2 flex w-fit justify-center gap-2">
              <IntegrationCard>
                <Icons.gitHub />
              </IntegrationCard>
              {/* Our logo */}
              <IntegrationCard
                borderClassName="shadow-black-950/10 shadow-xl border-black/25 dark:border-white/25"
                className="dark:bg-white/10"
              >
                <Icons.logo />
              </IntegrationCard>

              <IntegrationCard>
                <Icons.asana />
              </IntegrationCard>
            </div>

            <div className="mx-auto flex w-fit justify-center gap-2">
              <IntegrationCard>
                <Icons.clickUp />
              </IntegrationCard>

              <IntegrationCard>
                <Icons.linear />
              </IntegrationCard>
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-lg space-y-6 text-center sm:mt-0 sm:text-left">
            <h2 className="text-balance font-heading text-3xl font-semibold md:text-4xl">
              Integrate with your favorite tools
            </h2>
            <p className="text-muted-foreground">
              Connect seamlessly with popular platforms and services to enhance
              your workflow.
            </p>

            <Button variant="outline" size="sm">
              <Link href="#">Get Started</Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

const IntegrationCard = ({
  children,
  className,
  borderClassName,
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
}) => {
  return (
    <div className={cn("relative flex size-20 rounded-xl", className)}>
      <div
        role="presentation"
        className={cn(
          "absolute inset-0 rounded-xl border border-black/20 dark:border-white/25",
          borderClassName,
        )}
      />
      <div className="relative z-20 m-auto size-fit *:size-8">{children}</div>
    </div>
  );
};
