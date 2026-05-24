"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "Themes",
    href: "/#themes",
  },
  {
    label: "Explore",
    href: "/#examples",
  },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 bg-transparent" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-circle-half-2 transition-transform duration-500 hover:rotate-180"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3v18" />
        <path d="M12 14l7 -7" />
        <path d="M12 19l8.5 -8.5" />
        <path d="M12 9l4.5 -4.5" />
      </svg>
    </Button>
  );
}

interface NavbarProps {
  user?: {
    name: string;
    username: string;
    avatarUrl?: string;
  } | null;
}

function Navbar({ user }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="mx-auto w-full max-w-6xl">
      <div className="flex items-center justify-between rounded-xl border border-border bg-card/70 px-6 py-4 backdrop-blur-xl sm:px-8">
        <div className="flex items-center gap-3">
          <BrandLogo path="/" />
        </div>

        <nav className="hidden items-center gap-10 text-muted-foreground md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-primary font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center md:flex animate-fade-in gap-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" passHref>
                <Button variant="default">Dashboard</Button>
              </Link>
              <Link
                href={`/${user.username}`}
                className="flex items-center gap-2"
                title={`View @${user.username}`}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-border object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}{" "}
              </Link>
            </div>
          ) : (
            <ButtonGroup>
              <Link href="/login" passHref>
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button>Get started</Button>
              </Link>
            </ButtonGroup>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="mt-4 rounded-xl border border-border bg-card/85 p-4 shadow-lg backdrop-blur-xl md:hidden animate-fade-in"
        >
          <nav className="flex flex-col gap-3 text-muted-foreground">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 transition hover:bg-muted/60 hover:text-primary font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-border pt-4">
            {user ? (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {user.name}
                  </span>
                </div>
                <Link href="/dashboard" passHref>
                  <Button variant="outline" className="text-xs h-8">
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <ButtonGroup orientation="vertical" className="w-full">
                <Link href="/login" passHref className="w-full">
                  <Button variant="ghost" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
                <Link href="/register" passHref className="w-full">
                  <Button className="w-full justify-center">Get started</Button>
                </Link>
              </ButtonGroup>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
