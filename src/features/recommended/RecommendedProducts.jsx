import React from "react";
import ProductCard from "./ProductCard";

export default function RecommendedProducts({ products }) {
  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Recommended Items</h2>
        <a className="btn btn-secondary" href="/recommended">See All</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
} 