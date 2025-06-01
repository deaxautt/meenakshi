import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Home, Grid, ShoppingBag, Tag } from 'lucide-react';

const Footer = () => {
  const categories = {
    'Gemstones': ['Ruby', 'Blue Sapphire', 'Yellow Sapphire', 'Emerald', 'Pearl'],
    'Rudraksha': ['1 Mukhi', '2 Mukhi', '5 Mukhi', '7 Mukhi', '8 Mukhi'],
    'Traditional': ['Sarees', 'Blouses', 'Lehengas', 'Kurtis'],
    'Customer Service': ['Track Order', 'Returns', 'Shipping Policy', 'FAQ']
  };

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: '#' }
  ];

  const mobileNavItems = [
    { icon: Home, label: 'Home', link: '/' },
    { icon: Grid, label: 'Categories', link: '/categories' },
    { icon: Tag, label: 'New Arrivals', link: '/new-arrivals' },
    { icon: ShoppingBag, label: 'Cart', link: '/cart' }
  ];

  return (
    <>
      {/* Desktop Footer */}
      <footer className="bg-gray-900 text-white hidden md:block">
        {/* Newsletter Section */}
        <div className="border-b border-gray-800">
          <div className="container-custom py-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-400 mb-6">Stay updated with our latest collections and special offers</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary"
                />
                <button className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <Link to="/" className="text-2xl font-bold block mb-4">मीनाक्षी</Link>
              <p className="text-gray-400 mb-6">
                Premium astrology products and traditional Indian wear in Hyderabad.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            {Object.entries(categories).map(([title, items], index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4">{title}</h4>
                <ul className="space-y-3">
                  {items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/products/${title.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`}
                        className="text-gray-400 hover:text-primary transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="text-gray-400 not-italic space-y-3">
                <p className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  123 Main Street, Hyderabad, India
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={20} className="text-primary" />
                  +91 1234567890
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={20} className="text-primary" />
                  info@meenakshi.com
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 Meenakshi. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-primary text-sm">
                  Terms of Service
                </Link>
                <Link to="/shipping" className="text-gray-400 hover:text-primary text-sm">
                  Shipping Policy
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <img src="/payment/visa.png" alt="Visa" className="h-8" />
                <img src="/payment/mastercard.png" alt="Mastercard" className="h-8" />
                <img src="/payment/paypal.png" alt="PayPal" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
        <div className="grid grid-cols-4 gap-1">
          {mobileNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex flex-col items-center gap-1 p-3 text-gray-500 hover:text-primary"
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind fixed footer */}
      <div className="h-[72px] md:h-0" />
    </>
  );
};

export default Footer;