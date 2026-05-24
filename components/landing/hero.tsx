"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Smartphone, ArrowRight } from "lucide-react";
import { motionTokens } from "@/lib/motionTokens";

export function LandingHero() {
  const reduce = useReducedMotion();

  return (
    <section className="max-w-6xl mx-auto px-4 pt-16 sm:pt-28 pb-16 relative z-10 text-center font-sans">
      {/* Badge Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: motionTokens.duration.normal, 
          ease: motionTokens.easing.smooth 
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-6"
      >
        <Smartphone size={12} className="text-primary" /> Deep Link Aggregator & Shop
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: motionTokens.duration.normal, 
          ease: motionTokens.easing.smooth, 
          delay: 0.08 
        }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08] mb-6"
      >
        Everything you create.<br />
        <span className="bg-gradient-to-r from-primary via-secondary to-primary/80 bg-clip-text text-transparent">
          One beautiful place.
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: motionTokens.duration.normal, 
          ease: motionTokens.easing.smooth, 
          delay: 0.16 
        }}
        className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-8"
      >
        Share custom links. Launch mobile apps instantly on phone clicks. Showcase up to 3 course products. Monetize your digital presence.
      </motion.p>

      {/* Buttons Action Grid */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: motionTokens.duration.normal, 
          ease: motionTokens.easing.smooth, 
          delay: 0.24 
        }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link href="/register" className="w-full sm:w-auto" passHref>
          <motion.button
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.sharp }}
            className="w-full h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/95 transition shadow-lg shadow-primary/10 cursor-pointer"
          >
            Create your Trivio <ArrowRight size={16} />
          </motion.button>
        </Link>
        
        <a href="#examples" className="w-full sm:w-auto">
          <motion.button
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.sharp }}
            className="w-full h-12 px-8 rounded-full border border-border bg-card/50 hover:bg-card text-foreground font-semibold transition cursor-pointer"
          >
            See Examples
          </motion.button>
        </a>
      </motion.div>

      {/* Floating Hero Visual (landing.png) */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.lg }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: motionTokens.duration.slow, 
          ease: motionTokens.easing.smooth, 
          delay: 0.32 
        }}
        className="relative mx-auto mt-16 sm:mt-24 max-w-4xl"
      >
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-primary/10 rounded-xl blur-3xl pointer-events-none scale-90" />
        
        <motion.div
          animate={reduce ? {} : { y: [0, -12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <Image
            src="/landing.png"
            alt="Trivio Mockup Dashboard"
            width={1000}
            height={600}
            priority
            className="object-contain mx-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default LandingHero;
