'use client'

import { useState } from 'react'
import { Key, Plus, Copy, Trash2, Check, Eye, EyeOff, Search } from 'lucide-react'

const mockApiKeys = [
  { id: 1, name: 'OpenAI Production', provider: 'openai', prefix: 'sk-...7g3h', isActive: true, usedCount: 15420, createdAt: '2024-01-15' },
  { id: 2, name: 'Anthropic Dev', provider: 'anthropic', prefix: 'sk-ant...9k2m', isActive: true, usedCount: 8932, createdAt: '2024-02-01' },
  { id: 3, name: 'OpenAI Test', provider: 'openai', prefix: 'sk-...2j8k', isActive: false, usedCount: 2341, createdAt: '2024-01-20' },
]

export default function KeysPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [visibleKeys, setVisibleKeys] = useState<number[]>([])

  const filteredKeys = mockApiKeys.filter(key =>
    key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.provider.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCopy = (id: number, prefix: string) => {
    navigator.clipboard.writeText(`sk-${prefix}`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleVisibility = (id: number) => {
    setVisibleKeys(prev =>
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">API Keys</h1>
          <p className="text-gray-400 text-sm">Manage your API keys for AI providers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
        >
          <Plus size={16} />
          Add Key
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search keys..."
          className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
        />
      </div>

      {/* Keys list */}
      <div className="space-y-3">
        {filteredKeys.map((key) => (
          <div key={key.id} className="tesla-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Key size={18} className="text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{key.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      key.isActive 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-neutral-800 text-gray-500'
                    }`}>
                      {key.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-gray-400 capitalize">
                      {key.provider}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{key.prefix}</span>
                    <span>•</span>
                    <span>{key.usedCount.toLocaleString()} requests</span>
                    <span>•</span>
                    <span>Created {key.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleVisibility(key.id)}
                  className="w-9 h-9 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  {visibleKeys.includes(key.id) ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => handleCopy(key.id, key.prefix)}
                  className="w-9 h-9 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  {copiedId === key.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
                <button className="w-9 h-9 bg-neutral-800 hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors group">
                  <Trash2 size={16} className="text-gray-400 group-hover:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredKeys.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Key size={24} className="text-gray-500" />
          </div>
          <p className="text-gray-500 mb-4">No API keys found</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-sm text-white hover:underline"
          >
            Add your first API key
          </button>
        </div>
      )}
    </div>
  )
}