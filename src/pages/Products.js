import React, { useState, useEffect } from "react";
import ShopProductCard from "../features/shop/ShopProductCard.jsx";
import allProducts from "../data/allProducts.js";

function Products() {
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(12);

  // Get unique categories
  const categories = ["All", ...new Set(allProducts.map(product => product.category))];

  // Filter products based on search and category
  useEffect(() => {
    let filtered = allProducts;
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    setProducts(filtered);
    setDisplayedProducts(12); // Reset to first page when filtering
  }, [searchTerm, selectedCategory]);

  const loadMoreProducts = () => {
    setDisplayedProducts(prev => prev + 12);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"
          >
            Filters
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {Math.min(displayedProducts, products.length)} of {products.length} products
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.slice(0, displayedProducts).map(product => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {displayedProducts < products.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreProducts}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Show More Items
            </button>
          </div>
        )}

        {/* No Results */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products; 