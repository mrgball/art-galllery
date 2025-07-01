import { create } from 'zustand';
import { CategoryStore } from '../types/categoryTypes';

const useCategoryStore = create<CategoryStore>((set) => ({
    message: null,
    setMessage: (message: string) => set({ message }),
    categories: [],
    setCategories: (categories) => set({ categories }),
}));

export default useCategoryStore;
