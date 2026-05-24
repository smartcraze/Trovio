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
 *    bg-<color>/[0.05..0.12]  (low-opacity tinted background)
 *    border border-<color>/[0.12..0.25]  (hairline border)
 *    shadow-xl  (depth)
 */

export interface IThemeConfig {
  id: string;
  name: string;
  emoji: string; // shown in dashboard picker

  // ── Page level ────────────────────────────────────────────────────────────
  bgClass: string; // root div — bg colour + default text + min-h-screen
  fontClass: string; // font-sans | font-serif | font-mono
  glowClass: string; // absolute decorative blob(s) — pointer-events-none
  patternClass: string; // subtle background texture overlay

  // ── Glass cards ───────────────────────────────────────────────────────────
  cardClass: string; // profile-header card, product card, etc.

  // ── Typography ────────────────────────────────────────────────────────────
  textPrimary: string; // name / h1
  textSecondary: string; // bio / supporting
  usernameClass: string; // @handle pill
  sectionHeaderClass: string; // "Handpicked Links" label

  // ── Link cards ────────────────────────────────────────────────────────────
  accentClass: string; // link card bg + border + text
  accentBarClass: string; // left 3-px accent bar colour

  // ── Products ──────────────────────────────────────────────────────────────
  buttonClass: string; // "Buy Now" CTA
  priceClass: string; // price text

  // ── Avatar ────────────────────────────────────────────────────────────────
  avatarRing: string; // ring-* classes around the avatar image
}

export const THEMES: Record<string, IThemeConfig> = {
  // ── 1. Obsidian Glass (default) ───────────────────────────────────────────
  "glass-dark": {
    id: "glass-dark",
    name: "Obsidian Glass",
    emoji: "🪨",
    bgClass:
      "bg-[#0f0b16] text-[#e6e6fa] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#4a4e8f]/25 rounded-full blur-[170px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_20%_20%,rgba(164,144,194,0.14),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(74,78,143,0.2),transparent_50%),radial-gradient(circle_at_30%_80%,rgba(230,230,250,0.08),transparent_60%)] opacity-70",
    cardClass:
      "bg-white/[0.05] border border-white/[0.10] backdrop-blur-2xl shadow-2xl shadow-black/45",
    textPrimary: "text-[#e6e6fa] font-semibold",
    textSecondary: "text-[#a490c2]/70",
    usernameClass: "text-[#a490c2]",
    sectionHeaderClass:
      "text-[#a490c2]/70 uppercase tracking-widest text-xs font-medium",
    accentClass:
      "bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.12] text-[#e6e6fa] backdrop-blur-sm",
    accentBarClass: "bg-[#a490c2]",
    buttonClass:
      "bg-gradient-to-r from-[#4a4e8f] to-[#a490c2] hover:from-[#5c61a6] hover:to-[#b2a2cf] text-[#e6e6fa] font-semibold shadow-lg shadow-[#4a4e8f]/25",
    priceClass: "text-[#a490c2]",
    avatarRing: "ring-2 ring-white/20 ring-offset-2 ring-offset-[#0f0b16]",
  },

  // ── 2. Japan Minimal 🌸 ───────────────────────────────────────────────────
  "japan-minimal": {
    id: "japan-minimal",
    name: "桜 Japan Minimal",
    emoji: "🌸",
    bgClass:
      "bg-[#120c12] text-[#e8d5c4] min-h-screen relative overflow-hidden",
    fontClass: "font-serif",
    glowClass:
      "absolute top-[8%] right-[-8%] w-[55%] h-[60%] bg-[#d4a5a5]/[0.12] rounded-full blur-[170px] pointer-events-none",
    patternClass:
      "bg-[linear-gradient(135deg,rgba(232,213,196,0.08),transparent_45%),linear-gradient(315deg,rgba(212,165,165,0.08),transparent_50%)] opacity-70",
    cardClass:
      "bg-[#5d2e46]/15 border border-[#d4a5a5]/20 backdrop-blur-2xl shadow-2xl shadow-[#5d2e46]/30",
    textPrimary: "text-[#f5e7dd] font-light tracking-wide",
    textSecondary: "text-[#d4a5a5]/70",
    usernameClass: "text-[#d4a5a5]",
    sectionHeaderClass:
      "text-[#d4a5a5]/70 uppercase tracking-[0.2em] text-[10px] font-light",
    accentClass:
      "bg-[#d4a5a5]/[0.10] hover:bg-[#d4a5a5]/[0.18] border border-[#d4a5a5]/[0.18] text-[#f5e7dd] backdrop-blur-sm",
    accentBarClass: "bg-[#d4a5a5]",
    buttonClass:
      "bg-gradient-to-r from-[#d4a5a5] to-[#b87d6d] hover:from-[#e0b3b3] hover:to-[#c7907e] text-[#3a1f2b] font-medium shadow-lg shadow-[#d4a5a5]/20",
    priceClass: "text-[#d4a5a5]",
    avatarRing: "ring-1 ring-[#d4a5a5]/50 ring-offset-2 ring-offset-[#120c12]",
  },

  // ── 3. Anime Sakura 🎌 ────────────────────────────────────────────────────
  "anime-sakura": {
    id: "anime-sakura",
    name: "アニメ Anime Sakura",
    emoji: "🎌",
    bgClass:
      "bg-[#1a1b28] text-white min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[-5%] left-[-8%] w-[70%] h-[55%] bg-[#e76f51]/[0.18] rounded-full blur-[150px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_20%_0%,rgba(244,162,97,0.18),transparent_50%),radial-gradient(circle_at_90%_30%,rgba(231,111,81,0.2),transparent_45%)] opacity-70",
    cardClass:
      "bg-[#264653]/40 border border-[#f4a261]/30 backdrop-blur-xl shadow-2xl shadow-[#264653]/40",
    textPrimary: "text-white font-black tracking-tight",
    textSecondary: "text-[#e9c46a]/70",
    usernameClass: "text-[#f4a261]",
    sectionHeaderClass:
      "text-[#f4a261]/70 uppercase tracking-widest text-xs font-bold",
    accentClass:
      "bg-[#264653]/50 hover:bg-[#264653]/70 border border-[#f4a261]/25 text-white backdrop-blur-sm",
    accentBarClass: "bg-[#e76f51]",
    buttonClass:
      "bg-gradient-to-r from-[#e76f51] to-[#f4a261] hover:from-[#f08a6e] hover:to-[#f6b178] text-[#1a1b28] font-bold shadow-lg shadow-[#e76f51]/25",
    priceClass: "text-[#f4a261] font-bold",
    avatarRing: "ring-2 ring-[#f4a261]/70 ring-offset-4 ring-offset-[#1a1b28]",
  },

  // ── 4. Cyberpunk ⚡ ───────────────────────────────────────────────────────
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    emoji: "⚡",
    bgClass:
      "bg-[#12151c] text-white min-h-screen relative overflow-hidden font-mono",
    fontClass: "font-mono",
    glowClass:
      "absolute bottom-[-10%] left-[10%] w-[45%] h-[45%] bg-[#0066ff]/20 rounded-full blur-[120px] pointer-events-none",
    patternClass:
      "bg-[linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(0,102,255,0.06)_1px,transparent_1px)] bg-[length:26px_26px] opacity-45",
    cardClass:
      "bg-[#1e1e1e]/80 border border-[#0066ff]/30 backdrop-blur-md shadow-[0_0_30px_rgba(0,102,255,0.2)]",
    textPrimary: "text-white font-bold tracking-tight",
    textSecondary: "text-[#00ffff]/70",
    usernameClass: "text-[#00ffff]",
    sectionHeaderClass:
      "text-[#00ffff]/70 uppercase tracking-widest text-xs font-bold font-mono",
    accentClass:
      "bg-[#1e1e1e]/90 hover:bg-[#272727] border border-[#00ffff]/30 text-[#00ffff] backdrop-blur-sm",
    accentBarClass: "bg-[#0066ff]",
    buttonClass:
      "bg-[#0066ff] hover:bg-[#1a75ff] text-white font-extrabold border border-[#00ffff]/40 tracking-wider shadow-[0_0_20px_rgba(0,255,255,0.25)]",
    priceClass: "text-[#00ffff] font-bold",
    avatarRing: "ring-3 ring-[#00ffff]/70 ring-offset-2 ring-offset-[#12151c]",
  },

  // ── 5. Golden Hour 🌅 ───────────────────────────────────────────────────
  "golden-hour": {
    id: "golden-hour",
    name: "Golden Hour",
    emoji: "🌅",
    bgClass:
      "bg-[#1C140E] text-[#F6E6CC] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[8%] left-[5%] w-[55%] h-[55%] bg-[#f4a900]/[0.12] rounded-full blur-[160px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_20%_20%,rgba(244,169,0,0.12),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(193,102,107,0.16),transparent_55%),linear-gradient(135deg,rgba(212,184,150,0.08),transparent_50%)] opacity-70",
    cardClass:
      "bg-[#d4b896]/[0.10] border border-[#d4b896]/[0.20] backdrop-blur-2xl shadow-2xl shadow-[#4a403a]/35",
    textPrimary: "text-[#f4a900] font-semibold tracking-tight",
    textSecondary: "text-[#d4b896]/60",
    usernameClass: "text-[#c1666b]",
    sectionHeaderClass:
      "text-[#d4b896]/60 uppercase tracking-[0.3em] text-[10px] font-medium",
    accentClass:
      "bg-[#f4a900]/[0.08] hover:bg-[#f4a900]/[0.16] border border-[#f4a900]/[0.18] text-[#F6E6CC] backdrop-blur-sm",
    accentBarClass: "bg-[#f4a900]",
    buttonClass:
      "bg-gradient-to-r from-[#f4a900] to-[#c1666b] hover:from-[#ffb52e] hover:to-[#d2777b] text-[#4a403a] font-semibold shadow-lg shadow-[#f4a900]/20",
    priceClass: "text-[#f4a900] font-semibold",
    avatarRing: "ring-2 ring-[#f4a900]/60 ring-offset-2 ring-offset-[#1C140E]",
  },

  // ── 6. LoFi Coffee ☕ ─────────────────────────────────────────────────────
  "lofi-coffee": {
    id: "lofi-coffee",
    name: "LoFi Coffee",
    emoji: "☕",
    bgClass: "bg-[#141b14] text-[#faf9f6] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[20%] right-[0%] w-[50%] h-[50%] bg-[#7d8471]/20 rounded-full blur-[150px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_20%_80%,rgba(164,172,134,0.12),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(45,74,43,0.25),transparent_55%)] opacity-60",
    cardClass:
      "bg-[#2d4a2b]/20 border border-[#7d8471]/30 backdrop-blur-2xl shadow-2xl shadow-[#2d4a2b]/30",
    textPrimary: "text-[#faf9f6] font-semibold",
    textSecondary: "text-[#a4ac86]/70",
    usernameClass: "text-[#a4ac86]",
    sectionHeaderClass:
      "text-[#a4ac86]/70 uppercase tracking-widest text-[10px] font-medium",
    accentClass:
      "bg-[#2d4a2b]/25 hover:bg-[#2d4a2b]/35 border border-[#7d8471]/30 text-[#faf9f6] backdrop-blur-sm",
    accentBarClass: "bg-[#7d8471]",
    buttonClass:
      "bg-gradient-to-r from-[#4a7c59] to-[#a4ac86] hover:from-[#5c8e6b] hover:to-[#b3bb95] text-[#0d1a10] font-semibold shadow-lg shadow-[#4a7c59]/20",
    priceClass: "text-[#a4ac86]",
    avatarRing: "ring-2 ring-[#7d8471]/50 ring-offset-2 ring-offset-[#141b14]",
  },

  // ── 7. Neon Ocean 🌊 ──────────────────────────────────────────────────────
  "neon-ocean": {
    id: "neon-ocean",
    name: "Neon Ocean",
    emoji: "🌊",
    bgClass: "bg-[#0e1722] text-[#f1faee] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute bottom-[-10%] left-[15%] w-[60%] h-[60%] bg-[#2d8b8b]/25 rounded-full blur-[160px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_20%_70%,rgba(45,139,139,0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(168,218,220,0.18),transparent_55%)] opacity-70",
    cardClass:
      "bg-[#1a2332]/70 border border-[#2d8b8b]/30 backdrop-blur-2xl shadow-2xl shadow-[#1a2332]/40",
    textPrimary: "text-[#f1faee] font-semibold",
    textSecondary: "text-[#a8dadc]/70",
    usernameClass: "text-[#a8dadc]",
    sectionHeaderClass:
      "text-[#a8dadc]/70 uppercase tracking-widest text-xs font-medium",
    accentClass:
      "bg-[#1a2332]/80 hover:bg-[#1a2332] border border-[#2d8b8b]/35 text-[#f1faee] backdrop-blur-sm",
    accentBarClass: "bg-[#2d8b8b]",
    buttonClass:
      "bg-gradient-to-r from-[#2d8b8b] to-[#a8dadc] hover:from-[#3aa0a0] hover:to-[#b9e4e6] text-[#0e1722] font-semibold shadow-lg shadow-[#2d8b8b]/20",
    priceClass: "text-[#a8dadc]",
    avatarRing: "ring-2 ring-[#2d8b8b]/60 ring-offset-2 ring-offset-[#0e1722]",
  },
};

/** Returns the theme config for a given id, defaulting to glass-dark */
export function getTheme(themeId: string): IThemeConfig {
  return THEMES[themeId] ?? THEMES["glass-dark"];
}
