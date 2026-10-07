import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { cartCount, wishlist } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [catDropdown, setCatDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
        🎉 Free Shipping on orders above ₹999 | Use code <span className="font-bold">WELCOME10</span> for 10% off
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Katargam</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">Home</Link>
              <div className="relative" onMouseEnter={() => setCatDropdown(true)} onMouseLeave={() => setCatDropdown(false)}>
                <button className="text-gray-700 hover:text-indigo-600 font-medium transition flex items-center gap-1">
                  Categories <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {catDropdown && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border py-2 z-50">
                      {categories.map(cat => (
                        <Link key={cat.id} to={`/category/${cat.slug}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/category/electronics" className="text-gray-700 hover:text-indigo-600 font-medium transition">Electronics</Link>
              <Link to="/category/fashion" className="text-gray-700 hover:text-indigo-600 font-medium transition">Fashion</Link>
              <Link to="/category/sports-fitness" className="text-gray-700 hover:text-indigo-600 font-medium transition">Fitness</Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-600 hover:text-indigo-600 transition">
                <Search size={22} />
              </button>
              <Link to="/wishlist" className="p-2 text-gray-600 hover:text-red-500 transition relative hidden sm:block">
                <Heart size={22} />
                {wishlist.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.items.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2 text-gray-600 hover:text-indigo-600 transition relative">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/account" className="p-2 text-gray-600 hover:text-indigo-600 transition hidden sm:block">
                <User size={22} />
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-600">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t">
                <div className="py-3 flex items-center gap-3">
                  <Search size={20} className="text-gray-400" />
                  <input type="text" placeholder="Search products, brands, categories..."
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && searchQuery) navigate(`/category/all?q=${searchQuery}`); }}
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400" autoFocus />
                  <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t bg-white overflow-hidden">
              <nav className="px-4 py-4 space-y-3">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Home</Link>
                {categories.map(cat => (
                  <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-gray-700">{cat.name}</Link>
                ))}
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700">Wishlist ({wishlist.items.length})</Link>
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700">My Account</Link>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-indigo-600 font-medium">Admin Panel</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold text-white">Katargam</span>
              </div>
              <p className="text-sm text-gray-400">Your one-stop shop for premium products at the best prices. Quality guaranteed.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube text-xl"></i></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/category/all" className="hover:text-white transition">All Products</Link></li>
                <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
                <li><Link to="/wishlist" className="hover:text-white transition">Wishlist</Link></li>
                <li><Link to="/account" className="hover:text-white transition">My Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 5).map(cat => (
                  <li key={cat.id}><Link to={`/category/${cat.slug}`} className="hover:text-white transition">{cat.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li><i className="fas fa-map-marker-alt mr-2"></i>Ahmedabad, Gujarat, India</li>
                <li><i className="fas fa-phone mr-2"></i>+91 98765 43210</li>
                <li><i className="fas fa-envelope mr-2"></i>support@katargam.com</li>
              </ul>
              <div className="mt-4">
                <h5 className="text-white text-sm font-medium mb-2">Newsletter</h5>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-gray-800 rounded-l-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg text-sm hover:bg-indigo-700 transition">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2026 Katargam Store. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
