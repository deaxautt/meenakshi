import React, { useState } from 'react';
import { Package, Search, ArrowRight, Truck, Box, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderStatus {
  orderId: string;
  status: string;
  date: string;
  items: {
    name: string;
    image: string;
    quantity: number;
  }[];
  timeline: {
    status: string;
    date: string;
    description?: string;
  }[];
}

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrderStatus(null);

    if (!orderId || !email) {
      setError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Mock API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock response
      setOrderStatus({
        orderId: 'ORD123456',
        status: 'Delivered',
        date: '2024-02-15',
        items: [
          {
            name: 'Natural Blue Sapphire',
            image: 'https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg',
            quantity: 1
          }
        ],
        timeline: [
          {
            status: 'Order Placed',
            date: '2024-02-15 10:30 AM',
            description: 'Your order has been placed successfully'
          },
          {
            status: 'Order Confirmed',
            date: '2024-02-15 11:00 AM',
            description: 'Payment received and order confirmed'
          },
          {
            status: 'Shipped',
            date: '2024-02-16 02:30 PM',
            description: 'Order has been shipped via BlueDart'
          },
          {
            status: 'Out for Delivery',
            date: '2024-02-17 09:15 AM',
            description: 'Package is out for delivery'
          },
          {
            status: 'Delivered',
            date: '2024-02-17 02:45 PM',
            description: 'Package has been delivered'
          }
        ]
      });
    } catch (err) {
      setError('Failed to fetch order status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return Package;
      case 'order confirmed':
        return CheckCircle;
      case 'shipped':
        return Box;
      case 'out for delivery':
        return Truck;
      case 'delivered':
        return CheckCircle;
      default:
        return Package;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Track Your Order</h1>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order ID
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  'Tracking Order...'
                ) : (
                  <>
                    Track Order
                    <Search size={20} />
                  </>
                )}
              </button>
            </form>
          </div>

          <AnimatePresence>
            {orderStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Order Status Header */}
                <div className="p-6 border-b">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">{orderStatus.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium">{orderStatus.date}</p>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                        {orderStatus.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                  {orderStatus.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-6">Order Timeline</h2>
                  <div className="space-y-6">
                    {orderStatus.timeline.map((event, index) => {
                      const Icon = getStatusIcon(event.status);
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="relative">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === orderStatus.timeline.length - 1
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              <Icon size={16} />
                            </div>
                            {index !== orderStatus.timeline.length - 1 && (
                              <div className="absolute top-8 left-4 w-px h-16 bg-gray-200" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{event.status}</p>
                            <p className="text-sm text-gray-500">{event.date}</p>
                            {event.description && (
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;