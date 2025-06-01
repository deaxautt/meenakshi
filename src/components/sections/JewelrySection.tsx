import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const JewelrySection = () => {
  const goldJewelry = [
    {
      name: "Diamond Necklace",
      subtitle: "22K Gold",
      image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg"
    },
    {
      name: "Bridal Set",
      subtitle: "Traditional Collection",
      image: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg"
    },
    {
      name: "Antique Bangles",
      subtitle: "Heritage Collection",
      image: "https://images.pexels.com/photos/1616793/pexels-photo-1616793.jpeg"
    },
    {
      name: "Temple Jewelry",
      subtitle: "Sacred Collection",
      image: "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg"
    }
  ];

  const diamondJewelry = [
    {
      name: "Solitaire Ring",
      subtitle: "Premium Collection",
      image: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg"
    },
    {
      name: "Tennis Bracelet",
      subtitle: "Modern Collection",
      image: "https://images.pexels.com/photos/1616793/pexels-photo-1616793.jpeg"
    },
    {
      name: "Diamond Earrings",
      subtitle: "Contemporary Design",
      image: "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg"
    },
    {
      name: "Diamond Pendant",
      subtitle: "Elegant Collection",
      image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl font-bold">Premium Jewelry</h2>
          <Link to="/products/jewelry" className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-sm">
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
              {goldJewelry.map((jewelry, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg overflow-hidden group">
                    <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
                      <img 
                        src={jewelry.image}
                        alt={jewelry.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h4 className="text-base md:text-lg font-medium truncate">{jewelry.name}</h4>
                      <p className="text-gray-500 text-xs md:text-sm truncate">{jewelry.subtitle}</p>
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
              {diamondJewelry.map((jewelry, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg overflow-hidden group">
                    <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
                      <img 
                        src={jewelry.image}
                        alt={jewelry.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h4 className="text-base md:text-lg font-medium truncate">{jewelry.name}</h4>
                      <p className="text-gray-500 text-xs md:text-sm truncate">{jewelry.subtitle}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Banner */}
          <div className="relative aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden mx-1 md:mx-0">
            <img 
              src="https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg"
              alt="Premium Jewelry Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
              <div className="p-6 md:p-12">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                  Luxury Jewelry Collection
                </h3>
                <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6">
                  Discover our exquisite collection of premium jewelry
                </p>
                <Link 
                  to="/products/jewelry"
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

export default JewelrySection;