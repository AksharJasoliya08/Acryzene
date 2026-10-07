import { useState } from 'react';
import { Save, Store, CreditCard, Truck, Percent, Mail, Globe, Share2 } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <Store size={16} /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard size={16} /> },
    { id: 'shipping', label: 'Shipping', icon: <Truck size={16} /> },
    { id: 'tax', label: 'Tax/GST', icon: <Percent size={16} /> },
    { id: 'email', label: 'Email', icon: <Mail size={16} /> },
    { id: 'seo', label: 'SEO', icon: <Globe size={16} /> },
    { id: 'social', label: 'Social', icon: <Share2 size={16} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your store configuration</p>
        </div>
        <button onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${saved ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-48 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">General Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Store Name</label>
                  <input type="text" defaultValue="Katargam Store" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Store Email</label>
                  <input type="email" defaultValue="support@katargam.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Currency</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">Address</label>
                  <textarea defaultValue="Ahmedabad, Gujarat, India - 380001" rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Store Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Click to upload logo</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Favicon</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Click to upload favicon</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Payment Settings</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center gap-2"><CreditCard size={16} className="text-indigo-600" /> Razorpay</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Key ID</label>
                    <input type="text" defaultValue="rzp_test_xxxxxxxxxxxx" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Key Secret</label>
                    <input type="password" defaultValue="secret_key_here" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded accent-indigo-600" />
                  <span className="text-sm text-gray-700">Enable Razorpay Payments</span>
                </label>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="font-medium text-gray-900">Cash on Delivery</h4>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded accent-indigo-600" />
                  <span className="text-sm text-gray-700">Enable COD</span>
                </label>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">COD Fee (₹)</label>
                    <input type="number" defaultValue="20" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Min Order (₹)</label>
                    <input type="number" defaultValue="200" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Max Order (₹)</label>
                    <input type="number" defaultValue="50000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Shipping Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Default Shipping Charge (₹)</label>
                  <input type="number" defaultValue="60" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Free Shipping Threshold (₹)</label>
                  <input type="number" defaultValue="999" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Shipping Zones</h4>
                <div className="space-y-2">
                  {['Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi NCR', 'Other States'].map(zone => (
                    <div key={zone} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{zone}</span>
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue={zone === 'Gujarat' ? 40 : zone === 'Other States' ? 100 : 60} className="w-20 border border-gray-300 rounded px-2 py-1 text-sm" />
                        <span className="text-xs text-gray-500">₹</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Tax / GST Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Store GSTIN</label>
                  <input type="text" defaultValue="24AABCU9603R1ZM" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Tax Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>GST (CGST + SGST for intra-state)</option>
                    <option>IGST for inter-state</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Default Tax Rates</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[{ label: '0%', value: '0' }, { label: '5%', value: '5' }, { label: '12%', value: '12' }, { label: '18%', value: '18' }, { label: '28%', value: '28' }].map(tax => (
                    <div key={tax.value} className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-lg font-bold text-gray-900">{tax.label}</p>
                      <p className="text-xs text-gray-500">GST Rate</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Email / SMTP Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">SMTP Host</label>
                  <input type="text" defaultValue="smtp.gmail.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">SMTP Port</label>
                  <input type="number" defaultValue="587" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">SMTP Username</label>
                  <input type="text" defaultValue="noreply@katargam.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">SMTP Password</label>
                  <input type="password" defaultValue="password" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" defaultChecked className="rounded accent-indigo-600" />
                <span className="text-sm text-gray-700">Enable TLS Encryption</span>
              </label>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Site Title</label>
                  <input type="text" defaultValue="Katargam Store - Premium Products at Best Prices" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Meta Description</label>
                  <textarea defaultValue="Shop premium products at Katargam Store. Best prices on electronics, fashion, fitness & more. Free shipping on orders above ₹999." rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Meta Keywords</label>
                  <input type="text" defaultValue="ecommerce, online shopping, electronics, fashion, fitness" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Social Media Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Facebook</label>
                  <input type="url" defaultValue="https://facebook.com/katargam" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Instagram</label>
                  <input type="url" defaultValue="https://instagram.com/katargam" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">YouTube</label>
                  <input type="url" defaultValue="https://youtube.com/@katargam" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">WhatsApp</label>
                  <input type="tel" defaultValue="+919876543210" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
