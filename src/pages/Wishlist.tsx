import React from 'react';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Natural Blue Sapphire",
      price: "₹45,000",
      mrp: "₹50,000",
      discount: "10% off",
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      category: "Gemstones"
    },
    {
      id: 2,
      name: "5 Mukhi Rudraksha",
      price: "₹2,100",
      mrp: "₹2,500",
      discount: "16% off",
      image: "https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg",
      category: "Rudraksha"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h1>

          {wishlistItems.length > 0 ? (
            <div className="space-y-4">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <Link to={`/product/${item.id}`} className="w-32 h-32">
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
                            className="text-lg font-medium text-gray-900 hover:text-primary"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900">{item.price}</span>
                          <span className="text-gray-500 line-through">{item.mrp}</span>
                          <span className="text-green-600">{item.discount}</span>
                        </div>
                      </div>

                      <button className="mt-4 flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">
                        <ShoppingBag size={20} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-4">Save items you love to your wishlist</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;