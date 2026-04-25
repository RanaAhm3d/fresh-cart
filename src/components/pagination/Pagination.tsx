"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  totalPages: number;
  currentPage: number;
}

export function SearchPagination({ totalPages, currentPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };


  const handlePageChange = (pageNumber: number) => {
    const url = createPageURL(pageNumber);
    router.push(url, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-10">
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              currentPage <= 1 && "opacity-50 pointer-events-none",
            )}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <div className="flex items-center gap-2 mx-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors  ",
                  currentPage === page
                    ? "bg-primary-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50",
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              currentPage >= totalPages && "opacity-50 pointer-events-none",
            )}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
