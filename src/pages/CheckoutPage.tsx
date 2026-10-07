import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { MapPin, CreditCard, Banknote, Check, Shield } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, dispatchCart, auth } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [selectedAddress, setSelectedAddress] = useState(auth.addresses[0]?.id || '');
  const [processing, setProcessing] = useState(false);

  const shipping = cartTotal >= 999 ? 0 : 60;
  const discount = cart.couponDiscount;
  const tax = Math.round((cartTotal - discount) * 0.18);
  const codFee = paymentMethod === 'cod' ? 20 : 0;
  const grandTotal = cartTotal - discount + shipping + tax + codFee;

  const placeOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      dispatchCart({ type: 'CLEAR_CART' });
      navigate('/order-success/ORD-20260328-000004');
    }, 2000);
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center justify-center mb-8">
        {['Address', 'Shipping', 'Payment'].map((s, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > i + 1 ? <Check size={16} /> : i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${step === i + 1 ? 'text-indigo-600' : 'text-gray-500'}`}>{s}</span>
            {i < 2 && <div className={`w-12 sm:w-24 h-0.5 mx-3 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2"><MapPin size={20} /> Shipping Address</h2>
              <div className="space-y-3">
                {auth.addresses.map(addr => (
                  <label key={addr.id} className={`block p-4 border-2 rounded-xl cursor-pointer transition ${selectedAddress === addr.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="address" value={addr.id} checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)} className="sr-only" />
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 mt-0.5 ${selectedAddress === addr.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`} />
                      <div>
                        <p className="font-medium text-gray-900">{addr.name} <span className="text-gray-500 font-normal">({addr.phone})</span></p>
                        <p className="text-sm text-gray-600">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                        <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                        {addr.isDefault && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mt-1">Default</span>}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                Continue to Shipping
              </button>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Shipping Method</h2>
              <div className="space-y-3">
                <label className={`block p-4 border-2 rounded-xl cursor-pointer ${shipping === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-gray-500">Delivery in 5-7 business days</p>
                    </div>
                    <span className="font-bold text-green-600">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                </label>
                <label className="block p-4 border-2 border-gray-200 rounded-xl cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-gray-500">Delivery in 2-3 business days</p>
                    </div>
                    <span className="font-bold">₹149</span>
                  </div>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                  ← Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2"><CreditCard size={20} /> Payment Method</h2>
              <div className="space-y-3">
                <label className={`block p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === 'razorpay' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="sr-only" />
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'razorpay' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`} />
                    <CreditCard size={20} className="text-indigo-600" />
                    <div>
                      <p className="font-medium">Pay Online (Razorpay)</p>
                      <p className="text-sm text-gray-500">UPI, Cards, Net Banking, Wallets</p>
                    </div>
                  </div>
                </label>
                <label className={`block p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="sr-only" />
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`} />
                    <Banknote size={20} className="text-green-600" />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive {codFee > 0 && `(₹${codFee} COD fee)`}</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-lg">
                <Shield size={18} className="text-green-600" />
                <span className="text-sm text-green-700">Your payment information is secure and encrypted</span>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                  ← Back
                </button>
                <button onClick={placeOrder} disabled={processing}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50">
                  {processing ? '⏳ Processing...' : `Place Order • ₹${grandTotal.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 h-fit sticky top-24">
          <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {cart.items.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">₹{(item.product.sellingPrice * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount}</span></div>}
            <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">GST</span><span>₹{tax}</span></div>
            {codFee > 0 && <div className="flex justify-between"><span className="text-gray-600">COD Fee</span><span>₹{codFee}</span></div>}
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span><span className="text-indigo-600">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
