"use server";

import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";

// Track click on a link
export async function trackClickAction(username: string, linkId: string) {
  try {
    await dbConnect();
    await User.updateOne(
      { username, "links.id": linkId },
      { $inc: { "links.$.clickCount": 1 } },
    );
    return { success: true };
  } catch (error: any) {
    console.error("Click Tracking Error:", error);
    return { success: false, error: error.message };
  }
}
