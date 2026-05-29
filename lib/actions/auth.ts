"use server";

import bcrypt from "bcryptjs";
import { logout, setSession } from "@/lib/auth";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";

export async function registerAction(_prevState: any, formData: FormData) {
  try {
    await dbConnect();
    const username = formData.get("username")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString().trim();

    if (!username || !password || !name) {
      return { success: false, error: "All fields are required" };
    }

    if (username.length < 3) {
      return {
        success: false,
        error: "Username must be at least 3 characters long",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long",
      };
    }

    // Check availability
    const existing = await User.findOne({ username });
    if (existing) {
      return { success: false, error: "Username is already taken" };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: passwordHash,
      name,
      theme: "glass-dark",
      socials: {},
      links: [],
      products: [],
    });

    await setSession(newUser._id.toString(), newUser.username);

    return { success: true };
  } catch (error: any) {
    console.error("Register Error:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function loginAction(_prevState: any, formData: FormData) {
  try {
    await dbConnect();
    const username = formData.get("username")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
      return { success: false, error: "Username and password are required" };
    }

    const user = await User.findOne({ username });
    if (!user) {
      return { success: false, error: "Invalid username or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "Invalid username or password" };
    }

    await setSession(user._id.toString(), user.username);

    return { success: true };
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function logoutAction() {
  await logout();
}
