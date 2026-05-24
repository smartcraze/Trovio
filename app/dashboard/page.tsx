import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Trivio",
  description:
    "Manage your links, showcase products, and customize your theme.",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  await dbConnect();
  const user = await User.findById(session.userId);

  if (!user) {
    redirect("/login");
  }

  // Convert mongoose model to plain object for Client Component
  const plainUser = JSON.parse(JSON.stringify(user));

  return <DashboardClient user={plainUser} />;
}
