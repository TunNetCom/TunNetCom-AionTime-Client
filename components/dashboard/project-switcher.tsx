"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { switchOrganization } from "@/actions/switch-org.server";
import { type Organization } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ProjectSwitcher({
  large = false,
  organizations,
  currentOrganization,
}: {
  large?: boolean;
  organizations: Organization[];
  currentOrganization: Organization | null;
}) {
  const { data: session, status } = useSession();
  const [openPopover, setOpenPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  // Log JWT token data
  console.log("=== JWT Token Data ===");
  console.log("Full session:", session);
  console.log("Session user:", session?.user);
  console.log("Organization ID from JWT:", session?.user?.organizationId);
  console.log("Organization Name from JWT:", session?.user?.organizationName);
  console.log("User role from JWT:", session?.user?.role);
  console.log("Access token from JWT:", session?.user?.accessToken);
  console.log("Session status:", status);
  console.log("===================");

  if (!organizations || status === "loading" || loading) {
    return <ProjectSwitcherPlaceholder />;
  }

  // Get organization name from session
  const orgName = session?.user?.organizationName;
  console.log("Organization name being displayed:", orgName);

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "ghost", className: "h-auto p-1 pr-2" }),
          "flex w-full items-center rounded-lg border bg-background shadow-sm transition-colors hover:bg-accent/50",
        )}
        onClick={() => setOpenPopover(!openPopover)}
      >
        {currentOrganization ? (
          <Avatar className="size-10 shrink-0 rounded-lg border">
            <AvatarFallback
              style={{
                backgroundColor:
                  currentOrganization.color ?? "rgb(203 213 225)",
              }}
            >
              {currentOrganization.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="size-10 shrink-0 rounded-lg border bg-muted" />
        )}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0 flex-1">
            <span
              className={cn(
                "block truncate text-[11px] font-medium sm:text-sm",
                currentOrganization ? "" : "text-muted-foreground",
              )}
            >
              {orgName || currentOrganization?.name || "No organizations yet"}
            </span>
          </div>
        </div>
        <ChevronsUpDown
          className="size-4 shrink-0 text-muted-foreground/70"
          aria-hidden="true"
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1">
        <ProjectList
          selected={currentOrganization}
          organizations={organizations}
          setOpenPopover={setOpenPopover}
          setLoading={setLoading}
        />
      </PopoverContent>
    </Popover>
  );
}

function ProjectList({
  selected,
  organizations,
  setOpenPopover,
  setLoading,
}: {
  selected: Organization | null;
  organizations: Organization[];
  setOpenPopover: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-1">
      {organizations.map((org) => (
        <div
          key={org.id}
          className={cn(
            "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            selected?.id === org.id && "bg-accent text-accent-foreground",
          )}
          onClick={async () => {
            setLoading(true);
            try {
              await switchOrganization(org.id);
              setOpenPopover(false);
              router.refresh();
            } catch (error) {
              console.error("Failed to switch organization:", error);
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="flex flex-1 items-center justify-between gap-2">
            <div className="flex flex-col">
              <span
                className={`truncate text-sm ${
                  selected?.id === org.id
                    ? "font-medium text-foreground"
                    : "font-normal"
                }`}
              >
                {org.name}
              </span>
            </div>
            {selected?.id === org.id && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
                <Check size={18} aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectSwitcherPlaceholder() {
  return (
    <div className="flex animate-pulse items-center space-x-1.5 px-4">
      <div className="h-12 w-[280px] animate-pulse rounded-lg bg-muted" />
    </div>
  );
}
