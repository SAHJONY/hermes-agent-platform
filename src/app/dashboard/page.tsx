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
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header - Clean, minimal */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-2">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your AI agents today.
        </p>
      </div>

      {/* Stats Grid - Tesla minimal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="tesla-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                <stat.icon size={20} className="text-gray-400" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-gray-400">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Conversations - Tesla clean list */}
        <div className="tesla-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Conversations</h2>
            <Link href="/dashboard/chat" className="text-sm text-gray-400 hover:text-white transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {recentConversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/dashboard/chat/${conv.id}`}
                className="tesla-list-item flex items-center gap-4 rounded-lg -mx-2 px-2"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <MessageSquare size={18} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{conv.title}</p>
                  <p className="text-xs text-gray-500">{conv.messages} messages</p>
                </div>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions - Tesla minimal grid */}
        <div className="tesla-card">
          <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/chat/new" className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors group">
              <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare size={18} className="text-gray-400" />
              </div>
              <p className="font-medium text-sm">New Chat</p>
              <p className="text-xs text-gray-500 mt-1">Start a conversation</p>
            </Link>
            <Link href="/dashboard/keys" className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors group">
              <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Key size={18} className="text-gray-400" />
              </div>
              <p className="font-medium text-sm">Add API Key</p>
              <p className="text-xs text-gray-500 mt-1">Configure provider</p>
            </Link>
            <Link href="/dashboard/team" className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors group">
              <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Users size={18} className="text-gray-400" />
              </div>
              <p className="font-medium text-sm">Invite Team</p>
              <p className="text-xs text-gray-500 mt-1">Collaborate</p>
            </Link>
            <Link href="/dashboard/billing" className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors group">
              <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <TrendingUp size={18} className="text-gray-400" />
              </div>
              <p className="font-medium text-sm">Upgrade Plan</p>
              <p className="text-xs text-gray-500 mt-1">Unlock more</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Usage Section - Tesla minimal progress bar */}
      <div className="tesla-card">
        <h2 className="text-lg font-semibold mb-6">Usage This Month</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-gray-400">45% of 10,000 messages</span>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-semibold">4,523</p>
            <p className="text-xs text-gray-500 mt-1">Messages</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">142K</p>
            <p className="text-xs text-gray-500 mt-1">Tokens</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">$8.42</p>
            <p className="text-xs text-gray-500 mt-1">Est. Cost</p>
          </div>
        </div>
      </div>
    </div>
  )
}