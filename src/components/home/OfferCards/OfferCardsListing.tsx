import OfferCards from "./OfferCards";

const offersData = [
  {
    badge: "Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off om selected organic fruits",
    offer: "40",
    code: "ORGANIC40",
    button: "Shop Now",
  },
  {
    badge: "New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    offer: "25",
    code: "FRESH25",
    button: "Explore Now",
  },
];

export default function OfferCardsListing() {
  return (
    <section className="container overflow-x-hidden mx-auto py-10 px-8">
      <div className="grid md:grid-cols-2 gap-6">
        {offersData.map((offer, index) => (
          <OfferCards data={offer} index={index} key={index} />
        ))}
      </div>
    </section>
  );
}
