'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase,
  UserCircle,
  Key,
  BarChart3,
  Puzzle,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  AlertTriangle
} from 'lucide-react'

const adminNavigation = [
  { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/dashboard/admin/users', icon: Users },
  { name: 'Workspaces', href: '/dashboard/admin/workspaces', icon: Briefcase },
  { name: 'Teams', href: '/dashboard/admin/teams', icon: UserCircle },
  { name: 'API Keys', href: '/dashboard/admin/keys', icon: Key },
  { name: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
  { name: 'Plugins', href: '/dashboard/admin/plugins', icon: Puzzle },
  { name: 'System', href: '/dashboard/admin/system', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    // Check if user has owner/admin role
    const userRole = (session?.user as { role?: string })?.role
    if (userRole === 'owner' || userRole === 'admin') {
      setIsOwner(true)
    } else {
      // Redirect non-admin users
      router.push('/dashboard')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-6 h-6 border border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session || !isOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-500" />
          <h1 className="text-xl font-semibold mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-4">You need owner or admin privileges to access this area.</p>
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Admin Sidebar - Tesla-style with owner badge */}
      <aside className="w-64 bg-neutral-950 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center font-bold text-black text-sm">
              H
            </div>
            <div>
              <span className="font-semibold text-sm">SAHJONY</span>
              <span className="text-xs text-gray-500 block">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Owner Badge */}
        <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Owner Access</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Full platform control</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNavigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              {(session.user?.name || session.user?.email)?.[0]?.toUpperCase() || 'O'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user?.name || 'Owner'}</p>
              <p className="text-xs text-blue-400">Owner</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex-1"
            >
              <ChevronRight size={16} />
              Dashboard
            </Link>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}