import { Brand } from "@/interfaces/brand.interface";
import { Category } from "@/interfaces/category.interface";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection({
  title,
  text,
  description,
  isBrands = false,
  icon,
  brand,
  category,
}: {
  title: string;
  text: string;
  description: string;
  isBrands?: boolean;
  icon: React.ReactNode;
  brand?: Brand;
  category?: Category;
}) {
  return (
    <section
      className={`bg-linear-to-br ${isBrands ? "from-violet-600 via-violet-500 to-purple-400" : "from-primary-600 via-primary-500 to-primary-400"} text-white`}
    >
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6  flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <Link
            href={`/${brand ? "brands" : category ? "categories" : "products"}`}
            className={`${brand || category ? "text-white/70 hover:text-white" : "text-white"} font-medium`}
          >
            {title}
          </Link>
          {brand && (
            <>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">{brand.name}</span>
            </>
          )}
          {category && (
            <>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">{category.name}</span>
            </>
          )}
        </nav>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            {brand ? (
              <Image
                width={40}
                height={40}
                alt={brand.name}
                src={brand.image}
                className="w-10 h-10 object-contain"
              />
            ) : category ? (
              <Image
                width={40}
                height={40}
                alt={category.name}
                src={category.image}
                className="w-10 h-10 object-contain"
              />
            ) : (
              icon
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {text}
            </h1>
            <p className="text-white/80 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
