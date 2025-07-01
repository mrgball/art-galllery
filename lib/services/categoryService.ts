import { useMutation, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphqlClient";
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY } from "../query/categoryQuery";
import { CreateCategoryResponse, DeleteCategoryResponse, GetCategoryResponse } from "../types/categoryTypes";
import useCategoryStore from "../store/categoryStore";

export const useCategoryService = () => {
    const { setMessage } = useCategoryStore.getState();
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
            const variables = { name };
            const response = await graphql.request<CreateCategoryResponse>(CREATE_CATEGORY, variables);
            console.log(response, 'response');
            return response.createCategory;
    },
    onSuccess: (data) => {
       setMessage(data.message)
    },
    onError: (error: any) => {
       setMessage(error.response.data.message)
    }
    });

     const deleteCategory = useMutation({
        mutationFn: async (id: number) => {
             const variables = { id };
            const response = await graphql.request<DeleteCategoryResponse>(DELETE_CATEGORY, variables);
            console.log(response, 'response');
            return response.deleteCategory;
        },
        onSuccess: (data) => {
            setMessage(data.message)
        },
        onError: (error: any) => {
            setMessage(error.response.data.message)
        }
     })


  return {
    data: {
    },
    // isLoading: categoriesQuery.isLoading || someOtherQuery.isLoading,
    method: {
      fetchCategory: categoriesQuery,
      refetchCategory: categoriesQuery.refetch,
      storeCategory: storeCategory,
      deleteCategory: deleteCategory,
    },
  };
};
