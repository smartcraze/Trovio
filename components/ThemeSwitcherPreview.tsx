"use client";

import {
  ExternalLink,
  Globe,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { InstagramIcon, TwitterIcon } from "@/components/icons";
import { getTheme, THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

export default function ThemeSwitcherPreview() {
  const [activeThemeId, setActiveThemeId] = useState("glass-dark");
  const theme = getTheme(activeThemeId);

  const previewUser = {
    name: "Elena Rostova",
    username: "creative_mind",
    bio: "Digital Artist & Creative Director. Creating visual stories that blend surrealism and warm futuristic aesthetics.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    links: [
      { id: "1", title: "My Creative Portfolio", url: "#", isDeepLink: false },
      { id: "2", title: "Follow my Behance", url: "#", isDeepLink: true },
    ],
    products: [
      {
        id: "p1",
        title: "Surreal Color Grading LUTs",
        price: 29,
        description:
          "Transform your photos with my custom Lightroom and Premiere LUTs.",
      },
    ],
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
      {/* Theme selection buttons (left side) */}
      <div className="lg:col-span-4 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles size={12} /> Interactive Preview
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Express your identity
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Trivio is fully customizable. Click below to preview how different
          themes instantly transform your profile page.
        </p>

        <div className="flex flex-wrap lg:flex-col gap-2 pt-2">
          {Object.values(THEMES).map((t) => {
            const isActive = activeThemeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveThemeId(t.id)}
                className={cn(
                  "px-4 py-2.5 rounded-full text-xs font-semibold border transition text-left flex items-center justify-between gap-3 w-fit lg:w-full",
                  isActive
                    ? "bg-card text-foreground border-primary shadow-md shadow-primary/5"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-card/50",
                )}
              >
                <span>{t.name}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mockup Frame (right side) */}
      <div className="lg:col-span-8 flex justify-center">
        <div className="relative w-full max-w-[340px] aspect-[9/18] rounded-[48px] border-[8px] border-zinc-800 bg-[#09090B] shadow-2xl overflow-hidden ring-4 ring-zinc-800/35">
          {/* Speaker / Camera Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-[20px] z-50 flex items-center justify-center">
            <div className="w-12 h-1 bg-black rounded-full mb-1" />
          </div>

          {/* Render Mockup Profile Screen */}
          <div
            className={cn(
              "w-full h-full p-4 pt-12 overflow-y-auto scrollbar-none transition-all duration-500 select-none",
              theme.bgClass,
            )}
          >
            <div className={theme.glowClass} />

            <div className="relative z-10 space-y-6">
              {/* Profile card */}
              <div
                className={cn(
                  "p-4 rounded-[24px] text-center flex flex-col items-center",
                  theme.cardClass,
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-full overflow-hidden mb-3",
                    theme.avatarRing,
                  )}
                >
                  <img
                    src={previewUser.avatarUrl}
                    alt={previewUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4
                  className={cn(
                    "text-base font-bold tracking-tight",
                    theme.textPrimary,
                  )}
                >
                  {previewUser.name}
                </h4>
                <p className="text-[10px] opacity-75 text-violet-400">
                  @{previewUser.username}
                </p>
                <p
                  className={cn(
                    "text-[11px] leading-relaxed mt-2 max-w-xs",
                    theme.textSecondary,
                  )}
                >
                  {previewUser.bio}
                </p>

                {/* Social icons */}
                <div className="flex gap-4 mt-3 pt-3 border-t border-white/5 w-full justify-center opacity-80">
                  <InstagramIcon size={14} />
                  <TwitterIcon size={14} />
                  <Globe size={14} />
                </div>
              </div>

              {/* Products Showcase */}
              <div className="space-y-2">
                <div className="text-[9px] font-bold tracking-wider uppercase opacity-60 flex items-center gap-1">
                  <ShoppingBag size={10} /> Products
                </div>
                {previewUser.products.map((prod) => (
                  <div
                    key={prod.id}
                    className={cn(
                      "p-3 rounded-[20px] flex items-center justify-between gap-2 border",
                      theme.cardClass,
                    )}
                  >
                    <div className="space-y-0.5 text-left">
                      <h5 className="text-[11px] font-bold">{prod.title}</h5>
                      <p className="text-[9px] opacity-70 line-clamp-1">
                        {prod.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span className="text-[11px] font-bold text-emerald-400">
                        ${prod.price}
                      </span>
                      <span
                        className={cn(
                          "px-2 py-0.5 text-[8px] rounded-full font-semibold",
                          theme.buttonClass,
                        )}
                      >
                        Buy
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="space-y-2">
                <div className="text-[9px] font-bold tracking-wider uppercase opacity-60 flex items-center gap-1">
                  <Sparkles size={10} /> Links
                </div>

                <div className="space-y-2">
                  {previewUser.links.map((link) => (
                    <div
                      key={link.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-[16px] w-full text-left transition border",
                        theme.accentClass,
                      )}
                    >
                      <span className="text-[11px] font-medium">
                        {link.title}
                      </span>
                      <div className="flex items-center gap-1 opacity-70">
                        {link.isDeepLink && (
                          <span className="flex items-center gap-0.5 text-[8px] px-1 py-0.2 rounded-full bg-white/10 border border-white/5">
                            <Smartphone size={8} /> App
                          </span>
                        )}
                        <ExternalLink size={10} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mockup Footer */}
              <footer className="text-center pt-4 opacity-40 text-[9px] uppercase tracking-wider flex items-center justify-center gap-1">
                Powered by <BrandLogo variant="white" width={50} height={15} />
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
