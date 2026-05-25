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

  // ── 3. LoFi Coffee ☕ ─────────────────────────────────────────────────────
  "lofi-coffee": {
    id: "lofi-coffee",
    name: "LoFi Coffee",
    emoji: "☕",
    bgClass:
      "bg-[#141b14] text-[#faf9f6] min-h-screen relative overflow-hidden",
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

  // ── 4. Ocean Depths 🌊 (theme-factory #1) ──────────────────────────────────
  "ocean-depths": {
    id: "ocean-depths",
    name: "深海 Ocean Depths",
    emoji: "🌊",
    bgClass:
      "bg-[#030712] text-[#f1faee] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-[#0077b6]/20 rounded-full blur-[170px] pointer-events-none, absolute bottom-[10%] right-[-10%] w-[55%] h-[55%] bg-[#00b4d8]/15 rounded-full blur-[150px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_20%_80%,rgba(0,180,216,0.14),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(0,119,182,0.14),transparent_55%)] opacity-70",
    cardClass:
      "bg-[#0c1f40]/45 border border-[#00e5ff]/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(3,7,18,0.5)]",
    textPrimary: "text-[#f1faee] font-extrabold tracking-tight",
    textSecondary: "text-[#a8dadc]/80",
    usernameClass: "text-[#00ffff]",
    sectionHeaderClass:
      "text-[#00ffff]/80 uppercase tracking-widest text-[10px] font-black",
    accentClass:
      "bg-[#0c1f40]/60 hover:bg-[#0c1f40]/80 border border-[#00e5ff]/18 text-[#f1faee] backdrop-blur-sm transition-all duration-300",
    accentBarClass: "bg-[#00e5ff]",
    buttonClass:
      "bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#0096c7] hover:to-[#00c2e8] text-white font-bold shadow-lg shadow-[#0077b6]/25 rounded-xl transition-all duration-300",
    priceClass: "text-[#00ffff] font-black text-lg",
    avatarRing: "ring-4 ring-offset-4 ring-[#00e5ff]/50 ring-offset-[#030712]",
  },

  // ── 5. Sunset Boulevard 🌇 (theme-factory #2) ──────────────────────────────
  "sunset-boulevard": {
    id: "sunset-boulevard",
    name: "夕焼 Sunset Boulevard",
    emoji: "🌇",
    bgClass:
      "bg-[#140b18] text-[#ffe5ec] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[-5%] left-[-10%] w-[65%] h-[60%] bg-[#ff007f]/15 rounded-full blur-[160px] pointer-events-none, absolute bottom-[25%] right-[-8%] w-[50%] h-[50%] bg-[#ff7e5f]/15 rounded-full blur-[140px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_10%_30%,rgba(255,0,127,0.12),transparent_50%),radial-gradient(circle_at_90%_70%,rgba(255,126,95,0.14),transparent_50%)] opacity-70",
    cardClass:
      "bg-[#25132d]/40 border border-[#ff7e5f]/25 backdrop-blur-2xl shadow-[0_20px_50px_rgba(20,11,24,0.55)]",
    textPrimary: "text-[#ffe5ec] font-black tracking-tight",
    textSecondary: "text-[#f0a6b7]/80",
    usernameClass: "text-[#ff7e5f]",
    sectionHeaderClass:
      "text-[#ff7e5f] uppercase tracking-[0.25em] text-[10px] font-black",
    accentClass:
      "bg-[#25132d]/60 hover:bg-[#25132d]/80 border border-[#ff7e5f]/18 text-[#ffe5ec] backdrop-blur-sm transition-all duration-300",
    accentBarClass: "bg-gradient-to-b from-[#ff007f] to-[#ff7e5f]",
    buttonClass:
      "bg-gradient-to-r from-[#ff007f] via-[#ff7e5f] to-[#feb47b] hover:brightness-110 text-white font-extrabold shadow-lg shadow-[#ff007f]/20 rounded-xl transition-all duration-300",
    priceClass: "text-[#ff7e5f] font-black text-lg",
    avatarRing: "ring-4 ring-offset-4 ring-[#ff7e5f]/60 ring-offset-[#140b18]",
  },

  // ── 6. Forest Canopy 🌲 (theme-factory #3) ──────────────────────────────────
  "forest-canopy": {
    id: "forest-canopy",
    name: "森 Forest Canopy",
    emoji: "🌲",
    bgClass:
      "bg-[#0c0f0c] text-[#e8f5e9] min-h-screen relative overflow-hidden",
    fontClass: "font-serif",
    glowClass:
      "absolute top-[10%] left-[-10%] w-[55%] h-[55%] bg-[#2d6a4f]/20 rounded-full blur-[150px] pointer-events-none, absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-[#52b788]/15 rounded-full blur-[140px] pointer-events-none",
    patternClass:
      "bg-[linear-gradient(135deg,rgba(82,183,136,0.08),transparent_50%),linear-gradient(315deg,rgba(45,106,79,0.1),transparent_50%)] opacity-70",
    cardClass:
      "bg-[#182018]/45 border border-[#52b788]/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(12,15,12,0.5)]",
    textPrimary: "text-[#e8f5e9] font-medium tracking-wide",
    textSecondary: "text-[#a3b18a]/80",
    usernameClass: "text-[#52b788]",
    sectionHeaderClass:
      "text-[#52b788] uppercase tracking-[0.2em] text-[10px] font-semibold font-sans",
    accentClass:
      "bg-[#182018]/65 hover:bg-[#182018]/85 border border-[#52b788]/18 text-[#e8f5e9] backdrop-blur-sm transition-all duration-300",
    accentBarClass: "bg-[#52b788]",
    buttonClass:
      "bg-gradient-to-r from-[#2d6a4f] to-[#52b788] hover:from-[#357e5d] hover:to-[#60c797] text-[#0c0f0c] font-bold shadow-lg shadow-[#2d6a4f]/20 rounded-xl transition-all duration-300 font-sans",
    priceClass: "text-[#52b788] font-bold text-lg font-sans",
    avatarRing: "ring-2 ring-offset-2 ring-[#52b788]/50 ring-offset-[#0c0f0c]",
  },

  // ── 7. Modern Minimalist 🔳 (theme-factory #4) ──────────────────────────────
  "modern-minimalist": {
    id: "modern-minimalist",
    name: "簡素 Modern Minimalist",
    emoji: "🔳",
    bgClass:
      "bg-[#08080a] text-[#f3f4f6] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#ffffff]/5 rounded-full blur-[140px] pointer-events-none",
    patternClass:
      "bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] opacity-80",
    cardClass:
      "bg-[#121216]/60 border border-white/10 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]",
    textPrimary: "text-white font-extrabold tracking-tight",
    textSecondary: "text-[#9ca3af]/80",
    usernameClass: "text-white",
    sectionHeaderClass:
      "text-white/60 uppercase tracking-[0.25em] text-[10px] font-bold",
    accentClass:
      "bg-[#121216]/80 hover:bg-[#1c1c22] border border-white/15 text-white backdrop-blur-sm transition-all duration-200",
    accentBarClass: "bg-white",
    buttonClass:
      "bg-white hover:bg-[#e5e7eb] text-black font-extrabold shadow-md rounded-lg transition-all duration-200",
    priceClass: "text-white font-extrabold text-lg",
    avatarRing: "ring-1 ring-white/30 ring-offset-4 ring-offset-[#08080a]",
  },

  // ── 8. Golden Hour 🌅 (theme-factory #5) ──────────────────────────────────
  "golden-hour": {
    id: "golden-hour",
    name: "黄金 Golden Hour",
    emoji: "🌅",
    bgClass:
      "bg-[#1a120c] text-[#fdf0d5] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[10%] left-[5%] w-[55%] h-[55%] bg-[#f4a900]/15 rounded-full blur-[160px] pointer-events-none, absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] bg-[#c1666b]/15 rounded-full blur-[130px] pointer-events-none",
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
      "bg-[#f4a900]/[0.08] hover:bg-[#f4a900]/[0.16] border border-[#f4a900]/[0.18] text-[#fdf0d5] backdrop-blur-sm",
    accentBarClass: "bg-[#f4a900]",
    buttonClass:
      "bg-gradient-to-r from-[#f4a900] to-[#c1666b] hover:from-[#ffb52e] hover:to-[#d2777b] text-[#4a403a] font-semibold shadow-lg shadow-[#f4a900]/20",
    priceClass: "text-[#f4a900] font-semibold",
    avatarRing: "ring-2 ring-[#f4a900]/60 ring-offset-2 ring-offset-[#1a120c]",
  },

  // ── 9. Arctic Frost ❄️ (theme-factory #6) ──────────────────────────────────
  "arctic-frost": {
    id: "arctic-frost",
    name: "極光 Arctic Frost",
    emoji: "❄️",
    bgClass:
      "bg-[#050b14] text-[#f1f5f9] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-[#3a86c8]/15 rounded-full blur-[160px] pointer-events-none, absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-[#90e0ef]/15 rounded-full blur-[140px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_70%_20%,rgba(144,224,239,0.12),transparent_50%),radial-gradient(circle_at_20%_80%,rgba(58,134,200,0.12),transparent_50%)] opacity-70",
    cardClass:
      "bg-white/[0.04] border border-white/10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(5,11,20,0.6)]",
    textPrimary: "text-white font-extrabold tracking-wide",
    textSecondary: "text-[#a5b4fc]/80",
    usernameClass: "text-[#90e0ef]",
    sectionHeaderClass:
      "text-[#90e0ef] uppercase tracking-[0.25em] text-[10px] font-bold",
    accentClass:
      "bg-white/[0.04] hover:bg-white/[0.10] border border-white/12 text-[#f1f5f9] backdrop-blur-sm transition-all duration-300",
    accentBarClass: "bg-[#90e0ef]",
    buttonClass:
      "bg-gradient-to-r from-[#00b4d8] to-[#90e0ef] hover:from-[#00c5eb] hover:to-[#a4ecfa] text-[#050b14] font-bold shadow-lg shadow-[#00b4d8]/20 rounded-xl transition-all duration-300",
    priceClass: "text-[#90e0ef] font-bold text-lg",
    avatarRing: "ring-4 ring-[#90e0ef]/40 ring-offset-4 ring-offset-[#050b14]",
  },

  // ── 10. Desert Rose 🥀 (theme-factory #7) ──────────────────────────────────
  "desert-rose": {
    id: "desert-rose",
    name: "砂 Desert Rose",
    emoji: "🥀",
    bgClass:
      "bg-[#180f10] text-[#f8edeb] min-h-screen relative overflow-hidden",
    fontClass: "font-serif",
    glowClass:
      "absolute top-[15%] right-[-10%] w-[55%] h-[55%] bg-[#d8b4a0]/15 rounded-full blur-[150px] pointer-events-none, absolute bottom-[10%] left-[-5%] w-[45%] h-[45%] bg-[#cd7f64]/12 rounded-full blur-[135px] pointer-events-none",
    patternClass:
      "bg-[linear-gradient(135deg,rgba(216,180,160,0.06),transparent_45%),linear-gradient(315deg,rgba(205,127,100,0.08),transparent_50%)] opacity-70",
    cardClass:
      "bg-[#2f1f21]/40 border border-[#d8b4a0]/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(24,15,16,0.5)]",
    textPrimary: "text-[#f8edeb] font-medium tracking-wide",
    textSecondary: "text-[#d8b4a0]/80",
    usernameClass: "text-[#cd7f64]",
    sectionHeaderClass:
      "text-[#d8b4a0] uppercase tracking-[0.2em] text-[10px] font-semibold font-sans",
    accentClass:
      "bg-[#2f1f21]/60 hover:bg-[#2f1f21]/80 border border-[#d8b4a0]/18 text-[#f8edeb] backdrop-blur-sm transition-all duration-300",
    accentBarClass: "bg-[#cd7f64]",
    buttonClass:
      "bg-gradient-to-r from-[#9a7b56] to-[#cd7f64] hover:from-[#ab8d66] hover:to-[#d78f75] text-[#180f10] font-bold shadow-lg shadow-[#9a7b56]/20 rounded-xl transition-all duration-300 font-sans",
    priceClass: "text-[#cd7f64] font-bold text-lg font-sans",
    avatarRing: "ring-2 ring-offset-2 ring-[#cd7f64]/50 ring-offset-[#180f10]",
  },

  // ── 11. Tech Innovation 🚀 (theme-factory #8) ──────────────────────────────
  "tech-innovation": {
    id: "tech-innovation",
    name: "革新 Tech Innovation",
    emoji: "🚀",
    bgClass:
      "bg-[#06080e] text-[#e2e8f0] min-h-screen relative overflow-hidden font-mono",
    fontClass: "font-mono",
    glowClass:
      "absolute top-[-10%] left-[-8%] w-[65%] h-[60%] bg-[#6366f1]/20 rounded-full blur-[170px] pointer-events-none, absolute bottom-[15%] right-[-10%] w-[55%] h-[55%] bg-[#06b6d4]/15 rounded-full blur-[150px] pointer-events-none",
    patternClass:
      "bg-[linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[length:32px_32px] opacity-80",
    cardClass:
      "bg-[#0f1422]/70 border border-[#6366f1]/30 backdrop-blur-xl shadow-[0_0_35px_rgba(99,102,241,0.2)]",
    textPrimary: "text-white font-black tracking-tight uppercase",
    textSecondary: "text-[#06b6d4]/80",
    usernameClass: "text-[#6366f1]",
    sectionHeaderClass:
      "text-[#06b6d4] uppercase tracking-[0.3em] text-[10px] font-black border-b border-[#06b6d4]/20 pb-0.5 w-fit",
    accentClass:
      "bg-[#0f1422]/85 hover:bg-[#171f34] border border-[#6366f1]/25 text-[#06b6d4] backdrop-blur-sm transition-all duration-200",
    accentBarClass: "bg-[#06b6d4]",
    buttonClass:
      "bg-gradient-to-r from-[#6366f1] to-[#06b6d4] hover:brightness-110 text-white font-extrabold uppercase tracking-wider text-[11px] rounded-none py-3 px-6 shadow-[3px_3px_0px_0px_#6366f1] transition-all",
    priceClass: "text-[#06b6d4] font-black text-lg",
    avatarRing: "ring-2 ring-[#06b6d4] ring-offset-4 ring-offset-[#06080e] border border-dashed border-[#6366f1]",
  },

  // ── 12. Botanical Garden 🌿 (theme-factory #9) ──────────────────────────────
  "botanical-garden": {
    id: "botanical-garden",
    name: "植物 Botanical Garden",
    emoji: "🌿",
    bgClass:
      "bg-[#050a08] text-[#f1f8f5] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[20%] right-[-10%] w-[55%] h-[55%] bg-[#40916c]/15 rounded-full blur-[150px] pointer-events-none, absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] bg-[#74c69d]/12 rounded-full blur-[130px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_20%_80%,rgba(116,198,157,0.12),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(64,145,108,0.15),transparent_55%)] opacity-70",
    cardClass:
      "bg-[#0c1713]/55 border border-[#74c69d]/25 backdrop-blur-2xl shadow-[0_20px_50px_rgba(5,10,8,0.5)]",
    textPrimary: "text-[#f1f8f5] font-semibold tracking-wide",
    textSecondary: "text-[#74c69d]/80",
    usernameClass: "text-[#74c69d]",
    sectionHeaderClass:
      "text-[#74c69d] uppercase tracking-[0.25em] text-[10px] font-extrabold",
    accentClass:
      "bg-[#0c1713]/70 hover:bg-[#0c1713]/90 border border-[#74c69d]/20 text-[#f1f8f5] backdrop-blur-sm transition-all duration-300",
    accentBarClass: "bg-[#74c69d]",
    buttonClass:
      "bg-gradient-to-r from-[#40916c] to-[#74c69d] hover:from-[#4ea37a] hover:to-[#85d1ad] text-[#050a08] font-bold shadow-lg shadow-[#40916c]/20 rounded-xl transition-all duration-300",
    priceClass: "text-[#74c69d] font-black text-lg",
    avatarRing: "ring-4 ring-[#74c69d]/40 ring-offset-4 ring-offset-[#050a08]",
  },

  // ── 13. Midnight Galaxy 🌌 (theme-factory #10) ──────────────────────────────
  "midnight-galaxy": {
    id: "midnight-galaxy",
    name: "銀河 Midnight Galaxy",
    emoji: "🌌",
    bgClass:
      "bg-[#020205] text-[#f8f9fa] min-h-screen relative overflow-hidden",
    fontClass: "font-sans",
    glowClass:
      "absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-[#6366f1]/18 rounded-full blur-[170px] pointer-events-none, absolute bottom-[-5%] right-[-10%] w-[55%] h-[55%] bg-[#d946ef]/15 rounded-full blur-[150px] pointer-events-none",
    patternClass:
      "bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(217,70,239,0.12),transparent_55%)] opacity-80",
    cardClass:
      "bg-[#090714]/65 border border-[#d946ef]/20 backdrop-blur-3xl shadow-[0_25px_60px_rgba(2,2,5,0.75)]",
    textPrimary: "text-[#f8f9fa] font-black tracking-wide",
    textSecondary: "text-[#c7d2fe]/80",
    usernameClass: "text-[#d946ef]",
    sectionHeaderClass:
      "text-[#d946ef] uppercase tracking-[0.25em] text-[10px] font-black",
    accentClass:
      "bg-[#090714]/80 hover:bg-[#110e24] border border-[#d946ef]/18 text-[#f8f9fa] backdrop-blur-sm transition-all duration-300",
    accentBarClass: "bg-gradient-to-b from-[#6366f1] to-[#d946ef]",
    buttonClass:
      "bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] hover:brightness-110 text-white font-extrabold shadow-lg shadow-[#6366f1]/25 rounded-xl transition-all duration-300",
    priceClass: "text-[#d946ef] font-black text-lg",
    avatarRing: "ring-4 ring-offset-4 ring-[#d946ef]/50 ring-offset-[#020205]",
  },
};

/** Returns the theme config for a given id, defaulting to glass-dark */
export function getTheme(themeId: string): IThemeConfig {
  return THEMES[themeId] ?? THEMES["glass-dark"];
}
