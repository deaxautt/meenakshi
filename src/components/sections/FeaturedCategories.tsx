import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gem, Crown, Zap, Feather, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
  const categories = [
    {
      title: "Premium Gemstones",
      subtitle: "Natural & Certified Collection",
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      icon: Gem,
      description: "Discover our collection of rare and precious gemstones",
      features: ["GIA Certified", "Natural Stones", "Expert Selected"],
      price: "From ₹15,000",
      link: "/products/gemstones"
    },
    {
      title: "Royal Collection",
      subtitle: "Traditional Elegance",
      image: "https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg",
      icon: Crown,
      description: "Handcrafted traditional wear for special occasions",
      features: ["Pure Silk", "Handwoven", "Premium Quality"],
      price: "From ₹25,000",
      link: "/products/traditional"
    },
    {
      title: "Sacred Rudraksha",
      subtitle: "Divine Energy",
      image: "https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg",
      icon: Zap,
      description: "Authentic and energized Rudraksha beads",
      features: ["Certified", "Energized", "Nepal Origin"],
      price: "From ₹2,100",
      link: "/products/rudraksha"
    },
    {
      title: "Designer Wear",
      subtitle: "Contemporary Style",
      image: "https://images.pexels.com/photos/8285168/pexels-photo-8285168.jpeg",
      icon: Feather,
      description: "Modern designs with traditional craftsmanship",
      features: ["Designer Collection", "Exclusive", "Limited Edition"],
      price: "From ₹18,000",
      link: "/products/designer"
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
          className="text-center mb-16"
        >
          <h2 className="section-title text-4xl font-bold mb-6">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections of premium products, each handpicked for their exceptional quality and authenticity
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-conic from-primary/20 via-accent/10 to-primary/20 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover-lift">
                <div className="flex h-full">
                  <div className="w-1/2 relative overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                      <div className="absolute bottom-6 left-6">
                        <div className="flex items-center gap-2 text-white/80 mb-2">
                          <Star size={16} className="fill-current" />
                          <span className="text-sm">Featured Collection</span>
                        </div>
                        <p className="text-white font-medium">{category.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-1/2 p-8 flex flex-col">
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-4">
                        <category.icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-primary font-medium mb-4">{category.subtitle}</p>
                      <p className="text-gray-600 mb-6">{category.description}</p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <Shield size={16} className="text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={category.link}
                      className="mt-auto inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                    >
                      Explore Collection <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[21/9] rounded-3xl overflow-hidden mt-16"
        >
          <img 
            src="https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg"
            alt="Featured Collections"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent">
            <div className="absolute inset-0 pattern-dots opacity-10"></div>
            <div className="relative h-full flex items-center p-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl"
              >
                <h3 className="text-4xl font-bold text-white mb-4">
                  Discover Our Premium Collections
                </h3>
                <p className="text-white/90 text-lg mb-8">
                  Explore our handpicked selection of premium products, each crafted with excellence and authenticity
                </p>
                <Link 
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  View All Collections <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;