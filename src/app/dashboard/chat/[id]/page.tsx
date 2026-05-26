'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MoreVertical, Send, Code, Copy, Check } from 'lucide-react'

// Mock data - in production this would come from API/database
const mockConversations: Record<string, {
  id: string
  title: string
  messages: { id: string; role: 'user' | 'assistant'; content: string; timestamp: string }[]
}> = {
  '1': {
    id: '1',
    title: 'Code review for authentication',
    messages: [
      { id: '1', role: 'user', content: "Can you review my authentication implementation? I'm particularly concerned about the token refresh flow.", timestamp: '2 hours ago' },
      { id: '2', role: 'assistant', content: "Sure, I'd be happy to help review that. Can you share the relevant code snippets?", timestamp: '2 hours ago' },
      { id: '3', role: 'user', content: "Here's the token refresh function I'm using:\n\n```javascript\nasync function refreshToken() {\n  const response = await fetch('/api/refresh', {\n    method: 'POST',\n    credentials: 'include'\n  });\n  return response.json();\n}\n```", timestamp: '2 hours ago' },
      { id: '4', role: 'assistant', content: "I see a potential issue with your token refresh implementation. Here are my observations:\n\n1. **No error handling** - The function should handle network errors and invalid responses\n2. **Missing token validation** - Check if the refresh token itself is expired\n3. **No retry logic** - Consider adding exponential backoff for failed requests\n\nWould you like me to suggest an improved version?", timestamp: '1 hour ago' },
      { id: '5', role: 'user', content: 'Yes please! That would be really helpful.', timestamp: '1 hour ago' },
    ],
  },
  '2': {
    id: '2',
    title: 'API integration troubleshooting',
    messages: [
      { id: '1', role: 'user', content: "I'm having trouble connecting to the OpenAI API. Getting a 403 error.", timestamp: '5 hours ago' },
      { id: '2', role: 'assistant', content: "A 403 Forbidden error typically indicates an authentication issue. Let me help you troubleshoot:\n\n1. Check if your API key is correctly set in your environment variables\n2. Verify the key has not expired or been revoked\n3. Ensure you have the correct permissions for the API endpoint\n\nWhat specific endpoint are you trying to call?", timestamp: '5 hours ago' },
    ],
  },
  '3': {
    id: '3',
    title: 'Documentation generation',
    messages: [
      { id: '1', role: 'user', content: 'Can you help me generate documentation for my REST API?', timestamp: 'Yesterday' },
      { id: '2', role: 'assistant', content: "Of course! I can help you generate comprehensive API documentation. To get started, I'll need:\n\n1. Your OpenAPI/Swagger spec file (if you have one)\n2. Or a description of your endpoints\n3. Any specific documentation style you prefer (Swagger UI, Markdown, etc.)\n\nWhat format would you like the documentation in?", timestamp: 'Yesterday' },
    ],
  },
}

export default function ConversationPage() {
  const params = useParams()
  const conversationId = params.id as string
  const [message, setMessage] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const conversation = mockConversations[conversationId] || mockConversations['1']

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    // In production, this would send the message to the API
    console.log('Sending message:', message)
    setMessage('')
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Left sidebar - Conversation list (same as chat page) */}
      <div className="w-80 bg-neutral-950 border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/dashboard/chat" className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <h1 className="text-lg font-semibold">Messages</h1>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-2 space-y-1">
          {Object.values(mockConversations).map((conv) => (
            <Link
              key={conv.id}
              href={`/dashboard/chat/${conv.id}`}
              className={`w-full p-3 rounded-lg text-left transition-colors block ${
                conv.id === conversationId
                  ? 'bg-white/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code size={18} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{conv.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{conv.messages.length} messages</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">{conversation.title}</h2>
            <p className="text-sm text-gray-500">{conversation.messages.length} messages</p>
          </div>
          <button className="w-8 h-8 bg-neutral-900 hover:bg-neutral-800 rounded-lg flex items-center justify-center transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-6 max-w-3xl mx-auto">
            {conversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-neutral-800 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Code size={16} className="text-gray-400" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-xl ${
                    msg.role === 'user'
                      ? 'bg-neutral-800 rounded-tr-none'
                      : 'bg-neutral-900 rounded-tl-none'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-xs text-gray-500 hover:text-gray-400 flex items-center gap-1 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check size={12} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          Copy
                        </>
                      )}
                    </button>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-neutral-700 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-medium">
                    U
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-white/5">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-3xl mx-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 tesla-input py-3"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}