"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Info as InfoIcon, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons";

import {
    integrationFormSchema,
    IntegrationFormValues,
    IntegrationType,
} from "./types";

interface IntegrationConfigFormProps {
  integrationType: IntegrationType;
  onSubmit: (values: IntegrationFormValues) => void;
  loading?: boolean;
  formRef?: React.MutableRefObject<HTMLFormElement | null>;
}

export function IntegrationConfigForm({
  integrationType,
  onSubmit,
  loading = false,
  formRef,
}: IntegrationConfigFormProps) {
  const form = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationFormSchema),
    defaultValues: {
      accessToken: "",
      integrationUrl: "",
    },
  });

  const handleSubmit = (values: IntegrationFormValues) => {
    onSubmit(values);
  };

  if (integrationType === "azure") {
    return (
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 py-4"
        >
          <div className="flex items-center gap-3 rounded-lg bg-blue-50/50 p-3 dark:bg-blue-950/30">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <Icons.azure className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Azure DevOps Integration</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Connect your Azure DevOps projects to track work items
              </p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="accessToken"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="flex items-center gap-1.5 text-base font-medium">
                  <ShieldCheck className="size-4 text-blue-500" />
                  Personal Access Token (PAT)
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Azure DevOps PAT"
                    {...field}
                    className="h-10 font-mono text-sm"
                  />
                </FormControl>
                <FormDescription className="flex items-start gap-1 text-xs">
                  <span className="mt-0.5 text-blue-500">
                    <InfoIcon className="size-3.5" />
                  </span>
                  <span>
                    Create a PAT with{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      Work Items: Read & Write
                    </code>{" "}
                    permissions in your Azure DevOps settings
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="integrationUrl"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="flex items-center gap-1.5 text-base font-medium">
                  <Globe className="size-4 text-blue-500" />
                  Azure DevOps Organization URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://dev.azure.com/your-organization"
                    {...field}
                    className="h-10"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter the full URL to your Azure DevOps organization
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }

  // Fallback for other integration types (can be expanded later)
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <p className="text-muted-foreground">
        Configuration for {integrationType} is not yet available.
      </p>
      <Button
        onClick={() =>
          onSubmit({
            accessToken: "placeholder-token",
            integrationUrl: "https://placeholder-url.com",
          })
        }
      >
        Continue
      </Button>
    </div>
  );
}
