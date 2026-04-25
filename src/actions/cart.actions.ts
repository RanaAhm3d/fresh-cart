"use server";

import { getUserToken } from "@/lib/helpers/authUtils";
import { revalidateTag } from "next/cache";

export async function addToCart(productId: string) {
  try {
    const token = await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart`,
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    if (data.status === "success") {
      revalidateTag("cartDetails", "max");
      revalidateTag("wishlist", "max");
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserCart() {
  try {
    const token = await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        next: { tags: ["cartDetails"] },
      },
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateProductQty(productId: string, count: number) {
  try {
    const token = await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    if (data.status === "success") {
      revalidateTag("cartDetails", "max");
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function clearUserCart() {
  try {
    const token = await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    if (data.status === "success") {
      revalidateTag("cartDetails", "max");
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function removeCartItem(productId: string) {
  try {
    const token = await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    if (data.status === "success") {
      revalidateTag("cartDetails", "max");
    }
    return data;
  } catch (error) {
    return error;
  }
}
