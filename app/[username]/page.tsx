import { notFound } from "next/navigation";
import { ProfilePage } from "@/components/profile/profile-page";
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

  return <ProfilePage user={user} theme={theme} />;
}
