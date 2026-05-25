/**
 * profile-header.tsx
 * Refined aligned version
 * - Same original layout
 * - Better alignment rhythm
 * - Cleaner spacing
 * - Better typography balance
 * - Proper visual grid
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
      <p
        className={cn(
          "text-[12px] tracking-[0.22em] font-light",
          usernameClass,
        )}
      >
        ｢ @{username} ｣
      </p>
    );
  }

  if (themeId === "anime-sakura") {
    return (
      <p
        className={cn(
          "text-[12px] font-semibold tracking-wide",
          usernameClass,
        )}
      >
        ★ @{username}
      </p>
    );
  }

  return (
    <p
      className={cn(
        "text-[13px] font-medium tracking-wide",
        "text-white/50",
        usernameClass,
      )}
    >
      @{username}
    </p>
  );
}

export function ProfileHeader({
  user,
  theme,
}: ProfileHeaderProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduce ? 0 : motionTokens.distance.md,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: motionTokens.duration.normal,
        ease: motionTokens.easing.smooth,
      }}
      className={cn(
        "flex w-full items-start",
        "gap-5 sm:gap-6",
      )}
    >
      {/* Avatar */}
      <div className="shrink-0 pt-1">
        <ProfileAvatar
          avatarUrl={user.avatarUrl}
          name={user.name}
          size={88}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pt-1">
        {/* Name */}
        <h1
          className={cn(
            "truncate",
            "text-[34px] sm:text-[42px]",
            "font-semibold",
            "leading-[0.95]",
            "tracking-[-0.055em]",
            theme.textPrimary,
          )}
        >
          {user.name}
        </h1>

        {/* Username */}
        <div className="mt-1.5">
          <UsernameLabel
            username={user.username}
            themeId={theme.id}
            usernameClass={theme.usernameClass}
          />
        </div>

        {/* Bio */}
        {user.bio && (
          <p
            className={cn(
              "mt-3",
              "max-w-[540px]",
              "text-[14px] sm:text-[15px]",
              "leading-relaxed",
              "text-white/55",
              theme.textSecondary,
            )}
          >
            {theme.id === "japan-minimal"
              ? `「 ${user.bio} 」`
              : user.bio}
          </p>
        )}

        {/* Socials */}
        {user.socials &&
          Object.values(user.socials).some(Boolean) && (
            <div className="mt-3.5">
              <ProfileSocials socials={user.socials} />
            </div>
          )}
      </div>
    </motion.div>
  );
}

export default ProfileHeader;