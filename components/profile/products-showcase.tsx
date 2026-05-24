/**
 * products-showcase.tsx
 * Staggered grid of ProductCard components.
 * Returns null when the products array is empty.
 */
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { motionTokens } from "@/lib/motionTokens";
import { ProductCard, type Product } from "./product-card";

interface ProductsShowcaseProps {
  products: Product[];
  theme: {
    cardClass: string;
    buttonClass: string;
    priceClass: string;
    sectionHeaderClass: string;
  };
}

/** Stagger container — children animate in with 0.08 s offset */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

/** Each card slides up from below */
const item = (reduce: boolean) => ({
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

export function ProductsShowcase({ products, theme }: ProductsShowcaseProps) {
  const reduce = useReducedMotion();

  if (!products || products.length === 0) return null;

  return (
    <div className="mb-10 space-y-5">
      {/* Section header */}
      <h2
        className={`flex items-center gap-2 px-1 ${theme.sectionHeaderClass}`}
      >
        <ShoppingBag size={13} />
        Shop Courses &amp; Products
      </h2>

      {/* Card grid — 1 col on mobile, up to 2 on sm+ if there are ≥2 products */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={
          products.length === 1
            ? "grid grid-cols-1 gap-5"
            : "grid grid-cols-1 sm:grid-cols-2 gap-5"
        }
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            theme={theme}
            variants={item(!!reduce)}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default ProductsShowcase;
