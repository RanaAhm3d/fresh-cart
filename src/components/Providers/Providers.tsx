"use client";
import CartProvider from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import WishlistProvider from "@/context/WishlistContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>
          <UserProvider> {children}</UserProvider>
        </WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}
