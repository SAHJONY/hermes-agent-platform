'use client'

import { useState } from 'react'
import { CreditCard, Check, Zap, Crown, Building } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['3 workspaces', '100 messages/month', 'Basic agents', 'Community support'],
    current: true,
  },
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'For individual developers',
    features: ['10 workspaces', '10,000 messages/month', 'Advanced agents', 'API access', 'Priority support'],
    popular: true,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'For teams and businesses',
    features: ['Unlimited workspaces', '100,000 messages/month', 'Team collaboration', 'Custom agents', 'SSO & advanced security', 'Dedicated support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations',
    features: ['Unlimited everything', 'Custom SLAs', 'On-premise deployment', 'Advanced analytics', 'Dedicated account manager'],
  },
]

export default function BillingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Billing</h1>
        <p className="text-gray-400">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">Current Plan</h2>
            <p className="text-2xl font-bold">Starter <span className="text-sm font-normal text-gray-500">$29/month</span></p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Upgrade Plan
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Messages used</span>
                <span>4,523 / 10,000</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Resets in 15 days</p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={() => setBillingPeriod('monthly')}
          className={`px-6 py-2 rounded-xl font-medium transition-colors ${
            billingPeriod === 'monthly' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingPeriod('yearly')}
          className={`px-6 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
            billingPeriod === 'yearly' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          Yearly
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Save 20%</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass rounded-2xl p-6 relative ${
              plan.popular ? 'border-purple-500/50' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-xs font-semibold">
                Most Popular
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                Current
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-xl font-semibold transition-opacity ${
                plan.current
                  ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                  : plan.name === 'Enterprise'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Payment Methods</h2>
          <button className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300">
            <CreditCard size={16} />
            Add Card
          </button>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
          <div className="flex-1">
            <p className="font-medium">•••• •••• •••• 4242</p>
            <p className="text-sm text-gray-500">Expires 12/25</p>
          </div>
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Default</span>
        </div>
      </div>
    </div>
  )
}
