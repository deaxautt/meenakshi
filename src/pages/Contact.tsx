import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [
        "+91 1234567890",
        "+91 9876543210"
      ]
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        "info@meenakshi.com",
        "support@meenakshi.com"
      ]
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "123 Main Street",
        "Hyderabad, Telangana 500001"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <info.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg"
                  >
                    <Check size={20} />
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
                  >
                    Send Message
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;