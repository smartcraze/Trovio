/**
 * profile-avatar.tsx
 * Circular avatar with optional image and reduced-motion-safe hover.
 */
"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motionTokens";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
    avatarUrl?: string;
    name: string;
    size?: number;
    className?: string;
}

export function ProfileAvatar({
    avatarUrl,
    name,
    size = 96,
    className,
}: ProfileAvatarProps) {
    const reduce = useReducedMotion();
    const initial = name.charAt(0).toUpperCase();

    return (
        <motion.div
            whileHover={reduce ? {} : { scale: 1.03 }}
            transition={{
                duration: motionTokens.duration.fast,
                ease: motionTokens.easing.smooth,
            }}
            className={cn(
                "rounded-full overflow-hidden bg-white/10 shadow-lg",
                className,
            )}
            style={{ width: size, height: size }}
            aria-label={`${name} avatar`}
        >
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={`${name}'s avatar`}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-semibold">
                    {initial}
                </div>
            )}
        </motion.div>
    );
}

export default ProfileAvatar;
