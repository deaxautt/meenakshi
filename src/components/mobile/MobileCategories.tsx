import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  image: string;
  link: string;
}

interface MobileCategoriesProps {
  categories: Category[];
}

const MobileCategories: React.FC<MobileCategoriesProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {categories.map((category, index) => (
        <Link 
          key={index}
          to={category.link}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
            <img 
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-center text-gray-700">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileCategories;