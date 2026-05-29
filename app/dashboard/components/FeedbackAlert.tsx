"use client";

import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import type { FeedbackState } from "./types";

interface FeedbackAlertProps {
  feedback: FeedbackState | null;
}

export function FeedbackAlert({ feedback }: FeedbackAlertProps) {
  if (!feedback) return null;

  return (
    <div
      className={cn(
        "mb-6 p-4 rounded-xl border flex items-center gap-2 text-sm transition animate-in fade-in slide-in-from-top-4 duration-300",
        feedback.type === "success"
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          : "bg-destructive/10 border-destructive/20 text-destructive",
      )}
    >
      <AlertCircle size={16} />
      {feedback.message}
    </div>
  );
}
