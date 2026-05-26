'use client'

import { useState } from 'react'
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Shield, 
  Trash2,
  Edit,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  UserX,
  UserCheck
} from 'lucide-react'

// Mock users data
const mockUsers = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'admin', status: 'active', provider: 'google', createdAt: '2024-01-15', lastLogin: '2 hours ago', workspaces: 5, messages: 1247 },
  { id: '2', name: 'Mike Johnson', email: 'mike.johnson@team.io', role: 'user', status: 'active', provider: 'github', createdAt: '2024-02-20', lastLogin: '5 minutes ago', workspaces: 3, messages: 892 },
  { id: '3', name: 'Emma Wilson', email: 'emma.wilson@enterprise.com', role: 'owner', status: 'active', provider: 'credentials', createdAt: '2023-11-10', lastLogin: '1 hour ago', workspaces: 12, messages: 3421 },
  { id: '4', name: 'David Lee', email: 'david.lee@startup.co', role: 'user', status: 'active', provider: 'google', createdAt: '2024-03-05', lastLogin: '1 day ago', workspaces: 2, messages: 456 },
  { id: '5', name: 'Lisa Brown', email: 'lisa.brown@agency.co', role: 'admin', status: 'active', provider: 'github', createdAt: '2024-01-28', lastLogin: '3 hours ago', workspaces: 8, messages: 2134 },
  { id: '6', name: 'James Taylor', email: 'james.taylor@tech.io', role: 'user', status: 'inactive', provider: 'credentials', createdAt: '2023-12-01', lastLogin: '2 weeks ago', workspaces: 1, messages: 123 },
  { id: '7', name: 'Susan Anderson', email: 'susan.anderson@llc.com', role: 'user', status: 'active', provider: 'google', createdAt: '2024-02-14', lastLogin: '30 minutes ago', workspaces: 4, messages: 789 },
  { id: '8', name: 'Alex Rivera', email: 'alex.rivera@corp.net', role: 'user', status: 'active', provider: 'github', createdAt: '2024-03-10', lastLogin: '2 hours ago', workspaces: 2, messages: 567 },
]

const roles = ['owner', 'admin', 'user', 'guest']

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const updateUserRole = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
    setEditingUser(null)
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { 
      ...u, 
      status: u.status === 'active' ? 'inactive' : 'active' 
    } : u))
  }

  const deleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">User Management</h1>
          <p className="text-gray-400 text-sm">Manage all users and permissions on the platform</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tesla-input pl-10"
          />
        </div>
        <select 
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="all">All Roles</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="tesla-card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Provider</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Activity</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {editingUser === user.id ? (
                    <div className="flex items-center gap-2">
                      <select
                        defaultValue={user.role}
                        className="bg-neutral-800 border border-white/10 rounded px-2 py-1 text-sm"
                        autoFocus
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        onBlur={() => setEditingUser(null)}
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <button onClick={() => setEditingUser(null)} className="text-gray-500 hover:text-white">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setEditingUser(user.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                        user.role === 'owner' ? 'bg-blue-600/20 text-blue-400' :
                        user.role === 'admin' ? 'bg-purple-600/20 text-purple-400' :
                        'bg-neutral-800 text-gray-400'
                      }`}
                    >
                      <Shield size={12} />
                      {user.role}
                      <ChevronDown size={10} />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-2 text-xs ${
                    user.status === 'active' ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-400 capitalize">{user.provider}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-gray-500">
                    <p>{user.workspaces} workspaces</p>
                    <p>{user.messages.toLocaleString()} messages</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                      title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {user.status === 'active' ? (
                        <UserX size={16} className="text-gray-400" />
                      ) : (
                        <UserCheck size={16} className="text-green-400" />
                      )}
                    </button>
                    <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                      <Mail size={16} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(user.id)}
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors">
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delete User</h3>
                <p className="text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{users.find(u => u.id === showDeleteConfirm)?.name}</span>? 
              This will remove all their data including workspaces, messages, and API keys.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteUser(showDeleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 rounded-lg font-medium text-sm transition-colors"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}