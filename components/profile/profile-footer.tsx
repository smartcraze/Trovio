"use client";

import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import { BrandLogo } from "@/components/brand-logo";

export function ProfileFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="text-center mt-16 py-6 border-t border-white/5"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-wider uppercase opacity-40 hover:opacity-100 transition duration-300"
      >
        <span>Powered by</span>
        <BrandLogo
          variant="white"
          width={70}
          height={20}
          className="align-middle"
          noLink={true}
        />
      </Link>
    </motion.footer>
  );
}

export default ProfileFooter;
