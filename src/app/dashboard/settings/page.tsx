'use client'

import { useState } from 'react'
import { User, Bell, Shield, Palette, Key, LogOut, Save } from 'lucide-react'

const tabs = [
  { name: 'Profile', icon: User },
  { name: 'Notifications', icon: Bell },
  { name: 'Security', icon: Shield },
  { name: 'Appearance', icon: Palette },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile')
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@company.com',
    bio: 'Full-stack developer passionate about AI and automation',
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="flex gap-8">
        <div className="w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === tab.name
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              {tab.name}
            </button>
          ))}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-red-400 hover:bg-red-500/10 mt-8">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        <div className="flex-1 max-w-2xl">
          {activeTab === 'Profile' && (
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
                    A
                  </div>
                  <button className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm">
                    Change Avatar
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none resize-none"
                    />
                  </div>
                </div>
                <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', description: 'Receive email updates about your account' },
                  { label: 'Push notifications', description: 'Get push notifications for new messages' },
                  { label: 'Weekly digest', description: 'Receive a weekly summary of your activity' },
                  { label: 'Marketing emails', description: 'Receive updates about new features and offers' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 3} />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer peer-checked:bg-purple-500 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-6">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                    <input type="password" className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">New Password</label>
                    <input type="password" className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                    <input type="password" className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none" />
                  </div>
                </div>
                <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  <Key size={18} />
                  Update Password
                </button>
              </div>
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
                <p className="text-gray-500 mb-4">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">Enable 2FA</button>
              </div>
            </div>
          )}

          {activeTab === 'Appearance' && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-6">Appearance Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['dark', 'light', 'system'].map((theme) => (
                      <button
                        key={theme}
                        className={`px-4 py-3 rounded-xl capitalize transition-colors ${
                          theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 hover:bg-white/10 text-gray-400'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Accent Color</label>
                  <div className="flex gap-3">
                    {[
                      { name: 'purple', color: 'bg-purple-500' },
                      { name: 'cyan', color: 'bg-cyan-500' },
                      { name: 'green', color: 'bg-green-500' },
                      { name: 'orange', color: 'bg-orange-500' },
                      { name: 'pink', color: 'bg-pink-500' },
                    ].map((accent) => (
                      <button
                        key={accent.name}
                        className={`w-10 h-10 rounded-xl ${accent.color} ring-2 ring-transparent hover:ring-white/20 transition-all ${
                          accent.name === 'purple' ? 'ring-purple-400' : ''
                        }`}
                        title={accent.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-3">Font Size</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-3 rounded-xl capitalize transition-colors ${
                          size === 'medium' ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 hover:bg-white/10 text-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-gray-500">Reduce spacing for more content</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer peer-checked:bg-purple-500 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}