import React from "react";
import ProductCard from "../../components/ProductCard";
import { useProductsInCategoriesQuery } from "../../generated/graphql";

const RecommendedProducts: React.FC<{
  categories: string[];
}> = ({ categories }) => {
  const { data } = useProductsInCategoriesQuery({
    skip: !categories,
    variables: {
      categories,
    },
  });

  return (
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
  );
};

export default RecommendedProducts;
