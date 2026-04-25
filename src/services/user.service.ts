import { getUserId, getUserToken } from "@/lib/helpers/authUtils";
import { API_BASE_URL } from "./api";
import { UserInfoPayloadType } from "@/schema/userInfo.schema";
import { UserPasswordPayloadType } from "@/schema/userPassword.shema";

{
  /* User Settings */
}

export async function getUserInfo() {
  try {
    const userId = await getUserId();
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function UpdateUserInformation(formValues: UserInfoPayloadType) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${API_BASE_URL}/users/updateMe`, {
      method: "PUT",
      body: JSON.stringify(formValues),
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors.msg);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function UpdateUserPassword(formValues: UserPasswordPayloadType) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${API_BASE_URL}/users/changeMyPassword`, {
      method: "PUT",
      body: JSON.stringify(formValues),
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
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

{
  /* Addresses */
}
