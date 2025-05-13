"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, ShieldCheck } from "lucide-react";
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
          className="flex flex-col space-y-6 py-6"
        >
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
                    type="text"
                    placeholder="https://dev.azure.com/your-organization"
                    {...field}
                    className="h-10"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  The URL of your Azure DevOps organization
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
                    className="h-10"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Create a PAT with Work Items (Read & Write) scope in Azure DevOps
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
