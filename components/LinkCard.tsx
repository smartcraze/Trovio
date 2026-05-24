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
  accentClass: string;
  /** Tailwind bg class for the left accent bar, e.g. "bg-violet-500" */
  accentBarClass?: string;
  size?: "default" | "compact";
}

export default function LinkCard({
  username,
  link,
  accentClass,
  size = "default",
}: LinkCardProps) {
  const reduce = useReducedMotion();
  const isCompact = size === "compact";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Fire-and-forget analytics — never block navigation
    trackClickAction(username, link.id).catch((err) => {
      console.error("Click tracking failed:", err);
    });

    triggerDeepLink(link.url, link.isDeepLink);
  };

  const actionLabel = link.isDeepLink ? "App" : "External Link";

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
        isCompact ? "pl-3 pr-3 py-2 rounded-lg" : "pl-4 pr-4 py-3 rounded-xl",
        // Glass card from theme
        accentClass,
        // Elevation
        isCompact ? "shadow-sm" : "shadow-md",
      )}
    >
      {/* Main label */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={cn(
            "size-8 rounded-lg flex items-center justify-center",
            "bg-white/10 border border-white/10",
          )}
          aria-hidden="true"
        >
          <Link2 size={14} />
        </div>
        <span
          className={cn(
            "font-medium truncate",
            isCompact ? "text-[12px]" : "text-sm sm:text-base",
          )}
        >
          {link.title}
        </span>
      </div>

      {/* Right side — badges + icon */}
      <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
        <span
          className={cn(
            "flex items-center gap-1 rounded-full bg-white/10 border border-white/10 font-medium",
            isCompact ? "text-[9px] px-2 py-0.5" : "text-[10px] px-2.5 py-0.5",
          )}
          title={
            link.isDeepLink ? "Opens natively in the app" : "Opens in browser"
          }
        >
          {link.isDeepLink ? (
            <Smartphone size={isCompact ? 10 : 12} />
          ) : (
            <ExternalLink size={isCompact ? 10 : 12} />
          )}
          {actionLabel}
        </span>
      </div>
    </motion.a>
  );
}
