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
    key.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const copyToClipboard = async (text: string, id: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleKeyVisibility = (id: number) => {
    setVisibleKeys(prev =>
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">API Keys</h1>
          <p className="text-gray-400">Manage your AI provider API keys securely</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add API Key
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search API keys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredKeys.map((key) => (
          <div key={key.id} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  key.provider === 'openai' ? 'bg-green-500/20' : 'bg-purple-500/20'
                }`}>
                  <Key className={key.provider === 'openai' ? 'text-green-400' : 'text-purple-400'} size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{key.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="capitalize">{key.provider}</span>
                    <span>Created {key.createdAt}</span>
                    <span>{key.usedCount.toLocaleString()} requests</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  key.isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {key.isActive ? 'Active' : 'Disabled'}
                </div>

                <button
                  onClick={() => toggleKeyVisibility(key.id)}
                  className="p-2 hover:bg-white/5 rounded-lg"
                >
                  {visibleKeys.includes(key.id) ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>

                <button
                  onClick={() => copyToClipboard(key.prefix, key.id)}
                  className="p-2 hover:bg-white/5 rounded-lg"
                >
                  {copiedId === key.id ? (
                    <Check size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} className="text-gray-400" />
                  )}
                </button>

                <button className="p-2 hover:bg-red-500/10 rounded-lg">
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded-xl font-mono text-sm">
              {visibleKeys.includes(key.id) ? 'sk-••••••••••••••••••••••••' : key.prefix}
            </div>
          </div>
        ))}
      </div>

      {filteredKeys.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <Key size={32} className="text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No API keys found</h3>
          <p className="text-gray-500 mb-4">Add your first API key to start using the platform</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Add API Key
          </button>
        </div>
      )}
    </div>
  )
}
