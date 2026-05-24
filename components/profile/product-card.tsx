/**
 * product-card.tsx
 * Single product card for the products showcase grid.
 * Glass card with floating price badge, product image, and themed Buy button.
 */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motionTokens";

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
  /** motion variants from parent stagger container */
  variants?: object;
}

export function ProductCard({ product, theme, variants }: ProductCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={variants}
      whileHover={reduce ? {} : { y: -4, scale: 1.015 }}
      transition={{
        duration: motionTokens.duration.fast,
        ease: motionTokens.easing.smooth,
      }}
      className={cn(
        "rounded-2xl overflow-hidden flex flex-col shadow-xl group",
        theme.cardClass,
      )}
    >
      {/* Product image area */}
      <div className="relative h-40 w-full bg-white/[0.04] overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <ShoppingBag size={40} />
          </div>
        )}

        {/* Floating price badge */}
        <div
          className={cn(
            "absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold",
            "bg-black/50 backdrop-blur-md border border-white/10",
            theme.priceClass,
          )}
        >
          ${product.price}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold text-base leading-snug">{product.title}</h3>
          <p className="text-xs opacity-60 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Buy button */}
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
            "block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all",
            theme.buttonClass,
          )}
        >
          Buy Now
        </motion.a>
      </div>
    </motion.div>
  );
}

export default ProductCard;
