'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  Key, 
  CreditCard,
  TrendingUp,
  Activity,
  Shield,
  Globe,
  Bot,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

// Mock platform statistics
const platformStats = {
  totalUsers: 1247,
  activeUsers: 389,
  totalWorkspaces: 3421,
  totalTeams: 156,
  totalMessages: 894521,
  totalApiKeys: 2341,
  monthlyRecurringRevenue: 42999,
  activeSubscriptions: 847,
}

const recentActivity = [
  { id: 1, action: 'New user registered', user: 'sarah.chen@company.com', time: '2 minutes ago', type: 'user' },
  { id: 2, action: 'Workspace created', user: 'mike.johnson@team.io', time: '5 minutes ago', type: 'workspace' },
  { id: 3, action: 'API key generated', user: 'alex.rivera@corp.net', time: '12 minutes ago', type: 'api_key' },
  { id: 4, action: 'Team member added', user: 'emma.wilson@enterprise.com', time: '18 minutes ago', type: 'team' },
  { id: 5, action: 'Subscription upgraded', user: 'david.lee@startup.co', time: '23 minutes ago', type: 'billing' },
  { id: 6, action: 'Plugin installed', user: 'lisa.brown@agency.co', time: '31 minutes ago', type: 'plugin' },
  { id: 7, action: 'New user registered', user: 'james.taylor@tech.io', time: '45 minutes ago', type: 'user' },
  { id: 8, action: 'API key revoked', user: 'susan.anderson@llc.com', time: '1 hour ago', type: 'api_key' },
]

const systemHealth = [
  { name: 'API Servers', status: 'operational', uptime: 99.99 },
  { name: 'Database', status: 'operational', uptime: 99.95 },
  { name: 'Auth Service', status: 'operational', uptime: 100 },
  { name: 'Message Processing', status: 'operational', uptime: 99.87 },
  { name: 'Payment Processing', status: 'operational', uptime: 99.99 },
]

export default function AdminOverviewPage() {
  const [timeframe, setTimeframe] = useState('30d')

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Platform Overview</h1>
          <p className="text-gray-400 text-sm">Real-time monitoring and control center</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
            <Zap size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="tesla-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-blue-400" />
            </div>
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold mb-1">{platformStats.totalUsers.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-xs text-green-400 mt-2">+12% from last month</p>
        </div>

        <div className="tesla-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-green-400" />
            </div>
            <span className="text-xs text-green-400">+47 today</span>
          </div>
          <p className="text-3xl font-bold mb-1">{platformStats.activeUsers}</p>
          <p className="text-gray-400 text-sm">Active Users</p>
          <p className="text-xs text-gray-500 mt-2">Currently online</p>
        </div>

        <div className="tesla-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-purple-400" />
            </div>
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold mb-1">{(platformStats.totalMessages / 1000).toFixed(0)}K</p>
          <p className="text-gray-400 text-sm">Total Messages</p>
          <p className="text-xs text-green-400 mt-2">+8% from last month</p>
        </div>

        <div className="tesla-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <CreditCard size={20} className="text-yellow-400" />
            </div>
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold mb-1">${(platformStats.monthlyRecurringRevenue / 1000).toFixed(1)}K</p>
          <p className="text-gray-400 text-sm">Monthly Revenue</p>
          <p className="text-xs text-green-400 mt-2">+15% from last month</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="tesla-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
              <Briefcase size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{platformStats.totalWorkspaces.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Workspaces</p>
            </div>
          </div>
        </div>

        <div className="tesla-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
              <Bot size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{platformStats.totalTeams}</p>
              <p className="text-gray-400 text-sm">Teams</p>
            </div>
          </div>
        </div>

        <div className="tesla-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
              <Key size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{platformStats.totalApiKeys.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">API Keys</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* System Health */}
        <div className="tesla-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">System Health</h2>
            <span className="flex items-center gap-2 text-xs text-green-400">
              <CheckCircle size={14} />
              All systems operational
            </span>
          </div>
          <div className="space-y-4">
            {systemHealth.map((system) => (
              <div key={system.name} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${system.status === 'operational' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm">{system.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{system.uptime}% uptime</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    system.status === 'operational' 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-red-400/20 text-red-400'
                  }`}>
                    {system.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="tesla-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300">View all</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-neutral-900 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-600/20' :
                  activity.type === 'workspace' ? 'bg-purple-600/20' :
                  activity.type === 'api_key' ? 'bg-yellow-600/20' :
                  activity.type === 'team' ? 'bg-green-600/20' :
                  activity.type === 'billing' ? 'bg-pink-600/20' :
                  'bg-gray-600/20'
                }`}>
                  {activity.type === 'user' && <Users size={14} className="text-blue-400" />}
                  {activity.type === 'workspace' && <Briefcase size={14} className="text-purple-400" />}
                  {activity.type === 'api_key' && <Key size={14} className="text-yellow-400" />}
                  {activity.type === 'team' && <Bot size={14} className="text-green-400" />}
                  {activity.type === 'billing' && <CreditCard size={14} className="text-pink-400" />}
                  {activity.type === 'plugin' && <Globe size={14} className="text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.action}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-4">
          <button className="tesla-card hover:bg-neutral-800 transition-colors text-left">
            <Shield size={20} className="text-blue-400 mb-3" />
            <p className="text-sm font-medium">Manage Roles</p>
            <p className="text-xs text-gray-500">Assign owner/admin access</p>
          </button>
          <button className="tesla-card hover:bg-neutral-800 transition-colors text-left">
            <Globe size={20} className="text-green-400 mb-3" />
            <p className="text-sm font-medium">Platform Settings</p>
            <p className="text-xs text-gray-500">Configure global options</p>
          </button>
          <button className="tesla-card hover:bg-neutral-800 transition-colors text-left">
            <AlertCircle size={20} className="text-yellow-400 mb-3" />
            <p className="text-sm font-medium">View Logs</p>
            <p className="text-xs text-gray-500">System audit trail</p>
          </button>
          <button className="tesla-card hover:bg-neutral-800 transition-colors text-left">
            <Zap size={20} className="text-purple-400 mb-3" />
            <p className="text-sm font-medium">Emergency Controls</p>
            <p className="text-xs text-gray-500">Critical actions</p>
          </button>
        </div>
      </div>
    </div>
  )
}