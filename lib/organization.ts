import type {
  Organization, UserRole
} from "@prisma/client";

import { prisma } from "@/lib/db";

export interface OrganizationMember {
  userId: string;
  organizationId: string;
  role: UserRole;
  user: {
    id: string;
    name: string | null;
  };
}

export type OrganizationWithMembers = Organization & {
  members: OrganizationMember[];
};

/**
 * Check if a user has access to an organization
 */
export async function hasOrgAccess(
  userId: string,
  orgId: string | undefined,
): Promise<boolean> {
  if (!orgId) return false;
  
  const count = await prisma.user.count({
    where: {
      id: userId,
      organizationId: orgId,
    },
  });
  return count > 0;
}

/**
 * Check if a user has a specific role in an organization
 */
export async function hasOrgRole(
  userId: string,
  orgId: string | undefined,
  role: UserRole,
): Promise<boolean> {
  if (!orgId) return false;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      organizationId: orgId,
      role,
    },
  });
  return !!user;
}

/**
 * Return the role of a user in an organization
 */
export async function getOrgRole(
  userId: string,
  orgId: string | undefined,
): Promise<UserRole | null> {
  if (!orgId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      organizationId: orgId,
    },
    select: {
      role: true,
    },
  });
  return user?.role ?? null;
}

/**
 * Get organization data if user has access
 */
export async function getOrgData(
  userId: string,
  orgId: string | undefined,
): Promise<Organization | null> {
  if (!orgId) return null;

  const hasAccess = await hasOrgAccess(userId, orgId);
  if (!hasAccess) {
    throw new Error("Unauthorized access to organization");
  }

  return await prisma.organization.findUnique({
    where: { id: orgId },
  });
}

/**
 * Get user's organization
 */
export async function getUserOrganization(
  userId: string,
): Promise<Organization | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      organization: true,
    },
  });

  return user?.organization ?? null;
}

/**
 * Check if a user has any organizations
 */
export async function hasAnyOrganizations(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return !!user?.organizationId;
}

/**
 * Get all pending invites for an organization
 * @param organizationId - The ID of the organization
 */
export async function getOrganizationInvites(organizationId: string) {
  // @ts-ignore
  return await prisma.invitation.findMany({
    where: {
      organizationId,
      status: "PENDING",
    },
    include: {
      invitedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
