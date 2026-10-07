import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, Shield, RotateCcw, Headphones, Star, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { products, categories, banners } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured);
  const bestSellers = products.filter(p => p.isBestseller);
  const newArrivals = products.filter(p => p.isNewArrival);
  const onSale = products.filter(p => p.isOnSale);

  return (
    <div>
      {/* Hero Banner Carousel */}
      <section className="relative overflow-hidden bg-gray-900">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
          {banners.map((banner, idx) => (
            <div key={banner.id} className={`absolute inset-0 transition-opacity duration-700 ${idx === currentBanner ? 'opacity-100' : 'opacity-0'}`}>
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: idx === currentBanner ? 1 : 0, x: idx === currentBanner ? 0 : -30 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">{banner.title}</h1>
                    <p className="text-lg sm:text-xl text-gray-200 mb-6">{banner.subtitle}</p>
                    <Link to={banner.buttonUrl}
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                      {banner.buttonText} <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
          {/* Navigation */}
          <button onClick={() => setCurrentBanner((currentBanner - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition">
            <ChevronRight size={24} />
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentBanner(idx)}
                className={`w-3 h-3 rounded-full transition ${idx === currentBanner ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck size={28} />, title: 'Free Shipping', desc: 'On orders above ₹999' },
              { icon: <Shield size={28} />, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: <RotateCcw size={28} />, title: 'Easy Returns', desc: '7-day return policy' },
              { icon: <Headphones size={28} />, title: '24/7 Support', desc: 'Dedicated support' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="text-indigo-600">{f.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/category/all" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={`/category/${cat.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100">
                <div className="aspect-square overflow-hidden">
                  <img src={cat.image} alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.productCount} Products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <h2 className="text-2xl font-bold text-white">Flash Sale</h2>
                <p className="text-white/80 text-sm">Ending in 05:23:45</p>
              </div>
            </div>
            <Link to="/category/all?sale=true" className="text-white font-medium flex items-center gap-1 hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {onSale.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/category/all" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden h-48 md:h-64">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop" alt="Promo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent flex items-center p-8">
              <div>
                <p className="text-indigo-200 text-sm font-medium">Limited Offer</p>
                <h3 className="text-2xl font-bold text-white mt-1">Get 30% Off on Electronics</h3>
                <Link to="/category/electronics" className="mt-3 inline-block bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-48 md:h-64">
            <img src="https://images.unsplash.com/photo-1434389677669-e08b4cead0e2?w=800&h=400&fit=crop" alt="Promo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center p-8">
              <div>
                <p className="text-purple-200 text-sm font-medium">New Collection</p>
                <h3 className="text-2xl font-bold text-white mt-1">Fitness Essentials 2026</h3>
                <Link to="/category/sports-fitness" className="mt-3 inline-block bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
          <Link to="/category/all" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
            <Link to="/category/all" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Rahul Sharma', rating: 5, text: 'Amazing quality products! The wireless headphones are incredible. Fast delivery and great packaging.', avatar: '👨' },
            { name: 'Priya Patel', rating: 5, text: 'Love the fitness watch! Accurate tracking and the battery lasts forever. Will definitely order again.', avatar: '👩' },
            { name: 'Amit Kumar', rating: 4, text: 'Great shopping experience. The leather bag exceeded my expectations. Excellent customer support too.', avatar: '👨' },
          ].map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className={j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{review.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">Trusted Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {['SoundMax', 'FitTech', 'TeaLeaf', 'LeatherCraft', 'ZenFit', 'HydroSteel', 'SpeedRun'].map(brand => (
              <span key={brand} className="text-xl md:text-2xl font-bold text-gray-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
