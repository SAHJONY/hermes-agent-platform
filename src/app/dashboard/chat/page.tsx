'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Plus, Search, MessageSquare, Clock, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

// Mock conversations data
const mockConversations = [
  {
    id: '1',
    title: 'Code review for authentication',
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messageCount: 24,
    agent: 'Hermes'
  },
  {
    id: '2',
    title: 'API integration troubleshooting',
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    messageCount: 18,
    agent: 'Code Assistant'
  },
  {
    id: '3',
    title: 'Documentation generation',
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    messageCount: 42,
    agent: 'Hermes'
  },
  {
    id: '4',
    title: 'Database schema design',
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    messageCount: 31,
    agent: 'Schema Designer'
  },
]

export default function ChatPage() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = mockConversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className=\"flex h-full\">
      {/* Conversation List Sidebar */}
      <div className=\"w-80 border-r border-white/5 flex flex-col\">
        {/* Header */}
        <div className=\"p-4 border-b border-white/5\">
          <div className=\"flex items-center justify-between mb-4\">
            <h1 className=\"text-xl font-bold\">Conversations</h1>
            <Link
              href=\"/dashboard/chat/new\"
              className=\"w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center hover:bg-purple-600 transition-colors\"
            >
              <Plus size={18} />
            </Link>
          </div>
          <div className=\"relative\">
            <Search size={18} className=\"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500\" />
            <input
              type=\"text\"
              placeholder=\"Search conversations...\"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=\"w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-sm\"
            />
          </div>
        </div>

        {/* List */}
        <div className=\"flex-1 overflow-y-auto p-2 space-y-1\">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className=\"group p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer\"
            >
              <div className=\"flex items-start gap-3\">
                <div className=\"w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0\">
                  <MessageSquare size={18} className=\"text-purple-400\" />
                </div>
                <div className=\"flex-1 min-w-0\">
                  <p className=\"font-medium truncate\">{conv.title}</p>
                  <div className=\"flex items-center gap-2 mt-1 text-xs text-gray-500\">
                    <span>{conv.agent}</span>
                    <span>•</span>
                    <span>{conv.messageCount} msgs</span>
                  </div>
                </div>
                <button 
                  className=\"opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all\"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className=\"text-xs text-gray-600 mt-2 pl-13\">
                {formatDistanceToNow(conv.updatedAt, { addSuffix: true })}
              </p>
            </div>
          ))}

          {filteredConversations.length === 0 && (
            <div className=\"text-center py-12 text-gray-500\">
              <MessageSquare size={40} className=\"mx-auto mb-3 opacity-50\" />
              <p>No conversations found</p>
            </div>
          )}
        </div>

        {/* Agent Selector */}
        <div className=\"p-4 border-t border-white/5\">
          <p className=\"text-xs text-gray-500 mb-2\">Active Agent</p>
          <select className=\"w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm\">
            <option value=\"hermes\">Hermes (Primary)</option>
            <option value=\"code\">Code Assistant</option>
            <option value=\"research\">Research Assistant</option>
          </select>
        </div>
      </div>

      {/* Chat Area - Empty State */}
      <div className=\"flex-1 flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6\">
            <MessageSquare size={40} className=\"text-purple-400\" />
          </div>
          <h2 className=\"text-2xl font-bold mb-2\">Select a conversation</h2>
          <p className=\"text-gray-400 mb-6\">
            Choose an existing conversation or start a new one
          </p>
          <Link
            href=\"/dashboard/chat/new\"
            className=\"inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity\"
          >
            <Plus size={18} />
            New Conversation
          </Link>
        </div>
      </div>
    </div>
  )
}