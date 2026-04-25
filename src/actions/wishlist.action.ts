"use server";

import { getUserToken } from "@/lib/helpers/authUtils";
import { API_BASE_URL } from "@/services/api";
import { revalidateTag } from "next/cache";

export async function addProductToWishlist(productId: string) {
  const token = await getUserToken();
  try {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserWishlist() {
  const token = await getUserToken();
  try {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      next: { tags: ["wishlist"] },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteProductFromWishlist(productId: string) {
  const token = await getUserToken();
  try {
    const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
    });

    const data = await response.json();
    if (data.status === "success") {
      revalidateTag("wishlist" , "max");
    }
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return error;
  }
}
