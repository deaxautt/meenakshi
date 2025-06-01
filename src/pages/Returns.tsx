import React from 'react';
import { RefreshCw } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <RefreshCw size={32} className="text-primary" />
            <h1 className="text-3xl font-bold">Returns Policy</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: March 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Return Period</h2>
                <p className="text-gray-600">
                  We accept returns within 7 days of delivery for most products. The item must be unused, unworn, and in its original packaging with all tags and certificates intact.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Eligible Items</h2>
                <div className="space-y-4">
                  <p className="text-gray-600 font-medium">The following items are eligible for return:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Gemstones with unbroken certification seal</li>
                    <li>Unworn jewelry in original condition</li>
                    <li>Unopened Rudraksha products</li>
                    <li>Unworn traditional wear with tags attached</li>
                  </ul>

                  <p className="text-gray-600 font-medium mt-6">Non-returnable items:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Custom-made or personalized items</li>
                    <li>Gemstones with broken certification seal</li>
                    <li>Used or worn items</li>
                    <li>Items without original packaging</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Return Process</h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-4">
                  <li>
                    Initiate return request through your account or contact customer service
                  </li>
                  <li>
                    Receive return authorization and shipping instructions
                  </li>
                  <li>
                    Pack the item securely in its original packaging
                  </li>
                  <li>
                    Ship the item using the provided return label
                  </li>
                  <li>
                    Refund will be processed after quality check
                  </li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Refund Process</h2>
                <p className="text-gray-600 mb-4">
                  Once we receive and inspect the returned item:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Quality check will be completed within 48 hours</li>
                  <li>Refund will be initiated to original payment method</li>
                  <li>Bank processing time: 5-7 business days</li>
                  <li>Shipping charges are non-refundable</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Exchange Policy</h2>
                <p className="text-gray-600 mb-4">
                  We offer exchanges within 7 days of delivery:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Size exchanges for jewelry</li>
                  <li>Color or design variations if available</li>
                  <li>Different products of equal or higher value</li>
                  <li>Price difference must be paid for upgrades</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Damaged or Defective Items</h2>
                <p className="text-gray-600 mb-4">
                  For items received damaged or defective:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Report within 24 hours of delivery</li>
                  <li>Provide photos of damage or defect</li>
                  <li>Free return shipping provided</li>
                  <li>Immediate replacement or refund available</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Cancellation Policy</h2>
                <p className="text-gray-600">
                  Orders can be cancelled before shipping. Once shipped, the return policy will apply. Cancellation charges may apply for custom orders.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  For returns and refund related queries, please contact us at:
                  <br />
                  Email: returns@meenakshi.com
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

export default Returns;