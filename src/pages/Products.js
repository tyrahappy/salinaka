import React, { useState, useEffect } from "react";
import ShopProductCard from "../features/shop/ShopProductCard.jsx";
import allProducts from "../data/allProducts.js";

function Products() {
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(12);
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    brand: null,
    priceRange: null,
    sortBy: null
  });

  // Get unique categories
  const categories = ["All", ...new Set(allProducts.map(product => product.category))];

  // Load filters from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('appliedFilters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      setActiveFilters({
        brand: filters.brand !== "All Brands" ? filters.brand : null,
        priceRange: filters.priceRange,
        sortBy: filters.sortBy !== "None" ? filters.sortBy : null
      });
      // Clear localStorage after reading
      localStorage.removeItem('appliedFilters');
    }
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = allProducts;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Brand filter
    if (activeFilters.brand && activeFilters.brand !== "All Brands") {
      filtered = filtered.filter(product => product.brand === activeFilters.brand);
    }
    
    // Price range filter
    if (activeFilters.priceRange) {
      const [minPrice, maxPrice] = activeFilters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
      );
    }
    
    // Sort products
    if (activeFilters.sortBy && activeFilters.sortBy !== "None") {
      filtered.sort((a, b) => {
        switch (activeFilters.sortBy) {
          case "Price: Low to High":
            return a.price - b.price;
          case "Price: High to Low":
            return b.price - a.price;
          case "Name: A to Z":
            return a.name.localeCompare(b.name);
          case "Name: Z to A":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }
    
    setProducts(filtered);
    setDisplayedProducts(12); // Reset to first page when filtering
  }, [searchTerm, selectedCategory, activeFilters]);

  const loadMoreProducts = () => {
    setDisplayedProducts(prev => prev + 12);
  };

  const removeFilter = (filterType) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: null
    }));
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters({
      brand: filters.brand !== "All Brands" ? filters.brand : null,
      priceRange: filters.priceRange,
      sortBy: filters.sortBy !== "None" ? filters.sortBy : null
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== null);

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

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-4">
              {activeFilters.brand && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Brand:</span>
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {activeFilters.brand}
                    <button
                      onClick={() => removeFilter('brand')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {activeFilters.priceRange && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Price Range:</span>
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    ${activeFilters.priceRange[0]}-${activeFilters.priceRange[1]}
                    <button
                      onClick={() => removeFilter('priceRange')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {activeFilters.sortBy && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Sort By:</span>
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {activeFilters.sortBy}
                    <button
                      onClick={() => removeFilter('sortBy')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
          {products.length === 0 ? "No products found" : `Found ${products.length} product${products.length !== 1 ? 's' : ''}`}
        </p>

        {/* Products Grid or No Results */}
        {products.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Products; 