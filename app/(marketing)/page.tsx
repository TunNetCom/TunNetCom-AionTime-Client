import { PricingFaq } from "@/components/pricing/pricing-faq";
import Bentogrid from "@/components/sections/bentogrid";
import CallToAction1 from "@/components/sections/call-to-action1";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import IntegrationSection from "@/components/sections/integration-section";
import MarqueeLogo from "@/components/sections/marquee-logo";

export default function IndexPage() {
  return (
    <>
      <HeroLanding />
      <div className="pb-16">
        <MarqueeLogo />
      </div>
      <Features />

      <InfoLanding
        data={{
          title: "Work Your Way—Aion Time Syncs Everywhere",
          image:
            "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description:
            "Aion Time empowers teams to track, analyze, and optimize work—without locking you into a single platform. Seamlessly sync your tasks and time across Jira, Azure DevOps, and more. Stay in your flow, wherever you work.",
          list: [
            {
              icon: "pieChart",
              title: "Universal Sync",
              description:
                "Connect and track work across Jira, Azure DevOps, and any platform your team uses.",
            },
            {
              icon: "lineChart",
              title: "Actionable Insights",
              description:
                "Visualize trends and bottlenecks across all your tools, not just one.",
            },
            {
              icon: "trending-up",
              title: "No Vendor Lock-In",
              description:
                "Switch platforms or use many—Aion Time keeps your data and workflows unified.",
            },
          ],
        }}
      />

      <InfoLanding
        reverse
        data={{
          title: "AI-Powered Project Management",
          image:
            "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description:
            "Let our intelligent agent handle the busywork. Aion Time’s AI helps you triage, prioritize, and resolve tickets faster—so you can focus on what matters.",
          list: [
            {
              icon: "trending-up",
              title: "AI Ticket Assistant",
              description:
                "Get smart recommendations and automated updates for your work items.",
            },
            {
              icon: "arrowRight",
              title: "Accelerate Workflows",
              description:
                "AI-driven suggestions help you move tickets forward with less manual effort.",
            },
            {
              icon: "lineChart",
              title: "Human-in-the-Loop",
              description:
                "You stay in control—review, modify, or approve every AI recommendation.",
            },
          ],
        }}
      />

      <Bentogrid />

      <IntegrationSection />

      <PricingFaq />

      <CallToAction1 />
    </>
  );
}
