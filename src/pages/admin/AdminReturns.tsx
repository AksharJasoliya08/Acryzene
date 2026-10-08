import { useState } from 'react';
import { Eye, Check, X, Truck, CreditCard, MessageSquare } from 'lucide-react';
import { ReturnRequest, ReturnStatus } from '../../types/extended';

const mockReturns: ReturnRequest[] = [
  {
    id: 'RET-001', orderId: '1', orderNumber: 'ORD-20260315-000001',
    items: [{ product: { id: '1', name: 'Premium Wireless Headphones', sku: 'WH-001', thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' }, quantity: 1, price: 2499 }],
    reason: 'Product damaged during delivery', description: 'Cracked ear cup',
    status: 'approved', refundMethod: 'original_payment', refundAmount: 2499,
    requestedAt: '2026-03-22T10:30:00', updatedAt: '2026-03-23T14:00:00',
  },
  {
    id: 'RET-002', orderId: '2', orderNumber: 'ORD-20260320-000002',
    items: [{ product: { id: '2', name: 'Smart Fitness Watch Pro', sku: 'FW-002', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b62af30?w=100' }, quantity: 1, price: 3999 }],
    reason: 'Product not as described', description: 'Wrong band color',
    status: 'requested', refundMethod: 'store_credit', refundAmount: 3999,
    requestedAt: '2026-03-26T15:45:00', updatedAt: '2026-03-26T15:45:00',
  },
  {
    id: 'RET-003', orderId: '3', orderNumber: 'ORD-20260325-000003',
    items: [{ product: { id: '5', name: 'Yoga Mat Premium', sku: 'YM-005', thumbnail: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100' }, quantity: 1, price: 1299 }],
    reason: 'Quality issue', description: 'Material peeling off',
    status: 'refunded', refundMethod: 'original_payment', refundAmount: 1299,
    creditNoteNumber: 'CN-2026-001',
    requestedAt: '2026-03-20T09:00:00', updatedAt: '2026-03-24T16:00:00',
    resolvedAt: '2026-03-25T10:00:00',
  },
];

const statusColors: Record<string, string> = {
  requested: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  pickup_scheduled: 'bg-purple-100 text-purple-700',
  received: 'bg-cyan-100 text-cyan-700',
  refund_initiated: 'bg-orange-100 text-orange-700',
  refunded: 'bg-green-100 text-green-700',
};

export default function AdminReturns() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReturn, setSelectedReturn] = useState<ReturnRequest | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const filtered = statusFilter === 'all' ? mockReturns : mockReturns.filter(r => r.status === statusFilter);

  const updateStatus = (returnId: string, newStatus: ReturnStatus) => {
    alert(`Status updated to ${newStatus} (Demo mode)`);
    setSelectedReturn(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns & Refunds</h1>
          <p className="text-gray-500 text-sm">{mockReturns.length} total requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{mockReturns.filter(r => r.status === 'requested').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-blue-600">{mockReturns.filter(r => r.status === 'approved').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Refunded</p>
          <p className="text-2xl font-bold text-green-600">{mockReturns.filter(r => r.status === 'refunded').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total Refund</p>
          <p className="text-2xl font-bold text-gray-900">₹{mockReturns.reduce((sum, r) => sum + r.refundAmount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'requested', 'approved', 'rejected', 'refunded'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Return ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Order</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Items</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Reason</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(ret => (
                <tr key={ret.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-indigo-600">{ret.id}</td>
                  <td className="px-4 py-3 text-gray-600">{ret.orderNumber}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={ret.items[0]?.product.thumbnail} alt="" className="w-8 h-8 rounded object-cover" />
                      <span className="text-gray-700 line-clamp-1">{ret.items[0]?.product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{ret.reason}</td>
                  <td className="px-4 py-3 font-bold">₹{ret.refundAmount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[ret.status]}`}>
                      {ret.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(ret.requestedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedReturn(ret)} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReturn(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Return #{selectedReturn.id}</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Order</p>
                <p className="font-medium">{selectedReturn.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reason</p>
                <p className="font-medium">{selectedReturn.reason}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedReturn.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Refund Amount</p>
                <p className="font-bold text-lg">₹{selectedReturn.refundAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Admin Notes</p>
                <textarea
                  rows={2}
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                  placeholder="Add internal notes..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {selectedReturn.status === 'requested' && (
                <>
                  <button onClick={() => updateStatus(selectedReturn.id, 'approved')}
                    className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    <Check size={14} /> Approve
                  </button>
                  <button onClick={() => updateStatus(selectedReturn.id, 'rejected')}
                    className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                    <X size={14} /> Reject
                  </button>
                </>
              )}
              {selectedReturn.status === 'approved' && (
                <button onClick={() => updateStatus(selectedReturn.id, 'pickup_scheduled')}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  <Truck size={14} /> Schedule Pickup
                </button>
              )}
              {selectedReturn.status === 'received' && (
                <button onClick={() => updateStatus(selectedReturn.id, 'refunded')}
                  className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  <CreditCard size={14} /> Process Refund
                </button>
              )}
              <button onClick={() => setSelectedReturn(null)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
