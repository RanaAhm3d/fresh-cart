import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const icons = [
  {
    icon: <FaFacebookF />,
  },
  {
    icon: <FaTwitter />,
  },
  {
    icon: <FaInstagram />,
  },
  {
    icon: <FaLinkedinIn />,
  },
];

export default function Links({ className }: { className: string }) {
  return (
    <div className="flex items-center gap-3">
      {icons.map((icon, index) => (
        <Link
          key={index}
          className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors ${className}`}
          href="#"
        >
          {icon.icon}
        </Link>
      ))}
    </div>
  );
}
