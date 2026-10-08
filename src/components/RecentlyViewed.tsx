import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Product } from '../types';

const STORAGE_KEY = 'katargam_recently_viewed';
const MAX_ITEMS = 10;

interface RecentlyViewedProps {
  currentProductId?: string;
  limit?: number;
  className?: string;
}

export default function RecentlyViewed({ currentProductId, limit = 4, className = '' }: RecentlyViewedProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Product[];
        // Filter out current product if viewing a product page
        const filtered = currentProductId 
          ? parsed.filter(p => p.id !== currentProductId)
          : parsed;
        setProducts(filtered.slice(0, limit));
      } catch (e) {
        console.error('Error parsing recently viewed:', e);
      }
    }
  }, [currentProductId, limit]);

  if (products.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Eye size={20} className="text-indigo-600" />
        <h3 className="text-lg font-bold text-gray-900">Recently Viewed</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition"
          >
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition">
                {product.name}
              </h4>
              <p className="text-sm font-bold text-gray-900 mt-1">
                ₹{product.sellingPrice.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Utility function to add product to recently viewed
export function addToRecentlyViewed(product: Product): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let products: Product[] = stored ? JSON.parse(stored) : [];

    // Remove if already exists
    products = products.filter(p => p.id !== product.id);

    // Add to beginning
    products.unshift(product);

    // Limit to MAX_ITEMS
    if (products.length > MAX_ITEMS) {
      products = products.slice(0, MAX_ITEMS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving recently viewed:', e);
  }
}

// Utility function to clear recently viewed
export function clearRecentlyViewed(): void {
  localStorage.removeItem(STORAGE_KEY);
}
