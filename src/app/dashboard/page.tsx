"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DashboardProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DashboardPage({ searchParams }: DashboardProps) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Search Section */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-10 w-full max-w-md"
        />
      </div>

      {/* New Component Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Your New Component</h2>
        {/* Add your new component content here */}
      </div>
    </div>
  );
} 