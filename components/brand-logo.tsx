"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "white" | "dark" | "default" | "dynamic";
  width?: number;
  height?: number;
  className?: string;
  path?: string;
  noLink?: boolean;
}

export function BrandLogo({
  variant = "dynamic",
  width = 120,
  height = 36,
  className,
  path = "/",
  noLink = false,
}: BrandLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let src = "/logo-white.png"; // Fallback to white for default dark experience

  if (variant === "white") {
    src = "/logo-white.png";
  } else if (variant === "dark") {
    src = "/logo-dark.png";
  } else if (variant === "default") {
    src = "/logo.png";
  } else {
    // dynamic theme-based logo selection
    if (mounted && resolvedTheme === "light") {
      src = "/logo-dark.png";
    } else {
      src = "/logo-white.png";
    }
  }

  const logoImage = (
    <Image
      src={src}
      alt="Trivio Logo"
      width={width}
      height={height}
      priority
      className="object-contain h-auto w-auto"
      style={{ maxWidth: `${width}px` }}
    />
  );

  if (noLink) {
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        {logoImage}
      </span>
    );
  }

  return (
    <Link
      href={path}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {logoImage}
    </Link>
  );
}

export default BrandLogo;
