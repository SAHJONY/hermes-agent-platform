'use client'

import { useState } from 'react'
import { useToast } from '@/components/providers/ToastProvider'
import { Key, Plus, Trash2, Eye, EyeOff, Copy, Check } from 'lucide-react'

const mockApiKeys = [
  { id: '1', name: 'OpenAI Production', provider: 'openai', keyPrefix: 'sk-****', isActive: true, usedCount: 15420 },
  { id: '2', name: 'Anthropic Dev', provider: 'anthropic', keyPrefix: 'sk-ant****', isActive: true, usedCount: 8234 },
  { id: '3', name: 'Custom Endpoint', provider: 'custom', keyPrefix: 'cust-****', isActive: false, usedCount: 0 },
]

const providers = [
  { id: 'openai', name: 'OpenAI', models: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'] },
  { id: 'anthropic', name: 'Anthropic', models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'] },
  { id: 'custom', name: 'Custom Endpoint', models: [] },
]

export default function ApiKeysPage() {
  const { showToast } = useToast()
  const [keys, setKeys] = useState(mockApiKeys)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newKey, setNewKey] = useState({ name: '', provider: 'openai', key: '' })
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAddKey = () => {
    if (!newKey.name || !newKey.key) {
      showToast('Please fill in all fields', 'error')
      return
    }

    const keyPrefix = newKey.key.substring(0, 8) + '****'
    
    setKeys([
      ...keys,
      {
        id: Date.now().toString(),
        name: newKey.name,
        provider: newKey.provider,
        keyPrefix,
        isActive: true,
        usedCount: 0
      }
    ])
    
    setNewKey({ name: '', provider: 'openai', key: '' })
    setShowAddForm(false)
    showToast('API key added successfully', 'success')
  }

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id))
    showToast('API key deleted', 'info')
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    showToast('Copied to clipboard', 'success')
  }

  return (
    <div className=\"p-8\">
      {/* Header */}
      <div className=\"flex items-center justify-between mb-8\">
        <div>
          <h1 className=\"text-3xl font-bold mb-2\">API Keys</h1>
          <p className=\"text-gray-400\">Manage your AI provider API keys securely</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className=\"flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity\"
        >
          <Plus size={18} />
          Add New Key
        </button>
      </div>

      {/* Add Key Form */}
      {showAddForm && (
        <div className=\"glass rounded-2xl p-6 mb-8\">
          <h2 className=\"text-xl font-semibold mb-4\">Add API Key</h2>
          <div className=\"grid md:grid-cols-2 gap-4\">
            <div>
              <label className=\"block text-sm font-medium mb-2\">Key Name</label>
              <input
                type=\"text\"
                value={newKey.name}
                onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                placeholder=\"My OpenAI Key\"
                className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none\"
              />
            </div>
            <div>
              <label className=\"block text-sm font-medium mb-2\">Provider</label>
              <select
                value={newKey.provider}
                onChange={(e) => setNewKey({ ...newKey, provider: e.target.value })}
                className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none\"
              >
                {providers.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className=\"md:col-span-2\">
              <label className=\"block text-sm font-medium mb-2\">API Key</label>
              <div className=\"relative\">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={newKey.key}
                  onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                  placeholder=\"sk-...\"\n                  className=\"w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none font-mono\"
                />
                <button
                  type=\"button\"
                  onClick={() => setShowKey(!showKey)}
                  className=\"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white\"
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <div className=\"flex items-center gap-3 mt-4\">
            <button
              onClick={handleAddKey}
              className=\"px-5 py-2.5 bg-purple-600 rounded-xl font-semibold hover:bg-purple-700 transition-colors\"
            >
              Save Key
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className=\"px-5 py-2.5 glass rounded-xl font-semibold hover:bg-white/10 transition-colors\"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Keys List */}
      <div className=\"space-y-4\">
        {keys.map((key) => (
          <div key={key.id} className=\"glass rounded-2xl p-6\">
            <div className=\"flex items-center justify-between\">
              <div className=\"flex items-center gap-4\">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  key.provider === 'openai' ? 'bg-green-500/20' :
                  key.provider === 'anthropic' ? 'bg-orange-500/20' :
                  'bg-purple-500/20'
                }`}>
                  <Key className={
                    key.provider === 'openai' ? 'text-green-400' :
                    key.provider === 'anthropic' ? 'text-orange-400' :
                    'text-purple-400'
                  } size={24} />
                </div>
                <div>
                  <h3 className=\"font-semibold text-lg\">{key.name}</h3>
                  <div className=\"flex items-center gap-3 mt-1\">
                    <span className=\"text-sm text-gray-500 capitalize\">{key.provider}</span>
                    <span className=\"text-sm font-mono text-gray-400\">{key.keyPrefix}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      key.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {key.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              <div className=\"flex items-center gap-4\">
                <div className=\"text-right\">
                  <p className=\"text-lg font-semibold\">{key.usedCount.toLocaleString()}</p>
                  <p className=\"text-xs text-gray-500\">API calls</p>
                </div>
                <div className=\"flex items-center gap-2\">
                  <button 
                    onClick={() => handleCopy(key.keyPrefix)}
                    className=\"p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors\"
                    title=\"Copy prefix\"
                  >
                    <Copy size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteKey(key.id)}
                    className=\"p-2 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors\"
                    title=\"Delete key\"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {keys.length === 0 && (
          <div className=\"text-center py-16\">
            <Key size={48} className=\"mx-auto mb-4 text-gray-600\" />
            <h3 className=\"text-xl font-semibold mb-2\">No API keys yet</h3>
            <p className=\"text-gray-400 mb-6\">Add your first API key to start using AI providers</p>
            <button
              onClick={() => setShowAddForm(true)}
              className=\"inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity\"
            >
              <Plus size={18} />
              Add API Key
            </button>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className=\"mt-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20\">
        <p className=\"text-sm text-yellow-200\">
          <strong>Security Notice:</strong> API keys are encrypted before storage. Never share your API keys publicly or commit them to version control.
        </p>
      </div>
    </div>
  )
}