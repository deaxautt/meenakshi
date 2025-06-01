import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, Box, CheckCircle, MapPin, User, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderDetails = () => {
  const { id } = useParams();

  // Mock order data - replace with actual data fetching
  const order = {
    id: 'ORD123456',
    date: '2024-02-15',
    status: 'Delivered',
    total: '₹45,000',
    items: [
      {
        name: 'Natural Blue Sapphire',
        image: 'https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg',
        quantity: 1,
        price: '₹45,000',
        category: 'Gemstones'
      }
    ],
    shipping: {
      address: {
        name: 'John Doe',
        phone: '+91 1234567890',
        email: 'john@example.com',
        line1: '123 Main Street',
        line2: 'Apartment 4B',
        landmark: 'Near City Mall',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500001'
      },
      tracking: {
        number: 'TRK9876543210',
        provider: 'BlueDart',
        url: '#'
      }
    },
    timeline: [
      { status: 'Order Placed', date: '2024-02-15 10:30 AM' },
      { status: 'Order Confirmed', date: '2024-02-15 11:00 AM' },
      { status: 'Shipped', date: '2024-02-16 02:30 PM' },
      { status: 'Out for Delivery', date: '2024-02-17 09:15 AM' },
      { status: 'Delivered', date: '2024-02-17 02:45 PM' }
    ]
  };

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
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/orders"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <ArrowLeft size={20} />
              Back to Orders
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Placed on</p>
                <p className="font-medium">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">{order.total}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <Link to={`/product/${index}`} className="w-24 h-24">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </Link>
                      <div>
                        <Link 
                          to={`/product/${index}`}
                          className="font-medium text-gray-900 hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-primary font-medium mt-1">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">Order Timeline</h2>
                <div className="space-y-6">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div className={`w-4 h-4 rounded-full ${
                          index === order.timeline.length - 1 
                            ? 'bg-primary' 
                            : 'bg-gray-200'
                        }`} />
                        {index !== order.timeline.length - 1 && (
                          <div className="absolute top-4 left-2 w-px h-16 bg-gray-200" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{event.status}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User size={20} className="text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">{order.shipping.address.name}</p>
                      <p className="text-sm text-gray-500">{order.shipping.address.phone}</p>
                      <p className="text-sm text-gray-500">{order.shipping.address.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-gray-400 mt-1" />
                    <div className="text-gray-600">
                      <p>{order.shipping.address.line1}</p>
                      {order.shipping.address.line2 && <p>{order.shipping.address.line2}</p>}
                      <p>Landmark: {order.shipping.address.landmark}</p>
                      <p>{order.shipping.address.city}, {order.shipping.address.state}</p>
                      <p>{order.shipping.address.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {order.shipping.tracking && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Tracking Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Truck size={20} className="text-gray-400" />
                      <div>
                        <p className="font-medium">{order.shipping.tracking.provider}</p>
                        <p className="text-sm text-gray-500">{order.shipping.tracking.number}</p>
                      </div>
                    </div>
                    <a 
                      href={order.shipping.tracking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-dark"
                    >
                      Track Package
                      <ArrowLeft size={16} className="rotate-180" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;