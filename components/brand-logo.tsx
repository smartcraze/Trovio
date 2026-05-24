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

const LOGO_MAP = {
  white: "/logo-dark.png",
  dark: "/logo-white.png",
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