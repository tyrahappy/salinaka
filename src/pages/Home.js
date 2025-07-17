import React from "react";
import { Link } from "react-router-dom";

// 眼镜类商品数据
const featuredProducts = [
  {
    id: 1,
    name: "Classic Round Glasses",
    price: 120,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Modern Square Eyewear",
    price: 150,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Aviator Sunglasses",
    price: 180,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

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

      {/* Features Section */}
      <section className="container py-12 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Free Shipping</h2>
          <p>On all orders over $100</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">24/7 Support</h2>
          <p>Friendly customer service</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Secure Payment</h2>
          <p>100% secure payment</p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Eyewear</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg text-primary font-bold mb-2">${product.price}</p>
              <Link
                to={`/products/${product.id}`}
                className="btn btn-primary w-full"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 