"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motionTokens } from "@/lib/motionTokens";

interface Creator {
  username: string;
  name: string;
  bio: string;
  theme: string;
  avatar: string;
}

interface LandingExamplesProps {
  creators: Creator[];
}

export function LandingExamples({ creators }: LandingExamplesProps) {
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
        ease: motionTokens.easing.smooth,
      },
    },
  };

  return (
    <section
      id="examples"
      className="max-w-6xl mx-auto px-4 py-20 border-t border-border relative z-10 scroll-mt-20 font-sans"
    >
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: motionTokens.duration.normal,
            ease: motionTokens.easing.smooth,
          }}
          className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
        >
          Explore Live Profiles
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: motionTokens.duration.normal,
            ease: motionTokens.easing.smooth,
            delay: 0.08,
          }}
          className="text-muted-foreground text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed"
        >
          Click to view how real creators organize their presence and customize
          their profile styles.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {creators.map((creator) => (
          <motion.div
            key={creator.username}
            variants={itemVariants}
            whileHover={reduce ? {} : { y: -4, scale: 1.01 }}
            className="h-full"
          >
            <Link href={`/${creator.username}`} className="block h-full">
              <Card className="bg-card/50 border-border rounded-2xl p-6 shadow-lg hover:border-primary/30 transition-colors duration-300 group flex flex-col justify-between h-full">
                <CardHeader className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden relative border border-border bg-muted shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                        {creator.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground font-mono">
                        @{creator.username}
                      </p>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {creator.bio}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>
                    Theme: <span className="text-primary">{creator.theme}</span>
                  </span>
                  <span className="flex items-center gap-0.5">
                    View profile{" "}
                    <ChevronRight
                      size={14}
                      className="transform group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default LandingExamples;
