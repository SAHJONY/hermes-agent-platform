'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(7)
    setToasts(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className=\"fixed bottom-6 right-6 z-50 flex flex-col gap-3\">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast-enter glass rounded-xl px-5 py-4 flex items-center gap-3 min-w-[300px] shadow-xl ${
              toast.type === 'success' ? 'border-green-500/30' :
              toast.type === 'error' ? 'border-red-500/30' :
              'border-purple-500/30'
            }`}
          >
            <span className={`text-lg ${
              toast.type === 'success' ? 'text-green-400' :
              toast.type === 'error' ? 'text-red-400' :
              'text-purple-400'
            }`}>
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span className=\"flex-1\">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className=\"text-gray-400 hover:text-white transition-colors\"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}