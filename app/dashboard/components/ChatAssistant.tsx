"use client";

import {
  BarChart2,
  Link2,
  Loader2,
  Pencil,
  Send,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ParseMarkdown } from "./parse-markdown";
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
  // ── Auto-scroll to latest message ────────────────────────────────────────
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  // ── Quick-action prompt builders ─────────────────────────────────────────
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

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-screen w-full bg-background font-sans overflow-hidden">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-[18px] py-[14px] border-b border-border bg-muted/40 flex-shrink-0">
        <div className="flex items-center gap-[10px]">
          <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950 border border-border flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground leading-tight">
              Trivio AI
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-[11px] text-muted-foreground">
                Always active
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition cursor-pointer"
          aria-label="Close chat"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Messages ────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-[18px] py-5 flex flex-col gap-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={index}
              className={cn(
                "flex items-end gap-2",
                isUser ? "flex-row-reverse" : "flex-row",
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "w-[26px] h-[26px] rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-medium border border-border",
                  isUser
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {isUser ? "ME" : <Sparkles size={11} />}
              </div>

              {/* Bubble */}
              <div className="max-w-[72%]">
                <div
                  className={cn(
                    "px-[14px] py-[10px] text-[13.5px] leading-relaxed border break-words",
                    isUser
                      ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 rounded-2xl rounded-tr-[4px]"
                      : "bg-muted border-border text-foreground rounded-2xl rounded-tl-[4px]",
                  )}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="space-y-0.5">
                      <ParseMarkdown content={msg.content} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {chatLoading && (
          <div className="flex items-end gap-2">
            <div className="w-[26px] h-[26px] rounded-full flex-shrink-0 flex items-center justify-center bg-muted border border-border">
              <Sparkles size={11} className="text-muted-foreground" />
            </div>
            <div className="bg-muted border border-border rounded-2xl rounded-tl-[4px] px-[14px] py-[10px] flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                style={{ animationDuration: "1.2s", animationDelay: "0ms" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                style={{ animationDuration: "1.2s", animationDelay: "200ms" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                style={{ animationDuration: "1.2s", animationDelay: "400ms" }}
              />
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* ── Quick Action Chips ───────────────────────────────────────────────── */}
      <div className="px-[14px] py-[10px] border-t border-border bg-muted/40 flex gap-2 overflow-x-auto flex-shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={fireAnalyticsPrompt}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:opacity-80 transition cursor-pointer whitespace-nowrap"
        >
          <BarChart2 size={13} />
          Analyse analytics
        </button>
        <button
          type="button"
          onClick={fireFixLowClicksPrompt}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer whitespace-nowrap"
        >
          <Link2 size={13} />
          Fix low clicks
        </button>
        <button
          type="button"
          onClick={() =>
            setChatInput(
              `Suggest 3 optimized titles for the URL: ${linkUrlVal || "https://example.com"}`,
            )
          }
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer whitespace-nowrap"
        >
          <Wand2 size={13} />
          Suggest titles
        </button>
        <button
          type="button"
          onClick={() =>
            setChatInput(
              `Suggest a custom bio. My name is ${profileNameVal || "Creator"}`,
            )
          }
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer whitespace-nowrap"
        >
          <Pencil size={13} />
          Suggest bio
        </button>
      </div>

      {/* ── Input ────────────────────────────────────────────────────────────── */}
      <form
        onSubmit={onSendMessage}
        className="flex items-center gap-2 px-[14px] py-[10px] border-t border-border bg-background flex-shrink-0"
      >
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask me anything…"
          className="flex-1 min-w-0 bg-muted border border-border rounded-full px-4 py-2 text-[13.5px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-400 transition"
        />
        <button
          type="submit"
          disabled={!chatInput.trim() || chatLoading}
          className="w-[34px] h-[34px] flex-shrink-0 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          aria-label="Send message"
        >
          {chatLoading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Send size={15} />
          )}
        </button>
      </form>
    </div>
  );
}
