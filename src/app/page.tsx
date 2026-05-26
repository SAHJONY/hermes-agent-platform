import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Tesla-style Navigation - Minimal, transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 tesla-nav">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-black text-sm">
              H
            </div>
            <span className="font-semibold text-base tracking-tight">Hermes</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean, bold typography */}
      <section className="tesla-section pt-40 pb-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Configure Your Own AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
            Bring your own API keys. Build custom agents. Collaborate with your team. 
            Deploy AI that works exactly how you need it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-base px-8 py-4">
              Start Free
            </Link>
            <Link href="/demo" className="btn-ghost text-base px-8 py-4">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Grid, minimal cards */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            Built for AI Agents
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="tesla-feature-card">
              <div className="text-3xl mb-6">🔑</div>
              <h3 className="text-xl font-semibold mb-3">Bring Your Own Keys</h3>
              <p className="text-gray-400 leading-relaxed">
                Use your OpenAI, Anthropic, or custom API keys. Full control over models and spending.
              </p>
            </div>

            <div className="tesla-feature-card">
              <div className="text-3xl mb-6">🎭</div>
              <h3 className="text-xl font-semibold mb-3">Custom Personas</h3>
              <p className="text-gray-400 leading-relaxed">
                Configure agent personalities, behaviors, and capabilities to fit your exact needs.
              </p>
            </div>

            <div className="tesla-feature-card">
              <div className="text-3xl mb-6">👥</div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-gray-400 leading-relaxed">
                Share workspaces, track usage, and collaborate with your team in real-time.
              </p>
            </div>

            <div className="tesla-feature-card">
              <div className="text-3xl mb-6">🧩</div>
              <h3 className="text-xl font-semibold mb-3">Extensible Tools</h3>
              <p className="text-gray-400 leading-relaxed">
                Web search, code execution, API integrations, and custom plugins.
              </p>
            </div>

            <div className="tesla-feature-card">
              <div className="text-3xl mb-6">📊</div>
              <h3 className="text-xl font-semibold mb-3">Usage Analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Track messages, tokens, and costs. Understand how your agents perform.
              </p>
            </div>

            <div className="tesla-feature-card">
              <div className="text-3xl mb-6">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Secure by Design</h3>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade security. Your API keys are encrypted. Your data stays yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Tesla minimal cards */}
      <section className="py-32 px-8 bg-neutral-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Start free, upgrade when you need more power
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="tesla-pricing-card">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Free</h3>
              <div className="text-4xl font-bold mb-6">$0</div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> 3 workspaces
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> 100 messages/mo
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> Basic agents
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> Community support
                </li>
              </ul>
              <Link href="/register" className="btn-ghost w-full text-center block py-3">
                Get Started
              </Link>
            </div>

            {/* Starter Tier - Featured */}
            <div className="tesla-pricing-card featured relative">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> 10 workspaces
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> 10,000 messages/mo
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> Advanced agents
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> API access
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> Priority support
                </li>
              </ul>
              <Link href="/register?plan=starter" className="btn-cta w-full text-center block py-3">
                Start Free Trial
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="tesla-pricing-card">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">$99<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> Unlimited workspaces
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> 100,000 messages/mo
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> Team collaboration
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> Custom agents
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> SSO & advanced security
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-400">✓</span> Dedicated support
                </li>
              </ul>
              <Link href="/register?plan=pro" className="btn-ghost w-full text-center block py-3">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-16 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-black text-sm">
              H
            </div>
            <span className="font-semibold">Hermes Platform</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-400">
            <span>© 2024 Hermes Platform</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}