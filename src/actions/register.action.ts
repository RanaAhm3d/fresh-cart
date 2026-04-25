"use server";

import { RegisterPayloadType } from "@/schema/register.schema";
import { API_BASE_URL } from "@/services/api";

export async function registerHandler(formValues: RegisterPayloadType) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return error;
  }
}
