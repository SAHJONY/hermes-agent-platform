'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/providers/ToastProvider'
import { Github, Mail } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [credentialsLoading, setCredentialsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const registered = searchParams.get('registered')

  useEffect(() => {
    if (registered) {
      showToast('Account created! Please sign in.', 'success')
    }
  }, [registered, showToast])

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCredentialsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error('Invalid email or password')
      }

      showToast('Welcome back!', 'success')
      router.push('/dashboard')
    } catch (error: any) {
      showToast(error.message || 'Login failed', 'error')
    } finally {
      setCredentialsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: string) => {
    setLoading(true)
    await signIn(provider, { callbackUrl: '/dashboard' })
  }

  return (
    <main className=\"min-h-screen flex items-center justify-center px-6 py-12\">
      <div className=\"w-full max-w-md\">
        {/* Logo */}
        <div className=\"text-center mb-8\">
          <Link href=\"/\" className=\"inline-flex items-center gap-3\">
            <div className=\"w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-2xl\">
              H
            </div>
            <span className=\"font-bold text-2xl\">Hermes Platform</span>
          </Link>
        </div>

        {/* Form Card */}
        <div className=\"glass rounded-2xl p-8\">
          <h1 className=\"text-2xl font-bold text-center mb-2\">Welcome Back</h1>
          <p className=\"text-gray-400 text-center mb-8\">
            Sign in to continue to your workspace
          </p>

          {/* OAuth Buttons */}
          <div className=\"space-y-3 mb-6\">
            <button
              onClick={() => handleOAuthLogin('github')}
              disabled={loading}
              className=\"w-full py-3 px-4 glass rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-3 disabled:opacity-50\"
            >
              <Github size={20} />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleOAuthLogin('google')}
              disabled={loading}
              className=\"w-full py-3 px-4 glass rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-3 disabled:opacity-50\"
            >
              <svg className=\"w-5 h-5\" viewBox=\"0 0 24 24\">
                <path fill=\"#4285F4\" d=\"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z\"/>
                <path fill=\"#34A853\" d=\"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z\"/>
                <path fill=\"#FBBC05\" d=\"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z\"/>
                <path fill=\"#EA4335\" d=\"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z\"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className=\"relative my-6\">
            <div className=\"absolute inset-0 flex items-center\">
              <div className=\"w-full border-t border-white/10\"></div>
            </div>
            <div className=\"relative flex justify-center text-sm\">
              <span className=\"px-4 bg-transparent text-gray-500\">or continue with email</span>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsLogin} className=\"space-y-5\">
            <div>
              <label className=\"block text-sm font-medium mb-2\">Email</label>
              <input
                type=\"email\"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors\"
                placeholder=\"you@example.com\"
              />
            </div>

            <div>
              <label className=\"block text-sm font-medium mb-2\">Password</label>
              <input
                type=\"password\"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors\"
                placeholder=\"Your password\"
              />
            </div>

            <button
              type=\"submit\"
              disabled={credentialsLoading}
              className=\"w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2\"
            >
              {credentialsLoading ? (
                <>
                  <span className=\"w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin\"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Sign in with Email
                </>
              )}
            </button>
          </form>

          <div className=\"mt-6 text-center text-sm text-gray-400\">
            Don't have an account?{' '}
            <Link href=\"/register\" className=\"text-purple-400 hover:text-purple-300 font-medium\">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}