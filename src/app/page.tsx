import Link from 'next/link'

export default function HomePage() {
  return (
    <main className=\"min-h-screen\">
      {/* Navigation */}
      <nav className=\"fixed top-0 left-0 right-0 z-50 glass\">
        <div className=\"max-w-7xl mx-auto px-6 py-4 flex items-center justify-between\">
          <div className=\"flex items-center gap-3\">
            <div className=\"w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-xl\">
              H
            </div>
            <span className=\"font-bold text-xl\">Hermes Platform</span>
          </div>
          <div className=\"flex items-center gap-4\">
            <Link href=\"/login\" className=\"px-4 py-2 text-sm font-medium hover:text-purple-400 transition-colors\">
              Sign In
            </Link>
            <Link href=\"/register\" className=\"px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity\">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className=\"relative pt-32 pb-20 px-6\">
        <div className=\"max-w-5xl mx-auto text-center\">
          <div className=\"inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8\">
            <span className=\"w-2 h-2 bg-green-400 rounded-full animate-pulse\"></span>
            <span className=\"text-sm\">Now in Public Beta</span>
          </div>
          
          <h1 className=\"text-5xl md:text-7xl font-bold mb-6\">
            <span className=\"gradient-text\">Configure Your Own AI</span>
            <br />
            <span className=\"text-white\">Build Powerful Agents</span>
          </h1>
          
          <p className=\"text-xl text-gray-400 max-w-2xl mx-auto mb-10\">
            Bring your own API keys. Configure custom personas. Collaborate with your team. 
            Deploy AI agents that work exactly how you need them.
          </p>
          
          <div className=\"flex flex-col sm:flex-row items-center justify-center gap-4\">
            <Link href=\"/register\" className=\"w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2\">
              Start Free
              <span>→</span>
            </Link>
            <Link href=\"/demo\" className=\"w-full sm:w-auto px-8 py-4 glass rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2\">
              Try Demo
            </Link>
          </div>
        </div>

        {/* Floating particles decoration */}
        <div className=\"absolute inset-0 overflow-hidden pointer-events-none -z-10\">
          <div className=\"absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float\"></div>
          <div className=\"absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float\" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className=\"py-20 px-6\">
        <div className=\"max-w-6xl mx-auto\">
          <h2 className=\"text-3xl md:text-4xl font-bold text-center mb-16\">
            Everything You Need to Build with AI
          </h2>
          
          <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-6\">
            {/* Feature 1 */}
            <div className=\"glass rounded-2xl p-6 hover:bg-white/5 transition-colors group\">
              <div className=\"w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform\">
                <span className=\"text-2xl\">🔑</span>
              </div>
              <h3 className=\"text-xl font-semibold mb-2\">Bring Your Own Keys</h3>
              <p className=\"text-gray-400\">
                Use your OpenAI, Anthropic, or custom API keys. Full control over your spending and models.
              </p>
            </div>

            {/* Feature 2 */}
            <div className=\"glass rounded-2xl p-6 hover:bg-white/5 transition-colors group\">
              <div className=\"w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform\">
                <span className=\"text-2xl\">🎭</span>
              </div>
              <h3 className=\"text-xl font-semibold mb-2\">Custom Personas</h3>
              <p className=\"text-gray-400\">
                Configure agent personalities, behaviors, and capabilities. Build AI that fits your needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className=\"glass rounded-2xl p-6 hover:bg-white/5 transition-colors group\">
              <div className=\"w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform\">
                <span className=\"text-2xl\">👥</span>
              </div>
              <h3 className=\"text-xl font-semibold mb-2\">Team Collaboration</h3>
              <p className=\"text-gray-400\">
                Share workspaces, track usage, and collaborate with your team in real-time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className=\"glass rounded-2xl p-6 hover:bg-white/5 transition-colors group\">
              <div className=\"w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform\">
                <span className=\"text-2xl\">🧩</span>
              </div>
              <h3 className=\"text-xl font-semibold mb-2\">Extensible Tools</h3>
              <p className=\"text-gray-400\">
                Web search, code execution, API integrations, and custom plugins. Make your agent powerful.
              </p>
            </div>

            {/* Feature 5 */}
            <div className=\"glass rounded-2xl p-6 hover:bg-white/5 transition-colors group\">
              <div className=\"w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform\">
                <span className=\"text-2xl\">📊</span>
              </div>
              <h3 className=\"text-xl font-semibold mb-2\">Usage Analytics</h3>
              <p className=\"text-gray-400\">
                Track messages, tokens, and costs. Understand how your agents are performing.
              </p>
            </div>

            {/* Feature 6 */}
            <div className=\"glass rounded-2xl p-6 hover:bg-white/5 transition-colors group\">
              <div className=\"w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform\">
                <span className=\"text-2xl\">🔒</span>
              </div>
              <h3 className=\"text-xl font-semibold mb-2\">Secure by Design</h3>
              <p className=\"text-gray-400\">
                Enterprise-grade security. Your API keys are encrypted. Your data stays yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className=\"py-20 px-6\">
        <div className=\"max-w-5xl mx-auto\">
          <h2 className=\"text-3xl md:text-4xl font-bold text-center mb-4\">
            Simple, Transparent Pricing
          </h2>
          <p className=\"text-gray-400 text-center mb-12\">
            Start free, upgrade when you need more power
          </p>
          
          <div className=\"grid md:grid-cols-3 gap-6\">
            {/* Free */}
            <div className=\"glass rounded-2xl p-8\">
              <h3 className=\"text-lg font-semibold text-gray-400 mb-2\">Free</h3>
              <div className=\"text-4xl font-bold mb-6\">
                $0<span className=\"text-lg font-normal text-gray-500\">/mo</span>
              </div>
              <ul className=\"space-y-3 mb-8\">
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> 3 workspaces
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> 100 messages/mo
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Basic analytics
                </li>
                <li className=\"flex items-center gap-2 text-gray-500\">
                  <span>✗</span> Team collaboration
                </li>
              </ul>
              <Link href=\"/register\" className=\"block w-full py-3 text-center glass rounded-xl font-semibold hover:bg-white/10 transition-colors\">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className=\"relative glass rounded-2xl p-8 border-2 border-purple-500/50\">
              <div className=\"absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-xs font-semibold\">
                POPULAR
              </div>
              <h3 className=\"text-lg font-semibold text-gray-400 mb-2\">Pro</h3>
              <div className=\"text-4xl font-bold mb-6\">
                $19<span className=\"text-lg font-normal text-gray-500\">/mo</span>
              </div>
              <ul className=\"space-y-3 mb-8\">
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Unlimited workspaces
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> 10,000 messages/mo
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Team collaboration
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Advanced analytics
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Priority support
                </li>
              </ul>
              <Link href=\"/register?plan=pro\" className=\"block w-full py-3 text-center bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity\">
                Start Pro Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className=\"glass rounded-2xl p-8\">
              <h3 className=\"text-lg font-semibold text-gray-400 mb-2\">Enterprise</h3>
              <div className=\"text-4xl font-bold mb-6\">
                $99<span className=\"text-lg font-normal text-gray-500\">/mo</span>
              </div>
              <ul className=\"space-y-3 mb-8\">
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Everything in Pro
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Unlimited messages
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Custom plugins
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> Dedicated support
                </li>
                <li className=\"flex items-center gap-2\">
                  <span className=\"text-green-400\">✓</span> SLA guarantee
                </li>
              </ul>
              <Link href=\"/contact\" className=\"block w-full py-3 text-center glass rounded-xl font-semibold hover:bg-white/10 transition-colors\">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=\"py-12 px-6 border-t border-white/10\">
        <div className=\"max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4\">
          <div className=\"flex items-center gap-3\">
            <div className=\"w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold\">
              H
            </div>
            <span className=\"font-semibold\">Hermes Agent Platform</span>
          </div>
          <p className=\"text-sm text-gray-500\">
            © 2026 Hermes Agent Platform. Built with precision.
          </p>
        </div>
      </footer>
    </main>
  )
}