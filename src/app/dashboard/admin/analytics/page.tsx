'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  MessageSquare,
  Users,
  Zap,
  DollarSign,
  Bot,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const timeframes = [
  { name: 'Today', value: 'today' },
  { name: 'Last 7 days', value: '7d' },
  { name: 'Last 30 days', value: '30d' },
  { name: 'Last 90 days', value: '90d' },
]

const usageData = [
  { date: 'Jan 1', messages: 12400, users: 234, revenue: 1200 },
  { date: 'Jan 8', messages: 15800, users: 267, revenue: 1450 },
  { date: 'Jan 15', messages: 18200, users: 289, revenue: 1680 },
  { date: 'Jan 22', messages: 22100, users: 312, revenue: 1920 },
  { date: 'Jan 29', messages: 19800, users: 298, revenue: 1750 },
  { date: 'Feb 5', messages: 24500, users: 334, revenue: 2100 },
  { date: 'Feb 12', messages: 28900, users: 356, revenue: 2450 },
  { date: 'Feb 19', messages: 31200, users: 378, revenue: 2780 },
  { date: 'Feb 26', messages: 35600, users: 401, revenue: 3120 },
  { date: 'Mar 5', messages: 38900, users: 423, revenue: 3450 },
]

const providerUsage = [
  { provider: 'OpenAI', messages: 45231, percentage: 58, color: 'bg-green-500' },
  { provider: 'Anthropic', messages: 28934, percentage: 37, color: 'bg-orange-500' },
  { provider: 'Google', messages: 3421, percentage: 4, color: 'bg-blue-500' },
  { provider: 'Custom', messages: 892, percentage: 1, color: 'bg-purple-500' },
]

export default function AdminAnalyticsPage() {
  const [timeframe, setTimeframe] = useState('30d')

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Platform Analytics</h1>
          <p className="text-gray-400 text-sm">Comprehensive usage and performance metrics</p>
        </div>
        <select 
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          {timeframes.map(tf => (
            <option key={tf.value} value={tf.value}>{tf.name}</option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="tesla-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-blue-400" />
            </div>
            <span className="flex items-center gap-1 text-xs text-green-400">
              <ArrowUpRight size={14} />
              +12.5%
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">894K</p>
          <p className="text-gray-400 text-sm">Total Messages</p>
        </div>

        <div className="tesla-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-green-400" />
            </div>
            <span className="flex items-center gap-1 text-xs text-green-400">
              <ArrowUpRight size={14} />
              +8.3%
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">1,247</p>
          <p className="text-gray-400 text-sm">Active Users</p>
        </div>

        <div className="tesla-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-yellow-400" />
            </div>
            <span className="flex items-center gap-1 text-xs text-green-400">
              <ArrowUpRight size={14} />
              +15.2%
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">$43K</p>
          <p className="text-gray-400 text-sm">Monthly Revenue</p>
        </div>

        <div className="tesla-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-purple-400" />
            </div>
            <span className="flex items-center gap-1 text-xs text-red-400">
              <ArrowDownRight size={14} />
              -2.1%
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">$0.0023</p>
          <p className="text-gray-400 text-sm">Avg Cost/Message</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Usage Chart */}
        <div className="tesla-card">
          <h2 className="text-lg font-semibold mb-6">Message Volume</h2>
          <div className="h-64 flex items-end gap-2">
            {usageData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-blue-600/60 rounded-t transition-all hover:bg-blue-600"
                  style={{ height: `${(data.messages / 40000) * 100}%` }}
                />
                <span className="text-xs text-gray-500">{data.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Provider Distribution */}
        <div className="tesla-card">
          <h2 className="text-lg font-semibold mb-6">Provider Distribution</h2>
          <div className="space-y-4">
            {providerUsage.map((provider) => (
              <div key={provider.provider}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{provider.provider}</span>
                  <span className="text-sm text-gray-400">{provider.messages.toLocaleString()} ({provider.percentage}%)</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${provider.color}`}
                    style={{ width: `${provider.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue & User Stats */}
      <div className="grid grid-cols-2 gap-8">
        <div className="tesla-card">
          <h2 className="text-lg font-semibold mb-6">Revenue Trend</h2>
          <div className="space-y-4">
            {[
              { month: 'January', amount: 12400, change: 12 },
              { month: 'February', amount: 18900, change: 52 },
              { month: 'March', amount: 24900, change: 32 },
              { month: 'April', amount: 31200, change: 25 },
              { month: 'May (proj)', amount: 38500, change: 23 },
            ].map((month) => (
              <div key={month.month} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{month.month}</p>
                  <p className="text-xs text-gray-500">${month.amount.toLocaleString()}</p>
                </div>
                <span className={`flex items-center gap-1 text-xs ${
                  month.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {month.change > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {month.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="tesla-card">
          <h2 className="text-lg font-semibold mb-6">User Growth</h2>
          <div className="space-y-4">
            {[
              { plan: 'Free', users: 892, growth: 15 },
              { plan: 'Starter', users: 234, growth: 8 },
              { plan: 'Pro', users: 98, growth: 23 },
              { plan: 'Enterprise', users: 23, growth: 12 },
            ].map((plan) => (
              <div key={plan.plan} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center">
                    <Users size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{plan.plan}</p>
                    <p className="text-xs text-gray-500">{plan.users} users</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <ArrowUpRight size={14} />
                  {plan.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Users Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Top Users by Usage</h2>
        <div className="tesla-card p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Messages</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Tokens</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Cost</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Emma Wilson', email: 'emma.wilson@enterprise.com', messages: 12457, tokens: 2345678, cost: 456, plan: 'pro' },
                { name: 'Sarah Chen', email: 'sarah.chen@company.com', messages: 8921, tokens: 1567890, cost: 289, plan: 'admin' },
                { name: 'Lisa Brown', email: 'lisa.brown@agency.co', messages: 5632, tokens: 987654, cost: 178, plan: 'pro' },
                { name: 'Mike Johnson', email: 'mike.johnson@team.io', messages: 3421, tokens: 567890, cost: 98, plan: 'starter' },
                { name: 'David Lee', email: 'david.lee@startup.co', messages: 1879, tokens: 345678, cost: 67, plan: 'starter' },
              ].map((user, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-sm">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{user.messages.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">{(user.tokens / 1000).toFixed(0)}K</td>
                  <td className="px-6 py-4 text-sm">${user.cost}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.plan === 'pro' ? 'bg-blue-600/20 text-blue-400' :
                      user.plan === 'admin' ? 'bg-purple-600/20 text-purple-400' :
                      'bg-green-600/20 text-green-400'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}