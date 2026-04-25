"use client";

import { Heart, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { HiOutlineUserCircle } from "react-icons/hi";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { FaArrowRightFromBracket, FaCartShopping } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbLogout } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import BoxOpen from "@/components/shared/icons/BoxOpen";
import { IoMdHeartEmpty } from "react-icons/io";
import { useCart } from "@/context/CartContext";
import { getUserCart } from "@/actions/cart.actions";
import { useWishlist } from "@/context/WishlistContext";
import { getUserWishlist } from "@/actions/wishlist.action";
import AddressBook from "@/components/shared/icons/AddressBook";
import { logOut } from "@/lib/helpers/logout";
import NavSerachInput from "@/components/search/NavSerachInput";
import Headset from "@/components/shared/icons/Headset";
import { RiUserLine } from "react-icons/ri";

interface MenuItem {
  title: string;
  url: string;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    className?: string;
  };
  menu?: MenuItem[];
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/freshcart-logo.svg",
    alt: "Freshcart logo",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Shop",
      url: "/products",
    },
    {
      title: "Categories",
      url: "#",
      items: [
        {
          title: "All Categories",
          url: "/categories",
        },
        {
          title: "Electronics",
          url: "/products?category=6439d2d167d9aa4ca970649f",
        },
        {
          title: "Woman's Fashion",
          url: "/products?category=6439d58a0049ad0b52b9003f",
        },
        {
          title: "Men's Fashion",
          url: "/products?category=6439d5b90049ad0b52b90048",
        },
        {
          title: "Beauty & Health",
          url: "/products?category=6439d30b67d9aa4ca97064b1",
        },
      ],
    },
    {
      title: "Brands",
      url: "/brands",
    },
  ],
  className,
}: Navbar1Props) => {
  const { status, data: session } = useSession();
  const { numOfCartItems, updateNumOfCartItems } = useCart();
  const { numOfWishlistItems, updateNumOfWishlistItems } = useWishlist();

  useEffect(() => {
    if (status === "authenticated") {
      getUserCart().then((res) => {
        updateNumOfCartItems(res.numOfCartItems);
      });
    }
  }, [status, updateNumOfCartItems]);

  useEffect(() => {
    if (status === "authenticated") {
      getUserWishlist().then((res) => {
        updateNumOfWishlistItems(res.count);
      });
    }
  }, [status, updateNumOfWishlistItems]);

  return (
    <section
      className={cn("py-4 sticky top-0 z-50 bg-white shadow-sm", className)}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between gap-4 lg:gap-8 lg:flex">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={31}
              loading="eager"
            />
          </Link>
          {/*Search Input */}
          <NavSerachInput />
          <div className="hidden xl:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-1 lg:gap-2">
            <Link
              href="/contact"
              className="flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                <Headset className="size-5" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-gray-400">Support</span>
                <span className="font-semibold text-gray-700">24/7 Help</span>
              </div>
            </Link>
            <Link
              title="Wishlist"
              href="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group text-gray-500 group-hover:text-primary-600 "
            >
              <Heart size={22} />
              {numOfWishlistItems > 0 && (
                <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {numOfWishlistItems}
                </span>
              )}
            </Link>
            <Link
              title="Cart"
              href="/cart"
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group text-gray-500 group-hover:text-primary-600 "
            >
              <FaCartShopping size={22} />
              {numOfCartItems > 0 && (
                <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {numOfCartItems}
                </span>
              )}
            </Link>
            {status === "unauthenticated" ? (
              <Link
                href="/login"
                className="flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-primary-600/20"
              >
                <BiUser />
                Sign In
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    title="Account"
                    variant="ghost"
                    className=" px-2.5 py-5 rounded-full hover:bg-gray-100 transition-colors group cursor-pointer"
                  >
                    <HiOutlineUserCircle className="size-6 text-gray-500 group-hover:text-primary-600 transition-colors" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 ">
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <HiOutlineUserCircle className="size-6 text-primary-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        {session?.user?.name}
                      </span>
                      <span className="text-xs text-gray-400 truncate">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className=" *:px-4 *:py-2.5 *:text-sm *:text-gray-600 *:hover:text-primary-600 *:hover:bg-primary-50 *:transition-colors">
                    <Link
                      href="/profile/addresses"
                      className="flex items-center gap-2 *:hover:text-primary-600 transition-colors"
                    >
                      <div className="flex items-center gap-2 ms-2">
                        <BiUser className="text-gray-400 " />
                        My Profile
                      </div>
                    </Link>
                    <Link href="/allorders" className="flex items-center gap-2">
                      <div className="flex items-center gap-2 ms-2">
                        <BoxOpen className="size-4 text-gray-400 hover:text-primary-600" />
                        My Orders
                      </div>
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-2 *:hover:text-primary-600 transition-colors"
                    >
                      <div className="flex items-center gap-2 ms-2">
                        <IoMdHeartEmpty className="text-gray-400 " />
                        My Wishlist
                      </div>
                    </Link>
                    <Link
                      href="/profile/addresses"
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2 ms-2">
                        <AddressBook className="w-4 text-gray-400 " />
                        Addresses
                      </div>
                    </Link>
                    <Link
                      href="/profile/settings"
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2 ms-2">
                        <IoSettingsSharp className="text-gray-400 " />
                        Settings
                      </div>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <button
                    onClick={() => logOut()}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <DropdownMenuItem>
                      <TbLogout />
                      Sign Out
                    </DropdownMenuItem>
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} alt={logo.alt} width={130} height={31} />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group text-gray-500 group-hover:text-primary-600 "
              >
                <Heart size={22} />
                {numOfWishlistItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {numOfWishlistItems}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group text-gray-500 group-hover:text-primary-600 "
              >
                <FaCartShopping size={22} />

                {numOfCartItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {numOfCartItems}
                  </span>
                )}
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors">
                    <Menu className="size-4" />
                  </button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-2">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={140}
                          height={31}
                        />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <Separator className="bg-gray-100" />
                  <NavSerachInput aside />
                  <div className="flex flex-col space-y-1 px-4">
                    {menu.map((item, index) => (
                      <Link
                        key={index}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href={item.url}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <Separator className="bg-gray-100" />
                  <div className="px-4 space-y-1">
                    <Link
                      className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
                      href="/wishlist"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                          <Heart size={22} className="text-red-500" />
                        </div>
                        <span className="font-medium text-gray-700">
                          Wishlist
                        </span>
                      </div>
                      {numOfWishlistItems > 0 && (
                        <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {numOfWishlistItems}
                        </span>
                      )}
                    </Link>
                    <Link
                      className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
                      href="/cart"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center">
                          <FaCartShopping
                            size={22}
                            className="text-primary-600"
                          />
                        </div>
                        <span className="font-medium text-gray-700">Cart</span>
                      </div>
                      {numOfCartItems > 0 && (
                        <span className="bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {numOfCartItems}
                        </span>
                      )}
                    </Link>
                  </div>
                  <Separator className="bg-gray-100" />
                  {status === "unauthenticated" ? (
                    <div className="flex flex-row items-center justify-center gap-3 p-4">
                      <Link
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors w-full"
                        href="/login"
                      >
                        Sign In
                      </Link>
                      <Link
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition-colors w-full"
                        href="/register"
                      >
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <div className="p-4 space-y-1">
                      <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
                        href="/profile/addresses"
                      >
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                          <RiUserLine size={20} className="text-gray-500" />
                        </div>
                        <span className="font-medium text-gray-700">
                          {session?.user.name}
                        </span>
                      </Link>
                      <button
                        onClick={() => logOut()}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                          <FaArrowRightFromBracket
                            size={20}
                            className="text-red-500"
                          />
                        </div>
                        <span className="font-medium text-red-600">
                          Sign Out
                        </span>
                      </button>
                    </div>
                  )}

                  <Link
                    className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-primary-50 transition-colors"
                    href="/contact"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <Headset className="size-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">
                        Need Help?
                      </div>
                      <div className="text-sm text-primary-600">
                        Contact Support
                      </div>
                    </div>
                  </Link>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
      </div>
    </Link>
  );
};

export default Navbar;
