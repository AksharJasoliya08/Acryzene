import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find(c => c.slug === slug);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (slug && slug !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === slug || p.category.toLowerCase() === slug);
    }
    if (query) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
    }
    filtered = filtered.filter(p => p.sellingPrice >= priceRange[0] && p.sellingPrice <= priceRange[1]);

    switch (sortBy) {
      case 'price_low': filtered.sort((a, b) => a.sellingPrice - b.sellingPrice); break;
      case 'price_high': filtered.sort((a, b) => b.sellingPrice - a.sellingPrice); break;
      case 'newest': filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'popular': filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return filtered;
  }, [slug, query, sortBy, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <span className="text-gray-900">{category?.name || 'All Products'}</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category?.name || 'All Products'}{query && ` - "${query}"`}</h1>
          <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
            <SlidersHorizontal size={16} /> Filters
          </button>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="relevance">Relevance</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-auto' : 'hidden'} md:block md:static md:w-64 shrink-0`}>
          {showFilters && (
            <button onClick={() => setShowFilters(false)} className="md:hidden mb-4 text-gray-600 font-medium">← Back</button>
          )}
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <Link key={cat.id} to={`/category/${cat.slug}`}
                    className={`block text-sm py-1 ${slug === cat.slug ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'}`}>
                    {cat.name} ({cat.productCount})
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input type="range" min="0" max="10000" step="100" value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-indigo-600" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
              <div className="space-y-2">
                {[...new Set(products.map(p => p.brand))].map(brand => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded accent-indigo-600" /> {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(r => (
                  <label key={r} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded accent-indigo-600" />
                    {'★'.repeat(r)}{'☆'.repeat(5 - r)} & above
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found</p>
              <Link to="/" className="text-indigo-600 mt-2 inline-block">← Back to Home</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
