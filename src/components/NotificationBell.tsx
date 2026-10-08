import { useState, useRef, useEffect } from 'react';
import { Bell, X, Package, CreditCard, AlertTriangle, RefreshCw, RotateCcw, Info } from 'lucide-react';
import { Notification } from '../types/extended';
import { motion, AnimatePresence } from 'framer-motion';

// Mock notifications for demo
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    priority: 'high',
    title: 'New Order Received',
    message: 'Order #ORD-20260328-000005 placed by Rahul Sharma',
    isRead: false,
    link: '/admin/orders',
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '2',
    type: 'payment',
    priority: 'medium',
    title: 'Payment Successful',
    message: '₹3,847 received for Order #ORD-20260325-000003',
    isRead: false,
    link: '/admin/orders',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '3',
    type: 'stock',
    priority: 'urgent',
    title: 'Low Stock Alert',
    message: 'Running Shoes Ultra has only 5 units left',
    isRead: false,
    link: '/admin/products',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '4',
    type: 'sync',
    priority: 'low',
    title: 'Product Sync Completed',
    message: '12 products updated, 3 new products found',
    isRead: true,
    link: '/admin/import',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '5',
    type: 'return',
    priority: 'medium',
    title: 'Return Request',
    message: 'Return request #RET-001 from Priya Patel',
    isRead: true,
    link: '/admin/returns',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package size={16} />;
      case 'payment': return <CreditCard size={16} />;
      case 'stock': return <AlertTriangle size={16} />;
      case 'sync': return <RefreshCw size={16} />;
      case 'return': return <RotateCcw size={16} />;
      default: return <Info size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-600';
      case 'high': return 'bg-orange-100 text-orange-600';
      case 'medium': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTime = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-indigo-600 transition"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
              <h3 className="font-bold text-gray-900">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-indigo-600 hover:underline">
                    Mark all read
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => { markAsRead(notification.id); setIsOpen(false); }}
                    className={`flex gap-3 px-4 py-3 border-b last:border-0 cursor-pointer transition hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-indigo-50/50' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getPriorityColor(notification.priority)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-indigo-600 rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTime(notification.createdAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t bg-gray-50">
              <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium py-1">
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
