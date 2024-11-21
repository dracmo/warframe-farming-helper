"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/lib/storage";
import { SearchBar } from "../hooks/SearchBar";

interface LeftListItem {
  id: number;
  name: string;
}

interface ComponentProps {
  topList: string[];
  leftList: LeftListItem[];
  categoryName: string | null;
  subCategory: string | null;
  setSearchTerm: (value: string) => void;
}

export default function MainTab({
  topList,
  leftList,
  categoryName,
  subCategory,
  setSearchTerm,
}: ComponentProps) {
  const { checkedCells, toggleCell } = useAppStore();

  return (
    <Card className="sm:w-full w-[95%] max-w-4xl mx-auto ">
      <div className="flex flex-col w-full items-center text-center mb-4">
        <CardHeader className="flex flex-row text-center items-center">
          <CardTitle className=" text-xl md:text-2xl text-primary-foreground pr-2">
            {categoryName || "All"}
          </CardTitle>
          <CardTitle className="  text-sm text-primary-foreground">
            : {subCategory || "All"}
          </CardTitle>
        </CardHeader>
        <SearchBar onSearch={(value) => setSearchTerm(value)} />
      </div>
      <CardContent className="p-0">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] border-r text-center">
                  Nom
                </TableHead>
                {topList.map((piece, index) => (
                  <TableHead
                    key={piece}
                    className={cn(
                      "text-center",
                      index < topList.length - 1 && "border-r"
                    )}
                  >
                    {piece}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {leftList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium border-r text-center">
                    {item.name}
                  </TableCell>
                  {topList.map((piece) => (
                    <TableCell
                      key={`${item.id}-${piece}`}
                      className="text-center p-0 border-l border-zinc-300"
                    >
                      <button
                        className="w-full h-full p-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        onClick={() => toggleCell(item.id, piece)}
                        aria-label={`Toggle ${item.name} ${piece}`}
                        aria-pressed={checkedCells[`${item.id}-${piece}`]}
                      >
                        <div className="relative w-6 h-6 mx-auto">
                          <div
                            className={cn(
                              "absolute inset-0 rounded-sm border-2 border-primary transition-all duration-300 ease-in-out",
                              checkedCells[`${item.id}-${piece}`] &&
                                "bg-primary"
                            )}
                          />
                          <Check
                            className={cn(
                              "absolute inset-0 w-4 h-4 m-auto text-primary-foreground transition-all duration-300 ease-in-out",
                              checkedCells[`${item.id}-${piece}`]
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-0"
                            )}
                          />
                        </div>
                      </button>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
