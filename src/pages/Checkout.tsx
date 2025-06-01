import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const [step, setStep] = useState(1);

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Natural Blue Sapphire",
      price: "₹45,000",
      quantity: 1,
      image: "https://images.pexels.com/photos/10475791/pexels-photo-10475791.jpeg"
    },
    {
      id: 2,
      name: "5 Mukhi Rudraksha",
      price: "₹2,100",
      quantity: 2,
      image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/cart" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </Link>

        {/* Checkout Steps */}
        <div className="flex justify-between items-center mb-12">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${step > i + 1 ? 'bg-green-500 text-white' : 
                  step === i + 1 ? 'bg-primary text-white' : 
                  'bg-gray-200 text-gray-600'}
              `}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{s}</p>
                <p className="text-sm text-gray-500">Step {i + 1}</p>
              </div>
              {i < 2 && (
                <div className={`w-24 h-1 mx-4 ${step > i + 1 ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Shipping Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input 
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary pl-10"
                      placeholder="1234 5678 9012 3456"
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-primary font-bold">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹49,200</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹2,460</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹51,660</span>
                </div>
              </div>
            </motion.div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck size={20} />
                <span>Free shipping on orders above ₹2999</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Gift size={20} />
                <span>Gift wrapping available</span>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;