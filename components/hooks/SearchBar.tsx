import React from "react";
import { useDelayedSearch } from "./useDelayedSearch";
import { RotateCcw } from "lucide-react";

type SearchBarProps = {
  onSearch: (value: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const { searchTerm, handleChange, resetSearch } = useDelayedSearch(
    500,
    onSearch
  );

  return (
    <div className="relative w-2/3 md:w-1/2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search by name..."
        className="w-full p-2 border border-gray-300 rounded-md pr-10"
      />
      <button
        onClick={resetSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <RotateCcw />
      </button>
    </div>
  );
}
