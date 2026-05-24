import { Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import LinkCard from "@/components/LinkCard";
import { ProductsShowcase } from "@/components/profile/products-showcase";
import { ProfileFooter } from "@/components/profile/profile-footer";
import { ProfileHeader } from "@/components/profile/profile-header";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import { getTheme } from "@/lib/themes";

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

  return (
    <div className={theme.bgClass}>
      {/* Decorative Glow Elements */}
      <div className={theme.glowClass} />

      <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 relative z-10">
        {/* Profile Card component */}
        <ProfileHeader user={user} theme={theme} />

        {/* Products Showcase component */}
        <ProductsShowcase products={user.products} theme={theme} />

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

        {/* Footer component */}
        <ProfileFooter />
      </div>
    </div>
  );
}
