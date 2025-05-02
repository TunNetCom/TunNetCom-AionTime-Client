import {
    Cpu,
    Fingerprint,
    Pencil,
    Settings2,
    Sparkles,
    Zap,
} from "lucide-react";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Features() {
  return (
    <section className="py-20">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-xl space-y-8 text-center md:space-y-12">
          <h2 className="text-balance font-heading text-4xl font-medium lg:text-5xl">
            Simplify management across your DevOps tools
          </h2>
          <p className="text-muted-foreground">
            AionTime unifies your workflow by syncing data between Jira, Azure DevOps, 
            and other platforms while leveraging AI to automate repetitive tasks.
          </p>
        </div>

        <div className="relative mx-auto mt-12 grid divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Seamless Sync</h3>
            </div>
            <p className="text-sm">
              Automatically sync work items between Jira, Azure DevOps, and other platforms without manual effort.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4" />
              <h3 className="text-sm font-medium">AI Agent</h3>
            </div>
            <p className="text-sm">
              Intelligent assistant that manages updates, suggests priorities, and automates routine tasks.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Fingerprint className="size-4" />
              <h3 className="text-sm font-medium">Secure Access</h3>
            </div>
            <p className="text-sm">
              Enterprise-grade security with Azure AD integration and fine-grained permission controls.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pencil className="size-4" />
              <h3 className="text-sm font-medium">Flexible Workflows</h3>
            </div>
            <p className="text-sm">
              Adapt to your team&apos;s process with customizable sync rules and approval workflows.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Settings2 className="size-4" />
              <h3 className="text-sm font-medium">Full Control</h3>
            </div>
            <p className="text-sm">
              Human-in-the-loop design lets you review and approve AI suggestions before implementation.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />
              <h3 className="text-sm font-medium">Smart Insights</h3>
            </div>
            <p className="text-sm">
              AI-powered analytics across all your tools to identify bottlenecks and optimize team performance.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
