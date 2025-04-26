import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen flex-col space-y-12 px-4 py-8 md:px-8 md:py-12">
      {/* Header Section */}
      <div className="space-y-6">
        <DashboardHeader
          heading="Welcome to CruxHire AI Recruiting Platform"
          text="Your AI-powered recruiting assistant"
        />
      </div>

      {/* Main content with cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Job Postings Card Skeleton */}
        <Card className="group relative overflow-hidden">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="size-14 rounded-lg" />
            </div>
            <Skeleton className="h-5 w-full" />
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-12 w-full rounded-md" />
          </CardContent>
        </Card>

        {/* Candidates Card Skeleton */}
        <Card className="group relative overflow-hidden">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="size-14 rounded-lg" />
            </div>
            <Skeleton className="h-5 w-full" />
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-12 w-full rounded-md" />
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="relative space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-36" />
          <div className="ml-4 h-px flex-1 bg-gradient-to-r from-border via-muted to-transparent" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature Card Skeletons */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="group relative overflow-hidden">
              <CardHeader className="space-y-4">
                <Skeleton className="size-12 rounded-xl" />
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
