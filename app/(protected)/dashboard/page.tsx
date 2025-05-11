import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BarChart3, BrainCircuit, Clock, KanbanSquare, Users } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/header";
import { Icons } from "@/components/shared/icons";

// Static data for dashboard stats
const getStaticDashboardData = () => {
  return {
    activeProjects: 12,
    totalWorkItems: 347,
    completedItems: 218,
    pendingReviews: 14,
    teamMembers: 8,
    velocity: 24,
    completion: 76,
    workTrends: [
      { month: "Jan", count: 15 },
      { month: "Feb", count: 22 },
      { month: "Mar", count: 18 },
      { month: "Apr", count: 25 },
      { month: "May", count: 32 },
      { month: "Jun", count: 38 },
      { month: "Jul", count: 42 },
      { month: "Aug", count: 36 },
    ],
    workItemDistribution: [
      { type: "Feature", value: 45 },
      { type: "Bug", value: 23 },
      { type: "Task", value: 32 },
      { type: "Epic", value: 15 },
      { type: "User Story", value: 38 },
    ],
    recentBoards: [
      { name: "Sprint Planning", updated: "1 hour ago", items: 24 },
      { name: "Product Backlog", updated: "3 hours ago", items: 47 },
      { name: "UI Redesign", updated: "2 days ago", items: 16 },
      { name: "Bug Triage", updated: "5 hours ago", items: 31 },
    ],
    recentWorkItems: [
      { id: "AZ-143", title: "Implement OAuth login flow", status: "In Progress", assignee: "Alex K.", priority: "High" },
      { id: "AZ-147", title: "Fix dashboard responsive layout", status: "In Review", assignee: "Maria L.", priority: "Medium" },
      { id: "AZ-156", title: "Create AI recommendation engine", status: "Planned", assignee: "John D.", priority: "High" },
      { id: "AZ-162", title: "Update API documentation", status: "Completed", assignee: "Sarah P.", priority: "Low" },
      { id: "AZ-174", title: "Optimize database queries", status: "In Progress", assignee: "Mike T.", priority: "Medium" },
    ],
  };
};

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    "Completed": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "In Review": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    "Planned": "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400",
  };

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[status] || ""}`}>
      {status}
    </span>
  );
}

// Priority indicator component
function PriorityIndicator({ priority }: { priority: string }) {
  const priorityStyles = {
    "High": "text-red-500",
    "Medium": "text-amber-500",
    "Low": "text-green-500",
  };

  const circles = {
    "High": "●●●",
    "Medium": "●●○",
    "Low": "●○○",
  };

  return (
    <span className={`text-xs font-mono ${priorityStyles[priority] || ""}`}>
      {circles[priority]}
    </span>
  );
}

// Chart component (simplified for static display)
function SimpleAreaChart() {
  const data = getStaticDashboardData().workTrends;
  const maxCount = Math.max(...data.map(item => item.count));
  
  return (
    <div className="relative h-[180px] w-full">
      {/* Chart grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between px-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-px w-full bg-border/40" />
        ))}
      </div>
      
      {/* Chart bars */}
      <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="group relative">
              <div 
                className="w-6 rounded-t-md bg-gradient-to-t from-primary/90 to-primary/40 transition-all duration-300 group-hover:from-primary group-hover:to-primary/60" 
                style={{ height: `${(item.count / maxCount) * 125}px` }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-background px-1.5 py-1 text-xs opacity-0 shadow transition-opacity group-hover:opacity-100">
                {item.count}
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{item.month}</div>
          </div>
        ))}
      </div>
      
      {/* X-axis line */}
      <div className="absolute bottom-8 left-4 right-4 h-px bg-border" />
      
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 flex h-full flex-col justify-between pb-8 pt-1 text-right">
        <div className="text-[10px] text-muted-foreground">
          {maxCount}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {Math.round(maxCount * 0.75)}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {Math.round(maxCount * 0.5)}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {Math.round(maxCount * 0.25)}
        </div>
        <div className="text-[10px] text-muted-foreground">
          0
        </div>
      </div>
    </div>
  );
}

// Simple pie chart for work item distribution
function SimplePieChart() {
  const data = getStaticDashboardData().workItemDistribution;
  const colors = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];
  
  // Calculate total for percentages
  const total = data.reduce((acc, item) => acc + item.value, 0);
  
  return (
    <div className="relative h-[180px] w-full">
      <div className="flex h-full items-center justify-center">
        <div className="relative h-32 w-32 rounded-full">
          {/* Create a stacked pie chart with CSS conic-gradient */}
          <div 
            className="h-full w-full rounded-full"
            style={{ 
              background: `conic-gradient(
                ${colors[0]} 0% ${(data[0].value / total) * 100}%, 
                ${colors[1]} ${(data[0].value / total) * 100}% ${((data[0].value + data[1].value) / total) * 100}%, 
                ${colors[2]} ${((data[0].value + data[1].value) / total) * 100}% ${((data[0].value + data[1].value + data[2].value) / total) * 100}%,
                ${colors[3]} ${((data[0].value + data[1].value + data[2].value) / total) * 100}% ${((data[0].value + data[1].value + data[2].value + data[3].value) / total) * 100}%,
                ${colors[4]} ${((data[0].value + data[1].value + data[2].value + data[3].value) / total) * 100}% 100%
              )` 
            }}
          />
          <div className="absolute inset-3 rounded-full bg-background" />
        </div>
      </div>
      <div className="absolute bottom-2 flex w-full flex-wrap justify-center gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div 
              className="h-3 w-3 rounded-sm" 
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-xs">
              <span className="font-medium">{item.type}</span>
              <span className="ml-1 text-muted-foreground">{Math.round((item.value / total) * 100)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const dashboardData = getStaticDashboardData();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <DashboardHeader
        heading="Dashboard"
        text="Your project overview and statistics."
      />
      <div className="container grid gap-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <KanbanSquare className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.activeProjects}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Work Items</CardTitle>
              <BarChart3 className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalWorkItems}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.teamMembers}</div>
              <p className="text-xs text-muted-foreground">
                +1 new member
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Velocity</CardTitle>
              <Clock className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.velocity}</div>
              <p className="text-xs text-muted-foreground">
                points per sprint
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Work Trends</CardTitle>
              <CardDescription>
                Overview of work items completed over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleAreaChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Work Item Distribution</CardTitle>
              <CardDescription>
                Breakdown of work items by type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimplePieChart />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Work Items</CardTitle>
              <CardDescription>
                Latest updates and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentWorkItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.id} - {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Assigned to {item.assignee}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={item.status} />
                      <PriorityIndicator priority={item.priority} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Work Items
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </CardFooter>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Boards</CardTitle>
              <CardDescription>
                Recently updated project boards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentBoards.map((board) => (
                  <div key={board.name} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {board.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {board.items} items • Updated {board.updated}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Boards
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
