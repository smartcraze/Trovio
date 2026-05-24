"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  ExternalLink,
  Link2,
  Palette,
  Plus,
  ShoppingBag,
  Smartphone,
  Sparkles,
  User,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import React from "react";
import { motionTokens } from "@/lib/motionTokens";
import { cn } from "@/lib/utils";

function DashboardMockupInline() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-[28px] border border-border bg-card/60 backdrop-blur-md shadow-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] flex flex-col text-left select-none text-xs sm:text-sm">
      {/* Top mock header */}
      <div className="border-b border-border bg-background/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="w-3 h-3 rounded-full bg-amber-500/60" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-muted-foreground text-xs font-mono hidden sm:inline ml-2">
            trivio-app://dashboard
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 bg-muted rounded-full" />
          <div className="size-6 rounded-full bg-muted border border-border" />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar mockup */}
        <aside className="w-16 sm:w-48 border-r border-border bg-background/20 p-4 space-y-2 hidden xs:block">
          {[
            { icon: User, label: "Edit Profile", active: false },
            { icon: Link2, label: "Manage Links", active: true },
            { icon: ShoppingBag, label: "Products (3/3)", active: false },
            { icon: Palette, label: "Custom Themes", active: false },
            { icon: BarChart3, label: "Analytics", active: false },
          ].map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition cursor-default",
                item.active
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50",
              )}
            >
              <item.icon size={16} className="shrink-0" />
              <span className="hidden sm:inline text-xs">{item.label}</span>
            </div>
          ))}
        </aside>

        {/* Content area mockup */}
        <main className="flex-1 p-6 space-y-6 overflow-hidden flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between shrink-0">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground">
                Manage Links
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configure your handpicked custom URLs
              </p>
            </div>
            <div className="rounded-full bg-primary text-primary-foreground flex items-center gap-1 px-3 py-1.5 font-medium text-xs shadow-md shadow-primary/15 transition-transform hover:scale-[1.02]">
              <Plus size={14} />{" "}
              <span className="hidden sm:inline">Add Link</span>
            </div>
          </div>

          {/* Grid Layout inside mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
            {/* Links List Mockup (2 cols) */}
            <div className="md:col-span-2 space-y-3 overflow-hidden flex flex-col justify-start">
              {[
                {
                  title: "My Spotify Album",
                  url: "https://open.spotify.com/...",
                  clicks: 429,
                  isDeep: true,
                },
                {
                  title: "System Design Masterclass",
                  url: "https://trivio.com/...",
                  clicks: 312,
                  isDeep: false,
                },
                {
                  title: "YouTube Vlog Channel",
                  url: "https://youtube.com/...",
                  clicks: 189,
                  isDeep: true,
                },
              ].map((link, idx) => (
                <div
                  key={idx}
                  className="bg-muted/30 border border-border rounded-xl p-3 sm:p-4 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground text-xs sm:text-sm truncate">
                        {link.title}
                      </span>
                      {link.isDeep && (
                        <span className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary font-medium shrink-0">
                          <Smartphone size={8} /> App
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate flex items-center gap-0.5">
                      {link.url} <ExternalLink size={10} className="shrink-0" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-full shrink-0 font-medium">
                      {link.clicks} clicks
                    </span>
                    <div className="size-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground">
                      <Check size={10} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Analytics Card Mockup (1 col) */}
            <div className="md:col-span-1 space-y-4 hidden md:flex flex-col justify-start">
              <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-4">
                <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                  <Sparkles size={14} className="text-primary" /> Traffic Share
                </h5>
                <div className="space-y-3">
                  {[
                    { label: "Spotify", pct: 46, color: "bg-primary" },
                    { label: "Design Course", pct: 33, color: "bg-secondary" },
                    {
                      label: "YouTube Channel",
                      pct: 21,
                      color: "bg-muted-foreground/60",
                    },
                  ].map((bar, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground font-medium">
                          {bar.label}
                        </span>
                        <span className="text-foreground font-bold">
                          {bar.pct}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", bar.color)}
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-4 flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                    Total Clicks
                  </span>
                  <span className="text-base font-extrabold text-foreground block">
                    1,324
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function LandingHero() {
  const reduce = useReducedMotion();

  return (
    <section className="max-w-6xl mx-auto px-4 pt-16 sm:pt-28 pb-16 relative z-10 text-center font-sans">
      {/* Badge Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.easing.smooth,
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-6"
      >
        <Smartphone size={12} className="text-primary" /> Deep Link Aggregator &
        Shop
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.easing.smooth,
          delay: 0.08,
        }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08] mb-6"
      >
        Everything you create.
        <br />
        <span className="bg-gradient-to-r from-primary via-secondary to-primary/80 bg-clip-text text-transparent">
          One beautiful place.
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.easing.smooth,
          delay: 0.16,
        }}
        className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-8"
      >
        Share custom links. Launch mobile apps instantly on phone clicks.
        Showcase up to 3 course products. Monetize your digital presence.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.easing.smooth,
          delay: 0.24,
        }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link href="/register" className="w-full sm:w-auto" passHref>
          <motion.button
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: motionTokens.duration.fast,
              ease: motionTokens.easing.sharp,
            }}
            className="w-full h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/95 transition shadow-lg shadow-primary/10 cursor-pointer"
          >
            Create your Trivio <ArrowRight size={16} />
          </motion.button>
        </Link>
        <a href="#examples" className="w-full sm:w-auto">
          <motion.button
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: motionTokens.duration.fast,
              ease: motionTokens.easing.sharp,
            }}
            className="w-full h-12 px-8 rounded-full border border-border bg-card/50 hover:bg-card text-foreground font-semibold transition cursor-pointer"
          >
            See Examples
          </motion.button>
        </a>
      </motion.div>

      {/* Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.lg }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionTokens.duration.slow,
          ease: motionTokens.easing.smooth,
          delay: 0.32,
        }}
        className="mt-16 sm:mt-24"
      >
        <DashboardMockupInline />
      </motion.div>
    </section>
  );
}

export default LandingHero;
