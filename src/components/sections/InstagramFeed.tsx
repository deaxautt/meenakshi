import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const InstagramFeed = () => {
  const posts = [
    {
      image: "https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg",
      likes: "2.5k",
      comments: "156"
    },
    {
      image: "https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg",
      likes: "1.8k",
      comments: "98"
    },
    {
      image: "https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg",
      likes: "3.2k",
      comments: "245"
    },
    {
      image: "https://images.pexels.com/photos/5895885/pexels-photo-5895885.jpeg",
      likes: "2.1k",
      comments: "167"
    }
  ];

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Follow Us on Instagram</h2>
          <p className="text-gray-500">
            @meenakshi_premium_jewelry
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img 
                src={post.image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="flex items-center gap-4">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            <Instagram size={20} />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;