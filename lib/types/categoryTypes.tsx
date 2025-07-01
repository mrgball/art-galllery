export interface CategoryStore {
    message: string | null;
    categories: Category[];
    setCategories: (category: Category[]) => void;
    setMessage: (message: string) => void,
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
    createCategory: {
        category: {
            name: string
        }
        message: string,
    };
}

export interface DeleteCategoryResponse {
    deleteCategory: {
        category: {
            id: number;
            name: string
        }
        message: string,
    };
}


