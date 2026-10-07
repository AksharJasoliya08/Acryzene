import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { dispatchCart, dispatchWishlist, isInWishlist } = useStore();
  const discount = product.comparePrice > product.sellingPrice
    ? Math.round(((product.comparePrice - product.sellingPrice) / product.comparePrice) * 100)
    : 0;
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <Link to={`/product/${product.slug}`}>
          <img src={product.thumbnail} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">{discount}% OFF</span>
          )}
          {product.isNewArrival && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">NEW</span>
          )}
          {product.isBestseller && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">BESTSELLER</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => { if (inWishlist) dispatchWishlist({ type: 'REMOVE_FROM_WISHLIST', productId: product.id }); else dispatchWishlist({ type: 'ADD_TO_WISHLIST', product }); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition ${inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'}`}>
            <Heart size={16} fill={inWishlist ? 'white' : 'none'} />
          </button>
          <Link to={`/product/${product.slug}`}
            className="w-9 h-9 rounded-full bg-white text-gray-600 hover:text-indigo-600 flex items-center justify-center shadow-md transition">
            <Eye size={16} />
          </Link>
        </div>

        {/* Add to Cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={() => dispatchCart({ type: 'ADD_TO_CART', product })}
            className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-2">
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-indigo-600 font-medium mb-1">{product.brand}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-indigo-600 transition text-sm">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-gray-900">₹{product.sellingPrice.toLocaleString()}</span>
          {product.comparePrice > product.sellingPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.comparePrice.toLocaleString()}</span>
          )}
        </div>

        {/* Stock */}
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-orange-600 mt-1">Only {product.stock} left!</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-600 mt-1 font-medium">Out of Stock</p>
        )}
      </div>
    </motion.div>
  );
}
