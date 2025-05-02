import Link from "next/link";
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
  const data = getStaticDashboardData();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      {/* Header Section */}
      <DashboardHeader
        heading="Welcome to AionTime"
        text="Your AI-powered project management assistant"
      />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardDescription>Active Projects</CardDescription>
            <CardTitle className="text-2xl">{data.activeProjects}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-1 bg-primary/10">
              <div className="h-full w-2/3 bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardDescription>Total Work Items</CardDescription>
            <CardTitle className="text-2xl">{data.totalWorkItems}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-1 bg-indigo-100 dark:bg-indigo-900/30">
              <div className="h-full w-3/4 bg-indigo-600 dark:bg-indigo-400"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardDescription>Completion Rate</CardDescription>
            <CardTitle className="text-2xl">{data.completion}%</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-1 bg-green-100 dark:bg-green-900/30">
              <div 
                className="h-full bg-green-600 dark:bg-green-400"
                style={{ width: `${data.completion}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardDescription>Team Velocity</CardDescription>
            <CardTitle className="text-2xl">{data.velocity} pts/wk</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-1 bg-blue-100 dark:bg-blue-900/30">
              <div className="h-full w-4/5 bg-blue-600 dark:bg-blue-400"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Work Trend</CardTitle>
              <BarChart3 className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <SimpleAreaChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Work Item Distribution</CardTitle>
              <Icons.pieChart className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <SimplePieChart />
          </CardContent>
        </Card>
      </div>

      {/* Work Items and Boards Section */}
      <Tabs defaultValue="work-items" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="work-items" className="text-xs sm:text-sm">Recent Work Items</TabsTrigger>
            <TabsTrigger value="boards" className="text-xs sm:text-sm">Project Boards</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="work-items" className="space-y-4">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between border-b p-4">
              <div className="text-sm font-medium">Active Work Items</div>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                View All
              </Button>
            </div>
            <div className="divide-y">
              {data.recentWorkItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-xs text-muted-foreground">{item.id}</div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">{item.assignee}</div>
                    <PriorityIndicator priority={item.priority} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="boards" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.recentBoards.map((board, index) => (
              <Card key={index} className="group overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{board.name}</CardTitle>
                  <CardDescription className="text-xs">
                    Updated {board.updated}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="text-sm">{board.items} items</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-full justify-start pl-0 text-xs group-hover:text-primary"
                  >
                    <span>View Board</span>
                    <ArrowRight className="ml-1 size-3.5 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:opacity-100" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Feature Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* AI Agent Card */}
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">AI Agent</CardTitle>
              <div className="flex size-12 items-center justify-center">
                <BrainCircuit className="size-10 text-primary/80" />
              </div>
            </div>
            <CardDescription className="text-base">
              Let AI help you manage and automate your workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            <p className="text-muted-foreground">
              Intelligent automation for task management, sprint planning, and work allocation.
            </p>
            <Link href="#" className="block">
              <Button className="group relative w-full overflow-hidden py-5 text-base transition-all hover:shadow-md">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Try AI Agent
                  <BrainCircuit className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Boards Card */}
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/5 via-primary/5 to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Project Boards</CardTitle>
              <div className="flex size-12 items-center justify-center">
                <KanbanSquare className="size-10 text-primary/80" />
              </div>
            </div>
            <CardDescription className="text-base">
              Visualize your workflow with customizable project boards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            <p className="text-muted-foreground">
              Create, customize and manage boards for effective project tracking and team collaboration.
            </p>
            <Link href="#" className="block">
              <Button className="group relative w-full overflow-hidden py-5 text-base transition-all hover:shadow-md">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Boards
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Team Members */}
        <Card className="group overflow-hidden transition-all hover:bg-muted/50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex -space-x-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`flex size-8 items-center justify-center rounded-full ${
                    ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500'][i]
                  } text-white text-xs font-medium`}
                >
                  {['AK', 'JD', 'ML', 'SP', 'RB'][i]}
                </div>
              ))}
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
                +{data.teamMembers - 5}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
              View Team
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card className="group overflow-hidden transition-all hover:bg-muted/50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Alex K.</span> completed task AZ-145
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Maria L.</span> updated the sprint plan
              </p>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
              View Activity
            </Button>
          </CardFooter>
        </Card>

        {/* Pending Reviews */}
        <Card className="group overflow-hidden transition-all hover:bg-muted/50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Icons.filePenLine className="size-4 text-primary" />
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex justify-between">
              <span className="text-2xl font-medium">{data.pendingReviews}</span>
              <span className="text-xs text-muted-foreground">items need review</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
              Start Reviewing
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
