import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "white" | "dark" | "default" | "dynamic";
  width?: number;
  height?: number;
  className?: string;
  path?: string;
  noLink?: boolean;
}

/**
 * LOGO_MAP — intentionally "inverted" naming:
 *
 *  variant="white" → /logo-dark.png   dark-ink logo (use on LIGHT backgrounds)
 *  variant="dark"  → /logo-white.png  white-ink logo (use on DARK backgrounds)
 *  variant="dynamic" (default) — renders BOTH images and CSS-toggles them:
 *      • /logo-white.png  visible in light mode  (block dark:hidden)
 *      • /logo-dark.png   visible in dark  mode  (hidden dark:block)
 *
 * TL;DR — always prefer variant="dynamic" so the correct logo shows
 * automatically when the user switches themes.
 */
const LOGO_MAP = {
  white: "/logo-dark.png",   // dark-ink logo for LIGHT backgrounds
  dark: "/logo-white.png",   // white-ink logo for DARK backgrounds
  default: "/logo.png",
} as const;


export function BrandLogo({
  variant = "dynamic",
  width = 120,
  height = 36,
  className,
  path = "/",
  noLink = false,
}: BrandLogoProps) {
  const imageProps = {
    alt: "Trivio Logo",
    width,
    height,
    priority: true,
    className: "object-contain h-auto w-auto",
    style: {
      maxWidth: `${width}px`,
    },
  };

  const logo =
    variant === "dynamic" ? (
      <>
        <Image
          src="/logo-white.png"
          {...imageProps}
          className={cn(imageProps.className, "block dark:hidden")}
        />

        <Image
          src="/logo-dark.png"
          {...imageProps}
          className={cn(imageProps.className, "hidden dark:block")}
        />
      </>
    ) : (
      <Image src={LOGO_MAP[variant]} {...imageProps} />
    );

  const wrapperClass = cn("inline-flex items-center", className);

  if (noLink) {
    return <span className={wrapperClass}>{logo}</span>;
  }

  return (
    <Link href={path} className={wrapperClass}>
      {logo}
    </Link>
  );
}

export default BrandLogo;