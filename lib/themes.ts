/**
 * themes.ts — Trivio profile theme system
 *
 * ADDING A NEW THEME:
 *  1. Add an entry to THEMES with a unique string id
 *  2. Ensure all IThemeConfig fields are filled
 *  3. Add the id to the dashboard theme picker (DashboardClient.tsx)
 *  4. Run `bun run build` to verify no type errors
 *
 * GLASS RECIPE (used by all themes):
 *  cardClass should always include:
 *    backdrop-blur-xl  (or 2xl for deeper glass)
 *    bg-*/[0.05..0.12]  (low-opacity tinted background)
 *    border border-*/[0.12..0.25]  (hairline border)
 *    shadow-xl  (depth)
 */

export interface IThemeConfig {
  id: string;
  name: string;
  emoji: string;           // shown in dashboard picker

  // ── Page level ────────────────────────────────────────────────────────────
  bgClass: string;         // root div — bg colour + default text + min-h-screen
  fontClass: string;       // font-sans | font-serif | font-mono
  glowClass: string;       // absolute decorative blob(s) — pointer-events-none

  // ── Glass cards ───────────────────────────────────────────────────────────
  cardClass: string;       // profile-header card, product card, etc.

  // ── Typography ────────────────────────────────────────────────────────────
  textPrimary: string;     // name / h1
  textSecondary: string;   // bio / supporting
  usernameClass: string;   // @handle pill
  sectionHeaderClass: string; // "Handpicked Links" label

  // ── Link cards ────────────────────────────────────────────────────────────
  accentClass: string;     // link card bg + border + text
  accentBarClass: string;  // left 3-px accent bar colour

  // ── Products ──────────────────────────────────────────────────────────────
  buttonClass: string;     // "Buy Now" CTA
  priceClass: string;      // price text

  // ── Avatar ────────────────────────────────────────────────────────────────
  avatarRing: string;      // ring-* classes around the avatar image
}

export const THEMES: Record<string, IThemeConfig> = {
  // ── 1. Obsidian Glass (default) ───────────────────────────────────────────
  "glass-dark": {
    id: "glass-dark",
    name: "Obsidian Glass",
    emoji: "🪨",
    bgClass: "bg-[#09090B] text-white min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none",
    cardClass:
      "bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl shadow-2xl shadow-black/40",
    textPrimary: "text-white font-semibold",
    textSecondary: "text-zinc-400",
    usernameClass: "text-violet-400",
    sectionHeaderClass: "text-zinc-500 uppercase tracking-widest text-xs font-medium",
    accentClass:
      "bg-white/[0.05] hover:bg-white/[0.10] border border-white/[0.10] text-white backdrop-blur-sm",
    accentBarClass: "bg-violet-500",
    buttonClass:
      "bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-violet-500/20",
    priceClass: "text-emerald-400",
    avatarRing: "ring-2 ring-white/20 ring-offset-2 ring-offset-[#09090B]",
  },

  // ── 2. Japan Minimal 🌸 ───────────────────────────────────────────────────
  "japan-minimal": {
    id: "japan-minimal",
    name: "桜 Japan Minimal",
    emoji: "🌸",
    bgClass:
      "bg-[#0C0A0D] text-white min-h-screen relative overflow-hidden",
    fontClass: "font-serif",
    glowClass:
      "absolute top-[5%] right-[-5%] w-[50%] h-[60%] bg-rose-400/[0.07] rounded-full blur-[160px] pointer-events-none",
    cardClass:
      "bg-rose-50/[0.04] border border-rose-300/[0.14] backdrop-blur-2xl shadow-2xl shadow-rose-900/20",
    textPrimary: "text-rose-50 font-light tracking-wide",
    textSecondary: "text-rose-200/50",
    usernameClass: "text-rose-300/80",
    sectionHeaderClass:
      "text-rose-300/50 uppercase tracking-[0.2em] text-[10px] font-light",
    accentClass:
      "bg-rose-400/[0.07] hover:bg-rose-400/[0.13] border border-rose-300/[0.15] text-rose-100 backdrop-blur-sm",
    accentBarClass: "bg-rose-400",
    buttonClass:
      "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium shadow-lg shadow-rose-500/20",
    priceClass: "text-rose-300",
    avatarRing: "ring-1 ring-rose-300/40 ring-offset-2 ring-offset-[#0C0A0D]",
  },

  // ── 3. Anime Sakura 🎌 ────────────────────────────────────────────────────
  "anime-sakura": {
    id: "anime-sakura",
    name: "アニメ Anime Sakura",
    emoji: "🎌",
    bgClass:
      "bg-[#0D0A2E] text-white min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[0%] left-[-5%] w-[70%] h-[50%] bg-pink-500/[0.12] rounded-full blur-[120px] pointer-events-none",
    cardClass:
      "bg-pink-500/[0.06] border-2 border-pink-400/[0.25] backdrop-blur-xl shadow-2xl shadow-pink-900/30",
    textPrimary: "text-white font-black tracking-tight",
    textSecondary: "text-pink-200/60",
    usernameClass: "text-pink-400",
    sectionHeaderClass:
      "text-pink-400/60 uppercase tracking-widest text-xs font-bold",
    accentClass:
      "bg-gradient-to-r from-pink-500/10 to-violet-500/10 hover:from-pink-500/20 hover:to-violet-500/20 border border-pink-400/20 text-white backdrop-blur-sm",
    accentBarClass: "bg-gradient-to-b from-pink-400 to-violet-500",
    buttonClass:
      "bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold shadow-lg shadow-pink-500/30",
    priceClass: "text-pink-300 font-bold",
    avatarRing:
      "ring-2 ring-pink-400/60 ring-offset-4 ring-offset-[#0D0A2E]",
  },

  // ── 4. Cyberpunk ⚡ ───────────────────────────────────────────────────────
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    emoji: "⚡",
    bgClass:
      "bg-[#000] text-white min-h-screen relative overflow-hidden font-mono",
    fontClass: "font-mono",
    glowClass:
      "absolute bottom-[-10%] left-[10%] w-[45%] h-[45%] bg-yellow-400/[0.07] rounded-full blur-[100px] pointer-events-none",
    cardClass:
      "bg-zinc-950/80 border border-yellow-400/20 backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.06)]",
    textPrimary: "text-yellow-400 font-bold tracking-tight",
    textSecondary: "text-zinc-500",
    usernameClass: "text-pink-500",
    sectionHeaderClass:
      "text-yellow-400/50 uppercase tracking-widest text-xs font-bold font-mono",
    accentClass:
      "bg-zinc-900/80 hover:bg-zinc-800 border-2 border-pink-500/40 hover:border-pink-500/70 text-pink-400 backdrop-blur-sm",
    accentBarClass: "bg-yellow-400",
    buttonClass:
      "bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold border-2 border-black tracking-wider shadow-[4px_4px_0px_#EC4899]",
    priceClass: "text-yellow-400 font-bold",
    avatarRing: "ring-4 ring-pink-500 ring-offset-2 ring-offset-black",
  },

  // ── 5. LoFi Coffee ☕ ─────────────────────────────────────────────────────
  "lofi-coffee": {
    id: "lofi-coffee",
    name: "LoFi Coffee",
    emoji: "☕",
    bgClass:
      "bg-[#110D08] text-amber-50 min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[20%] right-[0%] w-[50%] h-[50%] bg-amber-600/[0.08] rounded-full blur-[150px] pointer-events-none",
    cardClass:
      "bg-amber-900/[0.12] border border-amber-700/[0.20] backdrop-blur-2xl shadow-2xl shadow-amber-900/20",
    textPrimary: "text-amber-50 font-semibold",
    textSecondary: "text-amber-300/50",
    usernameClass: "text-amber-400/80",
    sectionHeaderClass:
      "text-amber-500/50 uppercase tracking-widest text-[10px] font-medium",
    accentClass:
      "bg-amber-800/[0.12] hover:bg-amber-700/[0.20] border border-amber-600/[0.20] text-amber-100 backdrop-blur-sm",
    accentBarClass: "bg-amber-500",
    buttonClass:
      "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-amber-600/20",
    priceClass: "text-amber-400",
    avatarRing: "ring-2 ring-amber-500/30 ring-offset-2 ring-offset-[#110D08]",
  },

  // ── 6. Neon Ocean 🌊 ──────────────────────────────────────────────────────
  "neon-ocean": {
    id: "neon-ocean",
    name: "Neon Ocean",
    emoji: "🌊",
    bgClass:
      "bg-[#020B18] text-cyan-50 min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute bottom-[-5%] left-[20%] w-[60%] h-[60%] bg-cyan-500/[0.08] rounded-full blur-[150px] pointer-events-none",
    cardClass:
      "bg-cyan-950/[0.15] border border-cyan-500/[0.18] backdrop-blur-2xl shadow-2xl shadow-cyan-900/20",
    textPrimary: "text-cyan-50 font-semibold",
    textSecondary: "text-cyan-300/50",
    usernameClass: "text-cyan-400",
    sectionHeaderClass:
      "text-cyan-400/50 uppercase tracking-widest text-xs font-medium",
    accentClass:
      "bg-cyan-500/[0.07] hover:bg-cyan-400/[0.13] border border-cyan-400/[0.18] text-cyan-100 backdrop-blur-sm",
    accentBarClass: "bg-cyan-400",
    buttonClass:
      "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-cyan-500/20",
    priceClass: "text-cyan-300",
    avatarRing: "ring-2 ring-cyan-400/30 ring-offset-2 ring-offset-[#020B18]",
  },
};

/** Returns the theme config for a given id, defaulting to glass-dark */
export function getTheme(themeId: string): IThemeConfig {
  return THEMES[themeId] ?? THEMES["glass-dark"];
}
