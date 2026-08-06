"use client";

import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative px-4">
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full py-2 px-4 pl-8 rounded-lg border border-card-border bg-zinc-800 text-sm outline-none"
      />
    </div>
  );
};
