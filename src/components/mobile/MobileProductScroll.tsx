import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  mrp: string;
  discount: string;
  rating: number;
  reviews: number;
}

interface MobileProductScrollProps {
  title: string;
  products: Product[];
  viewAll?: string;
}

const MobileProductScroll: React.FC<MobileProductScrollProps> = ({
  title,
  products,
  viewAll
}) => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {viewAll && (
          <Link to={viewAll} className="text-primary text-sm">
            View All
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto gap-4 px-4 hide-scrollbar">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-40 bg-white rounded-lg"
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <button className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full">
                  <Heart size={16} className="text-gray-400" />
                </button>
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium truncate">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} className="text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                <div className="mt-1">
                  <span className="text-sm font-bold">{product.price}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 line-through">{product.mrp}</span>
                    <span className="text-green-600">{product.discount}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileProductScroll;