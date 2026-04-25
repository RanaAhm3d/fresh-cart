"use server";

import { getUserToken } from "@/lib/helpers/authUtils";
import { AddressesPayloadType } from "@/schema/Addresses.schema";
import { API_BASE_URL } from "@/services/api";
import { revalidateTag } from "next/cache";

export async function getUserAddresses() {
  try {
    const token = await getUserToken();
    const response = await fetch(`${API_BASE_URL}/addresses`, {
      headers: {
        token: token as string,
      },
      next: { tags: ["Addresses"] },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function addUserAddress(formValues: AddressesPayloadType) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${API_BASE_URL}/addresses`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      revalidateTag("Addresses", "max");
    }
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateUserAddress(
  addressId: string,
  formValues: AddressesPayloadType,
) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
      method: "PUT",
      body: JSON.stringify(formValues),
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      revalidateTag("Addresses", "max");
    }
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteUserAddress(addressId: string) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      revalidateTag("Addresses", "max");
    }
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}
