import Link from "next/link";

export default function LinkedButton({
  text,
  url,
  icon,
  className,
}: {
  text: string;
  url: string;
  icon?: React.ReactNode;
  className: string;
}) {
  return (
    <Link
      href={url}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${className}`}
    >
      {icon}
      {text}
    </Link>
  );
}
