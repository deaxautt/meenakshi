import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ArrowRight, Shield, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const RudrakshaCollection = () => {
  const rudrakshas = [
    {
      name: "1 Mukhi Rudraksha",
      image: "https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg",
      price: "₹21,000",
      rating: 5.0,
      reviews: 89,
      benefits: ["Spiritual Growth", "Self-realization", "Divine Connection"],
      description: "Extremely rare and powerful, representing Lord Shiva",
      certification: "IGI Certified",
      origin: "Nepal"
    },
    {
      name: "5 Mukhi Rudraksha",
      image: "https://images.pexels.com/photos/6431983/pexels-photo-6431983.jpeg",
      price: "₹2,100",
      rating: 4.9,
      reviews: 156,
      benefits: ["Peace", "Health", "Knowledge"],
      description: "Most universal and beneficial for all zodiac signs",
      certification: "IGI Certified",
      origin: "Nepal"
    },
    {
      name: "7 Mukhi Rudraksha",
      image: "https://images.pexels.com/photos/6431984/pexels-photo-6431984.jpeg",
      price: "₹3,500",
      rating: 4.8,
      reviews: 112,
      benefits: ["Wealth", "Success", "Prosperity"],
      description: "Brings material and spiritual prosperity",
      certification: "IGI Certified",
      origin: "Nepal"
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
          <h2 className="section-title text-4xl font-bold mb-6">Sacred Rudraksha Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our collection of authentic and energized Rudraksha beads, carefully selected and certified for their spiritual and astrological benefits
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 mb-16">
          {rudrakshas.map((rudraksha, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-conic from-primary/20 via-accent/10 to-primary/20 rounded-3xl transform rotate-2"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={rudraksha.image}
                    alt={rudraksha.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-2">{rudraksha.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span>{rudraksha.rating}</span>
                        </div>
                        <span className="text-white/80">({rudraksha.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={20} className="text-primary" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">{rudraksha.price}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield size={16} className="text-green-600" />
                      <span className="text-green-600">{rudraksha.certification}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{rudraksha.description}</p>

                  <div className="space-y-3 mb-6">
                    {rudraksha.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700">
                        <Sparkles size={16} className="text-primary" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>Origin: {rudraksha.origin}</span>
                    <span>In Stock</span>
                  </div>

                  <button className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                    View Details <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: "100% Authentic",
              description: "Every Rudraksha is certified and authenticated by experts"
            },
            {
              icon: Award,
              title: "Energized & Blessed",
              description: "Specially energized through sacred Vedic rituals"
            },
            {
              icon: Sparkles,
              title: "Expert Guidance",
              description: "Personal consultation for choosing the right Rudraksha"
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
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                <feature.icon size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <img 
            src="https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg"
            alt="Sacred Rudraksha"
            className="w-full h-[400px] object-cover"
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
                  Transform Your Life with Sacred Rudraksha
                </h3>
                <p className="text-white/90 text-lg mb-8">
                  Experience the divine energy and spiritual benefits of authentic Rudraksha beads
                </p>
                <Link 
                  to="/products/rudraksha"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  Explore Collection <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RudrakshaCollection;