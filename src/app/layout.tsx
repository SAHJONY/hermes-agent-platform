import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hermes Agent Platform - Configure Your Own AI',
  description: 'The ultimate AI agent platform. Bring your own API keys, configure custom agents, collaborate with your team, and build powerful workflows.',
  keywords: ['AI', 'agent', 'Hermes', 'chatbot', 'LLM', 'OpenAI', 'Anthropic', 'workspace'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
