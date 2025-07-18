import React from "react";
import { Link } from "react-router-dom";

function FeaturedProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block border rounded-lg p-4 shadow hover:shadow-lg transition hover:ring-2 hover:ring-primary focus:outline-none"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-lg text-primary font-bold mb-2">${product.price}</p>
    </Link>
  );
}

export default FeaturedProductCard; 