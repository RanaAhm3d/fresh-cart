"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGear, FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const navItems = [
  {
    name: "My Addresses",
    href: "/profile/addresses",
    icon: <FaLocationDot />,
  },
  {
    name: "Settings",
    href: "/profile/settings",
    icon: <FaGear />,
  },
];

export default function ProfileAside() {
  const pathname = usePathname();
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Account</h2>
        </div>
        <ul className="p-2">
          {navItems.map((item) => (
            <li key={item.href} className="mb-1 last:mb-0">
              <Link
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${pathname === item.href ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                href={item.href}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${pathname === item.href ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}
                >
                  {item.icon}
                </div>
                <span className="font-medium flex-1">{item.name}</span>
                <IoIosArrowForward />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
