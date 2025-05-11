import React, { useState, useRef, useEffect } from "react";

const AiAgentConv: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Ready");
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const escapeHtml = (unsafe: string) => {
    if (!unsafe) return "";
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const renderHistory = () => {
    return chatHistory.map((msg, index) => {
      const contentHTML = escapeHtml(msg.content || "")
        .replace(/```(.*?)```/gs, `<pre><code>${"$1".trim()}</code></pre>`)
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");

      return (
        <div
          key={index}
          className={`message ${msg.role}`}
          dangerouslySetInnerHTML={{
            __html: `<strong>${msg.role.toUpperCase()}:</strong><br>${contentHTML}`,
          }}
        />
      );
    });
  };

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newChatHistory = [...chatHistory, { role: "user", content: query }];
    setChatHistory(newChatHistory);
    setQuery("");
    setStatus("Sending request...");
    setIsLoading(true);

    // Simulate API call
    try {
      const response = await fetch("/api/chat", {
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

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 80px)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        AionTime Agent Chat
      </h1>
      <div
        id="chat-history"
        ref={chatHistoryRef}
        style={{
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #eee",
          padding: "15px",
          borderRadius: "4px",
          marginBottom: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {renderHistory()}
      </div>
      <form
        id="chat-form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          marginTop: "auto",
          paddingTop: "20px",
          borderTop: "1px solid #eee",
        }}
      >
        <input
          type="text"
          id="query-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          required
          style={{
            flexGrow: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px 0 0 4px",
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            border: "1px solid #007bff",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
      <div
        id="status-area"
        className="status"
        aria-live="polite"
        style={{
          textAlign: "center",
          marginTop: "10px",
          color: isLoading ? "#888" : "red",
          fontStyle: "italic",
        }}
      >
        {status}
      </div>
    </div>
  );
};

export default AiAgentConv;