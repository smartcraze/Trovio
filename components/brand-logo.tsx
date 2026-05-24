import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  width?: number;
  height?: number;
  className?: string;
  path?: string;
  noLink?: boolean;
}

export function BrandLogo({
  width = 120,
  height = 36,
  className,
  path = "/",
  noLink = false,
}: BrandLogoProps) {
  const logo = (
    <>
      {/* Light Mode */}
      <Image
        src="/logo-white.png"
        alt="Trivio Logo"
        width={width}
        height={height}
        priority
        className="block dark:hidden object-contain"
      />

      {/* Dark Mode */}
      <Image
        src="/logo-dark.png"
        alt="Trivio Logo"
        width={width}
        height={height}
        priority
        className="hidden dark:block object-contain"
      />
    </>
  );

  if (noLink) {
    return (
      <div className={cn("inline-flex items-center", className)}>
        {logo}
      </div>
    );
  }

  return (
    <Link
      href={path}
      className={cn("inline-flex items-center", className)}
    >
      {logo}
    </Link>
  );
}

export default BrandLogo;