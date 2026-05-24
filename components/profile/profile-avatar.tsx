/**
 * profile-avatar.tsx
 * Renders the circular avatar (or initials fallback) with a theme-aware
 * glow ring and a subtle hover-scale animation.
 *
 * Props:
 *  avatarUrl  — remote image URL from the user record
 *  name       — display name (used for initials fallback)
 *  avatarRing — Tailwind ring classes from IThemeConfig
 */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motionTokens";

interface ProfileAvatarProps {
  avatarUrl?: string;
  name: string;
  avatarRing: string;
}

export function ProfileAvatar({ avatarUrl, name, avatarRing }: ProfileAvatarProps) {
  const reduce = useReducedMotion();

  const initial = name.charAt(0).toUpperCase();

  const baseRing = cn(
    "w-24 h-24 rounded-full overflow-hidden relative",
    avatarRing,
  );

  return (
    <div className="relative mb-5 flex-shrink-0">
      {/* Soft ambient glow behind the avatar — purely decorative */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-30 scale-110 bg-current pointer-events-none"
        aria-hidden="true"
      />

      {avatarUrl ? (
        <motion.div
          whileHover={reduce ? {} : { scale: 1.05 }}
          transition={{
            duration: motionTokens.duration.fast,
            ease: motionTokens.easing.smooth,
          }}
          className={baseRing}
        >
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
            /* no next/image here — URL is user-supplied and may be any origin */
          />
        </motion.div>
      ) : (
        /* Initials fallback */
        <motion.div
          whileHover={reduce ? {} : { scale: 1.05 }}
          transition={{
            duration: motionTokens.duration.fast,
            ease: motionTokens.easing.smooth,
          }}
          className={cn(
            baseRing,
            "bg-white/10 flex items-center justify-center text-3xl font-bold",
          )}
          aria-label={`${name} initials`}
        >
          {initial}
        </motion.div>
      )}
    </div>
  );
}

export default ProfileAvatar;
