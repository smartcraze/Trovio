"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Smartphone, ShoppingBag, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motionTokens } from "@/lib/motionTokens";

export function LandingFeatures() {
  const reduce = useReducedMotion();

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
    <section
      id="features"
      className="max-w-6xl mx-auto px-4 py-20 border-t border-border relative z-10 scroll-mt-20 font-sans"
    >
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
          className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
        >
          Built for modern creators
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth, delay: 0.08 }}
          className="text-muted-foreground text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed"
        >
          Standard landing pages fail on mobile. Trivio optimizes every click and interaction.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Feature 1 */}
        <motion.div variants={itemVariants} whileHover={reduce ? {} : { y: -4 }} className="h-full">
          <Card className="bg-card/50 border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300 h-full">
            <CardHeader className="p-0">
              <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Smartphone size={22} />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-2">
                Smart Deep Linking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Convert standard social web links to mobile app URI protocols. Users land directly inside Instagram, Twitter, Spotify, or YouTube native applications.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature 2 */}
        <motion.div variants={itemVariants} whileHover={reduce ? {} : { y: -4 }} className="h-full">
          <Card className="bg-card/50 border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:border-secondary/50 transition-colors duration-300 h-full">
            <CardHeader className="p-0">
              <div className="size-12 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag size={22} />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-2">
                Creator Commerce Shop
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Showcase and sell up to 3 items—courses, E-Books, workshops, or custom downloads. Keep links cleanly integrated without complex store configurations.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature 3 */}
        <motion.div variants={itemVariants} whileHover={reduce ? {} : { y: -4 }} className="h-full">
          <Card className="bg-card/50 border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300 h-full">
            <CardHeader className="p-0">
              <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <TrendingUp size={22} />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-2">
                Link Click Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Track clicks and see how links perform. Live percentages and counters show what content grabs the most attention in real-time.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default LandingFeatures;
