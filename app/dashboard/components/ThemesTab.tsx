"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemesTabProps {
  currentTheme: string | undefined;
  isPending: boolean;
  onSelectTheme: (themeId: string) => void;
}

export function ThemesTab({
  currentTheme,
  isPending,
  onSelectTheme,
}: ThemesTabProps) {
  return (
    <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 sm:p-8 rounded-xl shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-foreground">
          Pick a Profile Theme
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Choose the style that reflects your brand presence.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.values(THEMES).map((theme) => {
            const isActive = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onSelectTheme(theme.id)}
                disabled={isPending}
                className={cn(
                  "group rounded-2xl text-left border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-32 shadow-md",
                  isActive
                    ? "border-primary ring-2 ring-primary/50 shadow-primary/10 scale-[1.01]"
                    : "border-border bg-background/40 hover:border-foreground/30 hover:bg-background/60 hover:scale-[1.02]",
                )}
              >
                {/* Theme Background */}
                <div
                  className={cn(
                    "absolute inset-0 z-0 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105",
                    theme.bgClass
                      .replace("min-h-screen", "")
                      .replace("relative", "")
                      .replace("overflow-hidden", ""),
                  )}
                />
                {/* Pattern overlay */}
                <div
                  className={cn(
                    "absolute inset-0 z-0 opacity-40 select-none pointer-events-none",
                    theme.patternClass,
                  )}
                />
                {/* Glow overlay */}
                <div
                  className={cn(
                    "absolute inset-0 z-0 select-none pointer-events-none blur-xl opacity-60 scale-75",
                    theme.glowClass,
                  )}
                />

                {/* Inner content */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full p-5">
                  {/* Top: Name & checkmark */}
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col gap-1">
                      <span
                        className={cn(
                          "font-bold text-base tracking-wide transition-all group-hover:translate-x-0.5",
                          theme.textPrimary,
                          theme.fontClass,
                        )}
                      >
                        {theme.name}
                      </span>
                      <span
                        className={cn(
                          "text-[9px] uppercase font-mono tracking-wider opacity-60 bg-current bg-clip-text font-bold",
                          theme.textSecondary,
                        )}
                      >
                        Glassmorphic
                      </span>
                    </div>

                    {isActive ? (
                      <span className="size-6 bg-primary rounded-full flex items-center justify-center border-2 border-background shadow-md shrink-0">
                        <Check
                          size={12}
                          className="text-primary-foreground stroke-[3px]"
                        />
                      </span>
                    ) : (
                      <span className="size-6 rounded-full border border-white/20 bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0 flex items-center justify-center">
                        <span className="text-[9px] font-medium text-white/90">
                          Pick
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Bottom: Emoji */}
                  <div className="flex justify-between items-end w-full">
                    <span className="text-2xl select-none filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                      {theme.emoji}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
