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
      case 'owner': return 'bg-yellow-500/20 text-yellow-400'
      case 'admin': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team</h1>
          <p className="text-gray-400">Manage your team members and permissions</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Invite Member
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Users size={24} className="text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-gray-500">Team Members</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Shield size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-gray-500">Admins</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Mail size={24} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-gray-500">Pending Invites</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold">Team Members</h2>
        </div>
        <div className="divide-y divide-white/5">
          {mockTeamMembers.map((member) => (
            <div key={member.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-semibold">
                    {member.avatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(member.status)}`}></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{member.name}</h3>
                    {member.role === 'owner' && <Crown size={14} className="text-yellow-400" />}
                  </div>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(member.role)}`}>
                  {member.role}
                </span>
                <button className="p-2 hover:bg-white/5 rounded-lg">
                  <MoreVertical size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
