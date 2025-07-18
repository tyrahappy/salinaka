import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-lg text-primary font-bold mb-2">${product.price}</p>
      <Link
        to={`/products/${product.id}`}
        className="btn btn-primary w-full"
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard; 