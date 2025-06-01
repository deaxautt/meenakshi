import React from 'react';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsultationBanner = () => {
  return (
    <section className="bg-primary py-8 md:py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Consult an Astrologer Now</h2>
            <p className="text-white/90">Get expert guidance for gemstones and spiritual solutions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:+911234567890"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full hover:bg-primary-dark hover:text-white transition-colors"
            >
              <Phone size={20} />
              Call Now
            </a>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white hover:text-primary transition-colors"
            >
              <Calendar size={20} />
              Book Appointment <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationBanner;