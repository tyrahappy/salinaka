import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';  // useSelector 用于从 Redux 中获取数据

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);   // the cartItems is the state of the cart

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Salinaka
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-primary">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="text-gray-600 hover:text-primary">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-primary relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 