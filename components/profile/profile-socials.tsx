/**
 * profile-socials.tsx
 * Social icon row with hover lift.
 */
"use client";

import { Globe } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type React from "react";
import {
    GithubIcon,
    InstagramIcon,
    SpotifyIcon,
    TiktokIcon,
    TwitterIcon,
    YoutubeIcon,
} from "@/components/icons";
import { motionTokens } from "@/lib/motionTokens";

interface ProfileSocialsProps {
    socials: Record<string, string>;
}

type PlatformKey =
    | "instagram"
    | "twitter"
    | "youtube"
    | "spotify"
    | "github"
    | "tiktok"
    | "website";

const ICON_SIZE = 18;

function getPlatformIcon(platform: string): React.ReactNode | null {
    switch (platform as PlatformKey) {
        case "instagram":
            return <InstagramIcon size={ICON_SIZE} />;
        case "twitter":
            return <TwitterIcon size={ICON_SIZE} />;
        case "youtube":
            return <YoutubeIcon size={ICON_SIZE} />;
        case "spotify":
            return <SpotifyIcon size={ICON_SIZE} />;
        case "github":
            return <GithubIcon size={ICON_SIZE} />;
        case "tiktok":
            return <TiktokIcon size={ICON_SIZE} />;
        case "website":
            return <Globe size={ICON_SIZE} />;
        default:
            return null;
    }
}

export function ProfileSocials({ socials }: ProfileSocialsProps) {
    const reduce = useReducedMotion();
    const entries = Object.entries(socials).filter(([, url]) => Boolean(url));

    if (entries.length === 0) return null;

    return (
        <div className="flex items-center gap-4 mt-4">
            {entries.map(([platform, url]) => {
                const icon = getPlatformIcon(platform);
                if (!icon) return null;

                return (
                    <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={reduce ? {} : { y: -2, scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            duration: motionTokens.duration.fast,
                            ease: motionTokens.easing.smooth,
                        }}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                        title={platform}
                        aria-label={platform}
                    >
                        {icon}
                    </motion.a>
                );
            })}
        </div>
    );
}

export default ProfileSocials;
