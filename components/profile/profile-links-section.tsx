/**
 * profile-links-section.tsx
 * Curated links panel.
 */
"use client";

import { ExternalLink, Link2, Smartphone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { trackClickAction } from "@/lib/actions";
import { triggerDeepLink } from "@/lib/deeplinks";
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
                <span className={theme.sectionHeaderClass}>Curated Connections</span>
            </div>

            <motion.div
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="space-y-3"
            >
                {visibleLinks.map((link) => (
                    <motion.a
                        key={link.id}
                        variants={itemVariants(!!reduce)}
                        href={link.url}
                        onClick={(event) => {
                            event.preventDefault();
                            trackClickAction(username, link.id).catch(() => undefined);
                            triggerDeepLink(link.url, link.isDeepLink);
                        }}
                        whileHover={reduce ? {} : { y: -2 }}
                        transition={{
                            duration: motionTokens.duration.fast,
                            ease: motionTokens.easing.smooth,
                        }}
                        className={cn(
                            "flex items-center justify-between gap-4 rounded-xl px-4 py-3",
                            theme.accentClass,
                        )}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="size-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                                <Link2 size={14} />
                            </div>
                            <span className="text-sm font-medium truncate">{link.title}</span>
                        </div>

                        <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                            {link.isDeepLink ? <Smartphone size={12} /> : <ExternalLink size={12} />}
                            {link.isDeepLink ? "App" : "External"}
                        </span>
                    </motion.a>
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
