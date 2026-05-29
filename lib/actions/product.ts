"use server";

import { revalidatePath } from "next/cache";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import { requireAuth } from "./helpers";

export async function addProductAction(_prevState: any, formData: FormData) {
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
      id: `prod-${Math.random().toString(36).substring(2, 9)}`,
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
  _prevState: any,
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
