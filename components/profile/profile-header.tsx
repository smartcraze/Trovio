/**
 * profile-header.tsx
 * The main profile card — name, avatar, bio, socials.
 * Composes ProfileAvatar and ProfileSocials sub-components.
 */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motionTokens";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileSocials } from "./profile-socials";

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
    textPrimary: string;
    textSecondary: string;
    usernameClass: string;
    avatarRing: string;
    /** Theme id — used for Japan-theme username label */
    id: string;
  };
}

/** Per-theme @username label — adds a cultural flavour to the handle */
function UsernameLabel({ username, themeId, usernameClass }: {
  username: string;
  themeId: string;
  usernameClass: string;
}) {
  // Japan minimal: show a small Japanese bracket decoration
  if (themeId === "japan-minimal") {
    return (
      <p className={cn("text-sm mb-4 font-light tracking-widest", usernameClass)}>
        ｢ @{username} ｣
      </p>
    );
  }
  // Anime: show in bold with a ★
  if (themeId === "anime-sakura") {
    return (
      <p className={cn("text-sm mb-4 font-bold tracking-wide", usernameClass)}>
        ★ @{username}
      </p>
    );
  }
  // Default
  return (
    <p className={cn("text-sm mb-4 tracking-wide", usernameClass)}>
      @{username}
    </p>
  );
}

export function ProfileHeader({ user, theme }: ProfileHeaderProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.duration.normal,
        ease: motionTokens.easing.smooth,
      }}
      className={cn(
        "p-7 sm:p-9 rounded-2xl text-center mb-8 flex flex-col items-center",
        theme.cardClass,
      )}
    >
      {/* Avatar */}
      <ProfileAvatar
        avatarUrl={user.avatarUrl}
        name={user.name}
        avatarRing={theme.avatarRing}
      />

      {/* Name */}
      <h1 className={cn("text-2xl sm:text-3xl tracking-tight mb-1", theme.textPrimary)}>
        {user.name}
      </h1>

      {/* @handle */}
      <UsernameLabel
        username={user.username}
        themeId={theme.id}
        usernameClass={theme.usernameClass}
      />

      {/* Bio */}
      {user.bio && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed max-w-sm",
            theme.textSecondary,
          )}
        >
          {theme.id === "japan-minimal" ? `「 ${user.bio} 」` : user.bio}
        </p>
      )}

      {/* Social icons */}
      {user.socials && Object.values(user.socials).some(Boolean) && (
        <ProfileSocials socials={user.socials} />
      )}
    </motion.div>
  );
}

export default ProfileHeader;
