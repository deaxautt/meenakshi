import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Heart, User, ChevronDown, Bell, Grid, Star, X, Phone, Mail, MapPin, LogOut } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import useCategoryStore from '../../store/categories';

import 'swiper/css';
import 'swiper/css/free-mode';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const { categories } = useCategoryStore();
  const { user, signOut } = useAuth();
  const authMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const announcements = [
    "Free Shipping on Orders Above ₹999",
    "100% Authentic Products",
    "Easy 30-Day Returns",
    "COD Available",
    "Best Price Guaranteed"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Handle auth menu clicks
      if (authMenuRef.current && !authMenuRef.current.contains(event.target as Node)) {
        setShowAuthMenu(false);
      }

      // Handle mobile menu clicks
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowAuthMenu(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLinkClick = () => {
    setShowAuthMenu(false);
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    {
      title: 'Shop by Category',
      items: categories.map(cat => ({
        name: cat.name,
        link: `/products/${cat.name.toLowerCase()}`
      }))
    },
    {
      title: user ? 'My Account' : 'Account',
      items: user ? [
        { name: 'Profile', link: '/profile' },
        { name: 'Orders', link: '/orders' },
        { name: 'Wishlist', link: '/wishlist' },
        { name: 'Manage Addresses', link: '/addresses' },
        { name: 'Sign Out', onClick: handleSignOut }
      ] : [
        { name: 'Sign In', link: '/signin' },
        { name: 'Create Account', link: '/signup' }
      ]
    },
    {
      title: 'Help & Support',
      items: [
        { name: 'Contact Us', link: '/contact' },
        { name: 'FAQs', link: '/faqs' },
        { name: 'Shipping Policy', link: '/shipping' },
        { name: 'Returns Policy', link: '/returns' }
      ]
    }
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white">
        {/* Announcement Strip */}
        <div className="bg-primary text-white py-2">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <Phone size={16} />
                  +91 1234567890
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  info@meenakshi.com
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/track-order" className="hover:text-white/80" onClick={handleLinkClick}>Track Order</Link>
                {user ? (
                  <div className="relative" ref={authMenuRef}>
                    <button 
                      onClick={() => setShowAuthMenu(!showAuthMenu)}
                      className="flex items-center gap-2 hover:text-white/80"
                    >
                      <span>My Account</span>
                      <ChevronDown size={16} />
                    </button>
                    <AnimatePresence>
                      {showAuthMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
                        >
                          <Link 
                            to="/profile" 
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                            onClick={handleLinkClick}
                          >
                            Profile
                          </Link>
                          <Link 
                            to="/orders" 
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                            onClick={handleLinkClick}
                          >
                            Orders
                          </Link>
                          <Link 
                            to="/addresses" 
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                            onClick={handleLinkClick}
                          >
                            Manage Addresses
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link to="/signin" className="hover:text-white/80" onClick={handleLinkClick}>Sign In</Link>
                    <Link to="/signup" className="bg-white/10 px-4 py-1 rounded-full hover:bg-white/20 transition-colors" onClick={handleLinkClick}>
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`sticky top-0 z-40 bg-white ${isScrolled ? 'shadow-md' : ''}`}>
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold">
                मीनाक्षी
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for Gemstones, Rudraksha, and more..."
                    className="w-full px-4 py-2 pl-10 border rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6">
                <Link to="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-primary">
                  <Heart size={20} />
                  <span className="text-xs mt-1">Wishlist</span>
                </Link>
                <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-primary">
                  <ShoppingBag size={20} />
                  <span className="text-xs mt-1">Cart</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Categories Navigation */}
          <div className="border-t border-gray-200">
            <div className="container-custom">
              <ul className="flex justify-center gap-8 py-3">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <Link
                      to={`/products/${category.name.toLowerCase()}`}
                      className="flex items-center gap-1 text-gray-700 hover:text-primary"
                    >
                      {category.name}
                      <ChevronDown size={16} />
                    </Link>
                    {hoveredCategory === category.name && (
                      <div className="absolute top-full left-0 w-[600px] bg-white shadow-lg rounded-lg p-6 z-50 grid grid-cols-2 gap-6">
                        {Object.entries(category.subcategories).map(([mainSubCat, subCategories], idx) => (
                          <div key={idx}>
                            <Link
                              to={`/products/${category.name.toLowerCase()}/${mainSubCat.toLowerCase().replace(/ /g, '-')}`}
                              className="block font-medium text-gray-900 hover:text-primary mb-4"
                            >
                              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-2">
                                <img 
                                  src={category.images[mainSubCat].main}
                                  alt={mainSubCat}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {mainSubCat}
                            </Link>
                            <div className="grid grid-cols-2 gap-2">
                              {subCategories.map((subCat, subIdx) => (
                                <Link
                                  key={subIdx}
                                  to={`/products/${category.name.toLowerCase()}/${mainSubCat.toLowerCase().replace(/ /g, '-')}/${subCat.toLowerCase().replace(/ /g, '-')}`}
                                  className="text-sm text-gray-600 hover:text-primary"
                                >
                                  <div className="aspect-square rounded-lg overflow-hidden mb-1">
                                    <img 
                                      src={category.images[mainSubCat].items[subCat]}
                                      alt={subCat}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  {subCat}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="md:hidden bg-pink-50">
        {/* Logo Section */}
        <div className="flex items-center justify-between px-4 py-2">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2"
          >
            <Menu size={24} />
          </button>
          <Link to="/">
            <img 
              src="https://meenakshistore.com/uploads/media/2024/M_S_LOGO_HIGH_QUALITY.png" 
              alt="Meenakshi Store"
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <Link to="/notifications" className="p-2 -mr-2">
            <Bell size={24} className="text-gray-600" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-full border px-4 py-2">
            <input
              type="text"
              placeholder='Search "Denim Dress"'
              className="flex-1 bg-transparent focus:outline-none text-sm"
            />
            <Search size={20} className="text-gray-400" />
          </div>
          <Link to="/wishlist" className="text-gray-600 hover:text-primary">
            <Heart size={24} />
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-primary">
            <ShoppingBag size={24} />
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar">
          {['All', 'Gemstones', 'Jewelry', 'Fashion', 'Others'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-6 py-2 text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.toLowerCase()
                  ? 'text-primary border-b-2 border-primary font-medium'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Marquee Strip */}
        <div className="bg-primary text-white py-0.5 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content animate-marquee">
              {announcements.map((text, index) => (
                <span key={index} className="inline-flex items-center gap-2 px-4">
                  <Star size={14} className="fill-current" />
                  {text}
                </span>
              ))}
              {announcements.map((text, index) => (
                <span key={`repeat-${index}`} className="inline-flex items-center gap-2 px-4">
                  <Star size={14} className="fill-current" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                ref={mobileMenuRef}
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween' }}
                className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 overflow-y-auto"
              >
                <div className="p-4 bg-primary text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                      <X size={24} />
                    </button>
                  </div>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <User size={20} />
                      <div>
                        <p className="font-medium">Welcome!</p>
                        <p className="text-sm text-white/80">{user.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <User size={20} />
                      <div>
                        <Link to="/signin" className="font-medium hover:text-white/80">Sign In</Link>
                        <p className="text-sm text-white/80">or <Link to="/signup" className="underline">Create Account</Link></p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="py-4">
                  {menuItems.map((section, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="px-4 text-sm font-medium text-gray-500 mb-2">
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item, idx) => (
                          item.onClick ? (
                            <button
                              key={idx}
                              onClick={item.onClick}
                              className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              key={idx}
                              to={item.link}
                              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <Phone size={16} />
                      <span>+91 1234567890</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} />
                      <span>info@meenakshi.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} />
                      <span>123 Main Street, Hyderabad</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;