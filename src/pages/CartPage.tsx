import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';
import { coupons } from '../data/mockData';

export default function CartPage() {
  const { cart, dispatchCart, cartTotal } = useStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const shipping = cartTotal >= 999 ? 0 : 60;
  const discount = cart.couponDiscount;
  const tax = Math.round((cartTotal - discount) * 0.18);
  const grandTotal = cartTotal - discount + shipping + tax;

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponInput.toUpperCase() && c.isActive);
    if (!coupon) { setCouponMsg('Invalid coupon code'); return; }
    if (cartTotal < coupon.minCartValue) { setCouponMsg(`Minimum cart value ₹${coupon.minCartValue} required`); return; }
    let disc = coupon.type === 'percentage' ? Math.round(cartTotal * coupon.value / 100) : coupon.value;
    disc = Math.min(disc, coupon.maxDiscount);
    dispatchCart({ type: 'APPLY_COUPON', code: coupon.code, discount: disc });
    setCouponMsg(`Coupon applied! You saved ₹${disc}`);
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started!</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({cart.items.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map(item => (
            <div key={item.product.id} className="bg-white rounded-xl p-4 border border-gray-100 flex gap-4">
              <Link to={`/product/${item.product.slug}`} className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`} className="font-semibold text-gray-900 hover:text-indigo-600 line-clamp-1">{item.product.name}</Link>
                <p className="text-sm text-gray-500">{item.product.brand} • {item.product.sku}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => dispatchCart({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity - 1 })}
                      className="px-2 py-1 hover:bg-gray-100"><Minus size={14} /></button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => dispatchCart({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity + 1 })}
                      className="px-2 py-1 hover:bg-gray-100"><Plus size={14} /></button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-900">₹{(item.product.sellingPrice * item.quantity).toLocaleString()}</span>
                    <button onClick={() => dispatchCart({ type: 'REMOVE_FROM_CART', productId: item.product.id })}
                      className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 h-fit sticky top-24">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h3>

          {/* Coupon */}
          <div className="mb-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Coupon code" value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={applyCoupon} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                Apply
              </button>
            </div>
            {couponMsg && <p className={`text-sm mt-1 ${cart.couponCode ? 'text-green-600' : 'text-red-600'}`}>{couponMsg}</p>}
            {cart.couponCode && (
              <button onClick={() => { dispatchCart({ type: 'REMOVE_COUPON' }); setCouponMsg(''); setCouponInput(''); }}
                className="text-xs text-red-500 mt-1 hover:underline">Remove coupon</button>
            )}
          </div>

          <div className="space-y-3 text-sm border-t pt-4">
            <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">₹{cartTotal.toLocaleString()}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toLocaleString()}</span></div>}
            <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="font-medium">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">GST (18%)</span><span className="font-medium">₹{tax.toLocaleString()}</span></div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total</span><span className="text-indigo-600">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <Link to="/checkout" className="block w-full bg-indigo-600 text-white text-center py-3 rounded-xl font-semibold mt-6 hover:bg-indigo-700 transition">
            Proceed to Checkout
          </Link>
          <Link to="/" className="block text-center text-indigo-600 text-sm mt-3 hover:underline">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
