import { create } from "zustand";

interface AppState {
  checkedCells: { [key: string]: boolean };
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  toggleCell: (rowId: number, col: string) => void;
  setCheckedCells: (newCheckedCells: { [key: string]: boolean }) => void;
  setCategory: (category: string | null) => void;
  setSubcategory: (subcategory: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  checkedCells: {},
  selectedCategory: null,
  selectedSubcategory: null,
  toggleCell: (rowId, col) => {
    const cellKey = `${rowId}-${col}`;
    set((state) => ({
      checkedCells: {
        ...state.checkedCells,
        [cellKey]: !state.checkedCells[cellKey],
      },
    }));
  },
  setCheckedCells: (newCheckedCells) => set({ checkedCells: newCheckedCells }),
  setCategory: (category) =>
    set({
      selectedCategory: category,
      selectedSubcategory: null,
    }),
  setSubcategory: (subcategory) => set({ selectedSubcategory: subcategory }),
}));
