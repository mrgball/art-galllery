import { useMutation, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphqlClient";
import { CREATE_CATEGORY, GET_CATEGORY } from "../query/categoryQuery";
import { CreateCategoryResponse, GetCategoryResponse } from "../types/categoryTypes";

export const useCategoryService = () => {
  const graphql = graphqlClient();

  // ✅ Fetch kategori saat hook dijalankan
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await graphql.request<GetCategoryResponse>(GET_CATEGORY);
      return res.categories;
    },
  });

  const storeCategory = useMutation({
    mutationFn: async (name: string) => {
            const client = graphqlClient();
            const variables = { name };
            const response = await client.request<CreateCategoryResponse>(CREATE_CATEGORY, variables);
            return response.createCategory;
    },
    onSuccess: (data) => {
       console.log('data:', data)
    },
    });


  return {
    data: {
    },
    // isLoading: categoriesQuery.isLoading || someOtherQuery.isLoading,
    method: {
      fetchCategory: categoriesQuery,
      storeCategory: storeCategory,
    },
  };
};
