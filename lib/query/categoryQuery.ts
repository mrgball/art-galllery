import { gql } from 'graphql-request';

/// GET CATEGORIES
export const GET_CATEGORY = gql`
  query GetCategories {
    categories(limit: 10, offset: 0) {
      items {
        id,
        name
      }
      pageInfo {
        limit,
        total,
        hasNextPage,
        hasPreviousPage
      }
    }
  }
`;

/// POST CATEGORY
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createCategory(input: { name: $name }) {
      message,
      category {
        name,
      }
    }
  }
`;

/// DELETE CATEGORY
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    message
  }
}
`;



