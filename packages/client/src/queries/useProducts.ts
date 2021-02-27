import { useQuery, gql } from "@apollo/client";

interface Product {
  id: string;
  name: string;
  description: string;
}

interface ProductsData {
  productsConnection: {
    products: Product[];
    hasMore: boolean;
  };
}

interface ProductsVars {
  offset: number;
  limit: number;
}

const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $skip: Int) {
    productsConnection(limit: $limit, skip: $skip) {
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
      offset: 0,
      limit: 10,
    },
  });
}
