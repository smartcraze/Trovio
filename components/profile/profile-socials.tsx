/**
 * profile-socials.tsx
 * Renders the horizontal row of social platform icon-links.
 * Each icon lifts slightly on hover using motion/react.
 *
 * Only platforms with a non-empty URL are rendered.
 */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Globe } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  SpotifyIcon,
  TiktokIcon,
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

const ICON_SIZE = 20;

/** Maps a platform key to its icon element */
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
    <div
      className="flex flex-wrap items-center justify-center gap-5 mt-6 pt-5 border-t border-white/[0.06] w-full"
      aria-label="Social links"
    >
      {entries.map(([platform, url]) => {
        const icon = getPlatformIcon(platform);
        if (!icon) return null;

        return (
          <motion.a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduce ? {} : { scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{
              duration: motionTokens.duration.fast,
              ease: motionTokens.easing.smooth,
            }}
            className="opacity-60 hover:opacity-100 transition-opacity"
            title={platform.charAt(0).toUpperCase() + platform.slice(1)}
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
