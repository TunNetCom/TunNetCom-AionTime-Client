"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrganizationWithIntegration } from "@/actions/create-org.server";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ShieldCheck, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/shared/icons";

const integrationFormSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  color: z.string().min(1, "Color is required"),
  accessToken: z.string().min(1, "Personal Access Token is required"),
  integrationUrl: z.string().min(1, "Organization URL is required"),
});

type IntegrationFormValues = z.infer<typeof integrationFormSchema>;

interface IntegrationFormProps {
  integrationType: "azure" | "jira" | "clickup" | "asana";
  onSuccess: () => void;
}

export function IntegrationForm({ integrationType, onSuccess }: IntegrationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      color: "#0078d4", // Default Azure blue color
      accessToken: "",
      integrationUrl: "",
    },
  });

  async function onSubmit(values: IntegrationFormValues) {
    setIsSubmitting(true);
    try {
      const result = await createOrganizationWithIntegration({
        ...values,
        integrationType,
        integrationUrl: values.integrationUrl,
      });

      if (result.status === "error") {
        toast.error(result.message || "Failed to create organization");
        return;
      }

      toast.success("Organization created successfully");
      onSuccess();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Organization Details</h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium">Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Team or Company Name" {...field} className="h-9" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium">Contact Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="admin@yourcompany.com" {...field} className="h-9" />
                </FormControl>
                <FormDescription className="text-xs">
                  We&apos;ll use this for important notifications
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium">Brand Color</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="color"
                      {...field}
                      className="h-9 w-16"
                    />
                  </FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="#0078d4"
                    className="h-9"
                  />
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-3" />

        {integrationType === "azure" && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Azure DevOps Connection</h3>
            <FormField
              control={form.control}
              name="accessToken"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-blue-500" />
                    <FormLabel className="text-xs font-medium">Personal Access Token (PAT)</FormLabel>
                  </div>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Your Azure DevOps PAT" 
                      {...field} 
                      className="h-9 font-mono text-sm"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Create a PAT with <code className="text-xs px-1 py-0.5 bg-muted rounded">Work Items: Read & Write</code> permissions
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="integrationUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <Globe className="size-3.5 text-blue-500" />
                    <FormLabel className="text-xs font-medium">Azure DevOps Organization URL (Optional)</FormLabel>
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="https://dev.azure.com/your-organization" 
                      {...field} 
                      className="h-9"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    If left empty, we&apos;ll try to detect the organization from your PAT
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="pt-3">
          <Button
            type="submit"
            className="w-full h-9 relative overflow-hidden group"
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 size-3.5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Organization
                </>
              )}
            </span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
        </div>
      </form>
    </Form>
  );
} 