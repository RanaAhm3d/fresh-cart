import Image from "next/image";
import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { FaClock, FaTruck } from "react-icons/fa6";

export default function LoginBanner() {
  return (
    <section className="text-center space-y-6">
      <Image
        src="/images/login-banner.png"
        width={300}
        height={300}
        alt="fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
        className="w-full h-96 object-cover rounded-2xl shadow-lg"
      />
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="text-lg text-gray-600">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 *:flex *:items-center *:gap-2">
          <div>
            <FaTruck className="text-primary-600" size={20} />
            Free Delivery
          </div>
          <div>
            <FaShieldAlt className="text-primary-600" size={20} />
            Secure Payment
          </div>
          <div>
            <FaClock className="text-primary-600" size={20} />
            24/7 Support
          </div>
        </div>
      </div>
    </section>
  );
}
