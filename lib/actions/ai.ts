"use server";

import { aiBioResponse, aiChatResponse, aiResponse } from "@/lib/ai/setup";
import { requireAuth } from "./helpers";

// ─── Link Title Suggestions ───────────────────────────────────────────────────

export async function generateSuggestionsAction(
  url: string,
  currentTitle: string,
) {
  if (!url) {
    return {
      success: false,
      error: "A destination URL is required to generate suggestions.",
    };
  }

  const prompt = `URL: ${url}\nCurrent Title: ${currentTitle || "None provided"}`;

  try {
    const data = await aiResponse(prompt);
    return { success: true, data };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate suggestions.";
    console.error("AI Suggestion Error:", error);
    return { success: false, error: message };
  }
}

// ─── Bio Suggestions ─────────────────────────────────────────────────────────

export async function generateBioSuggestionsAction(
  name: string,
  currentBio: string,
) {
  const prompt = `Name: ${name || "None provided"}\nCurrent Bio: ${currentBio || "None provided"}`;

  try {
    const data = await aiBioResponse(prompt);
    return { success: true, data };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate bio suggestions.";
    console.error("AI Bio Suggestion Error:", error);
    return { success: false, error: message };
  }
}

// ─── Chat Assistant ───────────────────────────────────────────────────────────

export async function sendChatMessageAction(
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
) {
  try {
    const session = await requireAuth();

    const reply = await aiChatResponse(messages, session.userId);
    return { success: true, reply };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get AI response. Please check your API key setup.";
    console.error("AI Chat Error:", error);
    return { success: false, error: message };
  }
}
