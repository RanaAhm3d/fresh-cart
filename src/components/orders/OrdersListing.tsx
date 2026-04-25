import { Order } from "@/interfaces/orders.interface";
import OrdersCard from "./OrdersCard";

export default function OrdersListing({ orders }: { orders: Order[] }) {
  if (!Array.isArray(orders)) return null;

  return (
    <div className="grid grid-cols-1 space-y-4 w-full">
      {orders.map((order) => (
        <OrdersCard key={order?._id} order={order} />
      ))}
    </div>
  );
}
