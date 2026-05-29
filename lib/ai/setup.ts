/**
 * lib/ai/setup.ts
 *
 * Core AI configuration for Trivio.
 *
 * Three capabilities exported:
 *  aiResponse(prompt)               — structured link title suggestions (3 options)
 *  aiBioResponse(prompt)            — structured bio suggestions (3 options)
 *  aiChatResponse(messages, userId) — conversational agent with autonomous tool calling
 *
 * The chat function uses ToolLoopAgent so the model can call tools over
 * multiple reasoning steps instead of receiving a hand-crafted data dump in
 * the system prompt. It fetches exactly what it needs, when it needs it.
 */

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output, stepCountIs, ToolLoopAgent } from "ai";
import { z } from "zod";
import { createDashboardTools } from "./tools";

// ─── Model factory ────────────────────────────────────────────────────────────

const FREE_MODEL = "openrouter/free";

function getModel() {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  return openrouter.chat(FREE_MODEL);
}

// ─── Link Title Suggestions ───────────────────────────────────────────────────

const LINK_SYSTEM_PROMPT = `You are an expert copywriter and conversions optimizer for bio link websites (like Linktree or Trivio).
Your task is to analyze a link (its URL and current title) and generate three optimized button title options to maximize click-through rate (CTR).

Requirements:
- Each button title MUST be under 50 characters.
- Keep them engaging, clear, and relevant to the destination.
- Generate three distinct styles of title suggestions:
  1. professional    — a clean, polished refinement of the current title
  2. descriptive     — a title summarizing what the user will find
  3. action-oriented — a verb-driven call-to-action that drives clicks`;

const LinkSuggestionSchema = z.object({
  suggestions: z
    .array(
      z.object({
        id: z
          .string()
          .describe(
            "Unique identifier, e.g. 'option-1', 'option-2', 'option-3'",
          ),
        title: z
          .string()
          .max(50)
          .describe("Optimized button title, max 50 characters"),
        type: z
          .enum(["professional", "descriptive", "action-oriented"])
          .describe("The copywriting style used for this option"),
      }),
    )
    .length(3),
  recommendedOptionId: z.string().describe("The id of the recommended option"),
});

export async function aiResponse(prompt: string) {
  const { output } = await generateText({
    system: LINK_SYSTEM_PROMPT,
    model: getModel(),
    output: Output.object({ schema: LinkSuggestionSchema }),
    prompt,
  });
  return output;
}

// ─── Bio Suggestions ──────────────────────────────────────────────────────────

const BIO_SYSTEM_PROMPT = `You are an expert copywriter and social media bio optimizer.
Your task is to analyze a user's profile details and generate three optimized bio options to maximize engagement and click-through rates.

Requirements:
- Each bio MUST be under 160 characters.
- Keep them engaging, clear, and relevant.
- Generate three distinct styles:
  1. professional    — clear, authority-building, and polished
  2. creative        — catchy, unique, and personality-driven
  3. action-oriented — clear value proposition with a call to action`;

const BioSuggestionSchema = z.object({
  suggestions: z
    .array(
      z.object({
        id: z
          .string()
          .describe(
            "Unique identifier, e.g. 'option-1', 'option-2', 'option-3'",
          ),
        bio: z
          .string()
          .max(160)
          .describe("Optimized profile bio, max 160 characters"),
        type: z
          .enum(["professional", "creative", "action-oriented"])
          .describe("The style used for this bio suggestion"),
      }),
    )
    .length(3),
  recommendedOptionId: z.string().describe("The id of the recommended option"),
});

export async function aiBioResponse(prompt: string) {
  const { output } = await generateText({
    system: BIO_SYSTEM_PROMPT,
    model: getModel(),
    output: Output.object({ schema: BioSuggestionSchema }),
    prompt,
  });
  return output;
}

// ─── Chat Assistant ───────────────────────────────────────────────────────────
const CHAT_INSTRUCTIONS = `You are "Trivio AI Assistant" — a premium conversions and analytics coach for bio link pages, similar to Linktree.

Your mission is to help creators understand their data and take concrete, data-driven actions to grow clicks, engagement, and revenue.

You have access to the following tools and must use them whenever live data is needed. Never guess, estimate, or fabricate analytics or profile information.

Available Tools:

1. getProfile
   Returns:
* Display name
* Username
* Bio
* Active theme
* Avatar URL

2. getLinks
   Returns:

* All bio links
* Link title
* URL
* Click count
* Deep-link enabled status

3. getAnalytics
   Returns:

* Total clicks
* Average clicks
* Top-performing links
* Zero-click links
* Traffic share percentages
* Full analytics breakdown

4. getProducts
   Returns:

* Product name
* Price
* Description
* Checkout URL
* Remaining inventory or slots

5. getSocialChannels
   Returns:
* Connected social platforms
* Social profile URLs
* 

6 . ListThemes
    Returns:
* Available themes

7 . ChangeTheme
    Input: username themeId
* Theme name (from ListThemes)
    Returns:
* Updated active theme

Important Rules:

* Always call the relevant tool before answering any question that depends on real user data.
* Never make up numbers or analytics.
* Reference actual titles, click counts, percentages, and performance metrics from tool responses.
* Keep responses concise, friendly, insightful, and action-oriented.
* Focus on helping creators improve conversions, engagement, clicks, and revenue.

Analytics Response Format:
📊 Summary
🏆 Top Performer
⚠️ Needs Attention
💡 Recommendations

Writing Style:

* Use markdown formatting in responses.
* Use bullet points for clarity.
* Highlight important metrics using bold text.
* Keep link title suggestions under 50 characters.
* Keep bio suggestions under 160 characters.
* End every analytics-related response with 2 to 3 actionable next steps the creator can implement immediately.`;

/**
 * Run the chat assistant with tool calling over multiple reasoning steps.
 * The agent decides which tools to call based on the user's message — no
 * manual data injection needed.
 */
export async function aiChatResponse(
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>,
  userId: string,
) {
  const tools = createDashboardTools(userId);

  const agent = new ToolLoopAgent({
    model: getModel(),
    instructions: CHAT_INSTRUCTIONS,
    tools,
    stopWhen: stepCountIs(10),
  });

  const result = await agent.generate({ messages });
  return await result.text;
}

export type LinkSuggestions = z.infer<typeof LinkSuggestionSchema>;
export type BioSuggestions = z.infer<typeof BioSuggestionSchema>;
