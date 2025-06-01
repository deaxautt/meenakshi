import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const RudrakshSection = () => {
  const premiumRudraksha = [
    {
      name: "1 Mukhi Rudraksha",
      subtitle: "Rare Collection",
      image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
    },
    {
      name: "2 Mukhi Rudraksha",
      subtitle: "Sacred Collection",
      image: "https://images.pexels.com/photos/6044267/pexels-photo-6044267.jpeg"
    },
    {
      name: "5 Mukhi Rudraksha",
      subtitle: "Blessed Collection",
      image: "https://images.pexels.com/photos/6044268/pexels-photo-6044268.jpeg"
    },
    {
      name: "7 Mukhi Rudraksha",
      subtitle: "Divine Collection",
      image: "https://images.pexels.com/photos/6044269/pexels-photo-6044269.jpeg"
    }
  ];

  const rudrakshaBeads = [
    {
      name: "108 Beads Mala",
      subtitle: "Traditional Mala",
      image: "https://images.pexels.com/photos/6044270/pexels-photo-6044270.jpeg"
    },
    {
      name: "27 Beads Mala",
      subtitle: "Daily Wear",
      image: "https://images.pexels.com/photos/6044271/pexels-photo-6044271.jpeg"
    },
    {
      name: "54 Beads Mala",
      subtitle: "Meditation Mala",
      image: "https://images.pexels.com/photos/6044272/pexels-photo-6044272.jpeg"
    },
    {
      name: "Combination Mala",
      subtitle: "Mixed Benefits",
      image: "https://images.pexels.com/photos/6044273/pexels-photo-6044273.jpeg"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl font-bold">Sacred Rudraksha</h2>
          <Link to="/products/rudraksha" className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-sm">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-6 md:space-y-12">
          {/* First Carousel */}
          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-8 shadow-sm mx-1 md:mx-0">
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={24}
              navigation
              className="gemstones-carousel !px-1"
            >
              {premiumRudraksha.map((rudraksha, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg overflow-hidden group">
                    <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
                      <img 
                        src={rudraksha.image}
                        alt={rudraksha.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h4 className="text-base md:text-lg font-medium truncate">{rudraksha.name}</h4>
                      <p className="text-gray-500 text-xs md:text-sm truncate">{rudraksha.subtitle}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Second Carousel */}
          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-8 shadow-sm mx-1 md:mx-0">
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={24}
              navigation
              className="gemstones-carousel !px-1"
            >
              {rudrakshaBeads.map((rudraksha, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg overflow-hidden group">
                    <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
                      <img 
                        src={rudraksha.image}
                        alt={rudraksha.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h4 className="text-base md:text-lg font-medium truncate">{rudraksha.name}</h4>
                      <p className="text-gray-500 text-xs md:text-sm truncate">{rudraksha.subtitle}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Banner */}
          <div className="relative aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden mx-1 md:mx-0">
            <img 
              src="https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
              alt="Sacred Rudraksha Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
              <div className="p-6 md:p-12">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                  Sacred Rudraksha Collection
                </h3>
                <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6">
                  Experience the divine energy and spiritual benefits
                </p>
                <Link 
                  to="/products/rudraksha"
                  className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  Shop Now <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RudrakshSection;