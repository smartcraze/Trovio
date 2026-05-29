"use server";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";

export async function ChangeTheme(username: string, theme: string) {
  try {
    await dbConnect();
    await User.updateOne({ username }, { $set: { theme } });
    return { success: true };
  } catch (error: unknown) {
    console.error("Theme Change Error:", error);
    return { success: false, error: (error as Error).message };
  }
}
