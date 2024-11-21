"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import { useAppStore } from "@/lib/storage";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export type Category = "warframe" | "weapon" | "archwing" | "mech";
export type Subcategory = "standard" | "prime";

interface HamburgerMenuProps {
  categories: Category[];
  subcategories: Subcategory[];
}

export default function FilterPhoneMenu({
  categories,
  subcategories,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const selectedSubcategory = useAppStore((state) => state.selectedSubcategory);
  const setCategory = useAppStore((state) => state.setCategory);
  const setSubcategory = useAppStore((state) => state.setSubcategory);

  const { data: session } = useSession();
  const name = session ? session?.user?.name : "Login";
  const icon = session?.user?.image || "/default-user-image.png";

  const toggleCategory = (category: Category) => {
    setCategory(selectedCategory === category ? null : category);
  };

  const handleSubcategoryChange = (subcategory: Subcategory) => {
    setSubcategory(selectedSubcategory === subcategory ? null : subcategory);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-4 py-6">
            <button
              onClick={() => {
                setCategory(null);
                setIsOpen(false);
              }}
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
                          className="w-4 h-4"
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
            {!session ? (
              <Link
                href="/login"
                className="w-full flex flex-col"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="outline"
                  className="mt-4 text-center items-center mx-auto capitalize font-bold"
                >
                  sign in
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col w-full">
                <div className="flex flex-row m-auto items-center gap-2 my-4">
                  <Image
                    src={icon}
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full m-auto bg-slate-100"
                  />
                  <p className="text-sm flex font-bold capitalize">{name}</p>
                </div>
                <div className="bg-zinc-600 w-1/2 h-[1px] mx-auto" />
                <Link
                  href="/logout"
                  className="w-full flex flex-col"
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="mt-4 text-center items-center mx-auto capitalize font-bold"
                  >
                    sign out
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
