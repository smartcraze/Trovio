/**
 * lib/ai/tools.ts
 *
 * Dashboard tool definitions for the Trivio AI Assistant.
 *
 * Each tool wraps a DB read so the AI can autonomously fetch live data instead
 * of relying on a manually-built system-prompt snapshot. Call
 * `createDashboardTools(userId)` to get a tools object scoped to the
 * authenticated user, then pass it straight to `generateText({ tools })`.
 *
 * Available tools
 * ───────────────
 *  getProfile        — display name, username, bio, theme, avatar
 *  getLinks          — all links with click counts and deep-link flag
 *  getAnalytics      — aggregated stats: totals, avg, top performer,
 *                      zero-click list, per-link traffic share %
 *  getProducts       — shop products with price / description / checkout URL
 *  getSocialChannels — connected platform → URL pairs
 */

import { tool } from "ai";
import { z } from "zod";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import { ChangeTheme } from "../actions/theme";
import { listThemes } from "../themes";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RawLink {
  id: string;
  title: string;
  url: string;
  clickCount?: number;
  isDeepLink?: boolean;
}

interface RawProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  purchaseUrl: string;
  imageUrl?: string;
}

// ─── Factory ─────────────────────────────────────────────────────────────────

/**
 * Creates all dashboard tools scoped to a single authenticated user.
 * Pass the returned object directly to `generateText({ tools })`.
 */
export function createDashboardTools(userId: string) {
  // Shared helper — fetches the user once per tool call
  const getUser = async () => {
    await dbConnect();
    const user = await User.findById(userId).lean<{
      name: string;
      username: string;
      bio?: string;
      avatarUrl?: string;
      theme?: string;
      links: RawLink[];
      products: RawProduct[];
      socials?: Record<string, string>;
    }>();
    if (!user) throw new Error("User not found");
    return user;
  };

  return {
    // ── 1. Profile ────────────────────────────────────────────────────────
    getProfile: tool({
      description:
        "Fetch the authenticated user's profile: display name, username, " +
        "bio, active theme, and avatar URL. Call this when the user asks " +
        "about their profile, name, or bio.",
      inputSchema: z.object({}),
      execute: async () => {
        const user = await getUser();
        return {
          name: user.name,
          username: user.username,
          bio: user.bio || "(no bio set)",
          theme: user.theme || "default",
          avatarUrl: user.avatarUrl || null,
        };
      },
    }),

    // ── 2. Links ──────────────────────────────────────────────────────────
    getLinks: tool({
      description:
        "Fetch all of the user's bio links including their title, " +
        "destination URL, click count, and whether deep-linking is enabled. " +
        "Use this when the user asks what links they have or wants link details.",
      inputSchema: z.object({}),
      execute: async () => {
        const user = await getUser();
        return {
          total: user.links.length,
          links: user.links.map((l) => ({
            id: l.id,
            title: l.title,
            url: l.url,
            clickCount: l.clickCount ?? 0,
            isDeepLink: l.isDeepLink ?? false,
          })),
        };
      },
    }),

    // ── 3. Analytics ──────────────────────────────────────────────────────
    getAnalytics: tool({
      description:
        "Fetch comprehensive analytics for the user's bio link page: " +
        "total clicks, average clicks per link, top-performing link, " +
        "zero-click underperformers, and each link's traffic share percentage. " +
        "Always call this when the user asks to analyse their analytics, " +
        "improve CTR, or understand their performance data.",
      inputSchema: z.object({}),
      execute: async () => {
        const user = await getUser();
        const links = user.links ?? [];

        const totalClicks = links.reduce(
          (acc, l) => acc + (l.clickCount ?? 0),
          0,
        );

        const sorted = [...links].sort(
          (a, b) => (b.clickCount ?? 0) - (a.clickCount ?? 0),
        );

        const topPerformer =
          sorted.length > 0 && (sorted[0].clickCount ?? 0) > 0
            ? {
                title: sorted[0].title,
                url: sorted[0].url,
                clicks: sorted[0].clickCount ?? 0,
              }
            : null;

        const zeroClickLinks = links
          .filter((l) => (l.clickCount ?? 0) === 0)
          .map((l) => ({ title: l.title, url: l.url }));

        const linksBreakdown = sorted.map((l) => ({
          title: l.title,
          url: l.url,
          clicks: l.clickCount ?? 0,
          trafficSharePct:
            totalClicks > 0
              ? Math.round(((l.clickCount ?? 0) / totalClicks) * 100)
              : 0,
          isDeepLink: l.isDeepLink ?? false,
        }));

        return {
          totalLinks: links.length,
          totalClicks,
          avgClicksPerLink:
            links.length > 0
              ? Number((totalClicks / links.length).toFixed(1))
              : 0,
          topPerformer,
          zeroClickCount: zeroClickLinks.length,
          zeroClickLinks,
          linksBreakdown,
        };
      },
    }),

    // ── 4. Products ───────────────────────────────────────────────────────
    getProducts: tool({
      description:
        "Fetch all of the user's shop products: title, price (USD), " +
        "description, checkout URL, and optional cover image. " +
        "Users can list a maximum of 3 products. " +
        "Call this when the user asks about their products or shop.",
      inputSchema: z.object({}),
      execute: async () => {
        const user = await getUser();
        return {
          slotsUsed: user.products.length,
          slotsAvailable: 3 - user.products.length,
          products: user.products.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            description: p.description,
            purchaseUrl: p.purchaseUrl,
            imageUrl: p.imageUrl ?? null,
          })),
        };
      },
    }),

    // ── 5. Social Channels ────────────────────────────────────────────────
    getSocialChannels: tool({
      description:
        "Fetch all connected social media channels for the user " +
        "(Instagram, Twitter/X, YouTube, Spotify, GitHub, TikTok, Website). " +
        "Call this when the user asks about their social links or audience reach.",
      inputSchema: z.object({}),
      execute: async () => {
        const user = await getUser();
        const socials = user.socials ?? {};
        const connected = Object.entries(socials).filter(
          ([, url]) => url && url.trim() !== "",
        );
        return {
          totalConnected: connected.length,
          channels: connected.map(([platform, url]) => ({ platform, url })),
          unconnected: [
            "instagram",
            "twitter",
            "youtube",
            "spotify",
            "github",
            "tiktok",
            "website",
          ].filter((p) => !connected.find(([k]) => k === p)),
        };
      },
    }),

    ListThemes: tool({
      description:
        "List all available themes for the user to choose from. Call this when the user wants to see the available themes.",
      inputSchema: z.object({}),
      execute: async () => {
        return {
          themes: listThemes(),
        };
      },
    }),

    changeTheme: tool({
      description:
        "Change the user's active theme. Call this when the user wants to change their theme.",
      inputSchema: z.object({
        username: z.string(),
        theme: z.string(),
      }),
      execute: async ({ username, theme }) => {
        const themeChanged = await ChangeTheme(username, theme);
        if (!themeChanged) {
          return {
            success: false,
            error: "Failed to change theme. Please try again.",
          };
        }
        return {
          success: true,
          message: `Theme changed successfully to ${theme}.`,
        };
      },
    }),
  };
}

export type DashboardTools = ReturnType<typeof createDashboardTools>;
