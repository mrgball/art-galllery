import { create } from 'zustand';
import { CategoryStore } from '../types/categoryTypes';

const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories }),
}));

export default useCategoryStore;
