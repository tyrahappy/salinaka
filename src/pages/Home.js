import React from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../features/featured/FeaturedProducts.jsx";
import featuredProducts from "../features/featured/featuredProducts.js";
import RecommendedProducts from "../features/recommended/RecommendedProducts.jsx";
import recommendedProducts from "../features/recommended/recommendedProducts.js";

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section - Two columns */}
      <section className="container mx-auto my-8 bg-gray-50 rounded-lg flex flex-col md:flex-row items-center p-8 md:p-16">
        {/* Left: Text */}
        <div className="flex-1 mb-8 md:mb-0 md:mr-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">See everything<br />with <span className="text-primary">Clarity</span></h1>
          <p className="text-gray-700 text-lg mb-8">Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we've got your eyes covered.</p>
          <Link to="/products" className="inline-block bg-black text-white px-8 py-3 rounded text-lg font-semibold shadow hover:bg-primary transition">Shop Now <span className="ml-2">→</span></Link>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
            alt="Eyewear model"
            className="rounded-lg shadow-lg max-h-80 object-cover"
          />
        </div>
      </section>

      {/* Featured Products Section - use component */}
      <FeaturedProducts products={featuredProducts} />

      {/* Recommended Products Section */}
      <RecommendedProducts products={recommendedProducts} />

      {/* Features Section */}
      <section className="container py-12 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-4xl mb-4">🚚</div>
          <h2 className="text-2xl font-semibold mb-2">Free Shipping</h2>
          <p className="text-gray-600">On all orders over $100 — no hidden fees, no surprises. Enjoy fast and reliable delivery straight to your door.</p>
        </div>
        <div>
          <div className="text-4xl mb-4">📞</div>
          <h2 className="text-2xl font-semibold mb-2">24/7 Support</h2>
          <p className="text-gray-600">Friendly customer service — we're here whenever you need us, day or night, with real humans ready to help.</p>
        </div>
        <div>
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-semibold mb-2">Secure Payment</h2>
          <p className="text-gray-600">100% secure payment — your data is encrypted and protected by industry-leading security standards. Shop with confidence.</p>
        </div>
      </section>
    </div>
  );
}

export default Home; 