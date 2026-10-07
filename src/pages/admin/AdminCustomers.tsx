import { Search, Mail, Phone, Eye } from 'lucide-react';

const customers = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', orders: 12, spent: 24500, joined: '2025-11-15', status: 'active' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', orders: 8, spent: 18200, joined: '2025-12-01', status: 'active' },
  { id: '3', name: 'Amit Kumar', email: 'amit@example.com', phone: '9876543212', orders: 5, spent: 9800, joined: '2026-01-10', status: 'active' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@example.com', phone: '9876543213', orders: 15, spent: 42000, joined: '2025-10-20', status: 'active' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '9876543214', orders: 3, spent: 5600, joined: '2026-02-15', status: 'inactive' },
  { id: '6', name: 'Anita Desai', email: 'anita@example.com', phone: '9876543215', orders: 7, spent: 15300, joined: '2026-01-05', status: 'active' },
];

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm">{customers.length} total customers</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          Export Customers
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search customers..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Orders</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Total Spent</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Joined</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-700 flex items-center gap-1"><Mail size={12} /> {c.email}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1"><Phone size={12} /> {c.phone}</p>
                  </td>
                  <td className="px-4 py-3 font-medium">{c.orders}</td>
                  <td className="px-4 py-3 font-bold">₹{c.spent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(c.joined).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"><Eye size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
