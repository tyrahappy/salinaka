import React from "react";
import FeaturedProducts from "../features/featured/FeaturedProducts.jsx";
import featuredProducts from "../features/featured/featuredProducts.js";

function Featured() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">All Featured Eyewear</h1>
        <FeaturedProducts products={featuredProducts} />
      </div>
    </div>
  );
}

export default Featured; 