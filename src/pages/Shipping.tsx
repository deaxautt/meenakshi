import React from 'react';
import { Truck } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Truck size={32} className="text-primary" />
            <h1 className="text-3xl font-bold">Shipping Policy</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: March 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Processing Time</h2>
                <p className="text-gray-600">
                  Orders are typically processed within 24-48 hours of receipt. Custom orders and certain gemstone products may require additional processing time, which will be communicated at the time of purchase.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Shipping Methods</h2>
                <div className="space-y-4 text-gray-600">
                  <p className="font-medium">Domestic Shipping (Within India):</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Standard Shipping (3-5 business days)</li>
                    <li>Express Shipping (1-2 business days)</li>
                    <li>Same Day Delivery (select cities only)</li>
                  </ul>

                  <p className="font-medium mt-4">International Shipping:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Standard International (7-14 business days)</li>
                    <li>Express International (3-5 business days)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Shipping Costs</h2>
                <p className="text-gray-600 mb-4">
                  Shipping costs are calculated based on:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Delivery location</li>
                  <li>Selected shipping method</li>
                  <li>Order weight and dimensions</li>
                  <li>Order value</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Free shipping is available on orders above ₹2,999 within India.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Order Tracking</h2>
                <p className="text-gray-600">
                  Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order status through our website or the carrier's tracking portal.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Delivery Guidelines</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Signature may be required upon delivery</li>
                  <li>Please ensure accurate shipping information</li>
                  <li>Additional charges may apply for address changes</li>
                  <li>We are not responsible for delays due to customs clearance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">International Orders</h2>
                <p className="text-gray-600 mb-4">
                  For international orders:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Customer is responsible for import duties and taxes</li>
                  <li>Customs clearance may cause delivery delays</li>
                  <li>Tracking updates may be limited in certain countries</li>
                  <li>Some products may have shipping restrictions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Insurance and Security</h2>
                <p className="text-gray-600">
                  All shipments are fully insured against loss or damage during transit. High-value items are shipped with additional security measures and require signature confirmation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  For shipping-related queries, please contact us at:
                  <br />
                  Email: shipping@meenakshi.com
                  <br />
                  Phone: +91 1234567890
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;