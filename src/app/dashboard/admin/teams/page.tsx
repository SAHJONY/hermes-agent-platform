'use client'

import { useState } from 'react'
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Users,
  Crown,
  Trash2,
  Edit,
  UserPlus,
  Mail,
  Shield
} from 'lucide-react'

const mockTeams = [
  { id: '1', name: 'Engineering', owner: 'emma.wilson@enterprise.com', plan: 'pro', members: 12, workspaces: 5, createdAt: '2023-11-10' },
  { id: '2', name: 'Marketing', owner: 'sarah.chen@company.com', plan: 'starter', members: 8, workspaces: 3, createdAt: '2024-01-15' },
  { id: '3', name: 'Sales', owner: 'mike.johnson@team.io', plan: 'starter', members: 15, workspaces: 2, createdAt: '2024-02-20' },
  { id: '4', name: 'Support', owner: 'lisa.brown@agency.co', plan: 'pro', members: 6, workspaces: 4, createdAt: '2024-01-28' },
  { id: '5', name: 'Research', owner: 'david.lee@startup.co', plan: 'free', members: 4, workspaces: 1, createdAt: '2024-03-05' },
  { id: '6', name: 'Operations', owner: 'alex.rivera@corp.net', plan: 'pro', members: 9, workspaces: 3, createdAt: '2024-03-10' },
]

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState(mockTeams)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.owner.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const deleteTeam = (teamId: string) => {
    setTeams(teams.filter(t => t.id !== teamId))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Team Management</h1>
          <p className="text-gray-400 text-sm">Manage all teams and their members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
          <Plus size={16} />
          Create Team
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="tesla-card">
          <p className="text-2xl font-bold">{teams.length}</p>
          <p className="text-gray-400 text-sm">Total Teams</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{teams.reduce((acc, t) => acc + t.members, 0)}</p>
          <p className="text-gray-400 text-sm">Total Members</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{teams.filter(t => t.plan === 'pro').length}</p>
          <p className="text-gray-400 text-sm">Pro Teams</p>
        </div>
        <div className="tesla-card">
          <p className="text-2xl font-bold">{teams.reduce((acc, t) => acc + t.workspaces, 0)}</p>
          <p className="text-gray-400 text-sm">Total Workspaces</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tesla-input pl-10"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="tesla-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-xs text-gray-500">ID: {team.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                  <Edit size={16} className="text-gray-400" />
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(team.id)}
                  className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                team.plan === 'pro' ? 'bg-blue-600/20 text-blue-400' :
                team.plan === 'starter' ? 'bg-green-600/20 text-green-400' :
                'bg-neutral-800 text-gray-400'
              }`}>
                {team.plan}
              </span>
              <span className="text-xs text-gray-500">Created {team.createdAt}</span>
            </div>

            <div className="flex items-center gap-4 mb-4 p-3 bg-neutral-900 rounded-lg">
              <div className="flex items-center gap-2">
                <Crown size={14} className="text-yellow-400" />
                <span className="text-xs text-gray-400">Owner:</span>
                <span className="text-xs text-white">{team.owner}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold">{team.members}</p>
                  <p className="text-xs text-gray-500">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{team.workspaces}</p>
                  <p className="text-xs text-gray-500">Workspaces</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 bg-neutral-800 rounded-full border-2 border-neutral-900 flex items-center justify-center text-xs"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                {team.members > 4 && (
                  <div className="w-8 h-8 bg-neutral-700 rounded-full border-2 border-neutral-900 flex items-center justify-center text-xs">
                    +{team.members - 4}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Team</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{teams.find(t => t.id === showDeleteConfirm)?.name}</span>? 
              All members will be removed.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteTeam(showDeleteConfirm)}
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