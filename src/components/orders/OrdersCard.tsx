"use client";
import Image from "next/image";
import {
  FaChevronDown,
  FaCreditCard,
  FaLocationDot,
  FaPhone,
  FaReceipt,
} from "react-icons/fa6";
import { GoHash } from "react-icons/go";
import Box from "../shared/icons/Box";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Order } from "@/interfaces/orders.interface";
import { RiCashFill } from "react-icons/ri";
import { getOrderStatus } from "@/lib/helpers/getOrderStatus";
import { formatDate } from "@/lib/helpers/formatDate";
import { useState } from "react";
import { formatPrice } from "@/lib/helpers/formatter";

const statusStyles = {
  green: {
    bg: "bg-green-100",
    text: "text-green-500",
    border: "border-green-200",
    iconBg: "bg-green-500",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-500",
    border: "border-blue-200",
    iconBg: "bg-blue-500",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-500",
    border: "border-amber-200",
    iconBg: "bg-amber-500",
  },
};

export default function OrdersCard({ order }: { order: Order }) {
  const status = getOrderStatus(order);
  const styles = statusStyles[status.color as keyof typeof statusStyles];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={` ${open ? "border-primary-200 shadow-lg shadow-primary-100/50" : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"} border  w-full  rounded-2xl transition-all duration-300 overflow-hidden `}
    >
      <div className="flex items-start flex-row gap-5 p-5 sm:p-6">
        <div className="relative shrink-0">
          <div className=" w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
            <Image
              width={90}
              height={90}
              className="w-full h-full object-contain"
              src={order?.cartItems[0]?.product?.imageCover}
              alt={order?.cartItems[0]?.product?.title}
            />
            {order?.cartItems?.length > 1 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                +{order?.cartItems?.length - 1}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-start justify-between gap-3 mb-3">
            <div>
              <div
                className={`rounded-lg inline-flex items-center gap-1.5 px-2.5 py-1 bg-${status.color}-100 text-${status.color}-500 text-xs font-semibold mb-2`}
              >
                <status.icon className={styles.text} />
                {status.label}
              </div>
              <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                <GoHash className="text-xs text-gray-400" />
                {order.id}
              </h3>
            </div>
            <div
              className={`size-10 ${order?.paymentMethodType === "cash" ? "bg-gray-100" : "bg-violet-100"} rounded-xl flex items-center justify-center`}
            >
              {order?.paymentMethodType === "cash" ? (
                <RiCashFill className="size-5 text-gray-600" />
              ) : (
                <FaCreditCard className="size-5 text-purple-600" />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 *:flex *:items-center *:gap-1.5 *:text-gray-500 mb-4">
            <span>
              <FaCalendarAlt className="text-xs text-gray-400" />
              {formatDate(order?.createdAt)}
            </span>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <div>
              <Box className="size-3 text-xs text-gray-400" />
              {order?.cartItems?.length}{" "}
              {order?.cartItems?.length > 1 ? "items" : "item"}
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <div>
              <FaLocationDot className="text-xs text-gray-400" />{" "}
              {order?.shippingAddress?.city || "Unkown City"}
            </div>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <span className="text-sm font-medium text-gray-400 ml-1">
              <span className=" font-bold text-gray-900 text-2xl">
                {order?.cartItems[0]?.price}
              </span>{" "}
              EGP
            </span>
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${open ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
              <span>{open ? "Hide" : "Details"}</span>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-5 sm:p-6">
          <div className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-primary-100 flex items-center justify-center">
              <FaReceipt className="size-3 text-primary-600" />
            </div>
            Order Items
          </div>
          <div className="space-y-3 mb-5">
            {order?.cartItems?.map((item) => (
              <div
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                key={item?._id}
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 p-2">
                  <Image
                    width={90}
                    height={90}
                    className="w-full h-full object-contain"
                    src={item?.product?.imageCover}
                    alt={item?.product?.title}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className=" font-medium text-gray-900 truncate">
                    {item?.product?.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium text-gray-700">
                      {item?.count}{" "}
                    </span>
                    × {formatPrice(item?.price)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-gray-900">
                    {item?.count * item?.price}
                  </p>
                  <p className="text-xs text-gray-400">EGP</p>
                </div>
              </div>
            ))}
          </div>
          <div className=" grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaMapMarkerAlt className="size-3 text-blue-600" />
                </div>
                Delivery Address
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {order?.shippingAddress?.city || "Unknown City"}
                </p>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                  {order?.shippingAddress?.details || "Unknown Address"}
                </p>
                <p className="text-sm font-medium text-gray-600 flex items-center gap-2 pt-1">
                  <FaPhone className="size-3 text-gray-400" />
                  {order?.user?.phone || "Unknown Phone"}
                </p>
              </div>
            </div>
            <div
              className={`p-4 rounded-xl ${styles.bg} border ${styles.border}`}
            >
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${styles.iconBg}`}
                >
                  <status.icon className={`size-3 text-white`} />
                </div>
                Order Summary
              </h4>
              <div className="space-y-2 *:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(order?.totalOrderPrice - order?.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {order?.shippingPrice === 0
                      ? "Free"
                      : formatPrice(order?.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    {formatPrice(order?.totalOrderPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
