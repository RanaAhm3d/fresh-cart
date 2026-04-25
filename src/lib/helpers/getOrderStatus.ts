import { Order } from "@/interfaces/orders.interface";
import { FaCheckCircle, FaTruck, FaClock } from "react-icons/fa";

export function getOrderStatus(order: Order) {
  if (order.isDelivered) {
    return {
      label: "Delivered",
      icon: FaCheckCircle,
      color: "green",
    };
  }

  if (order.isPaid) {
    return {
      label: "On the way",
      icon: FaTruck,
      color: "blue",
    };
  }

  return {
    label: "Processing",
    icon: FaClock,
    color: "amber",
  };
}