"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

export default function ProductSwiper({
  productImages,
}: {
  productImages: string[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4 p-2">
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {productImages?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={300}
              height={300}
              src={image}
              alt={image}
              className="mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper my-2 cursor-pointer"
      >
        {productImages?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={300}
              height={300}
              src={image}
              alt={image}
              className="mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
