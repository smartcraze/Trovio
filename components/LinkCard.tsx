/**
 * LinkCard.tsx
 * Premium minimal glassmorphism link card
 * - Soft layered glass background
 * - No visible borders
 * - Smooth hover glow + elevation
 * - Better spacing + typography
 * - Deep-link aware
 * - Modern minimal CTA styling
 */

"use client";

import { ExternalLink, Link2, Smartphone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type React from "react";

import { trackClickAction } from "@/lib/actions";
import { triggerDeepLink } from "@/lib/deeplinks";
import { motionTokens } from "@/lib/motionTokens";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  username: string;
  link: {
    id: string;
    title: string;
    url: string;
    isDeepLink: boolean;
  };

  /**
   * Use this for tinted glass backgrounds
   * Example:
   * "bg-white/8 dark:bg-white/[0.06]"
   */
  accentClass?: string;

  /**
   * Optional glow color
   * Example:
   * "from-violet-500/20"
   */
  glowClass?: string;

  size?: "default" | "compact";
}

export default function LinkCard({
  username,
  link,
  accentClass,
  glowClass,
  size = "default",
}: LinkCardProps) {
  const reduce = useReducedMotion();

  const isCompact = size === "compact";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    trackClickAction(username, link.id).catch((err) => {
      console.error("Click tracking failed:", err);
    });

    triggerDeepLink(link.url, link.isDeepLink);
  };

  return (
    <motion.a
      href={link.url}
      onClick={handleClick}
      whileHover={
        reduce
          ? {}
          : {
            y: -4,
            scale: 1.015,
          }
      }
      whileTap={{ scale: 0.985 }}
      transition={{
        duration: motionTokens.duration.fast,
        ease: motionTokens.easing.smooth,
      }}
      className={cn(
        "group relative flex w-full items-center justify-between overflow-hidden",
        "rounded-2xl backdrop-blur-2xl",
        "transition-all duration-300",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:shadow-[0_20px_50px_rgb(0,0,0,0.22)]",
        "bg-white/[0.08] dark:bg-white/[0.04]",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-b before:from-white/[0.12] before:to-white/[0.03]",
        "before:pointer-events-none",
        isCompact ? "px-3 py-2.5" : "px-4 py-3.5",
        accentClass,
      )}
    >
      {/* Ambient Glow */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500",
          "group-hover:opacity-100",
          "bg-gradient-to-r",
          glowClass || "from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10",
        )}
      />

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
        {/* Icon */}
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl",
            "bg-white/[0.08]",
            "shadow-inner shadow-white/[0.04]",
            "transition-transform duration-300",
            "group-hover:scale-105",
            isCompact ? "size-9" : "size-11",
          )}
        >
          <Link2
            size={isCompact ? 15 : 18}
            className="text-white/80"
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate font-medium tracking-[-0.02em]",
              "text-white",
              isCompact
                ? "text-[13px]"
                : "text-[15px] sm:text-base",
            )}
          >
            {link.title}
          </p>

          <p className="mt-0.5 text-[11px] text-white/45">
            {link.isDeepLink
              ? "Opens directly in app"
              : "External destination"}
          </p>
        </div>
      </div>

      {/* Right Action */}
      <div className="relative z-10 ml-3 flex shrink-0 items-center">
        <div
          className={cn(
            "flex items-center justify-center rounded-full",
            "bg-white/[0.08]",
            "backdrop-blur-md",
            "transition-all duration-300",
            "group-hover:bg-white/[0.14]",
            isCompact ? "size-8" : "size-10",
          )}
        >
          {link.isDeepLink ? (
            <Smartphone
              size={isCompact ? 14 : 16}
              className="text-white/75"
            />
          ) : (
            <ExternalLink
              size={isCompact ? 14 : 16}
              className="text-white/75"
            />
          )}
        </div>
      </div>

      {/* Subtle Shine */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          "group-hover:opacity-100",
          "bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]",
          "-translate-x-full group-hover:translate-x-full",
        )}
      />
    </motion.a>
  );
}