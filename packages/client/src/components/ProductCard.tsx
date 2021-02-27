import React from "react";
import { Link } from "react-router-dom";

const ProductCard: React.FC<{
  id: string;
  name: string;
  description: string;
}> = ({ name, description, id }) => {
  return (
    <div>
      <Link to={"/product/" + id}>
        <h3>{name}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
};
export default ProductCard;
