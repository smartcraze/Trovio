import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { z } from "zod";

const FREE_MODEL = "openrouter/free";

function getModel() {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  return openrouter.chat(FREE_MODEL);
}

// ─── LINK OPTIMIZATION ──────────────────────────────────────────────────────

const LINK_SYSTEM_PROMPT = `You are an expert copywriter and conversions optimizer for bio link websites (like Linktree or Trivio).
Your task is to analyze a link (its URL and current title) and generate three optimized button title options to maximize click-through rate (CTR).

Requirements:
- Each button title MUST be under 50 characters.
- Keep them engaging, clear, and relevant to the destination.
- Generate three distinct styles of title suggestions:
  1. professional (A clean, polished refinement of the current title)
  2. descriptive (A title summarizing what the user will find)
  3. action-oriented (A verb-driven call-to-action that drives clicks)`;

const LinkSuggestionSchema = z.object({
  suggestions: z
    .array(
      z.object({
        id: z
          .string()
          .describe(
            "Unique identifier for the option, e.g. 'option-1', 'option-2', 'option-3'",
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
    output: Output.object({
      schema: LinkSuggestionSchema,
    }),
    prompt: prompt,
  });
  console.log("AI Response:", output);
  return output;
}

// ─── BIO OPTIMIZATION ───────────────────────────────────────────────────────

const BIO_SYSTEM_PROMPT = `You are an expert copywriter and social media bio optimizer.
Your task is to analyze a user's profile details (display name, current bio) and generate three optimized bio/description options to maximize audience engagement and click-through rates.

Requirements:
- Each bio suggestion MUST be under 160 characters.
- Keep them engaging, clear, and relevant.
- Generate three distinct styles of bio suggestions:
  1. professional (Clear, professional, and authority-building)
  2. creative (Catchy, unique, and personality-driven)
  3. action-oriented (Clear value proposition leading into a call to action)`;

const BioSuggestionSchema = z.object({
  suggestions: z
    .array(
      z.object({
        id: z
          .string()
          .describe(
            "Unique identifier for the option, e.g. 'option-1', 'option-2', 'option-3'",
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
    output: Output.object({
      schema: BioSuggestionSchema,
    }),
    prompt: prompt,
  });
  console.log("AI Bio Response:", output);
  return output;
}

// ─── CHAT ASSISTANT ─────────────────────────────────────────────────────────

const CHAT_SYSTEM_PROMPT = `You are "Trivio AI Assistant", a premium conversions & analytics coach for bio link pages (like Linktree / Trivio).
Your goal is to help creators understand their analytics and take concrete actions to improve click-through rates, engagement, and revenue.

Guidelines:
- Always be data-driven. Reference actual numbers from the user's analytics when giving advice.
- Keep responses conversational, concise, and actionable. Use bullet points and clear headers.
- When analysing analytics, identify: top performers, zero-click underperformers, traffic distribution imbalances, and quick-win improvements.
- If suggesting link titles, ensure they are under 50 characters.
- If suggesting bios, ensure they are under 160 characters.
- When asked to analyse analytics, structure your response with: 📊 Summary → 🏆 Top Performer → ⚠️ Needs Attention → 💡 Recommendations.
- Always end analytics analysis with 2-3 specific, immediately actionable steps the creator can take right now.`;

export async function aiChatResponse(
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  user?: any,
) {
  let systemPrompt = CHAT_SYSTEM_PROMPT;

  if (user) {
    const totalLinks = user.links ? user.links.length : 0;
    const totalClicks = user.links
      ? user.links.reduce((acc: number, l: any) => acc + (l.clickCount || 0), 0)
      : 0;

    // Sort links by click count descending
    const sortedLinks = user.links
      ? [...user.links].sort(
          (a: any, b: any) => (b.clickCount || 0) - (a.clickCount || 0),
        )
      : [];

    const topPerformer =
      sortedLinks.length > 0 && (sortedLinks[0].clickCount || 0) > 0
        ? sortedLinks[0]
        : null;

    const zeroClickLinks = sortedLinks.filter(
      (l: any) => (l.clickCount || 0) === 0,
    );

    const avgClicksPerLink =
      totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : "0";

    const linksInfo =
      sortedLinks.length > 0
        ? sortedLinks
            .map((l: any) => {
              const clicks = l.clickCount || 0;
              const share =
                totalClicks > 0 ? Math.round((clicks / totalClicks) * 100) : 0;
              return `- "${l.title}" → ${clicks} clicks (${share}% of total traffic) | URL: ${l.url}${l.isDeepLink ? " [Deep Link Enabled]" : ""}`;
            })
            .join("\n")
        : "No links added yet.";

    const productsInfo =
      user.products && user.products.length > 0
        ? user.products
            .map(
              (p: any) =>
                `- "${p.title}" priced at $${p.price}: "${p.description}" → checkout: ${p.purchaseUrl}`,
            )
            .join("\n")
        : "No products added yet.";

    const socialsInfo =
      user.socials && Object.keys(user.socials).length > 0
        ? Object.entries(user.socials)
            .filter(([, v]) => v)
            .map(([platform, url]) => `- ${platform}: ${url}`)
            .join("\n")
        : "No social channels linked.";

    systemPrompt += `

═══════════════════════════════════════════════
FULL ANALYTICS & PROFILE SNAPSHOT
═══════════════════════════════════════════════

👤 PROFILE
- Display Name: ${user.name || "N/A"}
- Username: @${user.username || "N/A"}
- Current Bio: "${user.bio || "(empty — no bio set)"}"
- Active Theme: ${user.theme || "default"}

📊 ANALYTICS SUMMARY
- Total Active Links: ${totalLinks}
- Total Clicks (all time): ${totalClicks}
- Average Clicks Per Link: ${avgClicksPerLink}
- Top Performer: ${topPerformer ? `"${topPerformer.title}" with ${topPerformer.clickCount} clicks` : "No clicks recorded yet"}
- Zero-Click Links (${zeroClickLinks.length}): ${zeroClickLinks.length > 0 ? zeroClickLinks.map((l: any) => `"${l.title}"`).join(", ") : "None — great job!"}

🔗 LINK PERFORMANCE (sorted by clicks, highest first)
${linksInfo}

🛍️ PRODUCTS (${user.products ? user.products.length : 0}/3 slots used)
${productsInfo}

🌐 SOCIAL CHANNELS
${socialsInfo}

═══════════════════════════════════════════════

USE THIS DATA to give highly personalized, specific, data-driven recommendations. Always reference actual link titles, click counts, traffic percentages, and product names. Identify patterns, flag underperformers, celebrate top performers, and suggest concrete improvements the creator can implement immediately.`;
  }

  const { text } = await generateText({
    system: systemPrompt,
    model: getModel(),
    messages: messages,
  });
  return text;
}

export type LinkSuggestions = z.infer<typeof LinkSuggestionSchema>;
export type BioSuggestions = z.infer<typeof BioSuggestionSchema>;
