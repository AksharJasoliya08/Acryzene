import { DollarSign, ShoppingCart, Users, Package, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { dashboardStats, salesData, monthlySalesData, orders, products } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Sales', value: `₹${(dashboardStats.totalSales / 1000).toFixed(0)}K`, change: '+12.5%', up: true, icon: <DollarSign size={22} />, color: 'bg-green-500' },
    { label: "Today's Sales", value: `₹${(dashboardStats.todaySales / 1000).toFixed(1)}K`, change: '+8.2%', up: true, icon: <TrendingUp size={22} />, color: 'bg-blue-500' },
    { label: 'Total Orders', value: dashboardStats.totalOrders.toString(), change: '+15.3%', up: true, icon: <ShoppingCart size={22} />, color: 'bg-purple-500' },
    { label: 'Pending Orders', value: dashboardStats.pendingOrders.toString(), change: '-3.1%', up: false, icon: <AlertTriangle size={22} />, color: 'bg-orange-500' },
    { label: 'Total Customers', value: dashboardStats.totalCustomers.toLocaleString(), change: '+5.7%', up: true, icon: <Users size={22} />, color: 'bg-indigo-500' },
    { label: 'Total Products', value: dashboardStats.totalProducts.toString(), change: '+2', up: true, icon: <Package size={22} />, color: 'bg-pink-500' },
  ];

  const orderStatusData = [
    { name: 'Delivered', value: 289 },
    { name: 'Processing', value: 18 },
    { name: 'Shipped', value: 22 },
    { name: 'Pending', value: 8 },
    { name: 'Cancelled', value: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Sales */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Sales']} />
              <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Status */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                {orderStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 font-medium text-indigo-600">{order.orderNumber}</td>
                    <td className="py-3">{order.shippingAddress.name}</td>
                    <td className="py-3 font-medium">₹{order.grandTotal.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{order.status.replace('_', ' ')}</span>
                    </td>
                    <td className="py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-orange-500" /> Low Stock Products
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {products.filter(p => p.stock <= 30).slice(0, 4).map(p => (
            <div key={p.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <img src={p.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-orange-600 font-medium">Stock: {p.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
