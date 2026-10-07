import { useState } from 'react';
import { RefreshCw, Download, CheckCircle, XCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { externalProducts, syncLogs } from '../../data/mockData';

export default function AdminImport() {
  const [syncing, setSyncing] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedProducts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const startSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 3000);
  };

  const latestSync = syncLogs[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">External Product Import</h1>
          <p className="text-gray-500 text-sm">Import & sync products from katargam.szbilling.com</p>
        </div>
        <button onClick={startSync} disabled={syncing}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${syncing ? 'bg-gray-300 text-gray-500' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
          <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {/* Sync Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1"><Clock size={14} /> Last Sync</div>
          <p className="font-bold text-gray-900">{latestSync ? new Date(latestSync.startedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Never'}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-blue-500 text-sm mb-1"><Download size={14} /> Found</div>
          <p className="font-bold text-gray-900">{latestSync?.totalFound || 0} products</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-green-500 text-sm mb-1"><CheckCircle size={14} /> New</div>
          <p className="font-bold text-gray-900">{latestSync?.newProducts || 0} products</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-indigo-500 text-sm mb-1"><RefreshCw size={14} /> Updated</div>
          <p className="font-bold text-gray-900">{latestSync?.updatedProducts || 0} products</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-red-500 text-sm mb-1"><XCircle size={14} /> Failed</div>
          <p className="font-bold text-gray-900">{latestSync?.failedProducts || 0} products</p>
        </div>
      </div>

      {/* Source Info */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <ExternalLink size={16} className="text-blue-600" />
          <span className="font-medium text-blue-900">Source: katargam.szbilling.com</span>
        </div>
        <p className="text-sm text-blue-700">Products are imported from the external source. Source prices are tracked separately from your selling prices. Admin overrides always take priority.</p>
      </div>

      {/* Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="bg-indigo-50 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-indigo-700 font-medium">{selectedProducts.length} selected</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700">Import Selected</button>
            <button className="px-3 py-1.5 bg-white border rounded-lg text-xs font-medium hover:bg-gray-50">Update Selected</button>
            <button className="px-3 py-1.5 bg-white border rounded-lg text-xs font-medium hover:bg-gray-50">Skip Selected</button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left"><input type="checkbox" className="rounded" /></th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">External Product</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Source Price</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Our Price</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Markup</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Last Sync</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {externalProducts.map(ep => {
                const ourPrice = ep.sourcePrice * 1.65;
                const markup = Math.round(((ourPrice - ep.sourcePrice) / ep.sourcePrice) * 100);
                return (
                  <tr key={ep.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3"><input type="checkbox" checked={selectedProducts.includes(ep.id)} onChange={() => toggleSelect(ep.id)} className="rounded" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={ep.sourceImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{ep.sourceName}</p>
                          <p className="text-xs text-gray-500">{ep.externalId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-600">₹{ep.sourcePrice}</td>
                    <td className="px-4 py-3">
                      {ep.importStatus === 'imported' ? (
                        <input type="number" defaultValue={Math.round(ourPrice)} className="w-20 border border-gray-300 rounded px-2 py-1 text-sm" />
                      ) : (
                        <input type="number" placeholder="Set price" className="w-20 border border-gray-300 rounded px-2 py-1 text-sm" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-green-600 font-medium">{ep.importStatus === 'imported' ? `${markup}%` : '-'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ep.importStatus === 'imported' ? 'bg-green-100 text-green-700' :
                        ep.importStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        ep.importStatus === 'skipped' ? 'bg-gray-100 text-gray-600' :
                        'bg-red-100 text-red-700'
                      }`}>{ep.importStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{new Date(ep.lastSyncedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {ep.importStatus === 'pending' && (
                          <button className="px-2 py-1 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700">Import</button>
                        )}
                        {ep.importStatus === 'imported' && (
                          <button className="px-2 py-1 bg-white border rounded text-xs font-medium hover:bg-gray-50">Edit</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sync History */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Sync History</h3>
        <div className="space-y-3">
          {syncLogs.map(log => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Sync completed</p>
                  <p className="text-xs text-gray-500">Found: {log.totalFound} | New: {log.newProducts} | Updated: {log.updatedProducts} | Failed: {log.failedProducts}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{new Date(log.startedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
