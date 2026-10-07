import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw, Share2, Check, MapPin } from 'lucide-react';
import { products } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { dispatchCart, dispatchWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<null | { available: boolean; date: string; cod: boolean }>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <Link to="/" className="text-indigo-600 mt-4 inline-block">← Back to Home</Link>
      </div>
    );
  }

  const discount = product.comparePrice > product.sellingPrice
    ? Math.round(((product.comparePrice - product.sellingPrice) / product.comparePrice) * 100) : 0;
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatchCart({ type: 'ADD_TO_CART', product });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const checkPincode = () => {
    if (pincode.length === 6) {
      setPincodeResult({ available: true, date: 'Mar 30 - Apr 1', cod: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-indigo-600">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 aspect-square mb-4">
            <motion.img key={selectedImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              src={product.images[selectedImage]} alt={product.name}
              className="w-full h-full object-cover" />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">{discount}% OFF</span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition ${i === selectedImage ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-indigo-600 font-medium text-sm mb-1">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
              <span className="font-bold text-green-700 text-sm">{product.rating}</span>
              <Star size={14} className="text-green-600 fill-green-600" />
            </div>
            <span className="text-gray-500 text-sm">{product.reviewCount} Ratings & Reviews</span>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">₹{product.sellingPrice.toLocaleString()}</span>
              {product.comparePrice > product.sellingPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.comparePrice.toLocaleString()}</span>
                  <span className="text-green-600 font-semibold">{discount}% off</span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes. GST: {product.gstPercent}%</p>
            {product.sourcePrice && (
              <p className="text-xs text-gray-400 mt-1">Source Price: ₹{product.sourcePrice}</p>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-600 mb-6">{product.shortDescription}</p>

          {/* Stock */}
          <div className="mb-4">
            {product.stock > 10 ? (
              <span className="text-green-600 font-medium flex items-center gap-1"><Check size={16} /> In Stock</span>
            ) : product.stock > 0 ? (
              <span className="text-orange-600 font-medium">Only {product.stock} left in stock!</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition"><Minus size={16} /></button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.maxQty, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-100 transition"><Plus size={16} /></button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${addedToCart ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} disabled:bg-gray-300`}>
              {addedToCart ? <><Check size={20} /> Added!</> : <><ShoppingCart size={20} /> Add to Cart</>}
            </button>
            <Link to="/checkout" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition text-center">
              Buy Now
            </Link>
            <button onClick={() => { if (inWishlist) dispatchWishlist({ type: 'REMOVE_FROM_WISHLIST', productId: product.id }); else dispatchWishlist({ type: 'ADD_TO_WISHLIST', product }); }}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition ${inWishlist ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500'}`}>
              <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
            <button className="w-12 h-12 rounded-xl border-2 border-gray-300 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 flex items-center justify-center transition">
              <Share2 size={20} />
            </button>
          </div>

          {/* Pincode Check */}
          <div className="border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-indigo-600" />
              <span className="font-medium text-gray-900">Check Delivery</span>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter Pincode" maxLength={6}
                value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
              <button onClick={checkPincode} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                Check
              </button>
            </div>
            {pincodeResult && (
              <div className="mt-3 space-y-1">
                <p className="text-green-600 text-sm font-medium">✓ Delivery available</p>
                <p className="text-gray-600 text-sm">Estimated delivery: {pincodeResult.date}</p>
                {pincodeResult.cod && <p className="text-gray-600 text-sm">✓ Cash on Delivery available</p>}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={20} />, text: 'Free Shipping' },
              { icon: <Shield size={20} />, text: 'Secure Payment' },
              { icon: <RotateCcw size={20} />, text: '7-Day Returns' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-indigo-600 mb-1">{f.icon}</div>
                <span className="text-xs text-gray-600">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div><span className="text-sm text-gray-500">SKU</span><p className="font-medium">{product.sku}</p></div>
          <div><span className="text-sm text-gray-500">Category</span><p className="font-medium">{product.category}</p></div>
          <div><span className="text-sm text-gray-500">Brand</span><p className="font-medium">{product.brand}</p></div>
          <div><span className="text-sm text-gray-500">Weight</span><p className="font-medium">{product.weight}kg</p></div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews ({product.reviewCount})</h2>
        <div className="space-y-4">
          {[
            { name: 'Rahul S.', rating: 5, text: 'Excellent product! Quality is top-notch and delivery was fast.', date: '2 days ago' },
            { name: 'Priya M.', rating: 4, text: 'Good value for money. Works as described. Would recommend.', date: '1 week ago' },
            { name: 'Amit K.', rating: 5, text: 'Best purchase this month! Highly satisfied with the quality.', date: '2 weeks ago' },
          ].map((review, i) => (
            <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex">{[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className={j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}</div>
                  <span className="text-sm font-medium text-gray-900">{review.name}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600 text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-3 lg:hidden z-40">
        <button onClick={handleAddToCart} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
          <ShoppingCart size={18} /> Add to Cart
        </button>
        <Link to="/checkout" className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold text-center">
          Buy Now
        </Link>
      </div>
    </div>
  );
}
