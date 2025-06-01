import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

interface Banner {
  image: string;
  link: string;
}

interface MobileBannerProps {
  banners: Banner[];
}

const MobileBanner: React.FC<MobileBannerProps> = ({ banners }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      className="aspect-[4/3]"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <Link to={banner.link}>
            <img
              src={banner.image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MobileBanner;