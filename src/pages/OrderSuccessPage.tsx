import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Phone } from 'lucide-react';

export default function OrderSuccessPage() {
  const { orderId } = useParams();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your order. We'll send you a confirmation email shortly.</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="text-xl font-bold text-indigo-600">{orderId || 'ORD-20260328-000004'}</p>
        </div>

        <div className="space-y-4 text-left mb-8">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Package size={20} className="text-blue-600" />
            <div>
              <p className="font-medium text-gray-900 text-sm">Order Confirmed</p>
              <p className="text-xs text-gray-500">Your order has been placed successfully</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <Truck size={20} className="text-yellow-600" />
            <div>
              <p className="font-medium text-gray-900 text-sm">Estimated Delivery</p>
              <p className="text-xs text-gray-500">March 30 - April 1, 2026</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/account/orders" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-center">
            Track Order
          </Link>
          <Link to="/" className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-center">
            Continue Shopping
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-1">
          <Phone size={14} /> Need help? Contact us at +91 98765 43210
        </p>
      </div>
    </div>
  );
}
