import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function WishlistPage() {
  const { wishlist, dispatchWishlist, dispatchCart } = useStore();

  if (wishlist.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-6">Save items you love for later!</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition inline-block">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist ({wishlist.items.length} items)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlist.items.map(item => (
          <div key={item.product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
            <Link to={`/product/${item.product.slug}`} className="aspect-square overflow-hidden">
              <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </Link>
            <div className="p-4">
              <Link to={`/product/${item.product.slug}`} className="font-semibold text-gray-900 hover:text-indigo-600 line-clamp-2 text-sm">{item.product.name}</Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-gray-900">₹{item.product.sellingPrice.toLocaleString()}</span>
                {item.product.comparePrice > item.product.sellingPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{item.product.comparePrice.toLocaleString()}</span>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { dispatchCart({ type: 'ADD_TO_CART', product: item.product }); dispatchWishlist({ type: 'REMOVE_FROM_WISHLIST', productId: item.product.id }); }}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-1">
                  <ShoppingCart size={14} /> Move to Cart
                </button>
                <button onClick={() => dispatchWishlist({ type: 'REMOVE_FROM_WISHLIST', productId: item.product.id })}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
