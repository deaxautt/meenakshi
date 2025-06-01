import React from 'react';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <FileText size={32} className="text-primary" />
            <h1 className="text-3xl font-bold">Terms of Service</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: March 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Agreement to Terms</h2>
                <p className="text-gray-600">
                  By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our website or use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Intellectual Property</h2>
                <p className="text-gray-600">
                  The content on our website, including text, graphics, logos, images, and software, is owned by Meenakshi Premium Jewelry and is protected by copyright and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">User Accounts</h2>
                <p className="text-gray-600 mb-4">When creating an account, you agree to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any security breaches</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Products and Services</h2>
                <p className="text-gray-600 mb-4">
                  All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.
                </p>
                <p className="text-gray-600">
                  Product images are for illustrative purposes only. Actual products may vary due to the natural characteristics of gemstones and handcrafted items.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Payment Terms</h2>
                <p className="text-gray-600 mb-4">
                  We accept various payment methods as indicated on our website. All payments must be made in full before products are shipped.
                </p>
                <p className="text-gray-600">
                  Payment information is encrypted and processed securely through our authorized payment partners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Shipping and Delivery</h2>
                <p className="text-gray-600">
                  Delivery times are estimates only. We are not responsible for delays caused by shipping carriers or customs clearance. Risk of loss and title for items purchased pass to you upon delivery.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Returns and Refunds</h2>
                <p className="text-gray-600">
                  Please refer to our Returns Policy for detailed information about returns, exchanges, and refunds.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-gray-600">
                  We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or products.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  For questions about these Terms of Service, please contact us at:
                  <br />
                  Email: legal@meenakshi.com
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

export default Terms;