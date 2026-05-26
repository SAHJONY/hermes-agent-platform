'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/providers/ToastProvider'

export default function RegisterPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error')
      return
    }

    if (formData.password.length < 8) {
      showToast('Password must be at least 8 characters', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      showToast('Account created successfully!', 'success')
      router.push('/login?registered=true')
    } catch (error: any) {
      showToast(error.message || 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
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
          <h1 className=\"text-2xl font-bold text-center mb-2\">Create Account</h1>
          <p className=\"text-gray-400 text-center mb-8\">
            Start building with AI agents today
          </p>

          <form onSubmit={handleSubmit} className=\"space-y-5\">
            <div>
              <label className=\"block text-sm font-medium mb-2\">Name</label>
              <input
                type=\"text\"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors\"
                placeholder=\"Your name\"
              />
            </div>

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
                placeholder=\"At least 8 characters\"
              />
            </div>

            <div>
              <label className=\"block text-sm font-medium mb-2\">Confirm Password</label>
              <input
                type=\"password\"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className=\"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors\"
                placeholder=\"Repeat your password\"
              />
            </div>

            <button
              type=\"submit\"
              disabled={loading}
              className=\"w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50\"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className=\"mt-6 text-center text-sm text-gray-400\">
            Already have an account?{' '}
            <Link href=\"/login\" className=\"text-purple-400 hover:text-purple-300 font-medium\">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}