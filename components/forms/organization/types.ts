import { z } from "zod";

// Define types
export type IntegrationType = "azure" | "jira" | "clickup" | "asana" | null;

// Define schemas
export const organizationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  description: z.string().optional(),
  color: z.string().min(1, "Color is required"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

export const integrationFormSchema = z.object({
  accessToken: z.string().min(1, "Personal Access Token is required"),
  integrationUrl: z.string().min(1, "Organization URL is required"),
});

export type IntegrationFormValues = z.infer<typeof integrationFormSchema>;

// Integration information type
export interface IntegrationInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled: boolean;
  comingSoon?: boolean;
  color: string;
  borderColor: string;
  iconColor: string;
} 