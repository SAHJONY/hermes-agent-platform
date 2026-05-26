'use client'

import { useState } from 'react'
import { Search, Plus, MessageSquare, MoreVertical, Send } from 'lucide-react'

const mockConversations = [
  { id: 1, title: 'Code review for authentication', time: '2 hours ago', messages: 24, active: true },
  { id: 2, title: 'API integration troubleshooting', time: '5 hours ago', messages: 18, active: false },
  { id: 3, title: 'Documentation generation', time: 'Yesterday', messages: 42, active: false },
  { id: 4, title: 'Database schema design', time: '3 days ago', messages: 156, active: false },
]

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)

  const filteredConversations = mockConversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen">
      {/* Left sidebar - Conversation list */}
      <div className="w-80 bg-neutral-950 border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">Messages</h1>
            <button className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations"
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-white/5 rounded-lg text-sm focus:outline-none focus:border-white/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-3 rounded-lg text-left transition-colors mb-1 ${
                selectedConversation === conv.id
                  ? 'bg-white/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={18} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{conv.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{conv.messages} messages</span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-black">
        {selectedConversation ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Code review for authentication</h2>
                <p className="text-sm text-gray-500">24 messages</p>
              </div>
              <button className="w-8 h-8 bg-neutral-900 hover:bg-neutral-800 rounded-lg flex items-center justify-center transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-6 overflow-auto">
              <div className="space-y-6 max-w-2xl mx-auto">
                {/* Example messages - Tesla minimal style */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-neutral-800 rounded-full flex-shrink-0"></div>
                  <div className="bg-neutral-900 rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
                    <p className="text-sm">Can you review my authentication implementation? I'm particularly concerned about the token refresh flow.</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-neutral-800 rounded-2xl rounded-tr-none px-4 py-3 max-w-md">
                    <p className="text-sm">Sure, I'd be happy to help review that. Can you share the relevant code snippets?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-neutral-800 rounded-full flex-shrink-0"></div>
                  <div className="bg-neutral-900 rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
                    <p className="text-sm">Here's the token refresh function I'm using:</p>
                    <code className="block mt-2 p-3 bg-neutral-950 rounded-lg text-xs text-gray-400 overflow-x-auto">
                      {`async function refreshToken() {\n  const response = await fetch('/api/refresh', {\n    method: 'POST',\n    credentials: 'include'\n  });\n  return response.json();\n}`}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex items-center gap-3 max-w-3xl mx-auto">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 tesla-input py-3"
                />
                <button className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}