import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const OtherGemstones = () => {
  const preciousGemstones = [
    {
      name: "Natural Ruby",
      subtitle: "Premium Quality",
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg"
    },
    {
      name: "Emerald",
      subtitle: "Certified Collection",
      image: "https://images.pexels.com/photos/5895884/pexels-photo-5895884.jpeg"
    },
    {
      name: "Yellow Sapphire",
      subtitle: "Astrological Grade",
      image: "https://images.pexels.com/photos/5895885/pexels-photo-5895885.jpeg"
    },
    {
      name: "Natural Pearl",
      subtitle: "Rare Collection",
      image: "https://images.pexels.com/photos/5895886/pexels-photo-5895886.jpeg"
    }
  ];

  const semiPreciousStones = [
    {
      name: "Amethyst",
      subtitle: "Healing Collection",
      image: "https://images.pexels.com/photos/5895887/pexels-photo-5895887.jpeg"
    },
    {
      name: "Garnet",
      subtitle: "Energy Stones",
      image: "https://images.pexels.com/photos/10475791/pexels-photo-10475791.jpeg"
    },
    {
      name: "Topaz",
      subtitle: "Spiritual Collection",
      image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
    },
    {
      name: "Moonstone",
      subtitle: "Mystical Collection",
      image: "https://images.pexels.com/photos/9159038/pexels-photo-9159038.jpeg"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl font-bold">Other Gemstones</h2>
          <Link to="/products/gemstones" className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-sm">
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
              {preciousGemstones.map((gemstone, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg overflow-hidden group">
                    <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
                      <img 
                        src={gemstone.image}
                        alt={gemstone.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h4 className="text-base md:text-lg font-medium truncate">{gemstone.name}</h4>
                      <p className="text-gray-500 text-xs md:text-sm truncate">{gemstone.subtitle}</p>
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
              {semiPreciousStones.map((gemstone, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg overflow-hidden group">
                    <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
                      <img 
                        src={gemstone.image}
                        alt={gemstone.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h4 className="text-base md:text-lg font-medium truncate">{gemstone.name}</h4>
                      <p className="text-gray-500 text-xs md:text-sm truncate">{gemstone.subtitle}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Banner */}
          <div className="relative aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden mx-1 md:mx-0">
            <img 
              src="https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg"
              alt="Premium Gemstones Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
              <div className="p-6 md:p-12">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                  Premium Gemstone Collection
                </h3>
                <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6">
                  Each stone in our collection is carefully selected and certified
                </p>
                <Link 
                  to="/products/gemstones"
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

export default OtherGemstones;