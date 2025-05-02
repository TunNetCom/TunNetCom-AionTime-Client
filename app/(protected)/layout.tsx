import { redirect } from "next/navigation";
import type { SidebarNavItem } from "types/index.d";

import { sidebarLinks } from "@/config/dashboard";
import { getOrgRole, getUserOrganization } from "@/lib/organization";
import { getCurrentUser } from "@/lib/session";
import NoOrgPrompt from "@/components/dashboard/no-org-prompt";
import { SearchCommand } from "@/components/dashboard/search-command";
import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const organization = await getUserOrganization(user.id!);
  const orgRole = await getOrgRole(user.id!, organization?.id);

  const filteredLinks = sidebarLinks.map((section) => ({
    ...section,
    items: section.items.filter(
      ({ authorizeOnly }) =>
        !authorizeOnly || authorizeOnly === orgRole || orgRole == "OWNER",
    ),
  }));

  const organizations = organization ? [organization] : [];

  return (
    <div className="relative flex min-h-screen w-full">
      <DashboardSidebar
        links={filteredLinks as SidebarNavItem[]}
        organizations={organizations}
        currentOrganization={organization}
      />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
          <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0">
            <MobileSheetSidebar
              links={filteredLinks as SidebarNavItem[]}
              organizations={organizations}
              currentOrganization={organization}
            />

            <div className="w-full flex-1">
              <SearchCommand links={filteredLinks} />
            </div>

            <ModeToggle />
            <UserAccountNav />
          </MaxWidthWrapper>
        </header>

        <main className="flex-1 p-4 xl:px-8">
          <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
            {!organization ? <NoOrgPrompt /> : children}
          </MaxWidthWrapper>
        </main>
      </div>
    </div>
  );
}
