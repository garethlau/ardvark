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
  similar: { id: string; name: string; description: string }[];
}

interface Data {
  product: Product;
}

interface Vars {
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
        description
      }
    }
  }
`;

export default function useProduct(productId: string) {
  return useQuery<Data, Vars>(GET_PRODUCT, {
    variables: {
      id: productId,
    },
  });
}
