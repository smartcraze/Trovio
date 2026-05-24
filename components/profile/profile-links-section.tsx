/**
 * profile-links-section.tsx
 * Renders the "Handpicked Links" section header + staggered list of LinkCards.
 * Extracted from page.tsx for the 200-line file limit.
 */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { motionTokens } from "@/lib/motionTokens";
import LinkCard from "@/components/LinkCard";

interface Link {
  id: string;
  title: string;
  url: string;
  isDeepLink: boolean;
}

interface ProfileLinksSectionProps {
  links: Link[];
  username: string;
  theme: {
    accentClass: string;
    accentBarClass: string;
    sectionHeaderClass: string;
  };
}

/** Stagger wrapper for the list */
const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : motionTokens.distance.sm },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.fast,
      ease: motionTokens.easing.smooth,
    },
  },
});

export function ProfileLinksSection({
  links,
  username,
  theme,
}: ProfileLinksSectionProps) {
  const reduce = useReducedMotion();

  if (!links || links.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Section label */}
      <h2 className={`flex items-center gap-2 px-1 ${theme.sectionHeaderClass}`}>
        <Sparkles size={13} />
        Handpicked Links
      </h2>

      {/* Animated list */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {links.map((link) => (
          <motion.div key={link.id} variants={itemVariants(!!reduce)}>
            <LinkCard
              username={username}
              link={link}
              accentClass={theme.accentClass}
              accentBarClass={theme.accentBarClass}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProfileLinksSection;
