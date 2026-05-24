export interface IThemeConfig {
  id: string;
  name: string;
  bgClass: string;
  cardClass: string;
  textPrimary: string;
  textSecondary: string;
  accentClass: string;
  buttonClass: string;
  avatarRing: string;
  glowClass: string;
}

export const THEMES: Record<string, IThemeConfig> = {
  "glass-dark": {
    id: "glass-dark",
    name: "Glass Dark (Default)",
    bgClass:
      "bg-[#09090B] text-[#FAFAFA] min-h-screen relative overflow-hidden",
    cardClass: "bg-white/5 border border-white/10 backdrop-blur-2xl shadow-xl",
    textPrimary: "text-[#FAFAFA]",
    textSecondary: "text-[#B8BCD0]",
    accentClass:
      "bg-white/10 hover:bg-white/20 border border-white/15 text-white",
    buttonClass:
      "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-violet-500/20",
    avatarRing: "ring-2 ring-white/20",
    glowClass:
      "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none",
  },
  "midnight-violet": {
    id: "midnight-violet",
    name: "Midnight Violet",
    bgClass: "bg-[#0E0A1E] text-white min-h-screen relative overflow-hidden",
    cardClass:
      "bg-violet-950/20 border border-violet-500/20 backdrop-blur-2xl shadow-2xl shadow-violet-950/50",
    textPrimary: "text-white font-sans",
    textSecondary: "text-violet-200/70",
    accentClass:
      "bg-violet-900/30 hover:bg-violet-900/50 border border-violet-500/30 text-violet-200",
    buttonClass:
      "bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-violet-500/35",
    avatarRing: "ring-2 ring-violet-500/50",
    glowClass:
      "absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none",
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    bgClass:
      "bg-[#000] text-white min-h-screen relative overflow-hidden font-mono",
    cardClass:
      "bg-zinc-950/80 border border-yellow-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.05)]",
    textPrimary: "text-yellow-400 font-bold tracking-tight",
    textSecondary: "text-zinc-400",
    accentClass:
      "bg-zinc-900 hover:bg-zinc-800 border-2 border-pink-500 text-pink-500 font-mono",
    buttonClass:
      "bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold border-2 border-black tracking-wider transition-all transform hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_#EC4899]",
    avatarRing: "ring-4 ring-pink-500 ring-offset-2 ring-offset-black",
    glowClass:
      "absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none",
  },
  "sunset-glow": {
    id: "sunset-glow",
    name: "Sunset Glow",
    bgClass:
      "bg-gradient-to-br from-[#120808] via-[#1A0B09] to-[#24130F] text-[#FFF5F2] min-h-screen relative overflow-hidden",
    cardClass:
      "bg-orange-950/10 border border-orange-500/15 backdrop-blur-2xl shadow-xl",
    textPrimary: "text-[#FFE8E2] font-semibold",
    textSecondary: "text-orange-200/60",
    accentClass:
      "bg-orange-950/30 hover:bg-orange-950/50 border border-orange-500/25 text-orange-200",
    buttonClass:
      "bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-500/30",
    avatarRing: "ring-2 ring-orange-500/40",
    glowClass:
      "absolute top-[10%] left-[30%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none",
  },
  "forest-emerald": {
    id: "forest-emerald",
    name: "Forest Emerald",
    bgClass:
      "bg-gradient-to-b from-[#050B07] to-[#0A120E] text-[#F3FDF7] min-h-screen relative overflow-hidden",
    cardClass:
      "bg-emerald-950/10 border border-emerald-500/15 backdrop-blur-2xl shadow-xl",
    textPrimary: "text-[#E6F9EE]",
    textSecondary: "text-emerald-300/50",
    accentClass:
      "bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/20 text-emerald-200",
    buttonClass:
      "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20",
    avatarRing: "ring-2 ring-emerald-500/30",
    glowClass:
      "absolute bottom-[-10%] right-[10%] w-[55%] h-[55%] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none",
  },
};

export function getTheme(themeId: string): IThemeConfig {
  return THEMES[themeId] || THEMES["glass-dark"];
}
