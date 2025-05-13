"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, ArrowDown, User } from "lucide-react";
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

export function QuickActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Ready");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError(null);
    const newChatHistory = [...chatHistory, { role: "user", content: query }];
    setChatHistory(newChatHistory);
    setQuery("");
    setStatus("Sending request...");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ 
          query: query, 
          history: newChatHistory.filter(msg => 
            (msg.role === 'user' || msg.role === 'ai') && msg.content
          )
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Server error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Stream not supported by your browser");
      }

      const decoder = new TextDecoder();
      let currentAIContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // Process Server-Sent Events (SSE) manually
        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const jsonData = line.substring(5).trim();
            if (jsonData) {
              try {
                const data = JSON.parse(jsonData);
                switch (data.type) {
                  case 'ai_response_chunk':
                    currentAIContent += data.content;
                    setChatHistory((prev) => {
                      const updatedHistory = [...prev];
                      updatedHistory[updatedHistory.length - 1] = {
                        role: "ai",
                        content: currentAIContent,
                      };
                      return updatedHistory;
                    });
                    break;
                  case 'tool_call':
                    setChatHistory((prev) => [
                      ...prev,
                      {
                        role: "tool_call",
                        content: `Calling ${data.tool_name}...`,
                        tool_name: data.tool_name,
                        tool_args: data.tool_args,
                      },
                    ]);
                    break;
                  case 'tool_result':
                    setChatHistory((prev) => [
                      ...prev,
                      {
                        role: "tool_result",
                        content: data.content,
                        tool_call_id: data.tool_call_id,
                      },
                    ]);
                    // Prepare for next AI response
                    currentAIContent = "";
                    setChatHistory((prev) => [
                      ...prev,
                      { role: "ai", content: "" },
                    ]);
                    break;
                  case 'error':
                    throw new Error(data.detail || "Stream error occurred");
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e, "Data:", jsonData);
              }
            }
          }
        }
      }

      setStatus("Ready");
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "Failed to connect to the server";
      
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Unable to connect to the server. Please check your internet connection and ensure the server is running.";
        } else if (error.message.includes("Stream not supported")) {
          errorMessage = "Your browser doesn't support streaming responses. Please try a different browser.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      setStatus("Error occurred");
      
      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          content: `I'm having trouble connecting to the server. ${errorMessage}`,
        },
      ]);
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
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10"
                onClick={() => setIsChatOpen(true)}
              >
                <Bot className="h-5 w-5" />
                <span className="sr-only">AI Agent</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Chat with AI Agent</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-2xl h-[90vh] p-0">
          <DialogHeader className="px-6 py-3 border-b">
            <DialogTitle>AionTime AI Agent</DialogTitle>
          </DialogHeader>
          
          <div 
            ref={chatContainerRef}
            className="h-[calc(90vh-140px)] overflow-y-auto bg-gradient-to-b from-background to-muted/20"
            onScroll={handleScroll}
          >
            <div className="p-6 space-y-6">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl shadow-sm transition-all duration-200 ${
                      msg.role === "user"
                        ? "bg-gray-100 mr-12 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                        : msg.role === "tool_call"
                        ? "bg-gray-100 text-gray-600 text-center mx-12 dark:bg-gray-800 dark:text-gray-300"
                        : msg.role === "tool_result"
                        ? "bg-gray-50 border border-gray-200 mx-12 dark:bg-gray-800/50 dark:border-gray-700"
                        : "bg-gray-100 mr-12 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    }`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${
                      msg.role === "user" 
                        ? "text-indigo-500 dark:text-indigo-400" 
                        : msg.role === "tool_call"
                        ? "text-purple-500 dark:text-purple-400"
                        : msg.role === "tool_result"
                        ? "text-green-500 dark:text-green-400"
                        : "text-indigo-500 dark:text-indigo-400"
                    }`}>
                      {msg.role === "user" ? (
                        <span className="text-sm font-medium flex items-center gap-1">
                          <User className="h-4 w-4" /> You
                        </span>
                      ) : msg.role === "tool_call" ? (
                        <span className="text-sm font-medium">🛠️ Tool Call</span>
                      ) : msg.role === "tool_result" ? (
                        <span className="text-sm font-medium">📊 Result</span>
                      ) : (
                        <span className="text-sm font-medium">🤖 AI Agent</span>
                      )}
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap break-words">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {showScrollButton && (
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-24 right-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-background/80 backdrop-blur-sm"
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          )}

          <div className="border-t p-4 bg-background/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your AI agent anything..."
                className="flex-1 px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background/50"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="px-6 rounded-xl"
              >
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </form>

            <div className="text-sm text-center mt-2">
              {error ? (
                <span className="text-destructive">{error}</span>
              ) : (
                <span className="text-muted-foreground">{status}</span>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}