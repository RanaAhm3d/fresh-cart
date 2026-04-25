"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getEncodedToken() {
  const cookie = await cookies();
  const token =
    cookie.get("next-auth.session-token")?.value ||
    cookie.get("__Secure-next-auth.session-token")?.value;
  const encodedToken = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return encodedToken;
}

export async function getUserToken() {
  return (await getEncodedToken())?.accessToken;
}

export async function getUserId() {
  return (await getEncodedToken())?.user?.id;
}
