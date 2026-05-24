"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motionTokens } from "@/lib/motionTokens";

export function LandingCtaBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 relative z-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.lg }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.easing.smooth,
        }}
        className="relative rounded-2xl bg-linear-to-br from-primary/10 via-secondary/15 to-transparent border border-border p-8 sm:p-16 text-center overflow-hidden"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-color-dodge rounded-2xl blur-xl pointer-events-none" />

        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6">
          Ready to claim your spot?
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
          Create your Trivio page in under 2 minutes. Start sharing links,
          launching native apps, and selling courses.
        </p>

        <Link href="/register" passHref>
          <motion.div
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/95 transition shadow-lg shadow-primary/10 cursor-pointer">
              Get Started for Free <ArrowRight size={16} />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}

export default LandingCtaBanner;
