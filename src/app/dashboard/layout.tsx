'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Key, 
  Users, 
  Settings, 
  CreditCard,
  LogOut,
  Plus,
  Bot
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'API Keys', href: '/dashboard/keys', icon: Key },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className=\"min-h-screen flex items-center justify-center\">
        <div className=\"w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin\"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className=\"min-h-screen flex\">
      {/* Sidebar */}
      <aside className=\"w-64 glass-dark border-r border-white/5 flex flex-col\">
        {/* Logo */}
        <div className=\"p-6 border-b border-white/5\">
          <Link href=\"/\" className=\"flex items-center gap-3\">
            <div className=\"w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-xl\">
              H
            </div>
            <div>
              <span className=\"font-bold\">Hermes</span>
              <span className=\"text-xs text-gray-500 block\">Agent Platform</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className=\"flex-1 p-4 space-y-1\">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-purple-500/20 text-purple-400' 
                    : 'hover:bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* New Chat Button */}
        <div className=\"p-4\">
          <Link
            href=\"/dashboard/chat/new\"
            className=\"flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity\"
          >
            <Plus size={18} />
            New Chat
          </Link>
        </div>

        {/* User */}
        <div className=\"p-4 border-t border-white/5\">
          <div className=\"flex items-center gap-3\">
            <div className=\"w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-semibold\">
              {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
            </div>
            <div className=\"flex-1 min-w-0\">
              <p className=\"font-medium truncate\">{session.user?.name || 'User'}</p>
              <p className=\"text-xs text-gray-500 truncate\">{session.user?.email}</p>
            </div>
          </div>
          <button className=\"flex items-center gap-2 w-full mt-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors\">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className=\"flex-1 overflow-auto\">
        {children}
      </main>
    </div>
  )
}