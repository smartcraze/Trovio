/**
 * profile-header.tsx
 * Avatar + name row with handle, bio, and socials.
 */
"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { motionTokens } from "@/lib/motionTokens";
import { cn } from "@/lib/utils";
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
    textPrimary: string;
    textSecondary: string;
    usernameClass: string;
    id: string;
  };
}

function UsernameLabel({
  username,
  themeId,
  usernameClass,
}: {
  username: string;
  themeId: string;
  usernameClass: string;
}) {
  if (themeId === "japan-minimal") {
    return (
      <p className={cn("text-sm font-light tracking-widest", usernameClass)}>
        ｢ @{username} ｣
      </p>
    );
  }
  if (themeId === "anime-sakura") {
    return (
      <p className={cn("text-sm font-bold tracking-wide", usernameClass)}>
        ★ @{username}
      </p>
    );
  }
  return (
    <p className={cn("text-sm tracking-wide", usernameClass)}>@{username}</p>
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
      className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left"
    >
      <ProfileAvatar avatarUrl={user.avatarUrl} name={user.name} size={96} />

      <div className="min-w-0">
        <h1
          className={cn(
            "text-2xl sm:text-4xl tracking-tight mb-1",
            theme.textPrimary,
          )}
        >
          {user.name}
        </h1>
        <UsernameLabel
          username={user.username}
          themeId={theme.id}
          usernameClass={theme.usernameClass}
        />
        {user.bio && (
          <p className={cn("mt-2 text-sm sm:text-base", theme.textSecondary)}>
            {theme.id === "japan-minimal" ? `「 ${user.bio} 」` : user.bio}
          </p>
        )}
        {user.socials && Object.values(user.socials).some(Boolean) && (
          <ProfileSocials socials={user.socials} />
        )}
      </div>
    </motion.div>
  );
}

export default ProfileHeader;
