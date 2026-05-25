/**
 * product-card.tsx
 * Premium minimal glassmorphism product card
 * - Soft glass layers
 * - Floating image
 * - Elegant pricing
 * - Modern CTA
 * - No borders, only depth + blur
 */

"use client";

import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { motionTokens } from "@/lib/motionTokens";
import { cn } from "@/lib/utils";

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    purchaseUrl: string;
}

interface ProductCardProps {
    product: Product;

    theme: {
        cardClass?: string;
        buttonClass?: string;
        priceClass?: string;
        glowClass?: string;
    };

    variants?: Variants;
}

export function ProductCard({
    product,
    theme,
    variants,
}: ProductCardProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            variants={variants}
            whileHover={
                reduce
                    ? {}
                    : {
                        y: -4,
                        scale: 1.01,
                    }
            }
            transition={{
                duration: motionTokens.duration.fast,
                ease: motionTokens.easing.smooth,
            }}
            className={cn(
                "group relative overflow-hidden rounded-3xl",
                "bg-white/[0.07] dark:bg-white/[0.04]",
                "backdrop-blur-2xl",
                "shadow-[0_8px_30px_rgb(0,0,0,0.14)]",
                "hover:shadow-[0_20px_60px_rgb(0,0,0,0.22)]",
                "transition-all duration-500",
                "p-4 sm:p-5",
                theme.cardClass,
            )}
        >
            {/* Ambient glow */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500",
                    "group-hover:opacity-100",
                    "bg-gradient-to-r",
                    theme.glowClass ||
                    "from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10",
                )}
            />

            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.10] to-white/[0.02]" />

            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Product image */}
                <div
                    className={cn(
                        "relative overflow-hidden rounded-2xl shrink-0",
                        "h-28 w-full sm:h-24 sm:w-32",
                        "bg-white/[0.06]",
                        "shadow-inner shadow-white/[0.05]",
                    )}
                >
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className={cn(
                                "h-full w-full object-cover object-center",
                                "transition-transform duration-700",
                                "group-hover:scale-105",
                            )}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-white/25">
                            <ShoppingBag size={26} />
                        </div>
                    )}

                    {/* Shine effect */}
                    <div
                        className={cn(
                            "absolute inset-0 opacity-0 transition-opacity duration-500",
                            "group-hover:opacity-100",
                            "bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.10),transparent)]",
                        )}
                    />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3
                                className={cn(
                                    "truncate text-[15px] sm:text-base",
                                    "font-semibold tracking-[-0.02em]",
                                    "text-white",
                                )}
                            >
                                {product.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-[12px] text-white/50">
                                {product.description}
                            </p>
                        </div>

                        <div
                            className={cn(
                                "rounded-full px-3 py-1 shrink-0",
                                "bg-white/[0.08]",
                                "text-[12px] font-semibold",
                                "backdrop-blur-md",
                                "text-white",
                                theme.priceClass,
                            )}
                        >
                            ${product.price}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-[11px] text-white/35">
                            Premium Product
                        </div>

                        <motion.a
                            href={product.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={
                                reduce
                                    ? {}
                                    : {
                                        scale: 1.03,
                                    }
                            }
                            whileTap={{ scale: 0.97 }}
                            transition={{
                                duration: motionTokens.duration.fast,
                                ease: motionTokens.easing.sharp,
                            }}
                            className={cn(
                                "inline-flex items-center gap-2 rounded-full",
                                "px-4 py-2",
                                "text-[12px] font-semibold",
                                "bg-white text-black",
                                "shadow-lg",
                                "transition-all duration-300",
                                "hover:gap-3",
                                theme.buttonClass,
                            )}
                        >
                            Buy Now
                            <ArrowUpRight size={14} />
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;