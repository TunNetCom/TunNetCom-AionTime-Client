"use client";

import { useState } from "react";
import { Plus, Clock, Calendar, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_CONFIG } from "@/config/api";

export function QuickActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Ready");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newChatHistory = [...chatHistory, { role: "user", content: query }];
    setChatHistory(newChatHistory);
    setQuery("");
    setStatus("Sending request...");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.chat}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ query, history: newChatHistory }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let currentAIContent = "";

      while (true) {
        const { value, done } = await reader?.read()!;
        if (done) break;

        const chunk = decoder.decode(value);
        currentAIContent += chunk;

        setChatHistory((prev) => {
          const updatedHistory = [...prev];
          updatedHistory[updatedHistory.length - 1] = {
            role: "ai",
            content: currentAIContent,
          };
          return updatedHistory;
        });
      }

      setStatus("Ready");
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add new</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add new item</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Clock className="h-4 w-4" />
                <span className="sr-only">Time tracking</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Time tracking</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Calendar className="h-4 w-4" />
                <span className="sr-only">Calendar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Calendar</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <FileText className="h-4 w-4" />
                <span className="sr-only">Reports</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reports</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Chat with AI</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>AionTime Agent Chat</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto border rounded-md p-4 space-y-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100 ml-12"
                    : "bg-gray-100 mr-12"
                }`}
              >
                <strong className="block mb-1">
                  {msg.role.toUpperCase()}:
                </strong>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query..."
              className="flex-1 px-3 py-2 border rounded-md"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>

          <div className="text-sm text-gray-500 text-center mt-2">
            {status}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 