"use server";

import { aiBioResponse, aiChatResponse, aiResponse } from "@/lib/ai/setup";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import { requireAuth } from "./helpers";

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
  } catch (error: any) {
    console.error("AI Suggestion Error:", error);
    return {
      success: false,
      error:
        error.message ||
        "Failed to generate suggestions. Please check your API key setup.",
    };
  }
}

export async function generateBioSuggestionsAction(
  name: string,
  currentBio: string,
) {
  const prompt = `Name: ${name || "None provided"}\nCurrent Bio: ${currentBio || "None provided"}`;

  try {
    const data = await aiBioResponse(prompt);
    return { success: true, data };
  } catch (error: any) {
    console.error("AI Bio Suggestion Error:", error);
    return {
      success: false,
      error:
        error.message ||
        "Failed to generate bio suggestions. Please check your API key setup.",
    };
  }
}

export async function sendChatMessageAction(
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
) {
  try {
    const session = await requireAuth();
    await dbConnect();
    const user = await User.findById(session.userId);

    const reply = await aiChatResponse(messages, user);
    return { success: true, reply };
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return {
      success: false,
      error:
        error.message ||
        "Failed to get AI response. Please check your API key setup.",
    };
  }
}
