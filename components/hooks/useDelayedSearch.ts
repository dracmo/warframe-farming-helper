import { useState, useRef, useEffect } from "react";

export function useDelayedSearch(
  delay: number,
  onSearch: (value: string) => void
) {
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (value: string) => {
    setSearchTerm(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, delay);
  };

  const resetSearch = () => {
    setSearchTerm("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearch("");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { searchTerm, handleChange, resetSearch };
}
