import React from "react";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import { getTheme } from "@/lib/themes";
import LinkCard from "@/components/LinkCard";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Globe, Sparkles, ShoppingBag } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  SpotifyIcon,
  TiktokIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;

  try {
    await dbConnect();
    const userDoc = await User.findOne({ username }).lean();

    if (!userDoc) {
      return {
        title: "User Not Found | Trivio",
        description: "This Trivio profile does not exist.",
      };
    }

    const user = JSON.parse(JSON.stringify(userDoc));

    return {
      title: `${user.name} (@${user.username}) | Trivio`,
      description:
        user.bio ||
        `Check out ${user.name}'s official links and products on Trivio.`,
      openGraph: {
        title: `${user.name} (@${user.username}) | Trivio`,
        description:
          user.bio ||
          `Check out ${user.name}'s official links and products on Trivio.`,
        images: [
          {
            url: user.avatarUrl || "/og.png",
            width: 800,
            height: 600,
            alt: user.name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Profile | Trivio",
    };
  }
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;

  await dbConnect();
  const userDoc = await User.findOne({ username }).lean();

  if (!userDoc) {
    notFound();
  }

  const user = JSON.parse(JSON.stringify(userDoc));

  const theme = getTheme(user.theme);

  // Render social icon mapping
  const renderSocialIcon = (platform: string, url: string) => {
    if (!url) return null;

    const size = 20;
    const iconClass =
      "hover:scale-110 transition duration-300 opacity-80 hover:opacity-100";

    switch (platform) {
      case "instagram":
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            title="Instagram"
          >
            <InstagramIcon size={size} />
          </a>
        );
      case "twitter":
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            title="Twitter / X"
          >
            <TwitterIcon size={size} />
          </a>
        );
      case "youtube":
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            title="YouTube"
          >
            <YoutubeIcon size={size} />
          </a>
        );
      case "spotify":
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            title="Spotify"
          >
            <SpotifyIcon size={size} />
          </a>
        );
      case "github":
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            title="GitHub"
          >
            <GithubIcon size={size} />
          </a>
        );
      case "tiktok":
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            title="TikTok"
          >
            <TiktokIcon size={size} />
          </a>
        );
      case "website":
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            title="Website"
          >
            <Globe size={size} />
          </a>
        );
      default:
        return null;
    }
  };

  const hasSocials = Object.values(user.socials || {}).some(Boolean);

  return (
    <div className={theme.bgClass}>
      {/* Decorative Glow Elements */}
      <div className={theme.glowClass} />

      <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 relative z-10">
        {/* Profile Card */}
        <div
          className={cn(
            "p-6 sm:p-8 rounded-[28px] text-center mb-8 flex flex-col items-center",
            theme.cardClass,
          )}
        >
          <div className="relative mb-4">
            {user.avatarUrl ? (
              <div
                className={cn(
                  "w-24 h-24 rounded-full overflow-hidden relative",
                  theme.avatarRing,
                )}
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className={cn(
                  "w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl font-bold uppercase",
                  theme.avatarRing,
                )}
              >
                {user.name.charAt(0)}
              </div>
            )}
          </div>

          <h1
            className={cn(
              "text-2xl font-bold tracking-tight mb-2",
              theme.textPrimary,
            )}
          >
            {user.name}
          </h1>
          <p className="text-sm opacity-80 mb-4 text-violet-400">
            @{user.username}
          </p>

          {user.bio && (
            <p
              className={cn(
                "text-sm sm:text-base leading-relaxed max-w-sm",
                theme.textSecondary,
              )}
            >
              {user.bio}
            </p>
          )}

          {/* Socials section */}
          {hasSocials && (
            <div className="flex flex-wrap items-center justify-center gap-5 mt-6 pt-6 border-t border-white/5 w-full">
              {Object.entries(user.socials || {}).map(([platform, url]) =>
                renderSocialIcon(platform, url as string),
              )}
            </div>
          )}
        </div>

        {/* Products Showcase (Max 3) */}
        {user.products && user.products.length > 0 && (
          <div className="mb-10 space-y-4">
            <h2 className="text-sm font-semibold tracking-wider uppercase opacity-60 px-2 flex items-center gap-2">
              <ShoppingBag size={14} /> Shop Courses & Products
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {user.products.map((product: any) => (
                <div
                  key={product.id}
                  className={cn(
                    "p-5 rounded-[24px] flex flex-col sm:flex-row gap-4 items-center justify-between",
                    theme.cardClass,
                  )}
                >
                  <div className="flex items-center gap-4 w-full">
                    {product.imageUrl && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border border-white/5 bg-white/5">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base text-left">
                        {product.title}
                      </h3>
                      <p className="text-xs opacity-75 line-clamp-2 text-left">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-3 pt-3 sm:pt-0 border-t border-white/5 sm:border-t-0">
                    <span className="font-bold text-lg text-emerald-400">
                      ${product.price}
                    </span>
                    <a
                      href={product.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "px-4 py-2 text-xs rounded-full font-medium transition",
                        theme.buttonClass,
                      )}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Links List */}
        {user.links && user.links.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wider uppercase opacity-60 px-2 flex items-center gap-2">
              <Sparkles size={14} /> Handpicked Links
            </h2>

            <div className="space-y-3">
              {user.links.map((link: any) => (
                <LinkCard
                  key={link.id}
                  username={user.username}
                  link={link}
                  accentClass={theme.accentClass}
                />
              ))}
            </div>
          </div>
        ) : (
          user.products.length === 0 && (
            <div className="text-center py-12 opacity-50">
              <p className="text-sm">No links or products added yet.</p>
            </div>
          )
        )}

        {/* Footer */}
        <footer className="text-center mt-16 py-6 border-t border-white/5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-wider uppercase opacity-40 hover:opacity-100 transition duration-300"
          >
            Powered by{" "}
            <BrandLogo
              variant="white"
              width={70}
              height={20}
              className="align-middle"
              noLink={true}
            />
          </Link>
        </footer>
      </div>
    </div>
  );
}
