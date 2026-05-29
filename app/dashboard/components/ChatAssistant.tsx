"use client";

import { cn } from "@/lib/utils";
import { Loader2, Send, X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { parseMarkdown } from "./parse-markdown";
import type { ChatMessage, LinkItem } from "./types";

interface ChatAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: ChatMessage[];
  chatInput: string;
  setChatInput: (v: string) => void;
  chatLoading: boolean;
  onSendMessage: (e?: React.FormEvent, directMessage?: string) => void;
  links: LinkItem[];
  profileNameVal: string;
  linkUrlVal: string;
}

export function ChatAssistant({
  isOpen,
  onToggle,
  messages,
  chatInput,
  setChatInput,
  chatLoading,
  onSendMessage,
  links,
  profileNameVal,
  linkUrlVal,
}: ChatAssistantProps) {
  const fireAnalyticsPrompt = () => {
    const totalC = links.reduce((acc, l) => acc + (l.clickCount || 0), 0);
    const linksSummary =
      links.length > 0
        ? links
            .map((l) => `"${l.title}" (${l.clickCount || 0} clicks)`)
            .join(", ")
        : "no links yet";
    const prompt = `Please analyse my full analytics and tell me exactly what I need to change to get more clicks. Here is my current data: I have ${links.length} active links with ${totalC} total clicks. My links: ${linksSummary}. Give me a full breakdown with your top 3 specific actions I should take right now.`;
    onSendMessage(undefined, prompt);
  };

  const fireFixLowClicksPrompt = () => {
    const zeroClicks = links.filter((l) => (l.clickCount || 0) === 0);
    const prompt =
      zeroClicks.length > 0
        ? `I have ${zeroClicks.length} links with zero clicks: ${zeroClicks.map((l) => `"${l.title}"`).join(", ")}. What should I rename them to and why?`
        : `Which of my links can I improve to get more clicks? Here are my links: ${links.map((l) => `"${l.title}" (${l.clickCount || 0} clicks)`).join(", ")}`;
    onSendMessage(undefined, prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-card/95 border border-border backdrop-blur-md rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-border bg-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center shrink-0">
                <Image
                  src="/chatbot.png"
                  alt="Trivio AI"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground leading-none">
                  Trivio AI Assistant
                </h3>
                <span className="text-[10px] text-muted-foreground">
                  Always active
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggle()}
              className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={index}
                  className={cn(
                    "flex w-full",
                    isUser ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed",
                      isUser
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted border border-border text-foreground rounded-tl-none",
                    )}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="space-y-0.5">
                        {parseMarkdown(msg.content)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {chatLoading && (
              <div className="flex w-full justify-start">
                <div className="bg-muted border border-border text-foreground rounded-2xl rounded-tl-none p-3 text-sm flex items-center gap-1.5 max-w-[80%]">
                  <Loader2 className="animate-spin" size={14} />
                  <span>Trivio AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 border-t border-border bg-muted/20 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
            <button
              type="button"
              onClick={fireAnalyticsPrompt}
              className="text-xs bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 hover:border-primary/40 transition shrink-0 cursor-pointer font-semibold whitespace-nowrap"
            >
              📊 Analyse Analytics
            </button>
            <button
              type="button"
              onClick={fireFixLowClicksPrompt}
              className="text-xs bg-background border border-border px-3 py-1.5 rounded-full hover:bg-muted hover:border-foreground/30 transition shrink-0 cursor-pointer text-foreground font-medium whitespace-nowrap"
            >
              🔗 Fix Low Clicks
            </button>
            <button
              type="button"
              onClick={() => {
                setChatInput(
                  `Suggest 3 optimized titles for the URL: ${linkUrlVal || "https://example.com"}`,
                );
              }}
              className="text-xs bg-background border border-border px-3 py-1.5 rounded-full hover:bg-muted hover:border-foreground/30 transition shrink-0 cursor-pointer text-foreground font-medium whitespace-nowrap"
            >
              🪄 Suggest Titles
            </button>
            <button
              type="button"
              onClick={() => {
                setChatInput(
                  `Suggest a custom bio. My name is ${profileNameVal || "Creator"}`,
                );
              }}
              className="text-xs bg-background border border-border px-3 py-1.5 rounded-full hover:bg-muted hover:border-foreground/30 transition shrink-0 cursor-pointer text-foreground font-medium whitespace-nowrap"
            >
              ✍️ Suggest Bio
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={onSendMessage}
            className="p-3 border-t border-border bg-background flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || chatLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-xl transition flex items-center justify-center shrink-0 disabled:opacity-50 cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Bubble Button */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "size-14 rounded-full bg-zinc-950/80 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white/10 backdrop-blur-md relative",
          isOpen && "rotate-90",
        )}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <div className="size-10 rounded-full overflow-hidden border border-white/10">
              <Image
                src="/chatbot.png"
                alt="Trivio AI"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
