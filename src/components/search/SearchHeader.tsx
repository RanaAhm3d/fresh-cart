"use client";
import TopLinks from "../shared/TopLinks/TopLinks";
import SearchInput from "./SearchInput";

export default function SearchHeader() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <TopLinks text="Search Results" />
        <SearchInput   />
      </div>
    </div>
  );
}
