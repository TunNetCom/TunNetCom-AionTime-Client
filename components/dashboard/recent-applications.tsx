"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateImage?: string;
  jobTitle: string;
  status: string;
  score: number;
  appliedAt: Date;
}

interface RecentApplicationsProps {
  className?: string;
  limit?: number;
}

export function RecentApplications({ className, limit = 5 }: RecentApplicationsProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  const fetchRecentApplications = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, fetch from API
      // For now, we'll use mock data
      const mockData: Application[] = [
        {
          id: "1",
          candidateName: "Alex Johnson",
          candidateEmail: "alex@example.com",
          jobTitle: "Senior Frontend Developer",
          status: "NEW",
          score: 92,
          appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        {
          id: "2",
          candidateName: "Sarah Williams",
          candidateEmail: "sarah@example.com",
          jobTitle: "Product Manager",
          status: "INTERVIEWING",
          score: 88,
          appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: "3",
          candidateName: "Michael Brown",
          candidateEmail: "michael@example.com",
          jobTitle: "DevOps Engineer",
          status: "CONTACTED",
          score: 85,
          appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          id: "4",
          candidateName: "Emily Davis",
          candidateEmail: "emily@example.com",
          jobTitle: "UX Designer",
          status: "NEW",
          score: 79,
          appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
        {
          id: "5",
          candidateName: "David Wilson",
          candidateEmail: "david@example.com",
          jobTitle: "Backend Developer",
          status: "INTERVIEWING",
          score: 94,
          appliedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        },
      ];

      // Simulate API delay
      setTimeout(() => {
        setApplications(mockData.slice(0, limit));
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching recent applications:", error);
      toast.error("Failed to load recent applications");
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-500";
      case "CONTACTED":
        return "bg-yellow-500";
      case "INTERVIEWING":
        return "bg-purple-500";
      case "HIRED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "NEW":
        return "New";
      case "CONTACTED":
        return "Contacted";
      case "INTERVIEWING":
        return "Interviewing";
      case "HIRED":
        return "Hired";
      case "REJECTED":
        return "Rejected";
      default:
        return status;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }
  };

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>
          Recent candidate applications for your job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(limit).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">No recent applications</p>
          </div>
        ) : (
          <div className="space-y-8">
            {applications.map((application) => (
              <div key={application.id} className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    {application.candidateImage ? (
                      <AvatarImage src={application.candidateImage} alt={application.candidateName} />
                    ) : (
                      <AvatarFallback>
                        {application.candidateName.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium">{application.candidateName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Applied for {application.jobTitle}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Match: {application.score}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(application.appliedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={cn("text-white", getStatusColor(application.status))}>
                  {getStatusText(application.status)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">
          <Link href="/applications" className="flex items-center w-full justify-center">
            View all applications
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 