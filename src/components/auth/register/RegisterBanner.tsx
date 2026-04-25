import Image from "next/image";
import { FaShieldAlt, FaStar } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const data = [
  {
    icon: <FaStar size={20} />,
    title: "Premium Quality",
    description: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: <FaTruckFast size={20} />,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas",
  },
  {
    icon: <FaShieldAlt size={20} />,
    title: "Secure Shopping",
    description: "Your data and payments are completely secure",
  },
];

export default function RegisterBanner() {
  return (
    <>
      <h1 className="text-4xl font-bold">
        Welcome to <span className="text-primary-600">FreshCart</span>
      </h1>
      <p className="text-xl mt-2 mb-4">
        Join thousands of happy customers who enjoy fresh groceries delivered
        right to their doorstep.
      </p>
      <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
        {data.map((item, index) => (
          <li key={index}>
            <div className="icon size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center">
              {item.icon}
            </div>
            <div className="content">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="review bg-white shadow-sm p-4 rounded-md">
        <div className="author flex items-center gap-4 mb-4">
          <Image
            alt="author-avatar"
            src="/images/review-author.png"
            loading="lazy"
            width={512}
            height={512}
            className="size-12 rounded-full"
          />
          <div>
            <h3>Sarah Johnson</h3>
            <div className="rating flex items-center  *:text-yellow-300">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FaStar key={index} />
                ))}
            </div>
          </div>
        </div>
        <p className="italic text-gray-600">
          &quot;FreshCart has transformed my shopping experience. The quality of
          the products is outstanding, and the delivery is always on time.
          Highly recommend!&quot;
        </p>
      </div>
    </>
  );
}
