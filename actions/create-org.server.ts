"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/db";

const createOrgSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  color: z.string().min(1, "Color is required"),
});

type CreateOrgInput = z.infer<typeof createOrgSchema>;

const createOrgWithIntegrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  color: z.string().min(1, "Color is required"),
  integrationType: z.enum(["azure", "jira", "clickup", "asana"]),
  accessToken: z.string().min(1, "Access token is required"),
  integrationUrl: z.string().min(1, "Organization URL is required"),
});

type CreateOrgWithIntegrationInput = z.infer<typeof createOrgWithIntegrationSchema>;

export type CreateOrgResponse = {
  status: "success" | "error";
  message?: string;
  organizationId?: string;
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .trim();
}

export async function createOrganization(data: CreateOrgInput): Promise<CreateOrgResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error", message: "Unauthorized" };
    }

    // First verify the user exists
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { status: "error", message: "User not found" };
    }

    const validatedData = createOrgSchema.safeParse(data);
    if (!validatedData.success) {
      return { 
        status: "error", 
        message: validatedData.error.errors[0]?.message || "Invalid input" 
      };
    }

    // Use a transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // First create the organization
      const organization = await tx.organization.create({
        data: {
          name: validatedData.data.name.trim(),
          color: validatedData.data.color,
        },
      });

      // Then update the user to connect them to the organization
      await tx.user.update({
        where: { id: user.id },
        data: {
          organizationId: organization.id,
          role: UserRole.OWNER,
        },
      });

      return organization;
    });

    revalidatePath("/dashboard");
    return { status: "success", organizationId: result.id };
  } catch (error) {
    console.error("Failed to create organization:", error);
    return {
      status: "error",
      message: error instanceof Error 
        ? error.message 
        : "Failed to create organization. Please try again.",
    };
  }
}

export async function createOrganizationWithIntegration(
  data: CreateOrgWithIntegrationInput
): Promise<CreateOrgResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error", message: "Unauthorized" };
    }

    // First verify the user exists
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { status: "error", message: "User not found" };
    }

    const validatedData = createOrgWithIntegrationSchema.safeParse(data);
    if (!validatedData.success) {
      return { 
        status: "error", 
        message: validatedData.error.errors[0]?.message || "Invalid input" 
      };
    }

    // Use a transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // First create the organization
      const organization = await tx.organization.create({
        data: {
          name: validatedData.data.name.trim(),
          email: validatedData.data.email.trim(),
          color: validatedData.data.color,
          integrationType: validatedData.data.integrationType,
          accessToken: validatedData.data.accessToken,
          integrationUrl: validatedData.data.integrationUrl,
        },
      });

      // Then update the user to connect them to the organization
      await tx.user.update({
        where: { id: user.id },
        data: {
          organizationId: organization.id,
          role: UserRole.OWNER,
        },
      });

      return organization;
    });

    revalidatePath("/dashboard");
    return { status: "success", organizationId: result.id };
  } catch (error) {
    console.error("Failed to create organization with integration:", error);
    return {
      status: "error",
      message: error instanceof Error 
        ? error.message 
        : "Failed to create organization. Please try again.",
    };
  }
}
