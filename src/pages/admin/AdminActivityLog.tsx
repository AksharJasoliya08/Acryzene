import { useState } from 'react';
import { Search, Filter, User, Package, ShoppingCart, Settings, Tag, RefreshCw } from 'lucide-react';
import { ActivityLog } from '../../types/extended';

const mockActivityLogs: ActivityLog[] = [
  { id: '1', userId: '1', userName: 'Admin User', action: 'Updated product price', entityType: 'product', entityId: '1', entityName: 'Premium Wireless Headphones', details: 'Price changed from ₹2,299 to ₹2,499', ipAddress: '192.168.1.100', userAgent: 'Chrome/120', createdAt: '2026-03-28T10:30:00' },
  { id: '2', userId: '1', userName: 'Admin User', action: 'Changed order status', entityType: 'order', entityId: '2', entityName: 'ORD-20260320-000002', details: 'Status: Processing → Shipped', ipAddress: '192.168.1.100', userAgent: 'Chrome/120', createdAt: '2026-03-28T09:15:00' },
  { id: '3', userId: '1', userName: 'Admin User', action: 'Created coupon', entityType: 'coupon', entityId: '3', entityName: 'SAVE50', details: '50% off, min ₹2000, max ₹500', ipAddress: '192.168.1.100', userAgent: 'Chrome/120', createdAt: '2026-03-27T16:45:00' },
  { id: '4', userId: '1', userName: 'Admin User', action: 'Synced external products', entityType: 'sync', entityId: 'sync-3', entityName: 'Product Sync', details: 'Found: 24, New: 3, Updated: 12', ipAddress: '192.168.1.100', userAgent: 'Chrome/120', createdAt: '2026-03-27T10:00:00' },
  { id: '5', userId: '1', userName: 'Admin User', action: 'Updated settings', entityType: 'settings', entityId: 'payment', entityName: 'Payment Settings', details: 'COD fee changed from ₹30 to ₹20', ipAddress: '192.168.1.100', userAgent: 'Chrome/120', createdAt: '2026-03-26T14:20:00' },
  { id: '6', userId: '1', userName: 'Admin User', action: 'Deleted product', entityType: 'product', entityId: '99', entityName: 'Old Product XYZ', details: 'Product permanently deleted', ipAddress: '192.168.1.100', userAgent: 'Chrome/120', createdAt: '2026-03-25T11:30:00' },
  { id: '7', userId: '1', userName: 'Admin User', action: 'Approved return', entityType: 'return', entityId: 'RET-001', entityName: 'Return #RET-001', details: 'Return approved, refund ₹2,499', ipAddress: '192.168.1.100', userAgent: 'Chrome/120', createdAt: '2026-03-25T09:00:00' },
  { id: '8', userId: '1', userName: 'Admin User', action: 'Logged in', entityType: 'auth', entityId: 'login', entityName: 'Admin Login', details: 'Successful login from 192.168.1.100', ipAddress: '192.168.1.100', userAgent: 'Chrome/120', createdAt: '2026-03-25T08:00:00' },
];

export default function AdminActivityLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');

  const filtered = mockActivityLogs.filter(log => {
    if (searchQuery && !log.action.toLowerCase().includes(searchQuery.toLowerCase()) && !log.entityName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (entityFilter !== 'all' && log.entityType !== entityFilter) return false;
    return true;
  });

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'product': return <Package size={16} />;
      case 'order': return <ShoppingCart size={16} />;
      case 'coupon': return <Tag size={16} />;
      case 'sync': return <RefreshCw size={16} />;
      case 'settings': return <Settings size={16} />;
      default: return <User size={16} />;
    }
  };

  const getEntityColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-indigo-100 text-indigo-600';
      case 'order': return 'bg-green-100 text-green-600';
      case 'coupon': return 'bg-purple-100 text-purple-600';
      case 'sync': return 'bg-blue-100 text-blue-600';
      case 'settings': return 'bg-orange-100 text-orange-600';
      case 'auth': return 'bg-gray-100 text-gray-600';
      case 'return': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-gray-500 text-sm">Track all admin actions and system events</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search actions..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={entityFilter} onChange={e => setEntityFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Types</option>
          <option value="product">Products</option>
          <option value="order">Orders</option>
          <option value="coupon">Coupons</option>
          <option value="sync">Sync</option>
          <option value="settings">Settings</option>
          <option value="auth">Authentication</option>
          <option value="return">Returns</option>
        </select>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
          <Filter size={16} /> Export
        </button>
      </div>

      {/* Activity Log List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="divide-y">
          {filtered.map(log => (
            <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${getEntityColor(log.entityType)}`}>
                {getEntityIcon(log.entityType)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-900">{log.action}</p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      <span className="font-medium">{log.entityName}</span>
                      {log.details && <span className="text-gray-500"> — {log.details}</span>}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString('en-IN', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                  <span>By: {log.userName}</span>
                  <span>IP: {log.ipAddress}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Search size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">No activity logs found</p>
        </div>
      )}
    </div>
  );
}
