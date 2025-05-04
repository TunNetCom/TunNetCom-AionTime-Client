"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/shared/icons";
import { IntegrationType, IntegrationInfo } from "./types";

interface IntegrationSelectionListProps {
  onSelect: (integrationType: IntegrationType) => void;
}

// Available integrations data
const integrations: IntegrationInfo[] = [
  {
    id: "azure",
    name: "Azure DevOps",
    description: "Connect to your Azure DevOps",
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

export function IntegrationSelectionList({ onSelect }: IntegrationSelectionListProps) {
  return (
    <div className="grid grid-cols-1 gap-5 py-4 md:grid-cols-2">
      {integrations.map((integration) => (
        <Card
          key={integration.id}
          className={`group relative flex h-full flex-col overflow-hidden border transition-all duration-300 ${
            integration.disabled
              ? "opacity-75"
              : `cursor-pointer hover:scale-[1.02] hover:border-primary/30 hover:shadow-md ${integration.borderColor}`
          }`}
          onClick={() => {
            if (!integration.disabled) {
              onSelect(integration.id as IntegrationType);
            }
          }}
        >
          {integration.comingSoon && (
            <Badge 
              className="absolute right-3 top-3 bg-background/90 text-xs font-normal backdrop-blur-sm" 
              variant="outline"
            >
              Coming Soon
            </Badge>
          )}
          <CardHeader className="pb-3 pt-5">
            <div
              className={`mb-3 flex size-12 items-center justify-center rounded-lg ${integration.color} transition-transform duration-300 group-hover:scale-105`}
            >
              <integration.icon className={`size-6 ${integration.iconColor}`} />
            </div>
            <CardTitle className="text-base font-medium">
              {integration.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-5">
            <p className="text-sm text-muted-foreground">
              {integration.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 