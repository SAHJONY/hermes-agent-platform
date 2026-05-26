'use client'

import { useState } from 'react'
import { useToast } from '@/components/providers/ToastProvider'
import { Users, Plus, Mail, Crown, MoreVertical, UserPlus } from 'lucide-react'

const mockTeamMembers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner', status: 'online' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'admin', status: 'online' },
  { id: '3', name: 'Mike Wilson', email: 'mike@example.com', role: 'member', status: 'away' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'member', status: 'offline' },
]

export default function TeamPage() {
  const { showToast } = useToast()
  const [members, setMembers] = useState(mockTeamMembers)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')

  const handleInvite = () => {
    if (!inviteEmail) {
      showToast('Please enter an email address', 'error')
      return
    }

    setMembers([
      ...members,
      {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: 'invited'
      }
    ])

    setInviteEmail('')
    setShowInvite(false)
    showToast(`Invitation sent to ${inviteEmail}`, 'success')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400'
      case 'away': return 'bg-yellow-400'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-purple-400'
    }
  }

  return (
    <div className=\"p-8\">
      {/* Header */}
      <div className=\"flex items-center justify-between mb-8\">
        <div>
          <h1 className=\"text-3xl font-bold mb-2\">Team</h1>
          <p className=\"text-gray-400\">Manage your team members and permissions</p>
        </div>
        <button
          onClick={() => setShowInvite(!showInvite)}
          className=\"flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity\"
        >
          <UserPlus size={18} />
          Invite Member
        </button>
      </div>

      {/* Invite Form */}
      {showInvite && (
        <div className=\"glass rounded-2xl p-6 mb-8\">
          <h2 className=\"text-lg font-semibold mb-4\">Invite Team Member</h2>
          <div className=\"flex gap-4\">
            <input
              type=\"email\"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder=\"colleague@company.com\"
              className=\"flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none\"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className=\"px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none\"
            >
              <option value=\"member\">Member</option>
              <option value=\"admin\">Admin</option>
            </select>
            <button
              onClick={handleInvite}
              className=\"px-6 py-3 bg-purple-600 rounded-xl font-semibold hover:bg-purple-700 transition-colors\"
            >
              Send Invite
            </button>
          </div>
        </div>
      )}

      {/* Team Stats */}
      <div className=\"grid grid-cols-3 gap-6 mb-8\">
        <div className=\"glass rounded-2xl p-6 text-center\">
          <div className=\"w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3\">
            <Users size={24} className=\"text-purple-400\" />
          </div>
          <p className=\"text-2xl font-bold\">{members.length}</p>
          <p className=\"text-sm text-gray-400\">Total Members</p>
        </div>
        <div className=\"glass rounded-2xl p-6 text-center\">
          <div className=\"w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-3\">
            <Users size={24} className=\"text-green-400\" />
          </div>
          <p className=\"text-2xl font-bold\">{members.filter(m => m.status === 'online').length}</p>
          <p className=\"text-sm text-gray-400\">Online Now</p>
        </div>
        <div className=\"glass rounded-2xl p-6 text-center\">
          <div className=\"w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-3\">
            <Users size={24} className=\"text-cyan-400\" />
          </div>
          <p className=\"text-2xl font-bold\">2</p>
          <p className=\"text-sm text-gray-400\">Admins</p>
        </div>
      </div>

      {/* Members List */}
      <div className=\"glass rounded-2xl overflow-hidden\">
        <div className=\"p-4 border-b border-white/5 bg-white/5\">
          <h2 className=\"font-semibold\">Team Members</h2>
        </div>
        <div className=\"divide-y divide-white/5\">
          {members.map((member) => (
            <div key={member.id} className=\"p-4 flex items-center gap-4 hover:bg-white/5 transition-colors\">
              <div className=\"relative\">
                <div className=\"w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-semibold\">
                  {member.name[0].toUpperCase()}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(member.status)}`} />
              </div>
              <div className=\"flex-1\">
                <div className=\"flex items-center gap-2\">
                  <p className=\"font-medium\">{member.name}</p>
                  {member.role === 'owner' && <Crown size={14} className=\"text-yellow-400\" />}
                </div>
                <p className=\"text-sm text-gray-500\">{member.email}</p>
              </div>
              <div className=\"flex items-center gap-3\">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  member.role === 'owner' ? 'bg-yellow-500/20 text-yellow-400' :
                  member.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {member.role}
                </span>
                <button className=\"p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white\">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Invites */}
      <div className=\"mt-8 glass rounded-2xl p-6 border border-dashed border-white/20\">
        <h3 className=\"font-semibold mb-4\">Pending Invitations</h3>
        <p className=\"text-sm text-gray-500 text-center py-8\">No pending invitations</p>
      </div>
    </div>
  )
}