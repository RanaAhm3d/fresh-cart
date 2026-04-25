"use client"
import { useRouter, usePathname } from "next/navigation";
export default function ClearFiltersButton({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
      const router = useRouter();
  const pathname = usePathname();

  const handleClear = () => {
    router.push(pathname); 
  };
  return (
    <button
    onClick={handleClear}
      className={` transition-colors ${className}`}
    >
      {text}
    </button>
  );
}
