"use server";
import { getUserId, getUserToken } from "@/lib/helpers/authUtils";
import { ShippingAddressPayloadType } from "@/schema/shippingAdress.schema";
import { API_BASE_URL } from "@/services/api";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createCashOrder(
  cartId: string,
  formValues: ShippingAddressPayloadType,
) {
  try {
    const token = await getUserToken();
    const { paymentMethod, ...shippingAddress } = formValues;
    const endpoint =
      paymentMethod === "cash"
        ? `v2/orders/${cartId}`
        : `v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ shippingAddress: shippingAddress }),
      },
    );
    const data = await response.json();
    if (data.status === "success") {
      revalidateTag("cartDetails", "max");
      revalidatePath("/allorders");
    }
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserOrders() {
  try {
    const userId = await getUserId();
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}
