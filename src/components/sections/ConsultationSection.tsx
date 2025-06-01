import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Star, ArrowRight, Shield, Award, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsultationSection = () => {
  const services = [
    {
      title: "Birth Chart Analysis",
      description: "Detailed analysis of your birth chart by expert astrologers",
      price: "₹2,999",
      duration: "60 mins",
      rating: 4.9,
      reviews: 156,
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      benefits: [
        "Personalized Reading",
        "Future Predictions",
        "Career Guidance",
        "Relationship Insights"
      ]
    },
    {
      title: "Gemstone Consultation",
      description: "Personalized gemstone recommendations based on your horoscope",
      price: "₹1,999",
      duration: "45 mins",
      rating: 4.8,
      reviews: 142,
      image: "https://images.pexels.com/photos/5895884/pexels-photo-5895884.jpeg",
      benefits: [
        "Stone Selection",
        "Wearing Method",
        "Auspicious Timing",
        "Remedial Measures"
      ]
    },
    {
      title: "Rudraksha Consultation",
      description: "Expert guidance on choosing the right Rudraksha",
      price: "₹1,499",
      duration: "30 mins",
      rating: 4.7,
      reviews: 98,
      image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
      benefits: [
        "Mukhi Selection",
        "Wearing Procedure",
        "Energy Alignment",
        "Spiritual Growth"
      ]
    }
  ];

  const experts = [
    {
      name: "Dr. Sharma",
      role: "Senior Astrologer",
      experience: "25+ Years",
      image: "https://images.pexels.com/photos/8127035/pexels-photo-8127035.jpeg",
      specialization: "Vedic Astrology"
    },
    {
      name: "Pandit Verma",
      role: "Gemstone Expert",
      experience: "20+ Years",
      image: "https://images.pexels.com/photos/8127784/pexels-photo-8127784.jpeg",
      specialization: "Planetary Gemology"
    },
    {
      name: "Acharya Kumar",
      role: "Spiritual Guide",
      experience: "30+ Years",
      image: "https://images.pexels.com/photos/8127548/pexels-photo-8127548.jpeg",
      specialization: "Rudraksha & Spirituality"
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
          <h2 className="section-title text-4xl font-bold mb-6">Expert Astrological Consultation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized guidance from our experienced astrologers and gemstone experts
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-conic from-primary/20 via-accent/10 to-primary/20 rounded-3xl transform rotate-2"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-xl hover-lift">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 text-white">
                        <Clock size={16} />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                <div className="space-y-3 mb-6">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="font-medium">{service.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                </div>

                <button className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                  Book Consultation <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-10 shadow-xl relative overflow-hidden mb-20"
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
          
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Meet Our Experts</h3>
            <p className="text-gray-600">Experienced professionals dedicated to your spiritual journey</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full opacity-10 animate-pulse-slow"></div>
                  <img 
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-1">{expert.name}</h4>
                <p className="text-primary font-medium mb-2">{expert.role}</p>
                <p className="text-gray-600 text-sm mb-2">{expert.experience} Experience</p>
                <p className="text-gray-500 text-sm">{expert.specialization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Certified Experts",
              description: "All our astrologers are certified professionals"
            },
            {
              icon: Award,
              title: "Quality Service",
              description: "Guaranteed satisfaction with our consultation"
            },
            {
              icon: Clock,
              title: "Flexible Timing",
              description: "Book consultations at your convenient time"
            },
            {
              icon: Phone,
              title: "24/7 Support",
              description: "Round the clock customer assistance"
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
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[21/9] rounded-3xl overflow-hidden mt-20"
        >
          <img 
            src="https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg"
            alt="Consultation Banner"
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
                  Start Your Spiritual Journey Today
                </h3>
                <p className="text-white/90 text-lg mb-8">
                  Book a consultation with our experts and discover your path to spiritual growth
                </p>
                <Link 
                  to="/consultation"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  Book Now <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationSection;