/**
 * LinkCard.tsx
 * A single interactive link card with:
 *  - A 3px left accent bar (theme colour)
 *  - Glass background (provided by accentClass from theme)
 *  - Lift + slight scale on hover
 *  - Deep-link badge for app-scheme URLs
 *  - Click tracking + deep-link trigger
 *
 * Props:
 *  username      — user's handle (for analytics tracking)
 *  link          — { id, title, url, isDeepLink }
 *  accentClass   — glass bg + border + text colour from IThemeConfig
 *  accentBarClass — left bar colour (e.g. "bg-violet-500")
 */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { trackClickAction } from "@/lib/actions";
import { triggerDeepLink } from "@/lib/deeplinks";
import { ExternalLink, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motionTokens";

interface LinkCardProps {
  username: string;
  link: {
    id: string;
    title: string;
    url: string;
    isDeepLink: boolean;
  };
  accentClass: string;
  /** Tailwind bg class for the left accent bar, e.g. "bg-violet-500" */
  accentBarClass?: string;
}

export default function LinkCard({
  username,
  link,
  accentClass,
  accentBarClass = "bg-white/30",
}: LinkCardProps) {
  const reduce = useReducedMotion();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Fire-and-forget analytics — never block navigation
    trackClickAction(username, link.id).catch((err) => {
      console.error("Click tracking failed:", err);
    });

    triggerDeepLink(link.url, link.isDeepLink);
  };

  return (
    <motion.a
      href={link.url}
      onClick={handleClick}
      whileHover={reduce ? {} : { y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: motionTokens.duration.fast,
        ease: motionTokens.easing.smooth,
      }}
      className={cn(
        // Layout
        "flex items-center justify-between gap-3 w-full group relative overflow-hidden",
        // Spacing + shape
        "pl-0 pr-5 py-4 rounded-xl",
        // Glass card from theme
        accentClass,
        // Elevation
        "shadow-md",
      )}
    >
      {/* Left accent bar — 3px coloured strip */}
      <div
        className={cn("w-[3px] self-stretch rounded-r-full shrink-0", accentBarClass)}
        aria-hidden="true"
      />

      {/* Main label */}
      <div className="flex items-center gap-3 flex-1 min-w-0 pl-3">
        <span className="font-medium text-sm sm:text-base truncate">
          {link.title}
        </span>
      </div>

      {/* Right side — badges + icon */}
      <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity shrink-0">
        {link.isDeepLink && (
          <span
            className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 font-medium"
            title="Opens natively in the app"
          >
            <Smartphone size={11} />
            App
          </span>
        )}
        <ExternalLink
          size={15}
          className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
        />
      </div>
    </motion.a>
  );
}
