import React from 'react';
import { Star } from 'lucide-react';

const MarqueeStrip = () => {
  const announcements = [
    "Free Shipping on Orders Above ₹2999",
    "100% Certified Products",
    "Easy Returns Within 7 Days",
    "Expert Astrological Consultation Available",
    "New Collection Arrived",
    "Festival Special Offers"
  ];

  return (
    <div className="bg-primary text-white py-2 overflow-hidden">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {announcements.map((text, index) => (
            <span key={index} className="mx-4 flex items-center gap-2">
              <Star size={16} className="fill-current" />
              {text}
            </span>
          ))}
        </div>
        <div className="animate-marquee whitespace-nowrap flex items-center absolute top-0 left-[100%]">
          {announcements.map((text, index) => (
            <span key={index} className="mx-4 flex items-center gap-2">
              <Star size={16} className="fill-current" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeStrip;