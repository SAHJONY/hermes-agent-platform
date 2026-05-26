'use client'

import { useState } from 'react'
import { useToast } from '@/components/providers/ToastProvider'
import { CreditCard, Check, Zap } from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: ['3 workspaces', '100 messages/mo', 'Basic analytics', 'Community support'],
    limitations: ['No team features', 'No priority support']
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    features: ['10 workspaces', '5,000 messages/mo', 'Team collaboration', 'Advanced analytics', 'Priority support'],
    limitations: []
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    features: ['Unlimited workspaces', '10,000 messages/mo', 'Team collaboration', 'Advanced analytics', 'Priority support', 'Custom agents', 'API access'],
    limitations: []
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    features: ['Everything in Pro', 'Unlimited messages', 'Custom plugins', 'Dedicated support', 'SLA guarantee', 'Custom integrations', 'On-premise option'],
    limitations: []
  },
]

export default function BillingPage() {
  const { showToast } = useToast()
  const [currentPlan, setCurrentPlan] = useState('pro')
  const [loading, setLoading] = useState(false)

  const handleUpgrade = (planId: string) => {
    setLoading(true)
    setTimeout(() => {
      setCurrentPlan(planId)
      setLoading(false)
      showToast(`Upgraded to ${planId} plan!`, 'success')
    }, 1000)
  }

  return (
    <div className=\"p-8\">
      {/* Header */}
      <div className=\"mb-8\">
        <h1 className=\"text-3xl font-bold mb-2\">Billing & Plans</h1>
        <p className=\"text-gray-400\">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className=\"glass rounded-2xl p-6 mb-8\">
        <div className=\"flex items-center justify-between\">
          <div className=\"flex items-center gap-4\">
            <div className=\"w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center\">
              <Zap size={24} />
            </div>
            <div>
              <p className=\"text-sm text-gray-400\">Current Plan</p>
              <p className=\"text-2xl font-bold capitalize\">{currentPlan}</p>
            </div>
          </div>
          <div className=\"text-right\">
            <p className=\"text-2xl font-bold\">${plans.find(p => p.id === currentPlan)?.price}<span className=\"text-sm font-normal text-gray-500\">/mo</span></p>
            <p className=\"text-sm text-gray-500\">Next billing date: Jun 26, 2026</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className=\"glass rounded-2xl p-6 mb-8\">
        <h2 className=\"text-lg font-semibold mb-4\">Payment Method</h2>
        <div className=\"flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10\">
          <div className=\"w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-xs font-bold text-white\">
            VISA
          </div>
          <div className=\"flex-1\">
            <p className=\"font-medium\">•••• •••• •••• 4242</p>
            <p className=\"text-sm text-gray-500\">Expires 12/27</p>
          </div>
          <button className=\"text-sm text-purple-400 hover:text-purple-300\">Update</button>
        </div>
      </div>

      {/* Available Plans */}
      <h2 className=\"text-xl font-semibold mb-4\">Available Plans</h2>
      <div className=\"grid md:grid-cols-2 lg:grid-cols-4 gap-4\">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass rounded-2xl p-6 relative ${
              plan.id === currentPlan ? 'border-2 border-purple-500' : ''
            }`}
          >
            {plan.id === currentPlan && (
              <div className=\"absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 rounded-full text-xs font-semibold\">
                Current
              </div>
            )}
            
            <h3 className=\"text-lg font-semibold mb-2\">{plan.name}</h3>
            <p className=\"text-3xl font-bold mb-4\">
              ${plan.price}<span className=\"text-sm font-normal text-gray-500\">/mo</span>
            </p>
            
            <ul className=\"space-y-2 mb-6\">
              {plan.features.map((feature, i) => (
                <li key={i} className=\"flex items-center gap-2 text-sm\">
                  <Check size={16} className=\"text-green-400\" />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.id === currentPlan ? (
              <button
                disabled
                className=\"w-full py-2.5 bg-white/10 rounded-xl font-semibold cursor-default\"
              >
                Current Plan
              </button>
            ) : plan.price > 0 ? (
              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading}
                className=\"w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50\"
              >
                {loading ? 'Upgrading...' : 'Upgrade'}
              </button>
            ) : (
              <button
                disabled
                className=\"w-full py-2.5 glass rounded-xl font-semibold cursor-not-allowed\"
              >
                Free Forever
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Usage This Period */}
      <div className=\"mt-8 glass rounded-2xl p-6\">
        <h2 className=\"text-lg font-semibold mb-4\">Usage This Period</h2>
        <div className=\"grid grid-cols-3 gap-6\">
          <div>
            <div className=\"flex items-center justify-between mb-2\">
              <span className=\"text-sm text-gray-400\">Messages</span>
              <span className=\"text-sm\">4,523 / 10,000</span>
            </div>
            <div className=\"h-2 bg-white/10 rounded-full overflow-hidden\">
              <div className=\"h-full w-[45%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full\" />
            </div>
          </div>
          <div>
            <div className=\"flex items-center justify-between mb-2\">
              <span className=\"text-sm text-gray-400\">Tokens</span>
              <span className=\"text-sm\">142K / 1M</span>
            </div>
            <div className=\"h-2 bg-white/10 rounded-full overflow-hidden\">
              <div className=\"h-full w-[14%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full\" />
            </div>
          </div>
          <div>
            <div className=\"flex items-center justify-between mb-2\">
              <span className=\"text-sm text-gray-400\">Workspaces</span>
              <span className=\"text-sm\">3 / Unlimited</span>
            </div>
            <div className=\"h-2 bg-white/10 rounded-full overflow-hidden\">
              <div className=\"h-full w-[100%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full\" />
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className=\"mt-8 glass rounded-2xl overflow-hidden\">
        <div className=\"p-4 border-b border-white/5\">
          <h2 className=\"font-semibold\">Billing History</h2>
        </div>
        <div className=\"divide-y divide-white/5\">
          {[
            { date: 'May 26, 2026', amount: '$19.00', status: 'Paid' },
            { date: 'Apr 26, 2026', amount: '$19.00', status: 'Paid' },
            { date: 'Mar 26, 2026', amount: '$19.00', status: 'Paid' },
          ].map((item, i) => (
            <div key={i} className=\"p-4 flex items-center justify-between\">
              <div>
                <p className=\"font-medium\">Pro Plan - Monthly</p>
                <p className=\"text-sm text-gray-500\">{item.date}</p>
              </div>
              <div className=\"flex items-center gap-4\">
                <span className=\"font-medium\">{item.amount}</span>
                <span className=\"text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400\">{item.status}</span>
                <button className=\"text-sm text-purple-400 hover:text-purple-300\">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}