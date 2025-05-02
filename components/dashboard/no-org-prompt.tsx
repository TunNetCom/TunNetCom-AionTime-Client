"use client";

import { useState } from "react";
import { ArrowRight, Building2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IntegrationForm } from "@/components/forms/integration-form";
import { Icons } from "@/components/shared/icons";

type IntegrationType = "azure" | "jira" | "clickup" | "asana" | null;

export default function NoOrgPrompt() {
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedIntegration, setSelectedIntegration] =
    useState<IntegrationType>(null);

  const integrations = [
    {
      id: "azure",
      name: "Azure DevOps",
      description: "Connect to your Azure DevOps organization",
      icon: Icons.azure,
      disabled: false,
      color: "bg-blue-50 dark:bg-blue-950/30",
      borderColor:
        "group-hover:border-blue-300 dark:group-hover:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "jira",
      name: "Jira",
      description: "Connect to your Jira instance",
      icon: Icons.jira,
      disabled: true,
      comingSoon: true,
      color: "bg-indigo-50 dark:bg-indigo-950/30",
      borderColor:
        "group-hover:border-indigo-300 dark:group-hover:border-indigo-800",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      id: "clickup",
      name: "ClickUp",
      description: "Connect to your ClickUp workspace",
      icon: Icons.clickUp,
      disabled: true,
      comingSoon: true,
      color: "bg-purple-50 dark:bg-purple-950/30",
      borderColor:
        "group-hover:border-purple-300 dark:group-hover:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      id: "asana",
      name: "Asana",
      description: "Connect to your Asana organization",
      icon: Icons.asana,
      disabled: true,
      comingSoon: true,
      color: "bg-rose-50 dark:bg-rose-950/30",
      borderColor:
        "group-hover:border-rose-300 dark:group-hover:border-rose-800",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
  ];

  const handleIntegrationSelect = (integration: IntegrationType) => {
    if (integration === "azure") {
      setSelectedIntegration(integration);
      setOpenSheet(true);
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center py-8">
      <div className="mb-8 max-w-2xl space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          Welcome to AionTime
        </h1>
        <p className="text-md text-muted-foreground">
          Let&apos;s start by creating your organization and connecting to your
          preferred tool
        </p>
      </div>

      <Card className="mx-auto w-full max-w-4xl border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 shadow-sm">
              <Building2 className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-medium">
                Create Your Organization
              </CardTitle>
              <CardDescription className="text-sm">
                Select an integration to connect with your organization
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {integrations.map((integration) => (
              <Card
                key={integration.id}
                className={`group relative overflow-hidden border transition-all duration-300 ${
                  integration.disabled
                    ? "opacity-65 hover:opacity-75"
                    : `cursor-pointer hover:scale-[1.02] hover:border-primary/30 hover:shadow-md ${integration.borderColor}`
                }`}
                onClick={() =>
                  !integration.disabled &&
                  handleIntegrationSelect(integration.id as IntegrationType)
                }
              >
                {integration.comingSoon && (
                  <Badge className="absolute right-2 top-2 bg-background/80 text-xs font-normal backdrop-blur-sm">
                    Coming Soon
                  </Badge>
                )}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-transparent to-muted/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <CardHeader className="pb-2 pt-4">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${integration.color} mb-3 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <integration.icon className="size-6 transition-colors duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-base">
                    {integration.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-xs text-muted-foreground">
                    {integration.description}
                  </p>
                </CardContent>
                <CardFooter className="pb-4">
                  <Button 
                    variant={integration.disabled ? "outline" : "secondary"}
                    size="sm"
                    disabled={integration.disabled}
                    className="group flex h-8 w-full items-center justify-center text-xs"
                  >
                    <span>
                      {integration.disabled ? "Coming Soon" : "Connect"}
                    </span>
                    {!integration.disabled && (
                      <ArrowRight className="ml-2 size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md md:max-w-lg">
          <SheetHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/50">
                <Icons.azure className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <SheetTitle className="text-lg">
                Connect to Azure DevOps
              </SheetTitle>
            </div>
            <SheetDescription className="text-sm">
              Enter your organization details and Azure DevOps Personal Access
              Token (PAT)
            </SheetDescription>
          </SheetHeader>

          <IntegrationForm
            integrationType="azure"
            onSuccess={() => setOpenSheet(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
