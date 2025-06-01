import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ArrowRight, Sparkles, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendingProducts = () => {
  const products = [
    {
      id: 1,
      name: "Natural Blue Sapphire Ring",
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      hoverImage: "https://images.pexels.com/photos/5895884/pexels-photo-5895884.jpeg",
      price: "₹45,000",
      mrp: "₹50,000",
      discount: "10% off",
      rating: 4.8,
      reviews: 156,
      isNew: true,
      category: "Gemstones",
      features: ["GIA Certified", "Natural Stone"]
    },
    {
      id: 2,
      name: "5 Mukhi Rudraksha Pendant",
      image: "https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg",
      hoverImage: "https://images.pexels.com/photos/6431983/pexels-photo-6431983.jpeg",
      price: "₹2,100",
      mrp: "₹2,500",
      discount: "16% off",
      rating: 4.9,
      reviews: 142,
      isNew: true,
      category: "Rudraksha",
      features: ["Certified", "Energized"]
    },
    {
      id: 3,
      name: "Designer Silk Saree",
      image: "https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg",
      hoverImage: "https://images.pexels.com/photos/8285168/pexels-photo-8285168.jpeg",
      price: "₹15,000",
      mrp: "₹18,000",
      discount: "17% off",
      rating: 4.7,
      reviews: 98,
      isNew: false,
      category: "Traditional",
      features: ["Pure Silk", "Handwoven"]
    },
    {
      id: 4,
      name: "Pearl Mala",
      image: "https://images.pexels.com/photos/5895885/pexels-photo-5895885.jpeg",
      hoverImage: "https://images.pexels.com/photos/5895886/pexels-photo-5895886.jpeg",
      price: "₹8,500",
      mrp: "₹10,000",
      discount: "15% off",
      rating: 4.6,
      reviews: 112,
      isNew: true,
      category: "Jewelry",
      features: ["Natural Pearls", "Premium Quality"]
    }
  ];

  return (
    <section className="hidden md:block py-20 relative overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white">
      <div className="absolute inset-0 pattern-grid opacity-5"></div>
      
      <div className="container-custom relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="section-title text-4xl font-bold mb-4">Trending Now</h2>
            <p className="text-gray-600 max-w-xl">
              Discover our most popular products, handpicked for their exceptional quality and customer satisfaction
            </p>
          </div>
          <Link 
            to="/products/trending" 
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            View All Collections <ArrowRight size={20} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-conic from-primary/20 via-accent/10 to-primary/20 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img 
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.img 
                      src={product.hoverImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-lg font-semibold">{product.price}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="line-through text-white/70">{product.mrp}</span>
                          <span className="text-green-400">{product.discount}</span>
                        </div>
                      </div>
                    </div>
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent text-white text-sm px-3 py-1 rounded-full">
                        New Arrival
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Link 
                      to={`/product/${product.id}`}
                      className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mb-3">{product.category}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-green-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Sparkles size={14} className="text-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                    Add to Cart <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Shield,
              title: "100% Authentic",
              description: "Every product is certified and authenticated"
            },
            {
              icon: Award,
              title: "Premium Quality",
              description: "Handpicked products of highest quality"
            },
            {
              icon: Sparkles,
              title: "Expert Guidance",
              description: "Personal assistance in product selection"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                <feature.icon size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;