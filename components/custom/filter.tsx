"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAppStore } from "@/lib/storage";
import { Sign } from "../hooks/sign";

export type Category = "warframe" | "weapon" | "archwing" | "mech";
export type Subcategory = "standard" | "prime";

interface FilterMenuProps {
  categories: Category[];
  subcategories: Subcategory[];
}

export default function FilterMenu({
  categories,
  subcategories,
}: FilterMenuProps) {
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const selectedSubcategory = useAppStore((state) => state.selectedSubcategory);
  const setCategory = useAppStore((state) => state.setCategory);
  const setSubcategory = useAppStore((state) => state.setSubcategory);

  const toggleCategory = (category: Category) => {
    setCategory(selectedCategory === category ? null : category);
  };

  const handleSubcategoryChange = (subcategory: Subcategory) => {
    setSubcategory(selectedSubcategory === subcategory ? null : subcategory);
  };

  return (
    <div className="md:w-64 md:h-[600px] bg-card/50 shadow-lg shadow-zinc-800/50 rounded-xl fixed ">
      <ScrollArea className="flex flex-col items-center w-full">
        <div className="p-4">
          <button
            onClick={() => setCategory(null)}
            className="text-2xl font-bold flex items-center justify-center w-full py-4 rounded-md hover:text-accent"
          >
            Home
          </button>
          {categories.map((category) => (
            <div key={category} className="mb-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="flex-1 justify-between font-semibold capitalize"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                  {selectedCategory === category ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {selectedCategory === category && (
                <div className="mt-2 ml-6 space-y-2">
                  {subcategories.map((subcategory) => (
                    <div
                      key={`${category}-${subcategory}`}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`${category}-${subcategory}`}
                        checked={selectedSubcategory === subcategory}
                        onChange={() => handleSubcategoryChange(subcategory)}
                        className="w-4 h-4 "
                      />
                      <label
                        htmlFor={`${category}-${subcategory}`}
                        className="text-sm font-medium leading-none capitalize"
                      >
                        {subcategory}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Sign />
        </div>
      </ScrollArea>
    </div>
  );
}
