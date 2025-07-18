import React, { useState } from "react";

function FilterModal({ isOpen, onClose, onApplyFilters }) {
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [sortBy, setSortBy] = useState("None");
  const [priceRange, setPriceRange] = useState([100, 600]);

  const brands = ["All Brands", "Ray-Ban", "Oakley", "Gucci", "Prada", "Tom Ford", "Warby Parker"];
  const sortOptions = ["None", "Price: Low to High", "Price: High to Low", "Name: A to Z", "Name: Z to A"];

  const handleApply = () => {
    onApplyFilters({
      brand: selectedBrand,
      sortBy: sortBy,
      priceRange: priceRange
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedBrand("All Brands");
    setSortBy("None");
    setPriceRange([100, 600]);
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Sort By Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <span className="text-lg font-bold text-primary">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          
          {/* Price Range Sliders */}
          <div className="space-y-4">
            {/* Min Price Slider */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price: ${priceRange[0]}</label>
              <input
                type="range"
                min="100"
                max="600"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full slider"
              />
            </div>
            
            {/* Max Price Slider */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price: ${priceRange[1]}</label>
              <input
                type="range"
                min="100"
                max="600"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full slider"
              />
            </div>
          </div>
          
          {/* Price Scale */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>$100</span>
            <span>$200</span>
            <span>$300</span>
            <span>$400</span>
            <span>$500</span>
            <span>$600</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleApply}
            className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Apply filters
          </button>
          <button
            onClick={handleReset}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal; 