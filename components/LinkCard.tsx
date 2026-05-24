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
}

export default function LinkCard({
  username,
  link,
  accentClass,
}: LinkCardProps) {
  const reduce = useReducedMotion();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Background tracking
    trackClickAction(username, link.id).catch((err) => {
      console.error("Failed to track click:", err);
    });

    // Execute deep-linking / redirect
    triggerDeepLink(link.url, link.isDeepLink);
  };

  return (
    <motion.a
      href={link.url}
      onClick={handleClick}
      whileHover={reduce ? {} : { y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl transition-all duration-300 w-full group relative overflow-hidden shadow-md",
        accentClass
      )}
    >
      <div className="flex items-center gap-3 relative z-10">
        <span className="font-medium text-sm sm:text-base">{link.title}</span>
      </div>
      <div className="flex items-center gap-2 text-current opacity-70 group-hover:opacity-100 transition relative z-10">
        {link.isDeepLink && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/5">
            <Smartphone size={12} /> App
          </span>
        )}
        <ExternalLink
          size={16}
          className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </div>
    </motion.a>
  );
}
