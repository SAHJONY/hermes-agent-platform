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
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your account and preferences</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar - Tesla minimal tabs */}
        <div className="w-48 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`tesla-tab w-full flex items-center gap-3 ${
                activeTab === tab.name ? 'active' : ''
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
          <button className="tesla-tab w-full flex items-center gap-3 text-red-400 hover:text-red-300 mt-6">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'Profile' && (
            <div className="tesla-card">
              <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center text-xl font-semibold">
                  A
                </div>
                <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors">
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
                    className="tesla-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="tesla-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="tesla-input resize-none"
                  />
                </div>
              </div>
              <button className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="tesla-card">
              <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', description: 'Receive email updates about your account', enabled: true },
                  { label: 'Push notifications', description: 'Get push notifications for new messages', enabled: true },
                  { label: 'Weekly digest', description: 'Receive a weekly summary of your activity', enabled: true },
                  { label: 'Marketing emails', description: 'Receive updates about new features and offers', enabled: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${item.enabled ? 'active' : ''}`}
                      role="switch"
                      aria-checked={item.enabled}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="space-y-6">
              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-6">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                    <input type="password" className="tesla-input" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">New Password</label>
                    <input type="password" className="tesla-input" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                    <input type="password" className="tesla-input" />
                  </div>
                </div>
                <button className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                  <Key size={16} />
                  Update Password
                </button>
              </div>
              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
                <p className="text-gray-500 text-sm mb-4">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors">Enable 2FA</button>
              </div>
            </div>
          )}

          {activeTab === 'Appearance' && (
            <div className="tesla-card">
              <h2 className="text-lg font-semibold mb-6">Appearance Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['dark', 'light', 'system'].map((theme) => (
                      <button
                        key={theme}
                        className={`px-4 py-3 rounded-lg capitalize text-sm transition-colors ${
                          theme === 'dark' ? 'bg-white text-black' : 'bg-neutral-800 hover:bg-neutral-700 text-gray-300'
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
                    {['#3E6AE1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-lg ring-2 transition-all ${
                          color === '#3E6AE1' ? 'ring-white ring-offset-2 ring-offset-black' : 'hover:ring-white/50'
                        }`}
                        style={{ backgroundColor: color }}
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
                        className={`px-4 py-3 rounded-lg capitalize text-sm transition-colors ${
                          size === 'medium' ? 'bg-white text-black' : 'bg-neutral-800 hover:bg-neutral-700 text-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Compact Mode</p>
                    <p className="text-xs text-gray-500 mt-1">Reduce spacing for more content</p>
                  </div>
                  <button className="tesla-toggle" role="switch" aria-checked="false" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}