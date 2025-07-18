import React from "react";
import { Link } from "react-router-dom";

function ShopProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition hover:ring-2 hover:ring-primary focus:outline-none"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <p className="text-xl text-primary font-bold mb-3">${product.price.toFixed(2)}</p>
    </Link>
  );
}

export default ShopProductCard; 