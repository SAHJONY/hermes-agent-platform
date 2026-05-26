'use client'

import { useState } from 'react'
import { 
  Search, 
  Plus, 
  Puzzle,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Download,
  Upload,
  Code,
  Globe,
  Lock,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react'

const mockPlugins = [
  { id: '1', name: 'Web Scraper', description: 'Extract content from any website', version: '2.1.0', type: 'tool', visibility: 'public', isEnabled: true, users: 847, createdAt: '2024-01-15' },
  { id: '2', name: 'Slack Integration', description: 'Send messages to Slack channels', version: '1.5.0', type: 'integration', visibility: 'public', isEnabled: true, users: 534, createdAt: '2024-02-01' },
  { id: '3', name: 'Code Interpreter', description: 'Execute code in sandboxed environment', version: '3.0.0', type: 'tool', visibility: 'private', isEnabled: true, users: 123, createdAt: '2024-01-28' },
  { id: '4', name: 'Notion Sync', description: 'Sync data with Notion databases', version: '1.2.0', type: 'integration', visibility: 'public', isEnabled: false, users: 289, createdAt: '2024-02-10' },
  { id: '5', name: 'Custom API Connector', description: 'Connect to any REST API', version: '2.0.0', type: 'tool', visibility: 'team', isEnabled: true, users: 156, createdAt: '2024-02-20' },
  { id: '6', name: 'GitHub Actions', description: 'Trigger GitHub workflows', version: '1.0.0', type: 'integration', visibility: 'public', isEnabled: true, users: 421, createdAt: '2024-03-01' },
  { id: '7', name: 'Data Visualizer', description: 'Generate charts and graphs', version: '1.1.0', type: 'tool', visibility: 'private', isEnabled: false, users: 67, createdAt: '2024-03-05' },
  { id: '8', name: 'Email Scheduler', description: 'Schedule and send emails', version: '2.3.0', type: 'tool', visibility: 'public', isEnabled: true, users: 612, createdAt: '2024-01-20' },
]

const pluginTypes = ['all', 'tool', 'integration', 'automation']
const pluginVisibility = ['all', 'public', 'private', 'team']

export default function AdminPluginsPage() {
  const [plugins, setPlugins] = useState(mockPlugins)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedVisibility, setSelectedVisibility] = useState('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || plugin.type === selectedType
    const matchesVisibility = selectedVisibility === 'all' || plugin.visibility === selectedVisibility
    return matchesSearch && matchesType && matchesVisibility
  })

  const togglePluginStatus = (pluginId: string) => {
    setPlugins(plugins.map(p => 
      p.id === pluginId ? { ...p, isEnabled: !p.isEnabled } : p
    ))
  }

  const deletePlugin = (pluginId: string) => {
    setPlugins(plugins.filter(p => p.id !== pluginId))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Plugin Management</h1>
          <p className="text-gray-400 text-sm">Manage platform plugins and extensions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium text-sm transition-colors">
            <Upload size={16} />
            Upload Plugin
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
            <Plus size={16} />
            Create Plugin
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="tesla-card">
          <p className="text-2xl font-bold">{plugins.length}</p>
          <p className="text-gray-400 text-sm">Total Plugins</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{plugins.filter(p => p.isEnabled).length}</p>
          <p className="text-gray-400 text-sm">Enabled</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{plugins.filter(p => p.visibility === 'public').length}</p>
          <p className="text-gray-400 text-sm">Public</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{plugins.reduce((acc, p) => acc + p.users, 0)}</p>
          <p className="text-gray-400 text-sm">Total Users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search plugins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tesla-input pl-10"
          />
        </div>
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          {pluginTypes.map(t => (
            <option key={t} value={t}>{t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
        <select 
          value={selectedVisibility}
          onChange={(e) => setSelectedVisibility(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          {pluginVisibility.map(v => (
            <option key={v} value={v}>{v === 'all' ? 'All Visibility' : v.charAt(0).toUpperCase() + v.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredPlugins.map((plugin) => (
          <div key={plugin.id} className="tesla-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  plugin.type === 'tool' ? 'bg-blue-600/20' :
                  plugin.type === 'integration' ? 'bg-green-600/20' :
                  'bg-purple-600/20'
                }`}>
                  <Puzzle size={24} className={
                    plugin.type === 'tool' ? 'text-blue-400' :
                    plugin.type === 'integration' ? 'text-green-400' :
                    'text-purple-400'
                  } />
                </div>
                <div>
                  <h3 className="font-semibold">{plugin.name}</h3>
                  <p className="text-xs text-gray-500">v{plugin.version} • {plugin.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => togglePluginStatus(plugin.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    plugin.isEnabled 
                      ? 'bg-green-600/20 hover:bg-green-600/30' 
                      : 'bg-neutral-800 hover:bg-neutral-700'
                  }`}
                >
                  {plugin.isEnabled ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : (
                    <XCircle size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-4">{plugin.description}</p>

            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                plugin.visibility === 'public' ? 'bg-green-600/20 text-green-400' :
                plugin.visibility === 'private' ? 'bg-yellow-600/20 text-yellow-400' :
                'bg-blue-600/20 text-blue-400'
              }`}>
                {plugin.visibility === 'public' && <Globe size={12} className="inline mr-1" />}
                {plugin.visibility === 'private' && <Lock size={12} className="inline mr-1" />}
                {plugin.visibility}
              </span>
              <span className="text-xs text-gray-500">{plugin.users} users</span>
              <span className="text-xs text-gray-500">Created {plugin.createdAt}</span>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/5">
              <button className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs transition-colors">
                <Code size={14} />
                View Code
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs transition-colors">
                <Edit size={14} />
                Edit
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs transition-colors">
                <Download size={14} />
                Export
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(plugin.id)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-red-600/20 rounded-lg text-xs transition-colors ml-auto"
              >
                <Trash2 size={14} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Plugin</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{plugins.find(p => p.id === showDeleteConfirm)?.name}</span>? 
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
                onClick={() => deletePlugin(showDeleteConfirm)}
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