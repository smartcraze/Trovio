/**
 * profile-page.tsx
 * Premium public creator profile page
 * - Single column focused layout
 * - Floating glass sections
 * - Mobile-first
 * - Premium spacing + depth
 * - Better creator hierarchy
 */

"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

import { ProductsShowcase } from "@/components/profile/products-showcase";
import { ProfileDecorations } from "@/components/profile/profile-decorations";
import { ProfileFooter } from "@/components/profile/profile-footer";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileLinksSection } from "@/components/profile/profile-links-section";

import { motionTokens } from "@/lib/motionTokens";
import type { IThemeConfig } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface ProfilePageProps {
  user: {
    name: string;
    username: string;
    bio?: string;
    avatarUrl?: string;
    socials?: Record<string, string>;

    links: Array<{
      id: string;
      title: string;
      url: string;
      isDeepLink: boolean;
    }>;

    products: Array<{
      id: string;
      title: string;
      description: string;
      price: number;
      imageUrl?: string;
      purchaseUrl: string;
    }>;
  };

  theme: IThemeConfig;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const sectionVariants = (reduce: boolean) => ({
  hidden: {
    opacity: 0,
    y: reduce ? 0 : motionTokens.distance.md,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.smooth,
    },
  },
});

export function ProfilePage({ user, theme }: ProfilePageProps) {
  const reduce = useReducedMotion();

  const hasProducts = user.products.length > 0;
  const hasLinks = user.links.length > 0;

  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden",
        "text-white",
        theme.bgClass,
        theme.fontClass,
      )}
    >
      {/* Background pattern */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40",
          theme.patternClass,
        )}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className={cn("pointer-events-none absolute inset-0", theme.glowClass)}
        aria-hidden="true"
      />

      {/* Decorative elements */}
      <ProfileDecorations themeId={theme.id} />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10"
      >
        <div
          className={cn(
            "mx-auto flex min-h-screen w-full flex-col",
            "max-w-2xl",
            "px-4 sm:px-6",
            "pb-16 pt-10 sm:pt-14",
          )}
        >
          {/* ===================================================== */}
          {/* HERO */}
          {/* ===================================================== */}

          <motion.section
            variants={sectionVariants(!!reduce)}
            className="flex justify-center"
          >
            <ProfileHeader user={user} theme={theme} />
          </motion.section>

          {/* ===================================================== */}
          {/* LINKS */}
          {/* ===================================================== */}

          {hasLinks && (
            <motion.section
              variants={sectionVariants(!!reduce)}
              className="mt-10"
            >
              <div className="space-y-4">
                <ProfileLinksSection
                  links={user.links}
                  username={user.username}
                  theme={theme}
                  maxItems={10}
                />
              </div>
            </motion.section>
          )}

          {/* Empty links state */}
          {!hasLinks && (
            <motion.section
              variants={sectionVariants(!!reduce)}
              className="mt-10"
            >
              <div
                className={cn(
                  "rounded-3xl p-6 text-center",
                  "bg-white/[0.05]",
                  "backdrop-blur-2xl",
                  "shadow-[0_8px_40px_rgba(0,0,0,0.18)]",
                )}
              >
                <p className="text-sm text-white/50">No links added yet.</p>
              </div>
            </motion.section>
          )}

          {/* ===================================================== */}
          {/* PRODUCTS */}
          {/* ===================================================== */}

          {hasProducts && (
            <motion.section
              variants={sectionVariants(!!reduce)}
              className="mt-12"
            >
              <div className="space-y-4">
                <ProductsShowcase
                  products={user.products}
                  theme={theme}
                  maxItems={3}
                />
              </div>
            </motion.section>
          )}

          {/* ===================================================== */}
          {/* EMPTY STATE */}
          {/* ===================================================== */}

          {!hasProducts && !hasLinks && (
            <motion.section
              variants={sectionVariants(!!reduce)}
              className="mt-10"
            >
              <div
                className={cn(
                  "rounded-[32px] p-10 text-center",
                  "bg-white/[0.05]",
                  "backdrop-blur-2xl",
                  "shadow-[0_20px_60px_rgba(0,0,0,0.20)]",
                )}
              >
                <p className="text-sm text-white/55">
                  This profile is still being curated.
                </p>
              </div>
            </motion.section>
          )}

          {/* ===================================================== */}
          {/* FOOTER */}
          {/* ===================================================== */}

          <motion.div variants={sectionVariants(!!reduce)} className="mt-14">
            <ProfileFooter theme={theme} />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

export default ProfilePage;
