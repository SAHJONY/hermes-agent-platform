import Link from 'next/link'
import { 
  Bot, 
  Key, 
  Users, 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  Code,
  ArrowRight,
  CheckCircle,
  Star,
  ChevronDown,
  Play
} from 'lucide-react'

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-black text-lg">
              H
            </div>
            <span className="font-semibold text-lg tracking-tight">Hermes</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary text-sm px-6 py-2.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full impact */}
      <section className="relative pt-32 pb-40 px-6 overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-black to-black pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm text-blue-400 mb-8">
            <Zap size={14} />
            Now with GPT-4o & Claude 3.5 Support
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Configure Your Own AI
            <span className="block text-4xl md:text-5xl text-gray-500 mt-2">Agent Platform</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Build custom AI agents with your own API keys. Collaborate with your team. 
            Deploy intelligent assistants that work exactly how you need them.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/register" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all">
              Start Free Trial
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center gap-3 px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all">
              <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                <Play size={16} className="ml-0.5" />
              </div>
              <span className="font-medium">Watch Demo</span>
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              Cancel anytime
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-gray-500" />
        </div>
      </section>

      {/* Logos/Social Proof */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-gray-500 mb-8">Trusted by teams at</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {['TechCorp', 'InnovateCo', 'DataFlow', 'CloudBase', 'AIVentures'].map((company) => (
              <span key={company} className="text-xl font-semibold text-gray-600">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Visual cards */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for AI Agents</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to build, deploy, and manage intelligent AI agents
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Key size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bring Your Own Keys</h3>
              <p className="text-gray-400 leading-relaxed">
                Use your OpenAI, Anthropic, or custom API keys. Full control over models, parameters, and spending.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Personas</h3>
              <p className="text-gray-400 leading-relaxed">
                Configure agent personalities, behaviors, tools, and capabilities to fit your exact needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-gray-400 leading-relaxed">
                Share workspaces, track usage, manage permissions, and collaborate with your team in real-time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Extensible Tools</h3>
              <p className="text-gray-400 leading-relaxed">
                Web search, code execution, API integrations, file handling, and custom plugins.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Usage Analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Track messages, tokens, costs, and performance. Understand how your agents perform.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure by Design</h3>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade security. API keys encrypted. Your data stays yours. SSO supported.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">10K+</p>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">50M+</p>
              <p className="text-gray-400">Messages Processed</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">99.9%</p>
              <p className="text-gray-400">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">4.9/5</p>
              <p className="text-gray-400">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Get started in minutes, not hours</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-3">Create Account</h3>
              <p className="text-gray-400">Sign up in seconds with email or OAuth. No credit card required.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-3">Add Your API Key</h3>
              <p className="text-gray-400">Connect your OpenAI, Anthropic, or other provider API keys securely.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-3">Build & Deploy</h3>
              <p className="text-gray-400">Create custom agents, test them, and deploy to production instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">Start free, upgrade when you need more power</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-400">Free</h3>
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Globe size={18} className="text-gray-400" />
                </div>
              </div>
              <div className="text-5xl font-bold mb-6">$0<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['3 workspaces', '100 messages/mo', 'Basic agents', 'Community support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle size={16} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block w-full text-center py-3 border border-white/20 rounded-xl font-medium hover:bg-white/5 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Starter Tier - Featured */}
            <div className="relative p-8 bg-neutral-900 border-2 border-blue-500 rounded-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-600 rounded-full text-xs font-semibold">
                Most Popular
              </div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-blue-400">Starter</h3>
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Zap size={18} className="text-blue-400" />
                </div>
              </div>
              <div className="text-5xl font-bold mb-6">$29<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['10 workspaces', '10,000 messages/mo', 'Advanced agents', 'API access', 'Priority support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle size={16} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register?plan=starter" className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-400">Pro</h3>
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Code size={18} className="text-gray-400" />
                </div>
              </div>
              <div className="text-5xl font-bold mb-6">$99<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Unlimited workspaces', '100,000 messages/mo', 'Team collaboration', 'Custom agents', 'SSO & advanced security', 'Dedicated support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle size={16} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register?plan=pro" className="block w-full text-center py-3 border border-white/20 rounded-xl font-medium hover:bg-white/5 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Teams</h2>
            <p className="text-xl text-gray-400">See what our users are saying</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Chen', role: 'CTO at TechCorp', content: 'Hermes transformed how we build internal tools. Our team ships AI features twice as fast.' },
              { name: 'Mike Johnson', role: 'Product Lead', content: 'The best AI agent platform I have used. Clean API, great docs, and amazing performance.' },
              { name: 'Emma Wilson', role: 'AI Engineer', content: 'Finally a platform that gives you full control. Bring your own keys, build custom agents.' },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 bg-neutral-900/50 border border-white/5 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-semibold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of teams already building AI agents with Hermes
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all">
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/demo" className="px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all font-medium">
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-black text-lg">
                H
              </div>
              <span className="font-semibold text-lg">Hermes Platform</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            </div>
            <p className="text-sm text-gray-500">© 2024 Hermes Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}