"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, CheckIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationDetailsForm } from "@/components/forms/organization/details-form";
import { IntegrationSelectionList } from "@/components/forms/organization/integration-selection";
import { IntegrationConfigForm } from "@/components/forms/organization/integration-config";
import { createOrganizationWithIntegration } from "@/actions/create-org.server";
import { getHexColor } from "@/components/forms/organization/color-utils";

import type { OrganizationFormValues, IntegrationType, IntegrationFormValues } from "@/components/forms/organization/types";

export default function CreateOrganizationModal({
  setOpenPopover,
  autoOpen = false,
  children,
}: {
  setOpenPopover?: (open: boolean) => void;
  autoOpen?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(autoOpen);
  const [isForceOpen, setIsForceOpen] = useState(autoOpen);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType>(null);
  const [orgDetails, setOrgDetails] = useState<OrganizationFormValues | null>(null);
  
  // Form ref for the integration config form
  const configFormRef = useRef<HTMLFormElement>(null);

  // Helper function to properly close the dialog
  const closeDialog = () => {
    setIsForceOpen(false);
    setOpen(false);
    if (setOpenPopover) setOpenPopover(false);
  };

  const handleDetailsSubmit = async (values: OrganizationFormValues) => {
    setOrgDetails(values);
  };

  const handleIntegrationSubmit = async (values: IntegrationFormValues) => {
    if (!orgDetails || !selectedIntegration) return;

    setLoading(true);
    try {
      const result = await createOrganizationWithIntegration({
        ...orgDetails,
        color: getHexColor(orgDetails.color),
        ...values,
        integrationType: selectedIntegration,
      });

      if (result.status === "error") {
        toast.error(result.message || "Failed to create organization");
        return;
      }

      toast.success("Organization created successfully");
      closeDialog();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Function to submit the config form and ensure all required fields are provided
  const submitConfigForm = () => {
    if (configFormRef.current) {
      configFormRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          // Only allow closing if not forced open
          if (isForceOpen && !newOpen) {
            return;
          }
          setOpen(newOpen);
        }}
      >
        <DialogTrigger asChild>
          {setOpenPopover ? (
            <Button variant="outline" className="w-full justify-start gap-2">
              <Building2 className="size-4" />
              Create Organization
            </Button>
          ) : null}
        </DialogTrigger>
        <DialogContent
          className={`flex max-w-3xl flex-col gap-0 overflow-hidden border p-0 sm:max-w-[550px] md:max-w-2xl lg:max-w-3xl ${isForceOpen ? "hide-close-button" : ""}`}
          onEscapeKeyDown={(e) => {
            if (isForceOpen) {
              e.preventDefault();
            }
          }}
          onPointerDownOutside={(e) => {
            if (isForceOpen) {
              e.preventDefault();
            }
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Building2 className="size-5" />
              <DialogTitle className="text-lg font-semibold">
                Create New Organization
              </DialogTitle>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              <OrganizationDetailsForm 
                onSubmit={handleDetailsSubmit}
                initialData={orgDetails}
                loading={loading}
              />

              <IntegrationSelectionList
                onSelect={(integrationType) => {
                  setSelectedIntegration(integrationType);
                }}
              />

              {selectedIntegration && (
                <IntegrationConfigForm
                  integrationType={selectedIntegration}
                  onSubmit={handleIntegrationSubmit}
                  loading={loading}
                  formRef={configFormRef}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end border-t p-4 px-6">
            <Button 
              type="button"
              className="min-w-28 flex items-center gap-1.5"
              onClick={submitConfigForm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span>Create Organization</span>
                  <CheckIcon className="size-4" />
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
} 