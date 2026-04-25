import OrdersHeader from "@/components/orders/OrdersHeader";
import { getUserOrders } from "@/actions/order.action";
import { Order } from "@/interfaces/orders.interface";
import OrdersListing from "@/components/orders/OrdersListing";
import EmptyOrders from "@/components/orders/EmptyOrders";
export default async function allorders() {
  const orders: Order[] = await getUserOrders();

  if (orders?.length === 0) {
    return <EmptyOrders />;
  }
  return (
    <section className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <OrdersHeader ordersCount={orders?.length} />
        <OrdersListing orders={orders} />
      </div>
    </section>
  );
}
