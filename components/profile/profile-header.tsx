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
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motionTokens";

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    bio?: string;
    avatarUrl?: string;
    socials?: Record<string, string>;
  };
  theme: {
    cardClass: string;
    avatarRing: string;
    textPrimary: string;
    textSecondary: string;
  };
}

export function ProfileHeader({ user, theme }: ProfileHeaderProps) {
  const reduce = useReducedMotion();

  const renderSocialIcon = (platform: string, url: string) => {
    if (!url) return null;

    const size = 20;
    const sizeClasses = "w-5 h-5";

    let iconElement = null;
    switch (platform) {
      case "instagram":
        iconElement = <InstagramIcon size={size} />;
        break;
      case "twitter":
        iconElement = <TwitterIcon size={size} />;
        break;
      case "youtube":
        iconElement = <YoutubeIcon size={size} />;
        break;
      case "spotify":
        iconElement = <SpotifyIcon size={size} />;
        break;
      case "github":
        iconElement = <GithubIcon size={size} />;
        break;
      case "tiktok":
        iconElement = <TiktokIcon size={size} />;
        break;
      case "website":
        iconElement = <Globe className={sizeClasses} />;
        break;
      default:
        return null;
    }

    return (
      <motion.a
        key={platform}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={reduce ? {} : { scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
        className="opacity-80 hover:opacity-100 transition-opacity"
        title={platform.charAt(0).toUpperCase() + platform.slice(1)}
      >
        {iconElement}
      </motion.a>
    );
  };

  const hasSocials = Object.values(user.socials || {}).some(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
      className={cn("p-6 sm:p-8 rounded-[24px] text-center mb-8 flex flex-col items-center", theme.cardClass)}
    >
      <div className="relative mb-4">
        {user.avatarUrl ? (
          <motion.div 
            whileHover={reduce ? {} : { scale: 1.05 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
            className={cn("w-24 h-24 rounded-full overflow-hidden relative", theme.avatarRing)}
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <motion.div 
            whileHover={reduce ? {} : { scale: 1.05 }}
            className={cn("w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl font-bold uppercase", theme.avatarRing)}
          >
            {user.name.charAt(0)}
          </motion.div>
        )}
      </div>

      <h1 className={cn("text-2xl font-bold tracking-tight mb-2", theme.textPrimary)}>
        {user.name}
      </h1>
      <p className="text-sm opacity-80 mb-4 text-violet-400">@{user.username}</p>

      {user.bio && (
        <p className={cn("text-sm sm:text-base leading-relaxed max-w-sm", theme.textSecondary)}>
          {user.bio}
        </p>
      )}

      {/* Socials section */}
      {hasSocials && (
        <div className="flex flex-wrap items-center justify-center gap-5 mt-6 pt-6 border-t border-white/5 w-full">
          {Object.entries(user.socials || {}).map(([platform, url]) =>
            renderSocialIcon(platform, url as string)
          )}
        </div>
      )}
    </motion.div>
  );
}

export default ProfileHeader;
