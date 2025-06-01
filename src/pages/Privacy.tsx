import React from 'react';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield size={32} className="text-primary" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: March 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Introduction</h2>
                <p className="text-gray-600">
                  At Meenakshi Premium Jewelry, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Name and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Account credentials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Process your orders and payments</li>
                  <li>Communicate with you about your orders</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Information Sharing</h2>
                <p className="text-gray-600">
                  We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website, conducting our business, or serving our users.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain processing of your data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  Email: privacy@meenakshi.com
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

export default Privacy;