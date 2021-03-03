import React from "react";
import { gql, useQuery } from "@apollo/client";
import ProductCard from "../../components/ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
}

const GET_FILTERED_PRODUCTS = gql`
  query GetProductsInCategories($categories: [String]!) {
    productsInCategories(names: $categories) {
      id
      name
      description
    }
  }
`;

interface Data {
  productsInCategories: Array<Product>;
}

interface Vars {
  categories: Array<string>;
}

const RecommendedProducts: React.FC<{
  categories: string[];
}> = ({ categories }) => {
  const { data } = useQuery<Data, Vars>(GET_FILTERED_PRODUCTS, {
    skip: !categories,
    variables: {
      categories,
    },
  });

  return (
    <div>
      {data?.productsInCategories.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default RecommendedProducts;
