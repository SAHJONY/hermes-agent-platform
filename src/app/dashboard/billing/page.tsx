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
    period: '',
    description: 'For large organizations',
    features: ['Unlimited everything', 'Custom integrations', 'SLA guarantee', 'Dedicated account manager', 'On-premise deployment'],
  },
]

export default function BillingPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Billing</h1>
        <p className="text-gray-400 text-sm">Manage your subscription and payment methods</p>
      </div>

      {/* Current usage */}
      <div className="tesla-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Current Usage</h2>
          <span className="tesla-badge">Starter Plan</span>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-gray-400">4,523 / 10,000 messages</span>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-semibold">$0.00</p>
            <p className="text-xs text-gray-500 mt-1">This Month</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">$29.00</p>
            <p className="text-xs text-gray-500 mt-1">Next Invoice</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">15</p>
            <p className="text-xs text-gray-500 mt-1">Days Until Renewal</p>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="tesla-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <button className="text-sm text-gray-400 hover:text-white transition-colors">Update</button>
        </div>
        <div className="flex items-center gap-4 p-4 bg-neutral-900 rounded-lg">
          <div className="w-12 h-8 bg-neutral-800 rounded flex items-center justify-center">
            <CreditCard size={18} className="text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-sm">Visa ending in 4242</p>
            <p className="text-xs text-gray-500">Expires 12/25</p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-6">Available Plans</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className={`tesla-pricing-card ${plan.popular ? 'featured' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-blue-600 rounded-full text-xs font-medium">
                  Popular
                </div>
              )}
              {plan.current && (
                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-green-600 rounded-full text-xs font-medium">
                  Current
                </div>
              )}
              <div className="pt-2">
                <h3 className="text-base font-semibold text-gray-400 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-xs text-gray-500 mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-gray-500" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <button className="w-full py-2.5 bg-neutral-800 rounded-lg text-sm font-medium cursor-default">
                    Current Plan
                  </button>
                ) : plan.name === 'Enterprise' ? (
                  <button className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors">
                    Contact Sales
                  </button>
                ) : (
                  <button className="w-full py-2.5 bg-white text-black hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                    {plan.popular ? 'Upgrade' : 'Select'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing history */}
      <div className="tesla-card">
        <h2 className="text-lg font-semibold mb-6">Billing History</h2>
        <div className="space-y-3">
          {[
            { date: 'Mar 15, 2024', amount: '$29.00', status: 'Paid' },
            { date: 'Feb 15, 2024', amount: '$29.00', status: 'Paid' },
            { date: 'Jan 15, 2024', amount: '$29.00', status: 'Paid' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
              <div>
                <p className="font-medium text-sm">{item.date}</p>
                <p className="text-xs text-gray-500">Starter Plan</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">{item.amount}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.status === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {item.status}
                </span>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}