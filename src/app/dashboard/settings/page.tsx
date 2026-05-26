'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/providers/ToastProvider'
import { User, Bell, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
  const { data: session } = useSession()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('profile')

  const [profile, setProfile] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ]

  const handleSaveProfile = () => {
    showToast('Profile updated successfully', 'success')
  }

  return (
    <div className=\"p-8\">
      {/* Header */}
      <div className=\"mb-8\">
        <h1 className=\"text-3xl font-bold mb-2\">Settings</h1>
        <p className=\"text-gray-400\">Manage your account preferences and configuration</p>
      </div>

      <div className=\"flex gap-8\">
        {/* Sidebar */}
        <div className=\"w-64 space-y-1\">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className=\"flex-1 max-w-2xl\">
          {activeTab === 'profile' && (
            <div className=\"glass rounded-2xl p-6\">
              <h2 className=\"text-xl font-semibold mb-6\">Profile Information</h2>
              <div className=\"space-y-4\">
                <div className=\"flex items-center gap-4 pb-6 border-b border-white/10\">
                  <div className=\"w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl font-bold\">
                    {profile.name?.[0] || 'U'}
                  </div>
                  <div>
                    <button className=\"px-4 py-2 glass rounded-lg text-sm hover:bg-white/10 transition-colors\">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div>
                  <label className=\"block text-sm font-medium mb-2\">Display Name</label>
                  <input
                    type=\"text\"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none\"
                  />
                </div>

                <div>
                  <label className=\"block text-sm font-medium mb-2\">Email</label>
                  <input
                    type=\"email\"
                    value={profile.email}
                    disabled
                    className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 opacity-60 cursor-not-allowed\"
                  />
                  <p className=\"text-xs text-gray-500 mt-1\">Email cannot be changed</p>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className=\"px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity\"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className=\"glass rounded-2xl p-6\">
              <h2 className=\"text-xl font-semibold mb-6\">Notification Preferences</h2>
              <div className=\"space-y-4\">
                {[
                  { label: 'Email notifications for mentions', enabled: true },
                  { label: 'Weekly usage summary', enabled: true },
                  { label: 'Product updates and announcements', enabled: false },
                  { label: 'Team activity notifications', enabled: true },
                ].map((item, i) => (
                  <div key={i} className=\"flex items-center justify-between py-3 border-b border-white/5\">
                    <span>{item.label}</span>
                    <button className={`w-12 h-6 rounded-full transition-colors ${
                      item.enabled ? 'bg-purple-500' : 'bg-white/10'
                    }`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className=\"glass rounded-2xl p-6\">
              <h2 className=\"text-xl font-semibold mb-6\">Security Settings</h2>
              <div className=\"space-y-6\">
                <div>
                  <h3 className=\"font-medium mb-3\">Change Password</h3>
                  <div className=\"space-y-3\">
                    <input
                      type=\"password\"
                      placeholder=\"Current password\"
                      className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none\"
                    />
                    <input
                      type=\"password\"
                      placeholder=\"New password\"
                      className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none\"
                    />
                    <button className=\"px-5 py-2.5 bg-purple-600 rounded-xl font-semibold hover:bg-purple-700 transition-colors\">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className=\"pt-6 border-t border-white/10\">
                  <h3 className=\"font-medium mb-3\">Two-Factor Authentication</h3>
                  <p className=\"text-sm text-gray-400 mb-4\">Add an extra layer of security to your account</p>
                  <button className=\"px-5 py-2.5 glass rounded-xl font-semibold hover:bg-white/10 transition-colors\">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className=\"glass rounded-2xl p-6\">
              <h2 className=\"text-xl font-semibold mb-6\">Appearance</h2>
              <div className=\"space-y-6\">
                <div>
                  <h3 className=\"font-medium mb-3\">Theme</h3>
                  <div className=\"grid grid-cols-3 gap-3\">
                    {['Dark', 'Light', 'System'].map((theme) => (
                      <button
                        key={theme}
                        className={`py-3 px-4 rounded-xl border transition-colors ${
                          theme === 'Dark' ? 'border-purple-500 bg-purple-500/20' : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className=\"font-medium mb-3\">Accent Color</h3>
                  <div className=\"flex gap-3\">
                    {['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                      <button
                        key={color}
                        className=\"w-10 h-10 rounded-xl ring-2 ring-offset-2 ring-offset-background transition-all\"
                        style={{ backgroundColor: color, ringColor: color === '#8b5cf6' ? color : 'transparent' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}