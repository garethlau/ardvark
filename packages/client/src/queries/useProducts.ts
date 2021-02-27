import { useQuery, gql } from "@apollo/client";

interface Product {
  id: string;
  name: string;
  description: string;
}

interface ProductsData {
  products: {
    products: Product[];
    hasMore: boolean;
  };
}

interface ProductsVars {
  skip: number;
  limit: number;
}

const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $skip: Int) {
    products(limit: $limit, skip: $skip) {
      hasMore
      products {
        id
        name
      }
    }
  }
`;

export default function useProducts() {
  return useQuery<ProductsData, ProductsVars>(GET_PRODUCTS, {
    variables: {
      skip: 0,
      limit: 10,
    },
  });
}
