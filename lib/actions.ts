"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getSession, logout, setSession } from "./auth";
import User from "./models/User";
import dbConnect from "./mongodb";

// Custom helper to ensure the user is authenticated and return their ID/username
async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized. Please log in first.");
  }
  return session;
}

export async function registerAction(prevState: any, formData: FormData) {
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

export async function loginAction(prevState: any, formData: FormData) {
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

export async function updateProfileAction(prevState: any, formData: FormData) {
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

export async function addLinkAction(prevState: any, formData: FormData) {
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
      id: "link-" + Math.random().toString(36).substring(2, 9),
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
  prevState: any,
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

export async function addProductAction(prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (user.products.length >= 3) {
      return {
        success: false,
        error: "You can showcase a maximum of 3 products.",
      };
    }

    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const priceStr = formData.get("price")?.toString().trim();
    const imageUrl = formData.get("imageUrl")?.toString().trim() || "";
    const purchaseUrl = formData.get("purchaseUrl")?.toString().trim();

    if (!title || !description || !priceStr || !purchaseUrl) {
      return {
        success: false,
        error: "All fields except image URL are required",
      };
    }

    const price = Number.parseFloat(priceStr);
    if (Number.isNaN(price) || price < 0) {
      return { success: false, error: "Price must be a valid positive number" };
    }

    const newProduct = {
      id: "prod-" + Math.random().toString(36).substring(2, 9),
      title,
      description,
      price,
      imageUrl,
      purchaseUrl,
    };

    user.products.push(newProduct);
    await user.save();

    revalidatePath(`/${session.username}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Product added successfully" };
  } catch (error: any) {
    console.error("Add Product Error:", error);
    return { success: false, error: error.message || "Failed to add product" };
  }
}

export async function editProductAction(
  productId: string,
  prevState: any,
  formData: FormData,
) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const priceStr = formData.get("price")?.toString().trim();
    const imageUrl = formData.get("imageUrl")?.toString().trim() || "";
    const purchaseUrl = formData.get("purchaseUrl")?.toString().trim();

    if (!title || !description || !priceStr || !purchaseUrl) {
      return {
        success: false,
        error: "All fields except image URL are required",
      };
    }

    const price = Number.parseFloat(priceStr);
    if (Number.isNaN(price) || price < 0) {
      return { success: false, error: "Price must be a valid positive number" };
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const product = user.products.find((p: any) => p.id === productId);
    if (!product) {
      return { success: false, error: "Product not found" };
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.imageUrl = imageUrl;
    product.purchaseUrl = purchaseUrl;

    await user.save();

    revalidatePath(`/${session.username}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Product updated successfully" };
  } catch (error: any) {
    console.error("Edit Product Error:", error);
    return {
      success: false,
      error: error.message || "Failed to update product",
    };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    user.products = user.products.filter((p: any) => p.id !== productId);
    await user.save();

    revalidatePath(`/${session.username}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Product deleted successfully" };
  } catch (error: any) {
    console.error("Delete Product Error:", error);
    return {
      success: false,
      error: error.message || "Failed to delete product",
    };
  }
}

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
