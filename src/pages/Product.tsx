import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Shield, ArrowLeft, Heart, Minus, Plus, Share2, Check, Award, Copy, Facebook, Twitter, Apple as WhatsApp, Sparkles, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useProductStore from '../store/products';

const Product = () => {
  const { id } = useParams();
  const { getProductById, getRelatedProducts } = useProductStore();
  const product = getProductById(Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');
  const [selectedVariants, setSelectedVariants] = useState({
    ornament: 'Loose',
    metal: '',
    ringDesign: '',
    size: '',
    pooja: false
  });
  const [showShareMenu, setShowShareMenu] = useState(false);

  const ornamentTypes = [
    { value: 'Loose', label: 'Loose', price: 0 },
    { value: 'Ring', label: 'Ring', price: 42000 },
    { value: 'Pendant', label: 'Pendant', price: 35000 }
  ];

  const metalOptions = [
    'Silver',
    '22K Yellow Gold',
    '18K White Gold',
    '18K Yellow Gold',
    '14K White Gold',
    '14K Yellow Gold'
  ];

  const ringDesigns = [
    { id: 'RD1', price: 42000 },
    { id: 'RD2', price: 45000 },
    { id: 'RD3', price: 52000 },
    { id: 'RD4', price: 45000 },
    { id: 'RD5', price: 45000 },
    { id: 'RD6', price: 47000 },
    { id: 'RD7', price: 47000 },
    { id: 'RD8', price: 45000 },
    { id: 'RD9', price: 45000 },
    { id: 'RD10', price: 47000 },
    { id: 'CUSTOMISED', price: 55000 }
  ];

  const certifications = [
    {
      name: 'GIA Certified',
      icon: Award,
      description: 'Certified by Gemological Institute of America'
    },
    {
      name: 'IGI Certified',
      icon: Shield,
      description: 'Certified by International Gemological Institute'
    },
    {
      name: 'BIS Hallmark',
      icon: Check,
      description: 'Bureau of Indian Standards Hallmark'
    }
  ];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${url}`);
        break;
    }
    setShowShareMenu(false);
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    let basePrice = parseInt(product.price.replace(/[^\d]/g, ''));
    
    if (selectedVariants.ornament !== 'Loose') {
      const ornamentPrice = ornamentTypes.find(o => o.value === selectedVariants.ornament)?.price || 0;
      basePrice += ornamentPrice;
    }

    if (selectedVariants.ornament === 'Ring' && selectedVariants.ringDesign) {
      const designPrice = ringDesigns.find(d => d.id === selectedVariants.ringDesign)?.price || 0;
      basePrice += designPrice;
    }

    return basePrice;
  };

  if (!id || isNaN(parseInt(id)) || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="py-4 flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/products/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-primary">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-primary">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white">
              {showVideo ? (
                <div className="relative w-full h-full">
                  <iframe 
                    src={`${product.videoUrl}?autoplay=1&rel=0`}
                    title="Product Video"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-6 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setShowVideo(false);
                  }}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index && !showVideo ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {product.videoUrl && (
                <button
                  onClick={() => {
                    setShowVideo(true);
                    setSelectedImage(-1);
                  }}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors relative ${
                    showVideo ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={product.images[0]}
                    alt="Product Video Thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[10px] border-l-primary border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-600">{product.stock} in stock</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{calculateTotalPrice().toLocaleString()}</span>
              <span className="text-gray-500 line-through">{product.mrp}</span>
              <span className="text-green-600">{product.discount}</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Ornament Selection */}
            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <label className="text-gray-700 font-medium">Select Loose or Add Customised</label>
                <div className="grid grid-cols-3 gap-4">
                  {ornamentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedVariants({ ...selectedVariants, ornament: type.value })}
                      className={`relative flex flex-col ${
                        selectedVariants.ornament === type.value
                          ? 'ring-2 ring-primary ring-offset-2'
                          : 'ring-1 ring-gray-200'
                      }`}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={product.ornamentImages[type.value]}
                          alt={type.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`p-2 text-center ${
                        selectedVariants.ornament === type.value
                          ? 'bg-primary/10'
                          : 'bg-gray-50'
                      }`}>
                        <span className="text-sm font-medium block">{type.label}</span>
                        {type.price > 0 && (
                          <span className="text-xs text-gray-600">+₹{type.price.toLocaleString()}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Selection */}
              {selectedVariants.ornament !== 'Loose' && (
                <div className="space-y-3">
                  <label className="text-gray-700 font-medium">Select Metal</label>
                  <div className="relative">
                    <select
                      value={selectedVariants.metal}
                      onChange={(e) => setSelectedVariants({ ...selectedVariants, metal: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none appearance-none bg-white"
                    >
                      <option value="">-- Please Select --</option>
                      {metalOptions.map((metal) => (
                        <option key={metal} value={metal}>{metal}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Ring Design Selection */}
              {selectedVariants.ornament === 'Ring' && selectedVariants.metal && (
                <div className="space-y-3">
                  <label className="text-gray-700 font-medium">Select Ring Design</label>
                  <div className="grid grid-cols-3 gap-4">
                    {ringDesigns.map((design) => (
                      <button
                        key={design.id}
                        onClick={() => setSelectedVariants({ ...selectedVariants, ringDesign: design.id })}
                        className={`relative aspect-square rounded-xl overflow-hidden ${
                          selectedVariants.ringDesign === design.id
                            ? 'ring-2 ring-primary ring-offset-2'
                            : 'ring-1 ring-gray-200'
                        }`}
                      >
                        {design.id === 'CUSTOMISED' ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">Upload Your Design</span>
                          </div>
                        ) : (
                          <img 
                            src={`/ring-designs/${design.id}.jpg`}
                            alt={`Ring Design ${design.id}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-center py-2">
                          <div className="text-sm font-medium">{design.id}</div>
                          <div className="text-xs">+₹{design.price.toLocaleString()}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ring Size */}
              {selectedVariants.ornament === 'Ring' && selectedVariants.metal && selectedVariants.ringDesign && (
                <div className="space-y-3">
                  <label className="text-gray-700 font-medium">Ring Size</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={selectedVariants.size}
                    onChange={(e) => setSelectedVariants({ ...selectedVariants, size: e.target.value })}
                    placeholder="Enter ring size"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              {/* Pooja Energization */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedVariants.pooja}
                    onChange={(e) => setSelectedVariants({ ...selectedVariants, pooja: e.target.checked })}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">
                    Energise & Activate for Astrological Purpose
                    <span className="text-green-600 ml-2">(No Extra Cost)</span>
                  </span>
                </label>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Minus size={20} />
                  </motion.button>
                  <span className="w-12 text-center">{quantity}</span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => quantity < product.stock && setQuantity(q => q + 1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Plus size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
                >
                  Add to Cart
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Heart size={24} />
                </motion.button>
                <motion.div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Share2 size={24} />
                  </motion.button>
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                      >
                        {[
                          { icon: Copy, label: 'Copy Link', action: 'copy' },
                          { icon: Facebook, label: 'Facebook', action: 'facebook' },
                          { icon: Twitter, label: 'Twitter', action: 'twitter' },
                          { icon: WhatsApp, label: 'WhatsApp', action: 'whatsapp' }
                        ].map((item) => (
                          <button
                            key={item.action}
                            onClick={() => handleShare(item.action)}
                            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50"
                          >
                            <item.icon size={18} />
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Certifications */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <h3 className="font-semibold text-lg mb-4">Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.name}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-xl p-4 flex flex-col items-center text-center"
                  >
                    <cert.icon className="w-8 h-8 text-primary mb-2" />
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-gray-500">{cert.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="border-t border-gray-200 pt-6 space-y-4 mt-6">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-gray-600">100% Authentic & Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-gray-600">Full Money-Back Guarantee of Authenticity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="container mx-auto px-4">
              <nav className="-mb-px flex space-x-8">
                {['specifications', 'benefits', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`border-b-2 py-4 px-1 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Product Specifications</h3>
                      <dl className="space-y-3">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex">
                            <dt className="w-1/3 text-gray-500">{key}</dt>
                            <dd className="w-2/3 text-gray-900">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Benefits</h3>
                    <ul className="space-y-3">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <span className="w-2 h-2 bg-primary rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-500 mt-1">Based on {product.reviews} reviews</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getRelatedProducts(Number(id)).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <p className="text-primary font-bold mt-1">{product.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;