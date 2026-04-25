"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SliderContent = [
  {
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    firstButton: "Shop Now",
    firstLink: "/products",
    secondButton: "View Deals",
    secondLink: "/deals",
  },
  {
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    firstButton: "Shop Now",
    firstLink: "/products",
    secondButton: "Learn More",
    secondLink: "/about",
  },
  {
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    firstButton: "Order Now",
    firstLink: "/products",
    secondButton: "Delivery Info",
    secondLink: "/delivery",
  },
];

export default function HomeSlider() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        loop={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <div className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-primary-600 hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center rounded-full bg-white">
          <IoIosArrowBack size={24} />
        </div>
        <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-primary-600 hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center rounded-full bg-white">
          <IoIosArrowForward size={24} />
        </div>
        {SliderContent.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-100">
              <Image
                src="/images/home-slider.png"
                alt="slider"
                width={900}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container px-4 md:px-15 h-full content-center ">
                  <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-3xl font-bold mb-4 max-w-96"
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="mt-4"
                  >
                    <Link
                      className="px-4 py-2 bg-white rounded-sm border-2 border-white/50 text-blue-500 font-medium"
                      href={item.firstLink}
                    >
                      {item.firstButton}
                    </Link>
                    <Link
                      className="px-4 py-2  rounded-sm bg-transparent border-2 border-white/50 text-white ml-2"
                      href={item.secondLink}
                    >
                      {item.secondButton}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
