"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ProductsCard from "@/components/home/Products/ProductsCard";
import { Product } from "@/interfaces/product.interface";

export default function ProductSwiper({ products }: { products: Product[] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative">
      <button
        ref={prevRef}
        className="absolute -top-12 right-12 z-10 bg-primary-600 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary-700 transition"
      >
        <FaArrowLeft />
      </button>

      <button
        ref={nextRef}
        className="absolute -top-12 right-0 z-10 bg-primary-600 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary-700 transition"
      >
        <FaArrowRight />
      </button>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        modules={[Navigation]}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation === "object"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
      >
        {products?.map((product) => (
          <SwiperSlide key={product?._id}>
            <ProductsCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
