"use client";
import FilterMenu, { Category, Subcategory } from "@/components/custom/filter";
import MainTab from "@/components/custom/mainTab";
import { useAppStore } from "@/lib/storage";
import { warframes } from "@/lib/tabList/warframeList";
import {
  allPart,
  archwingPart,
  mechPart,
  warframesPart,
  weaponPart,
} from "@/lib/tabList/part";
import { weaponList } from "@/lib/tabList/weaponList";
import { archwing, Nechramech } from "@/lib/tabList/archwingList";
import { useState, useEffect, useRef } from "react";
import FilterPhoneMenu from "@/components/custom/filterPhone";
import { useSyncCheckedCells } from "@/components/hooks/syncdata";

export default function Home() {
  useSyncCheckedCells();
  // Utiliser le hook personnalisé pour synchroniser les cellules cochées
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const selectedSubcategory = useAppStore((state) => state.selectedSubcategory);

  // Ajouter un état pour le terme de recherche
  const [searchTerm, setSearchTerm] = useState("");

  const categories: Category[] = ["warframe", "weapon", "archwing", "mech"];
  const subcategories: Subcategory[] = ["standard", "prime"];

  // Liste des données et des pièces
  let data: { id: number; name: string; type: string }[] = [];
  let piece: string[] = [];

  // Obtenir les données et la liste des pièces en fonction de la catégorie sélectionnée
  if (selectedCategory === "warframe") {
    data = warframes;
    piece = warframesPart;
  } else if (selectedCategory === "weapon") {
    data = weaponList;
    piece = weaponPart;
  } else if (selectedCategory === "archwing") {
    data = archwing;
    piece = archwingPart;
  } else if (selectedCategory === "mech") {
    data = Nechramech;
    piece = mechPart;
  } else {
    data = warframes.concat(weaponList, archwing, Nechramech);
    piece = allPart;
  }

  if (selectedSubcategory) {
    data = data.filter((item) => item.type === selectedSubcategory);
  }
  const comp = piece;

  // Créer la liste des noms et appliquer le filtre de recherche
  const filteredData = data
    .map((item) => ({
      id: item.id,
      name: item.name,
    }))
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Infinite scroll state
  const [visibleItems, setVisibleItems] = useState(50);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleItems((prev) => Math.min(prev + 20, filteredData.length));
      }
    }, options);

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef);
      }
    };
  }, [filteredData]);

  return (
    <div className="flex flex-row w-full h-full min-h-screen">
      <div className="w-96 md:flex md:flex-col hidden mt-20 lg:ml-20 ">
        <FilterMenu categories={categories} subcategories={subcategories} />
        <FilterPhoneMenu
          categories={categories}
          subcategories={subcategories}
        />
      </div>
      <div className=" w-full h-full">
        <div className="w-full flex flex-col items-center mt-5">
          <div className="w-full h-full overflow-auto">
            <MainTab
              topList={comp}
              leftList={filteredData.slice(0, visibleItems)}
              categoryName={selectedCategory}
              subCategory={selectedSubcategory}
              setSearchTerm={setSearchTerm}
            />
            <div ref={loadMoreRef} style={{ height: "20px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
