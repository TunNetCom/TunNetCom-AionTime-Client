"use client";

import { useState } from "react";
import { Building2, Rocket, Users2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CreateOrganization from "@/components/forms/create-org";

export default function NoOrgPrompt() {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-10 py-10">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight lg:text-6xl">
          Welcome to <span className="text-gradient">Veo</span>
        </h1>
        <p className="max-w-2xl text-xl text-muted-foreground">
          Let&apos;s get started by creating your organization and bringing your
          team together
        </p>
      </div>

      <Card className="mx-auto w-full max-w-4xl border-2">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex items-center gap-5">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
              <Building2 className="size-8 text-primary" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl">
                Create Your Organization
              </CardTitle>
              <CardDescription className="text-base">
                Set up your workspace to start collaborating with your team
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-muted/50">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 shadow-sm transition-transform group-hover:scale-110 dark:bg-blue-950">
                <Users2 className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Team Collaboration</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Invite team members, assign roles, and work together
                  seamlessly in a unified workspace
                </p>
              </div>
            </div>
            <div className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-muted/50">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 shadow-sm transition-transform group-hover:scale-110 dark:bg-green-950">
                <Rocket className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Get Started Quickly</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Set up your organization in minutes and start managing
                  projects with powerful tools
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center border-t pt-8">
            <div className="group relative">
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-primary/20 to-primary-foreground/20 blur transition-all group-hover:blur-md" />
              <CreateOrganization setOpenPopover={setOpenPopover} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
