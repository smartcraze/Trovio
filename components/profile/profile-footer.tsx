/**
 * profile-footer.tsx
 * Lightweight footer for the public profile.
 */
"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import React from "react";
import { BrandLogo } from "@/components/brand-logo";
import { motionTokens } from "@/lib/motionTokens";
import { cn } from "@/lib/utils";

interface ProfileFooterProps {
    theme: {
        textSecondary: string;
    };
}

export function ProfileFooter({ theme }: ProfileFooterProps) {
    const reduce = useReducedMotion();

    return (
        <motion.footer
            initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: motionTokens.duration.normal,
                ease: motionTokens.easing.smooth,
            }}
            className={cn("text-center mt-10", theme.textSecondary)}
        >
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition duration-300"
            >
                <span>Powered by</span>
                <BrandLogo variant="dynamic" width={70} height={20} noLink={true} />
            </Link>
        </motion.footer>
    );
}

export default ProfileFooter;
