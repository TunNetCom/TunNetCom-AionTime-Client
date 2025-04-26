import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getDashboardStats } from "@/lib/candidates";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/header";
import { JobPostTrendChart } from "@/components/dashboard/stats/candidate-trend-chart";
import { SkillDistributionChart } from "@/components/dashboard/stats/match-status-chart";
import { StatsOverview } from "@/components/dashboard/stats/overview";
import { AnimatedIcon } from "@/components/shared/animated-icon";

const Page = async () => {
  const user = await getCurrentUser();
  const stats = await getDashboardStats();

  return (
    <div className="flex min-h-screen flex-col space-y-8">
      {/* Header Section with Animated Welcome */}
      <div className="space-y-6">
        <DashboardHeader
          heading="Welcome to CruxHire AI Recruiting Platform"
          text="Your AI-powered recruiting assistant"
        />
      </div>

      {/* Stats Overview */}
      <StatsOverview
        candidateCount={stats.candidateCount}
        jobPostTrends={stats.jobPostTrends}
      />

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <SkillDistributionChart data={stats.skillData} />
        <JobPostTrendChart data={stats.jobPostTrends} />
      </div>

      {/* Main content with cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Job Postings Card */}
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Job Postings</CardTitle>
              <AnimatedIcon
                icon="suitcase"
                className="size-14"
                playMode="loop"
                hoverDuration={3000}
                speed={0.6}
              />
            </div>
            <CardDescription className="text-base">
              Create and manage your job postings to find the perfect candidates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <p className="text-muted-foreground">
              Define your requirements and let AI help you craft the perfect job
              description.
            </p>
            <Link href="/posts" className="block">
              <Button className="group relative w-full overflow-hidden py-6 text-base transition-all hover:shadow-md">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Go to Job Postings
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Candidates Card */}
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/5 via-primary/5 to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Candidates</CardTitle>
              <AnimatedIcon
                icon="document"
                className="size-14"
                playMode="loop"
                hoverDuration={3000}
                speed={0.6}
              />
            </div>
            <CardDescription className="text-base">
              Upload resumes and let AI create candidate profiles automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <p className="text-muted-foreground">
              Our AI will analyze resumes and match candidates with suitable
              positions.
            </p>
            <Link href="/candidates" className="block">
              <Button className="group relative w-full overflow-hidden py-6 text-base transition-all hover:shadow-md">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Manage Candidates
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="relative space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Key Features</h2>
          <div className="ml-4 h-px flex-1 bg-gradient-to-r from-border via-muted to-transparent" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Quick Upload */}
          <Card className="group relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <CardHeader className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <AnimatedIcon
                  icon="envelope"
                  className="size-8"
                  playMode="loop"
                  hoverDuration={3000}
                  speed={0.6}
                />
              </div>
              <CardTitle className="text-xl">Quick Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Drag and drop resumes for instant candidate profile creation
              </p>
            </CardContent>
          </Card>

          {/* AI Matching */}
          <Card className="group relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <CardHeader className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <AnimatedIcon
                  icon="magicWand"
                  className="size-8"
                  playMode="loop"
                  hoverDuration={3000}
                  speed={0.6}
                />
              </div>
              <CardTitle className="text-xl">AI Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Smart algorithms match candidates with your job requirements
              </p>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="group relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <CardHeader className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <AnimatedIcon
                  icon="barChart"
                  className="size-8"
                  playMode="loop"
                  hoverDuration={3000}
                  speed={0.6}
                />
              </div>
              <CardTitle className="text-xl">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track your recruitment process with detailed insights
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
       
blank
      </div>
    </div>
  );
};

export default Page;
