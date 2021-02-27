import { useQuery, gql } from "@apollo/client";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  categories: { value: string }[];
  manufacturer: {
    value: String;
  };
  similar: { id: string; name: string }[];
}

interface ProductData {
  product: Product;
}

export interface ProductVars {
  id: string;
}

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      description
      price
      categories {
        value
      }
      manufacturer {
        value
      }
      similar {
        id
        name
      }
    }
  }
`;

export default function useProduct(productId: string) {
  return useQuery<ProductData, ProductVars>(GET_PRODUCT, {
    variables: {
      id: productId,
    },
  });
}
