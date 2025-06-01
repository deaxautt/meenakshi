import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, Filter, SlidersHorizontal, Grid, List, Star, Heart, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useProductStore from '../store/products';

const CategoryProducts = () => {
  const { category, subcategory } = useParams();
  const { products } = useProductStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get products for the current category/subcategory
  const categoryProducts = products.filter(product => {
    if (subcategory) {
      return product.category.toLowerCase() === subcategory.toLowerCase().replace(/-/g, ' ');
    }
    return product.categoryType.toLowerCase() === (category || '').toLowerCase();
  });

  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);

  const filters = {
    categories: Array.from(new Set(categoryProducts.map(p => p.category))).map(cat => ({
      name: cat,
      count: categoryProducts.filter(p => p.category === cat).length
    })),
    priceRanges: [
      { name: 'Under ₹5,000', value: '0-5000' },
      { name: '₹5,000 - ₹15,000', value: '5000-15000' },
      { name: '₹15,000 - ₹30,000', value: '15000-30000' },
      { name: 'Above ₹30,000', value: '30000-above' }
    ],
    discount: [
      '10% and above',
      '15% and above',
      '20% and above'
    ]
  };

  useEffect(() => {
    let result = categoryProducts;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply selected filters
    if (selectedFilters.length > 0) {
      result = result.filter(product => 
        selectedFilters.some(filter => {
          if (filter.includes('₹')) {
            const [min, max] = filter.match(/\d+/g)!.map(Number);
            const price = parseInt(product.price.replace(/[^\d]/g, ''));
            return price >= min && (!max || price <= max);
          }
          if (filter.includes('%')) {
            const discount = parseInt(product.discount);
            const filterDiscount = parseInt(filter);
            return discount >= filterDiscount;
          }
          return product.category === filter;
        })
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => 
          parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''))
        );
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => 
          parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''))
        );
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result = [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [categoryProducts, selectedFilters, sortBy, searchQuery]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery('');
  };

  const getCategoryTitle = () => {
    if (subcategory) {
      return subcategory.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return category?.charAt(0).toUpperCase() + category?.slice(1);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm py-4">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-gray-500 hover:text-primary">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link to="/products" className="text-gray-500 hover:text-primary">Products</Link></li>
              <li className="text-gray-400">/</li>
              {subcategory ? (
                <>
                  <li>
                    <Link to={`/products/${category}`} className="text-gray-500 hover:text-primary">
                      {category}
                    </Link>
                  </li>
                  <li className="text-gray-400">/</li>
                  <li className="text-primary">{getCategoryTitle()}</li>
                </>
              ) : (
                <li className="text-primary">{getCategoryTitle()}</li>
              )}
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getCategoryTitle()}</h1>
            <p className="text-gray-500 mt-1">Showing {filteredProducts.length} products</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:border-primary transition-colors"
            >
              <Filter size={20} />
              Filters
            </button>
            
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-gray-500'}`}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-gray-500'}`}
              >
                <List size={20} />
              </button>
            </div>

            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Best Rating</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Selected Filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Selected Filters:</span>
            {selectedFilters.map((filter, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                onClick={() => toggleFilter(filter)}
              >
                {filter}
                <X size={14} />
              </motion.button>
            ))}
            <button 
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`w-full md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center justify-between md:hidden mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-primary">&times;</button>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-primary" />
                Categories
              </h3>
              <div className="space-y-2">
                {filters.categories.map((cat, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedFilters.includes(cat.name)}
                      onChange={() => toggleFilter(cat.name)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700 group-hover:text-primary transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-gray-500 text-sm ml-auto">({cat.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-lg">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                {filters.priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedFilters.includes(range.name)}
                      onChange={() => toggleFilter(range.name)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700 group-hover:text-primary transition-colors">
                      {range.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount Filter */}
            <div className="bg-white rounded-lg">
              <h3 className="font-semibold mb-4">Discount</h3>
              <div className="space-y-2">
                {filters.discount.map((discount, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedFilters.includes(discount)}
                      onChange={() => toggleFilter(discount)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700 group-hover:text-primary transition-colors">
                      {discount}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${viewMode === 'list' ? 'flex gap-6' : ''}`}
                >
                  <Link 
                    to={`/product/${product.id}`}
                    className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : 'w-full'}`}
                  >
                    <motion.div
                      className="relative aspect-square"
                      animate={{ opacity: hoveredProduct === product.id ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0"
                      animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={product.hoverImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    <button 
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart size={20} className="text-primary" />
                    </button>
                  </Link>
                  
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                          <span className="text-green-700 font-medium">{product.rating}</span>
                          <Star size={14} className="fill-green-700 text-green-700" />
                        </div>
                        <span className="text-gray-500 text-sm">({product.reviews})</span>
                      </div>

                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{product.price}</span>
                          <span className="text-gray-500 line-through text-sm">{product.mrp}</span>
                          <span className="text-green-600 text-sm">{product.discount}</span>
                        </div>
                      </div>
                    </Link>

                    {viewMode === 'list' && (
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">
                          Add to Cart
                        </button>
                        <button className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary/20 transition-colors">
                          <Heart size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;