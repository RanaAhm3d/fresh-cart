"use client";
import { signOut } from "next-auth/react";

export function logOut() {
  signOut({
    callbackUrl: "/login",
  });
}
