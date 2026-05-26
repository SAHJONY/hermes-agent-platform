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
    <div className="flex h-full">
      {/* Conversations List */}
      <div className="w-80 border-r border-white/5 flex flex-col">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-4 rounded-xl text-left transition-colors ${
                selectedConversation === conv.id
                  ? 'bg-purple-500/20 border border-purple-500/30'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <MessageSquare size={20} className="text-purple-400" />
                </div>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </div>
              <p className="font-medium mb-1">{conv.title}</p>
              <p className="text-xs text-gray-500">{conv.messages} messages</p>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            <Plus size={18} />
            New Conversation
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Code review for authentication</h2>
                <p className="text-sm text-gray-500">24 messages · Started 2 hours ago</p>
              </div>
              <button className="p-2 hover:bg-white/5 rounded-lg">
                <MoreVertical size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-semibold text-sm">H</div>
                <div className="flex-1">
                  <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 max-w-2xl">
                    <p className="text-sm">I've reviewed your authentication code. Here's what I found:</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-300">
                      <li>• JWT token expiration is set correctly</li>
                      <li>• Password hashing uses bcrypt with cost factor 12</li>
                      <li>• Session management looks secure</li>
                    </ul>
                    <p className="mt-2 text-sm">One suggestion: consider adding rate limiting to prevent brute force attacks.</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">Hermes · 2 hours ago</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/5">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none"
                />
                <button className="px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
