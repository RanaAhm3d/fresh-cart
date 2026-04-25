import House from "@/components/shared/icons/House";
import { Product } from "@/interfaces/product.interface";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface NavLinksProps {
  product: Product;
}

export default function NavLinks({ product }: NavLinksProps) {
  const links = [
    {
      title: "Home",
      icon: <House />,
      url: "/",
    },
    {
      title: `${product?.category?.name}`,
      url: `/categories/${product?.category?._id}`,
    },
    {
      title: `${product?.subcategory?.[0]?.name}`,
      url: `/categories/${product?.category?._id}/${product?.subcategory?.[0]?._id}`,
    },
  ];
  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex flex-row items-center flex-wrap gap-1 text-sm *:text-gray-500 *:hover:text-primary-600 *:transition">
        {links.map((link) => (
          <div className="flex flex-row items-center gap-2" key={link.url}>
            <Link className="flex items-center gap-1.5" href="/">
              {link.icon}
              {link.title}
            </Link>
            <IoIosArrowForward />
          </div>
        ))}
        <span className="text-gray-900 font-medium truncate max-w-xs">
          {product?.title || "undefined"}
        </span>
      </div>
    </nav>
  );
}
