import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import allProducts from "../data/allProducts.js";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("--Select Size--");
  const [selectedColor, setSelectedColor] = useState("Brown");
  const [selectedImage, setSelectedImage] = useState(0);

  // Product images for different colors
  const productImages = {
    Brown: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    ],
    Blue: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    ],
    Black: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
    ]
  };

  const sizes = ["--Select Size--", "Small", "Medium", "Large"];
  const colors = ["Brown", "Blue", "Black"];

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products" className="text-primary hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize === "--Select Size--") {
      alert("Please select a size");
      return;
    }
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      size: selectedSize,
      color: selectedColor
    }));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-8">
        {/* Back to shop link */}
        <Link 
          to="/products" 
          className="inline-flex items-center text-gray-600 hover:text-black mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to shop
        </Link>

        <div className="bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-6">
                <img
                  src={productImages[selectedColor][selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-4">
                {productImages[selectedColor].map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Information */}
            <div>
              {/* Brand and Name */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">{product.brand || "Sexbomb"}</p>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat similique dicta nulla praesentium deserunt. Corporis repellendus deleniti dolores eligendi.
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lens Width and Frame Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Color
                </label>
                <div className="flex space-x-3">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? 'border-black' : 'border-gray-300'
                      }`}
                      style={{
                        backgroundColor: color === 'Brown' ? '#8B4513' : 
                                        color === 'Blue' ? '#1E90FF' : 
                                        color === 'Black' ? '#000000' : '#8B4513'
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition duration-200"
              >
                Add To Basket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 