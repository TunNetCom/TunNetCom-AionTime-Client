"use client";

import { BarChart, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsOverviewProps {
  candidateCount: number;
  jobPostTrends: Array<{ total: number }>;
}

export function StatsOverview({
  candidateCount,
  jobPostTrends,
}: StatsOverviewProps) {
  const totalJobPosts = jobPostTrends.reduce(
    (acc, curr) => acc + curr.total,
    0,
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Candidates
          </CardTitle>
          <div className="rounded-full bg-primary/10 p-2">
            <Users className="size-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">
              {new Intl.NumberFormat().format(candidateCount)}
            </div>
            <p className="text-xs text-muted-foreground">
              Active in the system
            </p>
          </div>
          <div className="mt-4 h-[4px] w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${Math.min((candidateCount / 1000) * 100, 100)}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Total Job Posts</CardTitle>
          <div className="rounded-full bg-primary/10 p-2">
            <BarChart className="size-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">
              {new Intl.NumberFormat().format(totalJobPosts)}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days • {Math.round((totalJobPosts / 30) * 10) / 10}{" "}
              posts/day
            </p>
          </div>
          <div className="mt-4 flex h-[40px] items-end gap-1">
            {jobPostTrends.slice(-7).map((trend, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/10 transition-all hover:bg-primary/20"
                style={{
                  height: `${(trend.total / Math.max(...jobPostTrends.map((t) => t.total))) * 100}%`,
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
