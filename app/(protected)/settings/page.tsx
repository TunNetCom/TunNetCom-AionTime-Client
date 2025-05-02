import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DeleteAccountSection } from "@/components/dashboard/delete-account";
import { DashboardHeader } from "@/components/dashboard/header";
import { UserNameForm } from "@/components/forms/user-name-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Separator } from "@/components/ui/separator";

export const metadata = constructMetadata({
  title: "Settings – CruxHire AI",
  description: "Configure your account and website settings.",
});

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const user = await getCurrentUser();
  const resolvedSearchParams = await searchParams;

  if (!user?.id) redirect("/login");

  // Extract OAuth callback parameters
  const success = resolvedSearchParams.success;
  const error = resolvedSearchParams.error;
  const provider = resolvedSearchParams.provider as string | undefined;

  return (
    <>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      {/* Handle OAuth callback responses */}
    
   
    </>
  );
}
