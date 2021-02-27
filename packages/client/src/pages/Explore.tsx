import React, { useEffect, useState } from "react";
import useProducts from "../queries/useProducts";
import ProductCard from "../components/ProductCard";

const Explore: React.FC<{}> = () => {
  const { data, loading, error, fetchMore } = useProducts();
  const [page, setPage] = useState<number>(1);
  console.log(data);

  if (loading) {
    return <div>loading... </div>;
  } else if (error) {
    return (
      <div>
        <pre>{error}</pre>
      </div>
    );
  }
  return (
    <div>
      <div>
        {data &&
          data.products.products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
            />
          ))}
      </div>
      <div>
        <button
          onClick={() => {
            console.log("Fetching more");
            fetchMore({
              variables: {
                limit: 10,
                skip: page * 10,
              },
            });
            setPage(page + 1);
          }}
        >
          Load MOre
        </button>
      </div>
    </div>
  );
};

export default Explore;
