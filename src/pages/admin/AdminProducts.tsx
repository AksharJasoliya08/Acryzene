import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { products, categories } from '../../data/mockData';
import { Product } from '../../types';

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = products.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedProducts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedProducts.length === filtered.length) setSelectedProducts([]);
    else setSelectedProducts(filtered.map(p => p.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm">{filtered.length} products total</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            Export CSV
          </button>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="inactive">Inactive</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-indigo-50 rounded-xl p-3 flex items-center justify-between">
          <span className="text-sm text-indigo-700 font-medium">{selectedProducts.length} selected</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border rounded-lg text-xs font-medium hover:bg-gray-50">Update Price</button>
            <button className="px-3 py-1 bg-white border rounded-lg text-xs font-medium hover:bg-gray-50">Change Status</button>
            <button className="px-3 py-1 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100">Delete</button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left"><input type="checkbox" checked={selectedProducts.length === filtered.length} onChange={toggleAll} className="rounded" /></th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Product</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">SKU</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Price</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Stock</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3"><input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => toggleSelect(product.id)} className="rounded" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category} • {product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.sku}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">₹{product.sellingPrice}</p>
                    {product.sourcePrice && <p className="text-xs text-gray-400">Source: ₹{product.sourcePrice}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={product.stock <= 10 ? 'text-orange-600 font-medium' : 'text-gray-600'}>{product.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' :
                      product.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                      product.status === 'out_of_stock' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{product.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"><Eye size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"><Edit size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600 mb-1 block">Product Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter product name" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">SKU</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., PRD-001" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Category</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                  {categories.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Selling Price (₹)</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Compare Price (₹)</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Stock</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">GST %</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="18" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600 mb-1 block">Description</label>
                <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Product description..." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600 mb-1 block">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-500">Drag & drop images here or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB each</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
