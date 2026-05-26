'use client'

import { useState } from 'react'
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Globe,
  Trash2,
  Edit,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  BarChart3,
  MessageSquare,
  Bot
} from 'lucide-react'

const mockWorkspaces = [
  { id: '1', name: 'Production AI', user: 'emma.wilson@enterprise.com', plan: 'pro', isPublic: false, messages: 12457, agents: 8, createdAt: '2023-11-10', lastActive: '5 min ago' },
  { id: '2', name: 'Development', user: 'sarah.chen@company.com', plan: 'starter', isPublic: true, messages: 3421, agents: 4, createdAt: '2024-01-15', lastActive: '1 hour ago' },
  { id: '3', name: 'Marketing Team', user: 'mike.johnson@team.io', plan: 'starter', isPublic: false, messages: 2134, agents: 3, createdAt: '2024-02-20', lastActive: '30 min ago' },
  { id: '4', name: 'Customer Support', user: 'lisa.brown@agency.co', plan: 'pro', isPublic: false, messages: 8921, agents: 6, createdAt: '2024-01-28', lastActive: '2 hours ago' },
  { id: '5', name: 'Research Lab', user: 'david.lee@startup.co', plan: 'free', isPublic: true, messages: 456, agents: 2, createdAt: '2024-03-05', lastActive: '1 day ago' },
  { id: '6', name: 'Sales Pipeline', user: 'alex.rivera@corp.net', plan: 'starter', isPublic: false, messages: 1879, agents: 3, createdAt: '2024-03-10', lastActive: '45 min ago' },
  { id: '7', name: 'HR Automation', user: 'susan.anderson@llc.com', plan: 'pro', isPublic: false, messages: 5632, agents: 5, createdAt: '2024-02-14', lastActive: '20 min ago' },
  { id: '8', name: 'Analytics Dashboard', user: 'james.taylor@tech.io', plan: 'free', isPublic: true, messages: 123, agents: 1, createdAt: '2023-12-01', lastActive: '2 weeks ago' },
]

const plans = ['free', 'starter', 'pro', 'enterprise']

export default function AdminWorkspacesPage() {
  const [workspaces, setWorkspaces] = useState(mockWorkspaces)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const filteredWorkspaces = workspaces.filter(ws => {
    const matchesSearch = ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ws.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlan = selectedPlan === 'all' || ws.plan === selectedPlan
    return matchesSearch && matchesPlan
  })

  const toggleVisibility = (workspaceId: string) => {
    setWorkspaces(workspaces.map(ws => 
      ws.id === workspaceId ? { ...ws, isPublic: !ws.isPublic } : ws
    ))
  }

  const deleteWorkspace = (workspaceId: string) => {
    setWorkspaces(workspaces.filter(ws => ws.id !== workspaceId))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Workspace Management</h1>
          <p className="text-gray-400 text-sm">Control all workspaces across the platform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
          <Plus size={16} />
          Create Workspace
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="tesla-card">
          <p className="text-2xl font-bold">{workspaces.length}</p>
          <p className="text-gray-400 text-sm">Total Workspaces</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{workspaces.filter(w => w.plan === 'pro').length}</p>
          <p className="text-gray-400 text-sm">Pro Plans</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{workspaces.filter(w => w.isPublic).length}</p>
          <p className="text-gray-400 text-sm">Public</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{workspaces.reduce((acc, w) => acc + w.messages, 0).toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Total Messages</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search workspaces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tesla-input pl-10"
          />
        </div>
        <select 
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="all">All Plans</option>
          <option value="free">Free</option>
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>

      {/* Workspaces Table */}
      <div className="tesla-card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Workspace</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Owner</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Visibility</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Usage</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Last Active</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkspaces.map((workspace) => (
              <tr key={workspace.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                      <Bot size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{workspace.name}</p>
                      <p className="text-xs text-gray-500">ID: {workspace.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm">{workspace.user}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    workspace.plan === 'pro' ? 'bg-blue-600/20 text-blue-400' :
                    workspace.plan === 'starter' ? 'bg-green-600/20 text-green-400' :
                    'bg-neutral-800 text-gray-400'
                  }`}>
                    {workspace.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleVisibility(workspace.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                      workspace.isPublic 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}
                  >
                    {workspace.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                    {workspace.isPublic ? 'Public' : 'Private'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-gray-400">
                    <p className="flex items-center gap-1"><MessageSquare size={12} /> {workspace.messages.toLocaleString()}</p>
                    <p className="flex items-center gap-1"><Bot size={12} /> {workspace.agents} agents</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-500">{workspace.lastActive}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                      <BarChart3 size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                      <Edit size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                      <Copy size={16} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(workspace.id)}
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
            <h3 className="text-lg font-semibold mb-4">Delete Workspace</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{workspaces.find(w => w.id === showDeleteConfirm)?.name}</span>? 
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
                onClick={() => deleteWorkspace(showDeleteConfirm)}
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