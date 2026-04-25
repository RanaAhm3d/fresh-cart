"use client";
import { logOut } from "@/lib/helpers/logout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { FaGift, FaPhoneAlt, FaTruck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";

export default function UpperNavbar() {
  const { data: session, status } = useSession();

  return (
    <section className="hidden lg:block border-b border-gray-100">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaTruck className="text-primary-600" />
              <span className="text-sm font-medium leading-5 text-gray-500">
                Free Shipping on Orders 500 EGP
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaGift className="text-primary-600" />
              <span className="text-sm font-medium leading-5 text-gray-500">
                New Arrivals Daily
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+1 (800) 123-4567"
              className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <FaPhoneAlt />
              <span className="text-sm ">+1 (800) 123-4567</span>
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <LuMail />
              <span className="text-sm">support@freshcart.com</span>
            </a>
            <div className="w-px h-4 bg-gray-200"></div>
            {status === "unauthenticated" ? (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <BiUser />
                  <span className="text-sm">Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <FaUserPlus />
                  <span className="text-sm">Sign Up</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile/addresses"
                  className="cursor-pointer flex items-center justify-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <BiUser />
                  <span>{session?.user?.name}</span>
                </Link>
                <button
                  onClick={() => logOut()}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <TbLogout />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
