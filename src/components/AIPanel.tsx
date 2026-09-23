"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIPanelProps {
  caseDetails: any;
  cluesFound: any[];
}

export default function AIPanel({ caseDetails, cluesFound }: AIPanelProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: "I am ShadowTrace AI. I have analyzed the initial briefing. How can I assist your investigation?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: queryText }]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: queryText }],
          caseDetails,
          cluesFound
        })
      });

      if (!response.body) throw new Error("No response stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      let done = false;
      let aiText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          aiText += chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].content = aiText;
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("AI interaction error:", error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "ShadowTrace Tactical Assist: Focus on IP 10.5.22.1 in the Server Access Logs and cross-reference with Evidence #2."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  const starterChips = [
    { label: "🎯 Mission Objective", query: "What is my primary mission objective for this case?" },
    { label: "🔍 Analyze Logs", query: "Analyze the Server Access Logs and highlight anomalies." },
    { label: "🌐 The Silent Hand", query: "What intel do we have on 'The Silent Hand'?" },
    { label: "💡 Tactical Hint", query: "Give me a hint on what evidence to inspect next." },
  ];

  return (
    <div className="flex flex-col h-full bg-surface/20">
      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[88%] p-3 rounded-lg text-sm leading-relaxed ${
              m.role === "user" 
                ? "bg-text text-background rounded-tr-none font-medium" 
                : "bg-background/90 border border-border/60 rounded-tl-none font-mono text-text/90 shadow-sm"
            }`}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex justify-start"
          >
            <div className="bg-background/90 border border-border/60 p-3 rounded-lg rounded-tl-none flex items-center gap-2 text-accent">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs uppercase tracking-widest font-mono">Analyzing intelligence...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompt Chips for Beginners */}
      <div className="px-4 py-2 border-t border-border/30 bg-background/40">
        <p className="text-[10px] uppercase font-mono tracking-widest text-text/40 mb-2">Tactical Queries</p>
        <div className="flex flex-wrap gap-1.5">
          {starterChips.map((chip, i) => (
            <button
              key={i}
              type="button"
              disabled={isTyping}
              onClick={() => sendQuery(chip.query)}
              className="text-[11px] font-mono px-2.5 py-1 rounded border border-border/50 hover:border-accent hover:text-accent bg-surface/50 text-text/70 transition-colors disabled:opacity-40 text-left"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-border/50 bg-background/70">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask ShadowTrace AI for analysis..."
            className="w-full bg-surface border border-border/60 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50 font-mono text-xs"
          />
          <button 
            type="submit" 
            disabled={isTyping || !input.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-accent/15 text-accent hover:bg-accent hover:text-background transition-colors disabled:opacity-40"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
