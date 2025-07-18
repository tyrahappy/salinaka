import React from "react";
import FeaturedProductCard from "./FeaturedProductCard";

export default function FeaturedProducts({ products }) {
  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured Eyewear</h2>
        <a className="btn btn-secondary" href="/products">See All</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(product => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
} 