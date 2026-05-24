/**
 * profile-page.tsx
 * Public profile page layout.
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
        transition: { staggerChildren: 0.08 },
    },
};

const sectionVariants = (reduce: boolean) => ({
    hidden: { opacity: 0, y: reduce ? 0 : motionTokens.distance.md },
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
        <div
            className={cn(
                theme.bgClass,
                theme.fontClass,
                "relative overflow-hidden min-h-screen w-full",
            )}
        >
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none",
                    theme.patternClass,
                )}
                aria-hidden="true"
            />
            <div className={theme.glowClass} aria-hidden="true" />
            <ProfileDecorations themeId={theme.id} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 w-full flex justify-center p-4"
            >
                <div className="w-full max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
                    <motion.section
                        variants={sectionVariants(!!reduce)}
                        className="flex justify-center"
                    >
                        <ProfileHeader user={user} theme={theme} />
                    </motion.section>

                    <motion.section
                        variants={sectionVariants(!!reduce)}
                        className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
                    >
                        <div
                            className={cn(
                                "rounded-[28px] p-7 sm:p-9",
                                "shadow-[0_25px_60px_rgba(0,0,0,0.35)]",
                                theme.cardClass,
                            )}
                        >
                            <ProfileLinksSection
                                links={user.links}
                                username={user.username}
                                theme={theme}
                                maxItems={10}
                            />
                            {!hasLinks && (
                                <p className={cn("text-xs opacity-70", theme.textSecondary)}>
                                    No links yet.
                                </p>
                            )}
                        </div>

                        <div
                            className={cn(
                                "rounded-[28px] p-7 sm:p-9",
                                "shadow-[0_25px_60px_rgba(0,0,0,0.35)]",
                                theme.cardClass,
                            )}
                        >
                            <ProductsShowcase
                                products={user.products}
                                theme={theme}
                                maxItems={3}
                            />
                            {!hasProducts && (
                                <p className={cn("text-xs opacity-70", theme.textSecondary)}>
                                    No products yet.
                                </p>
                            )}
                        </div>
                    </motion.section>

                    {!hasProducts && !hasLinks && (
                        <div
                            className={cn(
                                "mt-6 rounded-2xl p-4 text-center",
                                theme.cardClass,
                            )}
                        >
                            <p className={cn("text-xs", theme.textSecondary)}>
                                No links or products yet. Check back soon.
                            </p>
                        </div>
                    )}

                    <ProfileFooter theme={theme} />
                </div>
            </motion.div>
        </div>
    );
}

export default ProfilePage;
