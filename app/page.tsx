import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { BrandLogo } from "@/components/brand-logo";
import ThemeSwitcherPreview from "@/components/ThemeSwitcherPreview";
import LandingHero from "@/components/landing/hero";
import LandingFeatures from "@/components/landing/features";
import LandingExamples from "@/components/landing/examples";
import LandingCtaBanner from "@/components/landing/cta-banner";
import { getSession } from "@/lib/auth";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";

export const metadata = {
  title: "Trivio - Digital Identity, Deep-Links & Creator Commerce",
  description:
    "Share links, sell courses/products, and redirect mobile users directly to apps with deep links. Express your creative identity with beautiful glassmorphic themes.",
};

export default async function HomePage() {
  const session = await getSession();
  let currentUser = null;

  if (session) {
    await dbConnect();
    const userDoc = await User.findById(session.userId).lean();
    if (userDoc) {
      currentUser = JSON.parse(JSON.stringify(userDoc));
    }
  }

  const exampleCreators = [
    {
      username: "creative_mind",
      name: "Elena Rostova",
      bio: "Digital Artist & Creative Director. Creating visual stories that blend surrealism and warm futuristic aesthetics.",
      theme: "Sunset Glow",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      username: "tech_lead",
      name: "Alex Mercer",
      bio: "Software Engineer & Open Source Advocate. Building high-performance microservices and modern web apps.",
      theme: "Cyberpunk",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      username: "sound_design",
      name: "Marcus Vance",
      bio: "Audio Engineer & Synthesizer Enthusiast. Designing cinematic sample packs and ambient tracks.",
      theme: "Midnight Violet",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[0%] left-[10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] left-[5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar Wrapper */}
      <div className="pt-4 px-4 font-sans">
        <Navbar user={currentUser} />
      </div>

      {/* HERO SECTION */}
      <LandingHero />

      {/* INTERACTIVE PREVIEW SECTION */}
      <section
        id="themes"
        className="max-w-6xl mx-auto px-4 py-20 border-t border-border relative z-10 scroll-mt-20"
      >
        <ThemeSwitcherPreview />
      </section>

      {/* FEATURES SECTION */}
      <LandingFeatures />

      {/* EXAMPLES SECTION */}
      <LandingExamples creators={exampleCreators} />

      {/* CTA BANNER */}
      <LandingCtaBanner />

      {/* FOOTER */}
      <footer className="border-t border-border py-12 relative z-10 bg-background font-sans">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-3">
            <BrandLogo variant="dynamic" width={100} height={30} />
            <span className="text-xs text-muted-foreground">
              © 2026. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
