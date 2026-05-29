"use server";

import { revalidatePath } from "next/cache";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import { requireAuth } from "./helpers";

export async function addLinkAction(_prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const title = formData.get("title")?.toString().trim();
    const url = formData.get("url")?.toString().trim();
    const isDeepLink = formData.get("isDeepLink") === "true";

    if (!title || !url) {
      return { success: false, error: "Title and URL are required" };
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const newLink = {
      id: `link-${Math.random().toString(36).substring(2, 9)}`,
      title,
      url,
      isDeepLink,
      clickCount: 0,
    };

    user.links.push(newLink);
    await user.save();

    revalidatePath(`/${session.username}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Link added successfully" };
  } catch (error: any) {
    console.error("Add Link Error:", error);
    return { success: false, error: error.message || "Failed to add link" };
  }
}

export async function editLinkAction(
  linkId: string,
  _prevState: any,
  formData: FormData,
) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const title = formData.get("title")?.toString().trim();
    const url = formData.get("url")?.toString().trim();
    const isDeepLink = formData.get("isDeepLink") === "true";

    if (!title || !url) {
      return { success: false, error: "Title and URL are required" };
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const link = user.links.find((l: any) => l.id === linkId);
    if (!link) {
      return { success: false, error: "Link not found" };
    }

    link.title = title;
    link.url = url;
    link.isDeepLink = isDeepLink;

    await user.save();

    revalidatePath(`/${session.username}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Link updated successfully" };
  } catch (error: any) {
    console.error("Edit Link Error:", error);
    return { success: false, error: error.message || "Failed to update link" };
  }
}

export async function deleteLinkAction(linkId: string) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    user.links = user.links.filter((l: any) => l.id !== linkId);
    await user.save();

    revalidatePath(`/${session.username}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Link deleted successfully" };
  } catch (error: any) {
    console.error("Delete Link Error:", error);
    return { success: false, error: error.message || "Failed to delete link" };
  }
}
