/**
 * product-card.tsx
 * Horizontal product card for the shop panel.
 */
"use client";

import { ShoppingBag } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import React from "react";
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
        cardClass: string;
        buttonClass: string;
        priceClass: string;
    };
    variants?: Variants;
}

export function ProductCard({ product, theme, variants }: ProductCardProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            variants={variants}
            whileHover={reduce ? {} : { y: -2 }}
            transition={{
                duration: motionTokens.duration.fast,
                ease: motionTokens.easing.smooth,
            }}
            className={cn(
                "rounded-2xl p-4 flex items-center gap-4",
                theme.cardClass,
            )}
        >
            <div className="relative h-20 w-28 rounded-xl overflow-hidden bg-white/5">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover object-center"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-25">
                        <ShoppingBag size={22} />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold truncate">{product.title}</h3>
                    <span className={cn("text-xs font-semibold", theme.priceClass)}>
                        ${product.price}
                    </span>
                </div>
                <p className="text-[11px] opacity-60 line-clamp-1 mt-1">
                    {product.description}
                </p>
            </div>

            <motion.a
                href={product.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduce ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                    duration: motionTokens.duration.fast,
                    ease: motionTokens.easing.sharp,
                }}
                className={cn(
                    "px-4 py-2 rounded-full text-[11px] font-semibold shrink-0",
                    theme.buttonClass,
                )}
            >
                Buy Now
            </motion.a>
        </motion.div>
    );
}

export default ProductCard;
