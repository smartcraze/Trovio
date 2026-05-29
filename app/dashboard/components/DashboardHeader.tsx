"use client";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Eye, LogOut } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  username: string;
  onLogout: () => void;
}

export function DashboardHeader({ username, onLogout }: DashboardHeaderProps) {
  return (
    /*
     * Dashboard Top Header
     * BrandLogo uses variant="dynamic" so it automatically switches:
     *   • light mode → logo-white.png  (block dark:hidden)
     *   • dark  mode → logo-dark.png   (hidden dark:block)
     * NOTE: the variant naming in brand-logo.tsx is intentionally
     * "inverted" relative to the image file names:
     *   variant="white" → /logo-dark.png   (dark ink, for light bg)
     *   variant="dark"  → /logo-white.png  (white ink, for dark bg)
     * Always use variant="dynamic" here so it adapts automatically.
     */
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo variant="dynamic" width={100} height={30} />
          <span className="text-xs px-2.5 py-0.5 rounded bg-muted border border-border text-muted-foreground font-mono">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/${username}`} target="_blank">
            <Button variant="default" size="sm">
              <Eye size={16} />
              {"trivio/"}
              {username}
            </Button>
          </Link>

          <Button
            onClick={onLogout}
            variant="destructive"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-1.5 rounded"
          >
            <LogOut size={16} />{" "}
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
