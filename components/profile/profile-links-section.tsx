/**
 * profile-links-section.tsx
 * Curated links panel.
 */
"use client";

import { motion, useReducedMotion } from "motion/react";
import LinkCard from "@/components/LinkCard";
import { motionTokens } from "@/lib/motionTokens";
import { cn } from "@/lib/utils";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  isDeepLink: boolean;
}

interface ProfileLinksSectionProps {
  links: LinkItem[];
  username: string;
  theme: {
    accentClass: string;
    accentBarClass: string;
    sectionHeaderClass: string;
  };
  maxItems?: number;
}

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
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
  maxItems = 10,
}: ProfileLinksSectionProps) {
  const reduce = useReducedMotion();
  if (!links || links.length === 0) return null;

  const visibleLinks = links.slice(0, maxItems);
  const hiddenCount = Math.max(links.length - visibleLinks.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <h1 className={theme.sectionHeaderClass}>Links</h1>
      </div>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {visibleLinks.map((link) => (
          <motion.div key={link.id} variants={itemVariants(!!reduce)}>
            <LinkCard
              username={username}
              link={link}
              accentClass={theme.accentClass}
            />
          </motion.div>
        ))}
      </motion.div>

      {hiddenCount > 0 && (
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 px-1">
          +{hiddenCount} more links
        </p>
      )}
    </div>
  );
}

export default ProfileLinksSection;
