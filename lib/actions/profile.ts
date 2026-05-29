"use server";

import { revalidatePath } from "next/cache";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import { requireAuth } from "./helpers";

export async function updateProfileAction(_prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const name = formData.get("name")?.toString().trim();
    const bio = formData.get("bio")?.toString().trim() || "";
    const avatarUrl = formData.get("avatarUrl")?.toString().trim() || "";

    if (!name) {
      return { success: false, error: "Name is required" };
    }

    const socials = {
      instagram: formData.get("social_instagram")?.toString().trim() || "",
      twitter: formData.get("social_twitter")?.toString().trim() || "",
      youtube: formData.get("social_youtube")?.toString().trim() || "",
      spotify: formData.get("social_spotify")?.toString().trim() || "",
      github: formData.get("social_github")?.toString().trim() || "",
      tiktok: formData.get("social_tiktok")?.toString().trim() || "",
      website: formData.get("social_website")?.toString().trim() || "",
    };

    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    user.name = name;
    user.bio = bio;
    user.avatarUrl = avatarUrl;
    user.socials = socials;

    await user.save();
    revalidatePath(`/${session.username}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Profile updated successfully" };
  } catch (error: any) {
    console.error("Update Profile Error:", error);
    return {
      success: false,
      error: error.message || "Failed to update profile",
    };
  }
}

export async function updateThemeAction(themeId: string) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    user.theme = themeId;
    await user.save();

    revalidatePath(`/${session.username}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Theme updated successfully" };
  } catch (error: any) {
    console.error("Update Theme Error:", error);
    return { success: false, error: error.message || "Failed to update theme" };
  }
}
