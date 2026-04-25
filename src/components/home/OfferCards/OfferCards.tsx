"use client";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

interface Data {
  badge: string;
  title: string;
  description: string;
  offer: string;
  code: string;
  button: string;
}

interface OfferCardsProps {
  data: Data;
  index: number;
}
export default function OfferCards({ data, index }: OfferCardsProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -80 : 80,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${data.offer === "40" ? " from-emerald-500 to-emerald-700" : "from-orange-500 to-rose-700"} p-8 text-white `}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
          <span>{data.offer === "40" ? "🔥" : "✨"}</span>
          <span>{data.badge}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{data.title}</h3>
        <p className="text-white/80 mb-4">{data.description}</p>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-bold">{data.offer}% OFF</span>
          <div className="text-sm text-white/70">
            Use code: <span className="font-bold text-white">{data.code}</span>
          </div>
        </div>
        <Link
          href={"/products"}
          className={`inline-flex items-center gap-2 bg-white ${data.offer === "40" ? "text-emerald-600" : "text-orange-500"} px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors`}
        >
          {data.button}
          <FaArrowRightLong />
        </Link>
      </div>
    </motion.section>
  );
}
