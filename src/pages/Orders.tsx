import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Orders = () => {
  const orders = [
    {
      id: 'ORD123456',
      date: '2024-02-15',
      status: 'Delivered',
      total: '₹45,000',
      items: [
        {
          name: "Natural Blue Sapphire",
          price: "₹45,000",
          quantity: 1,
          image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg"
        }
      ]
    },
    {
      id: 'ORD123457',
      date: '2024-02-10',
      status: 'Processing',
      total: '₹2,100',
      items: [
        {
          name: "5 Mukhi Rudraksha",
          price: "₹2,100",
          quantity: 1,
          image: "https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <Link to={`/order/${order.id}`} className="block">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                        <p className="text-sm text-gray-500">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <ChevronRight 
                          size={20} 
                          className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </div>

                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 mt-4">
                        <Link to={`/product/${idx}`} className="w-20 h-20">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link 
                            to={`/product/${idx}`}
                            className="font-medium text-gray-900 hover:text-primary"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-primary font-medium">{item.price}</p>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Amount:</span>
                        <span className="text-lg font-bold text-primary">{order.total}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-4">When you place an order, it will appear here</p>
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

export default Orders;