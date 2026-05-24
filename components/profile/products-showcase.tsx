"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motionTokens";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  purchaseUrl: string;
}

interface ProductsShowcaseProps {
  products: Product[];
  theme: {
    cardClass: string;
    buttonClass: string;
  };
}

export function ProductsShowcase({ products, theme }: ProductsShowcaseProps) {
  const reduce = useReducedMotion();

  if (!products || products.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Stagger ≤ 0.1s as per motion-ui spec
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : motionTokens.distance.md },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: motionTokens.duration.normal, 
        ease: motionTokens.easing.smooth 
      } 
    },
  };

  return (
    <div className="mb-10 space-y-4">
      <h2 className="text-sm font-semibold tracking-wider uppercase opacity-60 px-2 flex items-center gap-2">
        <ShoppingBag size={14} /> Shop Courses & Products
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={reduce ? {} : { y: -3, scale: 1.01 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
            className={cn(
              "p-5 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between shadow-lg",
              theme.cardClass
            )}
          >
            <div className="flex items-center gap-4 w-full">
              {product.imageUrl && (
                <div className="w-16 h-16 rounded-lg overflow-hidden relative shrink-0 border border-white/5 bg-white/5">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-left">{product.title}</h3>
                <p className="text-xs opacity-75 line-clamp-2 text-left">{product.description}</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-3 pt-3 sm:pt-0 border-t border-white/5 sm:border-t-0">
              <span className="font-bold text-lg text-emerald-400">${product.price}</span>
              <motion.a
                href={product.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className={cn("px-4 py-2 text-xs rounded-full font-medium transition-all text-center block w-full sm:w-auto", theme.buttonClass)}
              >
                Buy Now
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProductsShowcase;
