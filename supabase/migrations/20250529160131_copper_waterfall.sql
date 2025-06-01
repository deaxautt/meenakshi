-- Insert categories
INSERT INTO categories (name, slug, description, image) VALUES
('Gemstones', 'gemstones', 'Premium quality astrological gemstones', 'https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg'),
('Rudraksha', 'rudraksha', 'Sacred and energized Rudraksha beads', 'https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg'),
('Traditional', 'traditional', 'Exclusive traditional wear collection', 'https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg');

-- Insert products
INSERT INTO products (name, description, price, mrp, discount, category, subcategory, images, rating, reviews, stock, features) VALUES
('Natural Blue Sapphire', 'Premium quality certified Blue Sapphire', 45000, 50000, 10, 'Gemstones', 'Sapphire', 
  ARRAY['https://images.pexels.com/photos/5895883/pexels-photo-5895883.jpeg'],
  4.8, 156, 10, ARRAY['GIA Certified', 'Natural Stone']),
('5 Mukhi Rudraksha', 'Authentic Nepali 5 Mukhi Rudraksha', 2100, 2500, 16, 'Rudraksha', '5 Mukhi',
  ARRAY['https://images.pexels.com/photos/6431982/pexels-photo-6431982.jpeg'],
  4.9, 142, 50, ARRAY['Certified', 'Energized']),
('Kanchipuram Silk Saree', 'Handwoven pure silk saree', 15000, 18000, 17, 'Traditional', 'Sarees',
  ARRAY['https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg'],
  4.7, 98, 20, ARRAY['Pure Silk', 'Handwoven']);