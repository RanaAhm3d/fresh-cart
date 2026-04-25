export function calculateDiscount(price: number, priceAfterDiscount?: number) {
  if (!priceAfterDiscount) return 0;

  const discount = ((price - priceAfterDiscount) / price) * 100;
  return Math.round(discount);
}
