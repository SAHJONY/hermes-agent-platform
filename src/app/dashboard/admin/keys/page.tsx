'use client'

import { useState } from 'react'
import { 
  Search, 
  Plus, 
  Key,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react'

const mockApiKeys = [
  { id: '1', name: 'Production OpenAI', user: 'emma.wilson@enterprise.com', provider: 'openai', prefix: 'sk-prod-...', usedCount: 12457, usedBytes: 894521, status: 'active', createdAt: '2024-01-10' },
  { id: '2', name: 'Dev Anthropic', user: 'sarah.chen@company.com', provider: 'anthropic', prefix: 'sk-ant-...', usedCount: 3421, usedBytes: 234521, status: 'active', createdAt: '2024-02-15' },
  { id: '3', name: 'Production Claude', user: 'lisa.brown@agency.co', provider: 'anthropic', prefix: 'sk-ant-...', usedCount: 8921, usedBytes: 567821, status: 'active', createdAt: '2024-01-28' },
  { id: '4', name: 'Test OpenAI', user: 'mike.johnson@team.io', provider: 'openai', prefix: 'sk-test-...', usedCount: 456, usedBytes: 12345, status: 'inactive', createdAt: '2024-03-01' },
  { id: '5', name: 'Backup API Key', user: 'david.lee@startup.co', provider: 'openai', prefix: 'sk-back-...', usedCount: 0, usedBytes: 0, status: 'active', createdAt: '2024-03-05' },
  { id: '6', name: 'Analytics Key', user: 'alex.rivera@corp.net', provider: 'openai', prefix: 'sk-anal-...', usedCount: 1879, usedBytes: 156789, status: 'active', createdAt: '2024-02-20' },
]

const providers = ['all', 'openai', 'anthropic', 'google', 'custom']

export default function AdminKeysPage() {
  const [keys, setKeys] = useState(mockApiKeys)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const filteredKeys = keys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          key.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProvider = selectedProvider === 'all' || key.provider === selectedProvider
    return matchesSearch && matchesProvider
  })

  const toggleKeyStatus = (keyId: string) => {
    setKeys(keys.map(k => 
      k.id === keyId ? { ...k, status: k.status === 'active' ? 'inactive' : 'active' } : k
    ))
  }

  const deleteKey = (keyId: string) => {
    setKeys(keys.filter(k => k.id !== keyId))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">API Key Management</h1>
          <p className="text-gray-400 text-sm">Monitor and control all API keys across the platform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
          <Plus size={16} />
          Generate Key
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="tesla-card">
          <p className="text-2xl font-bold">{keys.length}</p>
          <p className="text-gray-400 text-sm">Total Keys</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{keys.filter(k => k.status === 'active').length}</p>
          <p className="text-gray-400 text-sm">Active</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{(keys.reduce((acc, k) => acc + k.usedBytes, 0) / 1024 / 1024).toFixed(1)}MB</p>
          <p className="text-gray-400 text-sm">Total Usage</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{keys.reduce((acc, k) => acc + k.usedCount, 0).toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Total Requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search API keys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tesla-input pl-10"
          />
        </div>
        <select 
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          {providers.map(p => (
            <option key={p} value={p}>{p === 'all' ? 'All Providers' : p.charAt(0).toUpperCase() + p.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Keys Table */}
      <div className="tesla-card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Key Name</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Owner</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Provider</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Prefix</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Usage</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeys.map((key) => (
              <tr key={key.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      key.provider === 'openai' ? 'bg-green-600/20' :
                      key.provider === 'anthropic' ? 'bg-orange-600/20' :
                      'bg-blue-600/20'
                    }`}>
                      <Key size={18} className={
                        key.provider === 'openai' ? 'text-green-400' :
                        key.provider === 'anthropic' ? 'text-orange-400' :
                        'text-blue-400'
                      } />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{key.name}</p>
                      <p className="text-xs text-gray-500">Created {key.createdAt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm">{key.user}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    key.provider === 'openai' ? 'bg-green-600/20 text-green-400' :
                    key.provider === 'anthropic' ? 'bg-orange-600/20 text-orange-400' :
                    'bg-blue-600/20 text-blue-400'
                  }`}>
                    {key.provider}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <code className="text-sm text-gray-400 bg-neutral-900 px-2 py-1 rounded">{key.prefix}</code>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-gray-400">
                    <p>{key.usedCount.toLocaleString()} requests</p>
                    <p>{(key.usedBytes / 1024).toFixed(1)} KB</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-2 text-xs ${
                    key.status === 'active' ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    {key.status === 'active' ? (
                      <>
                        <CheckCircle size={14} />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle size={14} />
                        Inactive
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                      <Copy size={16} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => toggleKeyStatus(key.id)}
                      className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      {key.status === 'active' ? (
                        <EyeOff size={16} className="text-yellow-400" />
                      ) : (
                        <Eye size={16} className="text-green-400" />
                      )}
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(key.id)}
                      className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete API Key</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{keys.find(k => k.id === showDeleteConfirm)?.name}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteKey(showDeleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 rounded-lg font-medium text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}