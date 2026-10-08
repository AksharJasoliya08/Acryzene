import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, RotateCcw, Clock, CheckCircle, XCircle, Truck, AlertCircle } from 'lucide-react';
import { ReturnRequest } from '../types/extended';
import { orders } from '../data/mockData';

// Mock return requests
const mockReturns: ReturnRequest[] = [
  {
    id: 'RET-001',
    orderId: '1',
    orderNumber: 'ORD-20260315-000001',
    items: [{ product: { id: '1', name: 'Premium Wireless Headphones', sku: 'WH-001', thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' }, quantity: 1, price: 2499 }],
    reason: 'Product damaged during delivery',
    description: 'The headphones arrived with a cracked ear cup. The sound quality is also affected.',
    status: 'approved',
    refundMethod: 'original_payment',
    refundAmount: 2499,
    requestedAt: '2026-03-22T10:30:00',
    updatedAt: '2026-03-23T14:00:00',
    resolvedAt: '2026-03-25T09:00:00',
  },
  {
    id: 'RET-002',
    orderId: '2',
    orderNumber: 'ORD-20260320-000002',
    items: [{ product: { id: '2', name: 'Smart Fitness Watch Pro', sku: 'FW-002', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b62af30?w=100&h=100&fit=crop' }, quantity: 1, price: 3999 }],
    reason: 'Product not as described',
    description: 'The watch band color is different from what was shown in the images.',
    status: 'requested',
    refundMethod: 'store_credit',
    refundAmount: 3999,
    requestedAt: '2026-03-26T15:45:00',
    updatedAt: '2026-03-26T15:45:00',
  },
];

export default function ReturnsPage() {
  const { id } = useParams();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');

  const returnRequest = id ? mockReturns.find(r => r.id === id) : null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'requested': return <Clock size={20} className="text-yellow-600" />;
      case 'approved': return <CheckCircle size={20} className="text-green-600" />;
      case 'rejected': return <XCircle size={20} className="text-red-600" />;
      case 'pickup_scheduled': return <Truck size={20} className="text-blue-600" />;
      case 'refunded': return <CheckCircle size={20} className="text-green-600" />;
      default: return <AlertCircle size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'pickup_scheduled': return 'bg-blue-100 text-blue-700';
      case 'refunded': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Return request detail view
  if (returnRequest) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/returns" className="text-indigo-600 hover:text-indigo-700 text-sm mb-4 inline-block">
          ← Back to Returns
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Return #{returnRequest.id}</h1>
              <p className="text-gray-500 text-sm mt-1">Order: {returnRequest.orderNumber}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(returnRequest.status)}`}>
              {returnRequest.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Return Timeline */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Return Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(returnRequest.status)}
                <div>
                  <p className="font-medium text-gray-900">
                    {returnRequest.status === 'requested' && 'Return Requested'}
                    {returnRequest.status === 'approved' && 'Return Approved'}
                    {returnRequest.status === 'refunded' && 'Refund Processed'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(returnRequest.updatedAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Return Items</h3>
            <div className="space-y-3">
              {returnRequest.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src={item.product.thumbnail} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} • SKU: {item.product.sku}</p>
                  </div>
                  <p className="font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Reason</h3>
            <p className="text-gray-700">{returnRequest.reason}</p>
            {returnRequest.description && (
              <p className="text-gray-600 text-sm mt-2">{returnRequest.description}</p>
            )}
          </div>

          {/* Refund Details */}
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-green-900 mb-2">Refund Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Refund Amount</span>
                <span className="font-bold text-green-900">₹{returnRequest.refundAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Refund Method</span>
                <span className="text-green-900">
                  {returnRequest.refundMethod === 'original_payment' && 'Original Payment Method'}
                  {returnRequest.refundMethod === 'store_credit' && 'Store Credit'}
                  {returnRequest.refundMethod === 'manual_refund' && 'Manual Refund'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Returns list view
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Returns & Refunds</h1>
        <button
          onClick={() => setShowRequestForm(!showRequestForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <RotateCcw size={16} /> Request Return
        </button>
      </div>

      {/* Request Return Form */}
      {showRequestForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Request a Return</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Select Order</label>
              <select
                value={selectedOrder}
                onChange={e => setSelectedOrder(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose an order...</option>
                {orders.map(order => (
                  <option key={order.id} value={order.id}>
                    {order.orderNumber} - ₹{order.grandTotal.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Return Reason</label>
              <select
                value={selectedReason}
                onChange={e => setSelectedReason(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select reason...</option>
                <option value="damaged">Product damaged</option>
                <option value="not_as_described">Not as described</option>
                <option value="wrong_item">Wrong item received</option>
                <option value="quality_issue">Quality issue</option>
                <option value="changed_mind">Changed my mind</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Please describe the issue..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRequestForm(false)}
                className="flex-1 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Return request submitted! (Demo mode)');
                  setShowRequestForm(false);
                }}
                disabled={!selectedOrder || !selectedReason}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Returns List */}
      <div className="space-y-4">
        {mockReturns.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No return requests yet</p>
          </div>
        ) : (
          mockReturns.map(ret => (
            <Link
              key={ret.id}
              to={`/returns/${ret.id}`}
              className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">Return #{ret.id}</p>
                  <p className="text-sm text-gray-500">Order: {ret.orderNumber}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ret.status)}`}>
                  {ret.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {ret.items.map((item, i) => (
                  <img key={i} src={item.product.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
                ))}
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{ret.reason}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Requested: {new Date(ret.requestedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <p className="font-bold text-gray-900">₹{ret.refundAmount.toLocaleString()}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
