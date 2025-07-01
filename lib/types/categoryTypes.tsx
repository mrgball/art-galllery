export interface CategoryStore {
    categories: Category[];
    setCategories: (category: Category[]) => void;
}

export interface Category {
    id: number;
    name: string;
}

export interface GetCategoryResponse {
  categories: {
    items: Category[];
  };
}

export interface CreateCategoryResponse {
    createCategory: Category;
}


