import Link from "next/link";

export default function TopLinks({
  isCheckout,
  text,
}: {
  isCheckout?: boolean;
  text: string;
}) {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link className="hover:text-primary-600 transition" href="/">
          Home
        </Link>
        <span>/</span>
        <span
          className={`${isCheckout ? "text-gray-400" : "text-gray-900"} font-medium`}
        >
          {text}
        </span>
        {isCheckout && (
          <>
            <span>/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </>
        )}
      </nav>
    </>
  );
}
