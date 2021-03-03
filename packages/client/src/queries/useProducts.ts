import { useQuery, gql } from "@apollo/client";

interface Product {
  id: string;
  name: string;
  description: string;
}

interface Data {
  products: {
    products: Product[];
    hasMore: boolean;
  };
}

interface Vars {
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
        description
      }
    }
  }
`;

export default function useProducts() {
  return useQuery<Data, Vars>(GET_PRODUCTS, {
    variables: {
      skip: 0,
      limit: 10,
    },
  });
}
