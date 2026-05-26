'use client'

import { useState } from 'react'
import { Users, Plus, Mail, MoreVertical, Shield, Crown } from 'lucide-react'

const mockTeamMembers = [
  { id: 1, name: 'Alex Johnson', email: 'alex@company.com', role: 'owner', status: 'online', avatar: 'A' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@company.com', role: 'admin', status: 'online', avatar: 'S' },
  { id: 3, name: 'Mike Ross', email: 'mike@company.com', role: 'member', status: 'offline', avatar: 'M' },
  { id: 4, name: 'Emma Davis', email: 'emma@company.com', role: 'member', status: 'away', avatar: 'E' },
]

export default function TeamPage() {
  const [showInviteModal, setShowInviteModal] = useState(false)

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-yellow-500/10 text-yellow-400'
      case 'admin':
        return 'bg-blue-500/10 text-blue-400'
      default:
        return 'bg-neutral-800 text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'away':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Team</h1>
          <p className="text-gray-400 text-sm">Manage your team members and roles</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
        >
          <Plus size={16} />
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="tesla-stat-card">
          <p className="text-2xl font-semibold">4</p>
          <p className="text-sm text-gray-500 mt-1">Total Members</p>
        </div>
        <div className="tesla-stat-card">
          <p className="text-2xl font-semibold">2</p>
          <p className="text-sm text-gray-500 mt-1">Online Now</p>
        </div>
        <div className="tesla-stat-card">
          <p className="text-2xl font-semibold">1</p>
          <p className="text-sm text-gray-500 mt-1">Admins</p>
        </div>
      </div>

      {/* Team list */}
      <div className="tesla-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">All Members</h2>
        </div>
        <div className="space-y-2">
          {mockTeamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors -mx-4 px-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-medium text-sm">
                    {member.avatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-neutral-900 ${getStatusColor(member.status)}`}></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{member.name}</p>
                    {member.role === 'owner' && <Crown size={14} className="text-yellow-400" />}
                    {member.role === 'admin' && <Shield size={14} className="text-blue-400" />}
                  </div>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full capitalize ${getRoleBadgeColor(member.role)}`}>
                  {member.role}
                </span>
                <button className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}