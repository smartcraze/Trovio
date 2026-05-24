/**
 * products-showcase.tsx
 * Vertical list of product cards.
 */
"use client";

import { ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { motionTokens } from "@/lib/motionTokens";
import { type Product, ProductCard } from "./product-card";

interface ProductsShowcaseProps {
  products: Product[];
  theme: {
    cardClass: string;
    buttonClass: string;
    priceClass: string;
    sectionHeaderClass: string;
  };
  maxItems?: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : motionTokens.distance.sm },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.smooth,
    },
  },
});

export function ProductsShowcase({
  products,
  theme,
  maxItems = 3,
}: ProductsShowcaseProps) {
  const reduce = useReducedMotion();
  if (!products || products.length === 0) return null;

  const visibleProducts = products.slice(0, maxItems);
  const hiddenCount = Math.max(products.length - visibleProducts.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <ShoppingBag size={13} />
        <span className={theme.sectionHeaderClass}>
          Shop Courses &amp; Products
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            theme={theme}
            variants={item(!!reduce)}
          />
        ))}
      </motion.div>

      {hiddenCount > 0 && (
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 px-1">
          +{hiddenCount} more products
        </p>
      )}
    </div>
  );
}

export default ProductsShowcase;
