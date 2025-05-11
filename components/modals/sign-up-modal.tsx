"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, CheckIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { OrganizationDetailsForm } from "@/components/forms/organization/details-form";
import { IntegrationSelectionList } from "@/components/forms/organization/integration-selection";
import { IntegrationConfigForm } from "@/components/forms/organization/integration-config";
import { StepIndicator } from "@/components/forms/organization/step-indicator";
import { getHexColor } from "@/components/forms/organization/color-utils";
import { post } from "@/lib/api";

import type { OrganizationFormValues, IntegrationType, IntegrationFormValues } from "@/components/forms/organization/types";

type Step = "details" | "integration" | "config";

interface SignUpModalProps {
  showSignUpModal: boolean;
  setShowSignUpModal: (show: boolean) => void;
}

export function SignUpModal({ showSignUpModal, setShowSignUpModal }: SignUpModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType>(null);
  const [orgDetails, setOrgDetails] = useState<OrganizationFormValues | null>(null);
  
  // Form ref for the integration config form
  const configFormRef = useRef<HTMLFormElement>(null);

  const handleDetailsSubmit = async (values: OrganizationFormValues) => {
    setOrgDetails(values);
    setCurrentStep("integration");
  };

  const handleIntegrationSubmit = async (values: IntegrationFormValues) => {
    if (!orgDetails || !selectedIntegration) return;

    setLoading(true);
    try {
      const requestData = {
        pat: values.accessToken,
        email: orgDetails.email,
        password: orgDetails.password,
        organizationName: orgDetails.name
      };

      console.log("Sending sign-up request with data:", requestData);

      // Create tenant account with all the information
      const response = await post("/api/create-tenant", requestData);

      console.log("Received response:", response);

      if (response.error) {
        throw new Error(response.error);
      }

      toast.success("Account created successfully");
      setShowSignUpModal(false);
      router.refresh();
    } catch (error) {
      console.error("Create tenant error:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
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

  const getStepTitle = () => {
    switch (currentStep) {
      case "details":
        return "Account Details";
      case "integration":
        return "Choose Integration";
      case "config":
        return selectedIntegration === "azure"
          ? "Configure Azure DevOps"
          : "Configure Integration";
      default:
        return "Create Account";
    }
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case "details":
        return 1;
      case "integration":
        return 2;
      case "config":
        return 3;
      default:
        return 1;
    }
  };

  const currentStepNum = getStepNumber();
  const totalSteps = 3;

  return (
    <Dialog open={showSignUpModal} onOpenChange={setShowSignUpModal}>
      <DialogContent className="flex max-w-3xl flex-col gap-0 overflow-hidden border p-0 sm:max-w-[550px] md:max-w-2xl lg:max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <Building2 className="size-5" />
            <DialogTitle className="text-lg font-semibold">
              {currentStep === "details" ? "Create New Account" : "Select Integrations"}
            </DialogTitle>
          </div>
        </div>

        {/* Step title with proper spacing */}
        <div className="px-6 pt-4">
          <h3 className="text-base font-medium">{getStepTitle()}</h3>
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={currentStepNum} totalSteps={totalSteps} />

        {/* Content area */}
        <div className="px-6">
          {currentStep === "details" && (
            <OrganizationDetailsForm 
              onSubmit={handleDetailsSubmit}
              initialData={orgDetails}
              loading={loading}
              isSignUp={true}
            />
          )}

          {currentStep === "integration" && (
            <IntegrationSelectionList
              onSelect={(integrationType) => {
                setSelectedIntegration(integrationType);
                setCurrentStep("config");
              }}
            />
          )}

          {currentStep === "config" && selectedIntegration && (
            <IntegrationConfigForm
              integrationType={selectedIntegration}
              onSubmit={handleIntegrationSubmit}
              loading={loading}
              formRef={configFormRef}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          {/* Back button for steps 2 and 3 */}
          {currentStep !== "details" && (
            <Button
              type="button"
              variant="outline"
              className="min-w-24 flex items-center gap-1"
              onClick={() => {
                if (currentStep === "config") {
                  setCurrentStep("integration");
                } else if (currentStep === "integration") {
                  setCurrentStep("details");
                }
              }}
            >
              <span>Back</span>
            </Button>
          )}

          {/* Action buttons */}
          <div className="ml-auto flex gap-2">
            {currentStep === "config" && (
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
                    <span>Create Account</span>
                    <CheckIcon className="size-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useSignUpModal() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const SignUpModalCallback = () => {
    return (
      <SignUpModal
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
      />
    );
  };

  return {
    setShowSignUpModal,
    SignUpModal: SignUpModalCallback,
  };
} 