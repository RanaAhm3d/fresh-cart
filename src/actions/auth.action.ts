"use server";

import { ResetPasswordRequest } from "@/components/auth/resetPasswordForm/ResetPasswordForm";
import { ForgetPasswordPayloadType } from "@/schema/forgetPassword.schema";
import { VerifyCodePayloadType } from "@/schema/verifyCode.schema";
import { API_BASE_URL } from "@/services/api";

export async function forgetPassword(email: ForgetPasswordPayloadType) {
  const response = await fetch(`${API_BASE_URL}/auth/forgotPasswords`, {
    method: "POST",
    body: JSON.stringify(email),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function verifyCode(resetCode: VerifyCodePayloadType) {
  const response = await fetch(`${API_BASE_URL}/auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify(resetCode),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function resetPassword(formValues: ResetPasswordRequest) {
  const response = await fetch(`${API_BASE_URL}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
