import React, { useMemo } from "react";
import useProduct from "../queries/useProduct";
import { useParams } from "react-router-dom";

const Product: React.FC<{}> = () => {
  const { productId } = useParams<Record<string, string>>();
  const { data, loading } = useProduct(productId);
  //   console.log(data);
  //   const product = useMemo(
  //     () => ({
  //       id: data?.product.id,
  //       name: data?.product.name,
  //       description: data?.product.description,
  //       price: data?.product.price,
  //     }),
  //     [data]
  //   );

  if (loading) return <div>Loading</div>;
  return (
    <div>
      hello
      {JSON.stringify(data?.product.name)}
      {/* <h2>{data?.product.name}</h2>
      <p>{product.price}</p>
      <p>{product.description}</p>
      {data?.product?.in?.map((category) => (
        <div>{JSON.stringify(category)}</div>
      ))} */}
    </div>
  );
};
export default Product;
