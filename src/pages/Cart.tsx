import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Natural Blue Sapphire",
      price: "₹45,000",
      quantity: 1,
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      category: "Gemstones"
    },
    {
      id: 2,
      name: "5 Mukhi Rudraksha",
      price: "₹2,100",
      quantity: 2,
      image: "https://images.pexels.com/photos/5895885/pexels-photo-5895885.jpeg",
      category: "Rudraksha"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <Link to="/products" className="text-primary hover:text-primary-dark flex items-center gap-1">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <Link to={`/product/${item.id}`} className="w-24 h-24">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <Link 
                          to={`/product/${item.id}`}
                          className="text-gray-900 font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <button className="p-2 hover:bg-gray-50">
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button className="p-2 hover:bg-gray-50">
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹49,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹2,460</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>₹51,660</span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 block bg-primary text-white text-center py-3 rounded-full hover:bg-primary-dark transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>

            <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <ShoppingBag size={20} />
                <span>Free shipping on orders above ₹2999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;