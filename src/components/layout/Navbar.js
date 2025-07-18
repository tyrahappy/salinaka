import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import FilterModal from "../FilterModal";
import CartDrawer from "./CartDrawer";

// Eye logo SVG
const EyeLogo = () => (
  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mr-2">
    <ellipse cx="24" cy="12" rx="22" ry="10" stroke="#222" strokeWidth="2" fill="none" />
    <circle cx="24" cy="12" r="5" fill="#222" />
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const cartCount = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  
  // 判断当前路由高亮
  const isActive = (path) => location.pathname === path;

  const handleApplyFilters = (filters) => {
    // Store filters in localStorage so Products page can access them
    localStorage.setItem('appliedFilters', JSON.stringify(filters));
    
    // If we're not on the products page, navigate there
    if (location.pathname !== '/products') {
      window.location.href = '/products';
    } else {
      // If we're already on products page, trigger a custom event to apply filters
      window.dispatchEvent(new CustomEvent('filtersUpdated', { detail: filters }));
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center text-black text-2xl font-bold">
            <EyeLogo />
            <span className="font-serif tracking-wide">SALINAKA</span>
            <span className="ml-1 text-xs font-light tracking-widest align-top">EYEWEAR</span>
          </Link>

          {/* Center Navigation */}
          <div className="flex space-x-8 ml-8">
            <Link to="/" className={`text-base ${isActive("/") ? "font-semibold text-black" : "text-gray-500 hover:text-black"}`}>Home</Link>
            <Link to="/products" className={`text-base ${isActive("/products") ? "font-semibold text-black" : "text-gray-500 hover:text-black"}`}>Shop</Link>
            <Link to="/featured" className={`text-base ${isActive("/featured") ? "font-semibold text-black" : "text-gray-500 hover:text-black"}`}>Featured</Link>
            <Link to="/recommended" className={`text-base ${isActive("/recommended") ? "font-semibold text-black" : "text-gray-500 hover:text-black"}`}>Recommended</Link>
          </div>

          {/* Right Section: Search, Filter, Cart, Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search product..."
                className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="absolute left-2 top-2.5 text-gray-400">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-200 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative text-black hover:text-primary focus:outline-none"
            >
              <ShoppingCartIcon className="h-7 w-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Sign Up & Sign In Buttons */}
            <Link to="/signup" className="bg-black text-white px-6 py-2 rounded font-semibold min-w-[100px] whitespace-nowrap text-center">Sign Up</Link>
            <Link to="/signin" className="bg-gray-100 text-gray-500 px-6 py-2 rounded font-semibold min-w-[100px] whitespace-nowrap text-center">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </>
  );
};

export default Navbar; 