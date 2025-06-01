import { create } from 'zustand';

// Add ornament variant images
const ornamentImages = {
  Ring: "https://meenakshistore.com/uploads/media/2024/EM-1a.jpg",
  Pendant: "https://meenakshistore.com/uploads/media/2024/EM-2a.jpg",
  Bracelet: "https://meenakshistore.com/uploads/media/2024/P(SS)_1.jpg",
  Loose: "https://meenakshistore.com/uploads/media/2024/P(SS)_2.jpg",
  Brooch: "https://meenakshistore.com/uploads/media/2024/EM-1a.jpg"
};

export interface Product {
  id: number;
  name: string;
  price: string;
  mrp: string;
  discount: string;
  image: string;
  hoverImage: string;
  category: string;
  subcategory: string;
  rashi?: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  stock: number;
  images: string[];
  videoUrl?: string;
  benefits: string[];
  specifications: Record<string, string>;
  isNew?: boolean;
  isFeatured?: boolean;
  ornamentImages: typeof ornamentImages;
  origin?: string;
  sku?: string;
}

const gemstoneProducts: Product[] = [
  {
    id: 1,
    name: "Natural Emerald (Panna)",
    price: "₹45,000",
    mrp: "₹50,000",
    discount: "10% off",
    image: "https://meenakshistore.com/uploads/media/2024/EM-1a.jpg",
    hoverImage: "https://meenakshistore.com/uploads/media/2024/EM-2a.jpg",
    category: "Gemstones",
    subcategory: "Emerald",
    rashi: "Budh",
    rating: 4.8,
    reviews: 124,
    description: "Premium quality, Certified Natural Emerald (Panna) known for its deep green color and exceptional clarity. Perfect for those seeking Mercury's blessings.",
    tags: ["Bestseller", "Certified"],
    stock: 5,
    images: [
      "https://meenakshistore.com/uploads/media/2024/EM-1a.jpg",
      "https://meenakshistore.com/uploads/media/2024/EM-2a.jpg"
    ],
    benefits: [
      "Enhances intelligence and wisdom",
      "Improves communication skills",
      "Brings professional success",
      "Strengthens Mercury's influence"
    ],
    specifications: {
      "Stone Type": "Natural Emerald",
      "Weight": "2.5 carats",
      "Color": "Deep Green",
      "Cut": "Oval",
      "Clarity": "VS",
      "Treatment": "None",
      "Certification": "GIA"
    },
    isNew: true,
    isFeatured: true,
    ornamentImages,
    origin: "Colombia",
    sku: "EM001"
  },
  {
    id: 2,
    name: "Premium Emerald (Panna)",
    price: "₹55,000",
    mrp: "₹62,000",
    discount: "11% off",
    image: "https://meenakshistore.com/uploads/media/2024/EM-2a.jpg",
    hoverImage: "https://meenakshistore.com/uploads/media/2024/EM-1a.jpg",
    category: "Gemstones",
    subcategory: "Emerald",
    rashi: "Budh",
    rating: 4.9,
    reviews: 98,
    description: "Exquisite Premium Emerald (Panna) with superior clarity and vibrant green color. Ideal for maximizing Mercury's positive influences.",
    tags: ["Premium", "Certified"],
    stock: 3,
    images: [
      "https://meenakshistore.com/uploads/media/2024/EM-2a.jpg",
      "https://meenakshistore.com/uploads/media/2024/EM-1a.jpg"
    ],
    benefits: [
      "Boosts intellectual capabilities",
      "Enhances business acumen",
      "Improves memory power",
      "Brings clarity of thought"
    ],
    specifications: {
      "Stone Type": "Premium Emerald",
      "Weight": "3.0 carats",
      "Color": "Vivid Green",
      "Cut": "Cushion",
      "Clarity": "VVS",
      "Treatment": "None",
      "Certification": "GIA"
    },
    isNew: true,
    isFeatured: true,
    ornamentImages,
    origin: "Colombia",
    sku: "EM002"
  },
  {
    id: 3,
    name: "Natural Pearl (Moti)",
    price: "₹12,000",
    mrp: "₹15,000",
    discount: "20% off",
    image: "https://meenakshistore.com/uploads/media/2024/P(SS)_1.jpg",
    hoverImage: "https://meenakshistore.com/uploads/media/2024/P(SS)_2.jpg",
    category: "Gemstones",
    subcategory: "Pearl",
    rashi: "Chandra",
    rating: 4.7,
    reviews: 156,
    description: "Natural South Sea Pearl (Moti) with excellent luster and smooth surface. Perfect for enhancing Moon's positive influences.",
    tags: ["Bestseller", "Natural"],
    stock: 8,
    images: [
      "https://meenakshistore.com/uploads/media/2024/P(SS)_1.jpg",
      "https://meenakshistore.com/uploads/media/2024/P(SS)_2.jpg"
    ],
    benefits: [
      "Promotes emotional balance",
      "Enhances mental peace",
      "Improves relationships",
      "Strengthens intuition"
    ],
    specifications: {
      "Type": "South Sea Pearl",
      "Size": "8-9mm",
      "Color": "White",
      "Shape": "Round",
      "Luster": "Excellent",
      "Surface": "Clean",
      "Certification": "GIA"
    },
    isNew: false,
    isFeatured: true,
    ornamentImages,
    origin: "Australia",
    sku: "PRL001"
  },
  {
    id: 4,
    name: "Premium Pearl (Moti)",
    price: "₹18,000",
    mrp: "₹22,000",
    discount: "18% off",
    image: "https://meenakshistore.com/uploads/media/2024/P(SS)_2.jpg",
    hoverImage: "https://meenakshistore.com/uploads/media/2024/P(SS)_1.jpg",
    category: "Gemstones",
    subcategory: "Pearl",
    rashi: "Chandra",
    rating: 4.8,
    reviews: 142,
    description: "Premium quality South Sea Pearl (Moti) with exceptional luster and flawless surface. Ideal for maximizing Moon's beneficial aspects.",
    tags: ["Premium", "Natural"],
    stock: 5,
    images: [
      "https://meenakshistore.com/uploads/media/2024/P(SS)_2.jpg",
      "https://meenakshistore.com/uploads/media/2024/P(SS)_1.jpg"
    ],
    benefits: [
      "Enhances emotional intelligence",
      "Promotes peaceful sleep",
      "Improves maternal bonding",
      "Strengthens memory"
    ],
    specifications: {
      "Type": "South Sea Pearl",
      "Size": "9-10mm",
      "Color": "White",
      "Shape": "Round",
      "Luster": "Superior",
      "Surface": "Flawless",
      "Certification": "GIA"
    },
    isNew: true,
    isFeatured: true,
    ornamentImages,
    origin: "Australia",
    sku: "PRL002"
  }
];

interface ProductStore {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsBySubcategory: (subcategory: string) => Product[];
  getRelatedProducts: (id: number, limit?: number) => Product[];
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: gemstoneProducts,
  featuredProducts: gemstoneProducts.filter(p => p.isFeatured).slice(0, 8),
  newArrivals: gemstoneProducts.filter(p => p.isNew).slice(0, 8),
  getProductById: (id) => gemstoneProducts.find(p => p.id === id),
  getProductsByCategory: (category) => gemstoneProducts.filter(p => p.category.toLowerCase() === category.toLowerCase()),
  getProductsBySubcategory: (subcategory) => gemstoneProducts.filter(p => p.subcategory.toLowerCase() === subcategory.toLowerCase()),
  getRelatedProducts: (id, limit = 3) => {
    const product = get().getProductById(id);
    if (!product) return [];
    return gemstoneProducts
      .filter(p => p.subcategory === product.subcategory && p.id !== id)
      .slice(0, limit);
  }
}));

export default useProductStore;