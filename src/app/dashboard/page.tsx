'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { MessageSquare, Key, Users, TrendingUp, Clock, Bot } from 'lucide-react'

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    { label: 'Total Messages', value: '127', icon: MessageSquare, change: '+12%' },
    { label: 'Active Workspaces', value: '3', icon: Bot, change: '+1' },
    { label: 'API Keys', value: '2', icon: Key, change: 'Active' },
    { label: 'Team Members', value: '4', icon: Users, change: 'Online' },
  ]

  const recentConversations = [
    { id: 1, title: 'Code review for authentication', time: '2 hours ago', messages: 24 },
    { id: 2, title: 'API integration troubleshooting', time: '5 hours ago', messages: 18 },
    { id: 3, title: 'Documentation generation', time: 'Yesterday', messages: 42 },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your AI agents today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <stat.icon className="text-purple-400" size={24} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Conversations</h2>
            <Link href="/dashboard/chat" className="text-sm text-purple-400 hover:text-purple-300">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentConversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/dashboard/chat/${conv.id}`}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <MessageSquare size={20} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium group-hover:text-purple-400 transition-colors">{conv.title}</p>
                  <p className="text-sm text-gray-500">{conv.messages} messages</p>
                </div>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/dashboard/chat/new" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MessageSquare size={20} className="text-purple-400" />
              </div>
              <p className="font-medium">New Chat</p>
              <p className="text-xs text-gray-500">Start a conversation</p>
            </Link>
            <Link href="/dashboard/keys" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Key size={20} className="text-cyan-400" />
              </div>
              <p className="font-medium">Add API Key</p>
              <p className="text-xs text-gray-500">Configure provider</p>
            </Link>
            <Link href="/dashboard/team" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Users size={20} className="text-green-400" />
              </div>
              <p className="font-medium">Invite Team</p>
              <p className="text-xs text-gray-500">Collaborate</p>
            </Link>
            <Link href="/dashboard/billing" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp size={20} className="text-orange-400" />
              </div>
              <p className="font-medium">Upgrade Plan</p>
              <p className="text-xs text-gray-500">Unlock more</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Usage This Month</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-400">45% of 10,000 messages</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">4,523</p>
            <p className="text-xs text-gray-500">Messages</p>
          </div>
          <div>
            <p className="text-2xl font-bold">142K</p>
            <p className="text-xs text-gray-500">Tokens</p>
          </div>
          <div>
            <p className="text-2xl font-bold">$8.42</p>
            <p className="text-xs text-gray-500">Est. Cost</p>
          </div>
        </div>
      </div>
    </div>
  )
}
