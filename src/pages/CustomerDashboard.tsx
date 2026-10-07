import { useParams, Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, Settings, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { orders } from '../data/mockData';

export default function CustomerDashboard() {
  const { tab } = useParams();
  const { auth } = useStore();
  const activeTab = tab || 'orders';

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-indigo-100 text-indigo-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-xl border border-gray-100 p-4 h-fit">
          <div className="flex items-center gap-3 p-3 mb-4 border-b">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{auth.user?.name}</p>
              <p className="text-xs text-gray-500">{auth.user?.email}</p>
            </div>
          </div>
          <nav className="space-y-1">
            {[
              { id: 'orders', icon: <Package size={18} />, label: 'My Orders' },
              { id: 'addresses', icon: <MapPin size={18} />, label: 'Addresses' },
              { id: 'wishlist', icon: <Heart size={18} />, label: 'Wishlist' },
              { id: 'profile', icon: <Settings size={18} />, label: 'Profile Settings' },
            ].map(item => (
              <Link key={item.id} to={`/account/${item.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                {item.icon} {item.label}
              </Link>
            ))}
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full text-left">
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-bold text-gray-900 text-lg">My Orders</h2>
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {order.items.map((item, i) => (
                      <img key={i} src={item.product.thumbnail} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-sm text-gray-600">{order.items.length} item(s) • {order.paymentMethod === 'razorpay' ? 'Online' : 'COD'}</span>
                    <span className="font-bold text-gray-900">₹{order.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h2 className="font-bold text-gray-900 text-lg mb-4">My Addresses</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {auth.addresses.map(addr => (
                  <div key={addr.id} className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{addr.name}</span>
                      {addr.isDefault && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Default</span>}
                    </div>
                    <p className="text-sm text-gray-600">{addr.line1}</p>
                    {addr.line2 && <p className="text-sm text-gray-600">{addr.line2}</p>}
                    <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-sm text-gray-500 mt-1">Phone: {addr.phone}</p>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs text-indigo-600 hover:underline">Edit</button>
                      <button className="text-xs text-red-600 hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
                <button className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition flex items-center justify-center min-h-[150px]">
                  + Add New Address
                </button>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">View your wishlist items</p>
              <Link to="/wishlist" className="text-indigo-600 mt-2 inline-block hover:underline">Go to Wishlist →</Link>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Profile Settings</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                  <input type="text" defaultValue={auth.user?.name} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email</label>
                  <input type="email" defaultValue={auth.user?.email} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                  <input type="tel" defaultValue={auth.user?.phone} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
