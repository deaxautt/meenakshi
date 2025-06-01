-- Insert subcategories for Gemstones
INSERT INTO categories (name, slug, description, image, parent_id)
SELECT 'Astrology Gemstones', 'astrology-gemstones', 'Premium astrological gemstones', 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg', id
FROM categories WHERE slug = 'gemstones';

INSERT INTO categories (name, slug, description, image, parent_id)
SELECT 'Other Gemstones', 'other-gemstones', 'Semi-precious and decorative stones', 'https://images.pexels.com/photos/1616793/pexels-photo-1616793.jpeg', id
FROM categories WHERE slug = 'gemstones';

-- Insert subcategories for Rudraksha
INSERT INTO categories (name, slug, description, image, parent_id)
SELECT 'Premium Rudraksha', 'premium-rudraksha', 'Rare and powerful Rudraksha beads', 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg', id
FROM categories WHERE slug = 'rudraksha';

INSERT INTO categories (name, slug, description, image, parent_id)
SELECT 'Rudraksha Malas', 'rudraksha-malas', 'Traditional prayer beads', 'https://images.pexels.com/photos/6044270/pexels-photo-6044270.jpeg', id
FROM categories WHERE slug = 'rudraksha';

-- Insert subcategories for Traditional
INSERT INTO categories (name, slug, description, image, parent_id)
SELECT 'Sarees', 'sarees', 'Premium silk sarees', 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg', id
FROM categories WHERE slug = 'traditional';

INSERT INTO categories (name, slug, description, image, parent_id)
SELECT 'Ethnic Wear', 'ethnic-wear', 'Traditional ethnic clothing', 'https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg', id
FROM categories WHERE slug = 'traditional';

-- Insert more products
INSERT INTO products (name, description, price, mrp, discount, category, subcategory, images, rating, reviews, stock, features, specifications) VALUES
-- Gemstones
('Natural Emerald (Panna)', 'Premium quality certified Natural Emerald known for its deep green color', 45000, 50000, 10, 'Gemstones', 'Astrology Gemstones',
  ARRAY['https://meenakshistore.com/uploads/media/2024/EM-1a.jpg', 'https://meenakshistore.com/uploads/media/2024/EM-2a.jpg'],
  4.8, 124, 5, 
  ARRAY['GIA Certified', 'Natural Stone', 'Mercury Stone'],
  '{"Stone Type": "Natural Emerald", "Weight": "2.5 carats", "Color": "Deep Green", "Cut": "Oval", "Clarity": "VS", "Treatment": "None"}'::jsonb),

('Premium Pearl (Moti)', 'Natural South Sea Pearl with excellent luster', 18000, 22000, 18, 'Gemstones', 'Astrology Gemstones',
  ARRAY['https://meenakshistore.com/uploads/media/2024/P(SS)_1.jpg', 'https://meenakshistore.com/uploads/media/2024/P(SS)_2.jpg'],
  4.8, 142, 5,
  ARRAY['GIA Certified', 'Natural Pearl', 'Moon Stone'],
  '{"Type": "South Sea Pearl", "Size": "9-10mm", "Color": "White", "Shape": "Round", "Luster": "Superior", "Surface": "Flawless"}'::jsonb),

-- Rudraksha
('1 Mukhi Rudraksha', 'Extremely rare and powerful Rudraksha', 21000, 25000, 16, 'Rudraksha', 'Premium Rudraksha',
  ARRAY['https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg'],
  5.0, 89, 3,
  ARRAY['Nepal Origin', 'Certified', 'Energized'],
  '{"Type": "1 Mukhi", "Origin": "Nepal", "Size": "20-22mm", "Quality": "Premium"}'::jsonb),

('108 Beads Rudraksha Mala', 'Traditional prayer mala with certified beads', 5500, 6500, 15, 'Rudraksha', 'Rudraksha Malas',
  ARRAY['https://images.pexels.com/photos/6044270/pexels-photo-6044270.jpeg'],
  4.6, 167, 15,
  ARRAY['5 Mukhi Beads', 'Sacred Thread', 'Energized'],
  '{"Type": "Prayer Mala", "Beads": "108", "Bead Type": "5 Mukhi", "Thread": "Sacred Cotton"}'::jsonb),

-- Traditional Wear
('Kanchipuram Silk Saree', 'Pure handwoven silk saree with rich pallu', 45000, 52000, 13, 'Traditional', 'Sarees',
  ARRAY['https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg'],
  4.9, 78, 8,
  ARRAY['Pure Silk', 'Handwoven', 'Temple Border'],
  '{"Material": "Pure Silk", "Length": "6.3 meters", "Border": "Temple Design", "Zari": "Pure Gold"}'::jsonb),

('Designer Lehenga', 'Premium bridal lehenga with intricate embroidery', 85000, 95000, 11, 'Traditional', 'Ethnic Wear',
  ARRAY['https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg'],
  4.8, 45, 5,
  ARRAY['Hand Embroidered', 'Premium Fabric', 'Designer Collection'],
  '{"Material": "Raw Silk", "Work": "Hand Embroidery", "Style": "Bridal", "Pieces": "3"}'::jsonb);