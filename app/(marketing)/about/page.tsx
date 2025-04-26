import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { constructMetadata } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovingBorderButton } from "@/components/ui/moving-border-button";
import { AnimatedIcon } from "@/components/shared/animated-icon";

export const metadata = constructMetadata({
  title: "About – CruxHire AI",
  description:
    "Revolutionizing recruitment with AI-powered talent matching and hiring automation.",
});

interface ValueProposition {
  title: string;
  description: string;
  highlight?: boolean;
}

const valuePropositions: ValueProposition[] = [
  {
    title: "Smart Talent Matching",
    description: "Our AI agent automatically creates perfect matches between your job posts and candidates, ensuring you never miss out on top talent.",
    highlight: true,
  },
  {
    title: "Multi-Channel Posting",
    description: "Post once and reach candidates across multiple job platforms, centralizing all applications in one place.",
  },
  {
    title: "Automated Workflow",
    description: "Automatically filter candidates, schedule interviews, and manage communication with customizable email templates.",
    highlight: true,
  },
  {
    title: "Real-Time Updates",
    description: "Get instant matches whenever you upload new job posts or receive new candidates, keeping your talent pool always up to date.",
  },
  {
    title: "Cost-Effective",
    description: "Competitive pricing with flexible per-job or monthly subscription options to suit your hiring needs.",
  },
  {
    title: "Domain Expertise",
    description: "Built with deep understanding of recruitment challenges and modern UX principles for seamless hiring.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-1/4 top-0 size-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 top-1/2 size-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <header className="animate-fade-in-up mb-32 text-center">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="mr-2 size-4" />
              Revolutionizing Recruitment
            </div>
            <h1 className="text-gradient mt-8 pb-2 text-6xl font-bold tracking-tight  sm:text-7xl md:text-8xl">
              The Future of
              <br />
              Hiring is Here
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
              Streamline your recruitment process with AI-powered talent matching and automation
            </p>
          </header>

          <section className="animate-fade-in-up mb-32">
            <div className="relative rounded-3xl border border-gray-200 bg-white/50 p-8 shadow-xl backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50 md:p-12">
              <div className="absolute -top-5 inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white">
                Our Mission
              </div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
                At CruxHire AI, we&apos;re revolutionizing the recruitment landscape by combining
                cutting-edge AI technology with deep industry expertise. Our platform
                automates the entire hiring process while ensuring you never miss out on
                perfect candidates, saving you time and resources while improving the
                quality of your hires.
              </p>
            </div>
          </section>

          <section className="mb-32">
            <h2 className="mb-16 text-center text-4xl font-bold">Why Choose CruxHire AI?</h2>
            <div className="grid auto-rows-[250px] gap-8 md:grid-cols-2 lg:grid-cols-3">
              {valuePropositions.map((prop, index) => (
                <Card
                  key={index}
                  className={`transition-all duration-300 hover:scale-[1.02]${prop.highlight ? 'row-span-2 md:col-span-2 lg:col-span-1' : ''
                    }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <CheckCircle2 className="size-6 text-primary" />
                      {prop.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{prop.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="animate-fade-in-up mb-32">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/50 shadow-xl backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
              <div className="relative p-12">
                <div className="flex items-center gap-4">
                  <AnimatedIcon
                    icon="engagement"
                    className="size-16"
                    playMode="loop"
                    speed={0.8}
                  />
                  <h3 className="text-3xl font-bold">Get in Touch</h3>
                </div>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
                  Ready to transform your hiring process? Contact us at{" "}
                  <a
                    href="mailto:contact@cruxhire.ai"
                    className="text-primary hover:underline"
                  >
                    contact@cruxhire.ai
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section className="animate-fade-in-up text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to ace your next interview?
            </h2>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Join thousands of successful candidates who have prepared with
              CruxHire AI.
            </p>
            <Link href="/" passHref>
              <MovingBorderButton
                borderRadius="1rem"
                className="border-neutral-200 bg-white font-medium text-black dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              >
                Get Started
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </MovingBorderButton>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
