"use server";
import { getUserToken } from "@/lib/helpers/authUtils";
import { ReviewPayloadType } from "@/schema/review.schema";
import { API_BASE_URL } from "@/services/api";
import { revalidateTag } from "next/cache";

export async function getProductReviews(productId: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/reviews`,
      {
        next: { tags: [`productReviews`] },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function AddReview(
  productId: string,
  formValues: ReviewPayloadType,
) {
  try {
    const token = await getUserToken();
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(formValues),
      },
    );
    const data = await response.json();
    if (data.status === "success") {
      revalidateTag(`productReviews`, "max");
    }
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateReview(
  reviewId: string,
  formValues: ReviewPayloadType,
) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(formValues),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    if (data.status === "success") {
      revalidateTag(`productReviews`, "max");
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function removeReview(reviewId: string) {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("user is unauthorized");

    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      return { status: response.status, message: "Failed to delete" };
    }

    const responseText = await response.text();
    if (!responseText) return { message: "success" };
    return JSON.parse(responseText);
  } catch (error) {
    return error;
  }
}
