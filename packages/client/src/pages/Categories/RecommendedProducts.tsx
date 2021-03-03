import React from "react";
import ProductCard from "../../components/ProductCard";
import { useProductsInCategoriesQuery } from "../../generated/graphql";
import Loader from "../../components/Loader";
import { Heading } from "@shopify/polaris";

const RecommendedProducts: React.FC<{
  categories: string[];
}> = ({ categories }) => {
  const { data, loading } = useProductsInCategoriesQuery({
    skip: !categories,
    variables: {
      categories,
    },
  });

  return (
    <div>
      <Heading element="h1">Results</Heading>
      <Heading element="p">
        {!data
          ? ""
          : categories.length === 0
          ? "Select a category."
          : data?.productsInCategories.length === 0
          ? "No results. Try another category."
          : `Found ${data?.productsInCategories.length}`}
      </Heading>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {data?.productsInCategories.map((product) =>
            product?.id ? (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
