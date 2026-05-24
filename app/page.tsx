import {
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import DashboardMockup from "@/components/DashboardMockup";
import Navbar from "@/components/navbar";
import ThemeSwitcherPreview from "@/components/ThemeSwitcherPreview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <div className="pt-4 px-4">
        <Navbar user={currentUser} />
      </div>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-16 sm:pt-28 pb-16 relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-6">
          <Smartphone size={12} className="text-primary" /> Deep Link Aggregator
          & Shop
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08] mb-6">
          Everything you create.
          <br />
          <span className="bg-linear-to-r from-primary via-secondary to-primary/80 bg-clip-text text-transparent">
            One beautiful place.
          </span>
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-8">
          Share custom links. Launch mobile apps instantly on phone clicks.
          Showcase up to 3 course products. Monetize your digital presence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="w-full h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/95 transition shadow-lg shadow-primary/10">
              Create your Trivio <ArrowRight size={16} />
            </Button>
          </Link>
          <a href="#examples" className="w-full sm:w-auto">
            <Button className="w-full h-12 px-8 rounded-full border border-border bg-card/50 hover:bg-card text-foreground font-semibold transition">
              See Examples
            </Button>
          </a>
        </div>

        {/* Dashboard Mockup Component */}
        <div className="mt-16 sm:mt-24">
          <DashboardMockup />
        </div>
      </section>

      {/* INTERACTIVE PREVIEW SECTION */}
      <section
        id="themes"
        className="max-w-6xl mx-auto px-4 py-20 border-t border-border relative z-10 scroll-mt-20"
      >
        <ThemeSwitcherPreview />
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-4 py-20 border-t border-border relative z-10 scroll-mt-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Built for modern creators
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed">
            Standard landing pages fail on mobile. Trivio optimizes every click
            and interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="bg-card/50 border-border rounded-[28px] p-6 shadow-xl flex flex-col justify-between group hover:border-border/80 transition-all duration-300">
            <CardHeader className="p-0">
              <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 shrink-0">
                <Smartphone size={22} />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-2">
                Smart Deep Linking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Convert standard social web links to mobile app URI protocols.
                Users land directly inside Instagram, Twitter, Spotify, or
                YouTube native applications.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-card/50 border-border rounded-[28px] p-6 shadow-xl flex flex-col justify-between group hover:border-border/80 transition-all duration-300">
            <CardHeader className="p-0">
              <div className="size-12 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center mb-6 shrink-0">
                <ShoppingBag size={22} />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-2">
                Creator Commerce Shop
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Showcase and sell up to 3 items—courses, E-Books, workshops, or
                custom downloads. Keep links cleanly integrated without complex
                store configurations.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-card/50 border-border rounded-[28px] p-6 shadow-xl flex flex-col justify-between group hover:border-border/80 transition-all duration-300">
            <CardHeader className="p-0">
              <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 shrink-0">
                <TrendingUp size={22} />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-2">
                Link Click Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Track clicks and see how links perform. Live percentages and
                counters show what content grabs the most attention in
                real-time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* EXAMPLES SECTION */}
      <section
        id="examples"
        className="max-w-6xl mx-auto px-4 py-20 border-t border-border relative z-10 scroll-mt-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Explore Live Profiles
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed">
            Click to view how real creators organize their presence and
            customize their profile styles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exampleCreators.map((creator) => (
            <Link
              key={creator.username}
              href={`/${creator.username}`}
              className="block"
            >
              <Card className="bg-card/50 border-border rounded-[28px] p-6 shadow-lg hover:scale-[1.02] hover:border-border/80 transition duration-300 group flex flex-col justify-between h-full">
                <CardHeader className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden relative border border-border bg-muted shrink-0">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="font-bold text-foreground text-base group-hover:text-primary transition">
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

                <CardContent className="p-0 mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-foreground transition">
                  <span>
                    Theme: <span className="text-primary">{creator.theme}</span>
                  </span>
                  <span className="flex items-center gap-0.5">
                    View profile{" "}
                    <ChevronRight
                      size={14}
                      className="transform group-hover:translate-x-0.5 transition-transform"
                    />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <div className="relative rounded-lg bg-linear-to-br from-primary/10 via-secondary/15 to-transparent border border-border p-8 sm:p-16 text-center overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-color-dodge rounded-[36px] blur-xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Ready to claim your spot?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
            Create your Trivio page in under 2 minutes. Start sharing links,
            launching native apps, and selling courses.
          </p>

          <Link href="/register">
            <Button>
              Get Started for Free <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-12 relative z-10 bg-background">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-3">
            <BrandLogo variant="dynamic" width={100} height={30} />
            <span className="text-xs text-muted-foreground">
              © 2026. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-foreground transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
