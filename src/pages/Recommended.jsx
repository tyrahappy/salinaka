import React from "react";
import RecommendedProducts from "../features/recommended/RecommendedProducts.jsx";
import recommendedProducts from "../features/recommended/recommendedProducts.js";

function Recommended() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">All Recommended Items</h1>
        <RecommendedProducts products={recommendedProducts} />
      </div>
    </div>
  );
}

export default Recommended; 