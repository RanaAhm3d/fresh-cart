"use client";
import { motion } from "framer-motion";
import { CardItem, ColorType } from "./CardListing";

const colorClasses: Record<ColorType, string> = {
  blue: "text-blue-500 bg-blue-50",
  emerald: "text-emerald-500 bg-emerald-50",
  orange: "text-orange-500 bg-orange-50",
  purple: "text-purple-500 bg-purple-50",
};

export default function Card({ title, description, color, icon }: CardItem) {
  return (
    <motion.div
      className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={` ${colorClasses[color]} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </motion.div>
  );
}
