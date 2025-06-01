import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import MarqueeStrip from '../components/sections/MarqueeStrip';
import MobileBanner from '../components/mobile/MobileBanner';
import MobileCategories from '../components/mobile/MobileCategories';
import MobileProductScroll from '../components/mobile/MobileProductScroll';
import FeaturedCategories from '../components/sections/FeaturedCategories';
import TrendingProducts from '../components/sections/TrendingProducts';
import AstrologicalGemstones from '../components/sections/AstrologicalGemstones';
import OtherGemstones from '../components/sections/OtherGemstones';
import RudrakshSection from '../components/sections/RudrakshSection';
import JewelrySection from '../components/sections/JewelrySection';
import SareesSection from '../components/sections/SareesSection';
import RudrakshaCollection from '../components/sections/RudrakshaCollection';
import ConsultationSection from '../components/sections/ConsultationSection';
import InstagramFeed from '../components/sections/InstagramFeed';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const heroSlides = [
    {
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      link: "/products/gemstones"
    },
    {
      image: "https://images.pexels.com/photos/5895885/pexels-photo-5895885.jpeg",
      link: "/products/rudraksha"
    },
    {
      image: "https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg",
      link: "/products/traditional"
    }
  ];

  const categories = [
    {
      name: "Gemstones",
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      link: "/products/gemstones"
    },
    {
      name: "Rudraksha",
      image: "https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg",
      link: "/products/rudraksha"
    },
    {
      name: "Traditional",
      image: "https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg",
      link: "/products/traditional"
    },
    {
      name: "Spiritual",
      image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
      link: "/products/spiritual"
    }
  ];

  const trendingProducts = [
    {
      id: 1,
      name: "Natural Blue Sapphire Ring",
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      price: "₹45,000",
      mrp: "₹50,000",
      discount: "10% off",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: "5 Mukhi Rudraksha",
      image: "https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg",
      price: "₹2,100",
      mrp: "₹2,500",
      discount: "16% off",
      rating: 4.9,
      reviews: 142
    },
    {
      id: 3,
      name: "Designer Silk Saree",
      image: "https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg",
      price: "₹15,000",
      mrp: "₹18,000",
      discount: "17% off",
      rating: 4.7,
      reviews: 98
    },
    {
      id: 4,
      name: "Pearl Mala",
      image: "https://images.pexels.com/photos/5895885/pexels-photo-5895885.jpeg",
      price: "₹8,500",
      mrp: "₹10,000",
      discount: "15% off",
      rating: 4.6,
      reviews: 112
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileCategories categories={categories} />
        <MobileBanner banners={heroSlides} />
        <AstrologicalGemstones />
        <OtherGemstones />
        <RudrakshSection />
        <JewelrySection />
        <SareesSection />
        <MobileProductScroll 
          title="Trending Now"
          products={trendingProducts}
          viewAll="/products/trending"
        />
        <div className="h-px bg-gray-200 my-4" />
        <MobileProductScroll 
          title="New Arrivals"
          products={trendingProducts}
          viewAll="/products/new"
        />
        <div className="h-px bg-gray-200 my-4" />
        <MobileProductScroll 
          title="Best Sellers"
          products={trendingProducts}
          viewAll="/products/best-sellers"
        />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <section className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="h-[90vh]"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full">
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <FeaturedCategories />
        <TrendingProducts />
        <AstrologicalGemstones />
        <OtherGemstones />
        <RudrakshSection />
        <JewelrySection />
        <SareesSection />
        <RudrakshaCollection />
        <ConsultationSection />
        <InstagramFeed />
      </div>
    </div>
  );
};

export default Home;