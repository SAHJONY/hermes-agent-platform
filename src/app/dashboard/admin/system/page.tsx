'use client'

import { useState } from 'react'
import { 
  Settings, 
  Globe,
  Mail,
  Shield,
  Database,
  Key,
  Bell,
  Zap,
  Code,
  CheckCircle,
  AlertTriangle,
  Save,
  RefreshCw,
  Terminal,
  Server
} from 'lucide-react'

const tabs = [
  { name: 'General', icon: Settings },
  { name: 'Security', icon: Shield },
  { name: 'Email', icon: Mail },
  { name: 'API', icon: Key },
  { name: 'Database', icon: Database },
  { name: 'Monitoring', icon: Server },
]

export default function AdminSystemPage() {
  const [activeTab, setActiveTab] = useState('General')
  const [settings, setSettings] = useState({
    // General
    platformName: 'Hermes Agent Platform',
    platformUrl: 'https://hermes-platform.com',
    supportEmail: 'support@hermes-platform.com',
    maintenanceMode: false,
    allowNewRegistrations: true,
    // Security
    requireEmailVerification: true,
    enable2FA: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    // Email
    emailProvider: 'resend',
    emailFromAddress: 'noreply@hermes-platform.com',
    emailFromName: 'Hermes Platform',
    // API
    defaultRateLimit: 100,
    allowApiKeyCreation: true,
    requireApiKeyApproval: false,
    // Database
    dbProvider: 'sqlite',
    dbHost: 'localhost',
    dbPort: 3306,
    dbName: 'hermes_db',
    // Monitoring
    enableAnalytics: true,
    logLevel: 'info',
    errorReporting: true,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">System Settings</h1>
          <p className="text-gray-400 text-sm">Configure platform-wide settings and preferences</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium text-sm transition-colors">
            <RefreshCw size={16} />
            Restart Services
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
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
        </div>

        {/* Content */}
        <div className="flex-1 max-w-3xl">
          {activeTab === 'General' && (
            <div className="space-y-6">
              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-6">Platform Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Platform Name</label>
                    <input
                      type="text"
                      value={settings.platformName}
                      onChange={(e) => updateSetting('platformName', e.target.value)}
                      className="tesla-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Platform URL</label>
                    <input
                      type="url"
                      value={settings.platformUrl}
                      onChange={(e) => updateSetting('platformUrl', e.target.value)}
                      className="tesla-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Support Email</label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => updateSetting('supportEmail', e.target.value)}
                      className="tesla-input"
                    />
                  </div>
                </div>
              </div>

              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-6">Platform Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Maintenance Mode</p>
                      <p className="text-xs text-gray-500">When enabled, only admins can access</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${settings.maintenanceMode ? 'active' : ''}`}
                      onClick={() => updateSetting('maintenanceMode', !settings.maintenanceMode)}
                      role="switch"
                      aria-checked={settings.maintenanceMode}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Allow New Registrations</p>
                      <p className="text-xs text-gray-500">Let new users create accounts</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${settings.allowNewRegistrations ? 'active' : ''}`}
                      onClick={() => updateSetting('allowNewRegistrations', !settings.allowNewRegistrations)}
                      role="switch"
                      aria-checked={settings.allowNewRegistrations}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="space-y-6">
              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-6">Authentication Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Require Email Verification</p>
                      <p className="text-xs text-gray-500">Users must verify email before logging in</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${settings.requireEmailVerification ? 'active' : ''}`}
                      onClick={() => updateSetting('requireEmailVerification', !settings.requireEmailVerification)}
                      role="switch"
                      aria-checked={settings.requireEmailVerification}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Enforce 2FA</p>
                      <p className="text-xs text-gray-500">Require two-factor authentication for all users</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${settings.enable2FA ? 'active' : ''}`}
                      onClick={() => updateSetting('enable2FA', !settings.enable2FA)}
                      role="switch"
                      aria-checked={settings.enable2FA}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                      className="tesla-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => updateSetting('maxLoginAttempts', parseInt(e.target.value))}
                      className="tesla-input"
                    />
                  </div>
                </div>
              </div>

              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-4">OAuth Providers</h2>
                <div className="space-y-3">
                  {['GitHub', 'Google', 'Discord'].map((provider) => (
                    <div key={provider} className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center">
                          <Globe size={16} className="text-gray-400" />
                        </div>
                        <span className="font-medium text-sm">{provider}</span>
                      </div>
                      <button className="px-4 py-1.5 bg-green-600/20 text-green-400 rounded-lg text-xs font-medium">
                        Enabled
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Email' && (
            <div className="space-y-6">
              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-6">Email Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Provider</label>
                    <select
                      value={settings.emailProvider}
                      onChange={(e) => updateSetting('emailProvider', e.target.value)}
                      className="tesla-input"
                    >
                      <option value="resend">Resend</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="ses">Amazon SES</option>
                      <option value="smtp">SMTP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">From Address</label>
                    <input
                      type="email"
                      value={settings.emailFromAddress}
                      onChange={(e) => updateSetting('emailFromAddress', e.target.value)}
                      className="tesla-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">From Name</label>
                    <input
                      type="text"
                      value={settings.emailFromName}
                      onChange={(e) => updateSetting('emailFromName', e.target.value)}
                      className="tesla-input"
                    />
                  </div>
                </div>
              </div>

              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-4">Email Templates</h2>
                <div className="space-y-3">
                  {['Welcome Email', 'Password Reset', 'Email Verification', 'Team Invite'].map((template) => (
                    <button key={template} className="w-full flex items-center justify-between p-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors text-left">
                      <span className="text-sm">{template}</span>
                      <span className="text-xs text-gray-500">Edit template →</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'API' && (
            <div className="space-y-6">
              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-6">API Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Default Rate Limit (req/min)</label>
                    <input
                      type="number"
                      value={settings.defaultRateLimit}
                      onChange={(e) => updateSetting('defaultRateLimit', parseInt(e.target.value))}
                      className="tesla-input"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Allow API Key Creation</p>
                      <p className="text-xs text-gray-500">Let users generate their own API keys</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${settings.allowApiKeyCreation ? 'active' : ''}`}
                      onClick={() => updateSetting('allowApiKeyCreation', !settings.allowApiKeyCreation)}
                      role="switch"
                      aria-checked={settings.allowApiKeyCreation}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Require API Key Approval</p>
                      <p className="text-xs text-gray-500">Admin must approve new API keys</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${settings.requireApiKeyApproval ? 'active' : ''}`}
                      onClick={() => updateSetting('requireApiKeyApproval', !settings.requireApiKeyApproval)}
                      role="switch"
                      aria-checked={settings.requireApiKeyApproval}
                    />
                  </div>
                </div>
              </div>

              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-4">API Endpoints</h2>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs">
                  <div className="space-y-2">
                    <p className="text-gray-500"># REST API Base URL</p>
                    <p className="text-green-400">https://api.hermes-platform.com/v1</p>
                    <p className="text-gray-500 mt-4"># WebSocket Endpoint</p>
                    <p className="text-green-400">wss://ws.hermes-platform.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Database' && (
            <div className="space-y-6">
              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-6">Database Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Database Provider</label>
                    <select
                      value={settings.dbProvider}
                      onChange={(e) => updateSetting('dbProvider', e.target.value)}
                      className="tesla-input"
                    >
                      <option value="sqlite">SQLite</option>
                      <option value="postgres">PostgreSQL</option>
                      <option value="mysql">MySQL</option>
                      <option value="mongodb">MongoDB</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Host</label>
                      <input
                        type="text"
                        value={settings.dbHost}
                        onChange={(e) => updateSetting('dbHost', e.target.value)}
                        className="tesla-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Port</label>
                      <input
                        type="number"
                        value={settings.dbPort}
                        onChange={(e) => updateSetting('dbPort', parseInt(e.target.value))}
                        className="tesla-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Database Name</label>
                    <input
                      type="text"
                      value={settings.dbName}
                      onChange={(e) => updateSetting('dbName', e.target.value)}
                      className="tesla-input"
                    />
                  </div>
                </div>
              </div>

              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-4">Database Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center gap-2 p-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors">
                    <Database size={20} className="text-blue-400" />
                    <div className="text-left">
                      <p className="text-sm font-medium">Backup Database</p>
                      <p className="text-xs text-gray-500">Create a full backup</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 p-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors">
                    <RefreshCw size={20} className="text-green-400" />
                    <div className="text-left">
                      <p className="text-sm font-medium">Run Migrations</p>
                      <p className="text-xs text-gray-500">Update schema</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Monitoring' && (
            <div className="space-y-6">
              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-6">Monitoring Configuration</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Enable Analytics</p>
                      <p className="text-xs text-gray-500">Track platform usage and performance</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${settings.enableAnalytics ? 'active' : ''}`}
                      onClick={() => updateSetting('enableAnalytics', !settings.enableAnalytics)}
                      role="switch"
                      aria-checked={settings.enableAnalytics}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Error Reporting</p>
                      <p className="text-xs text-gray-500">Report errors to monitoring service</p>
                    </div>
                    <button 
                      className={`tesla-toggle ${settings.errorReporting ? 'active' : ''}`}
                      onClick={() => updateSetting('errorReporting', !settings.errorReporting)}
                      role="switch"
                      aria-checked={settings.errorReporting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Log Level</label>
                    <select
                      value={settings.logLevel}
                      onChange={(e) => updateSetting('logLevel', e.target.value)}
                      className="tesla-input"
                    >
                      <option value="debug">Debug</option>
                      <option value="info">Info</option>
                      <option value="warn">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-4">System Logs</h2>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs max-h-64 overflow-auto">
                  <div className="space-y-1">
                    <p className="text-gray-500">[2024-03-15 10:23:45] INFO: Server started on port 3000</p>
                    <p className="text-gray-500">[2024-03-15 10:24:12] INFO: New user registered: emma.wilson@enterprise.com</p>
                    <p className="text-green-400">[2024-03-15 10:25:33] INFO: API request completed in 145ms</p>
                    <p className="text-yellow-400">[2024-03-15 10:26:01] WARN: Rate limit approaching for user id: 123</p>
                    <p className="text-red-400">[2024-03-15 10:27:15] ERROR: Failed to connect to database</p>
                  </div>
                </div>
              </div>

              <div className="tesla-card">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex items-center gap-2 p-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors">
                    <Terminal size={20} className="text-gray-400" />
                    <span className="text-sm">Clear Cache</span>
                  </button>
                  <button className="flex items-center gap-2 p-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors">
                    <RefreshCw size={20} className="text-gray-400" />
                    <span className="text-sm">Restart Server</span>
                  </button>
                  <button className="flex items-center gap-2 p-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors">
                    <Zap size={20} className="text-gray-400" />
                    <span className="text-sm">Force GC</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}