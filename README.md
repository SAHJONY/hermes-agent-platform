# Hermes Agent Platform

**Configure your own AI. Build powerful agents. Collaborate with your team.**

The ultimate AI agent platform where users bring their own API keys, configure custom personas, collaborate with teams, and deploy extensible AI agents.

## 🚀 Features

- 🔑 **Bring Your Own API Keys** - Use OpenAI, Anthropic, or custom providers
- 🎭 **Custom Personas** - Configure agent personalities and behaviors
- 👥 **Team Collaboration** - Share workspaces and track usage together
- 🧩 **Extensible Tools** - Web search, code execution, API integrations
- 📊 **Usage Analytics** - Track messages, tokens, and costs
- 🔒 **Enterprise Security** - Encrypted API keys, your data stays yours

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** SQLite with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **State Management:** Zustand

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. **Clone and install dependencies:**
```bash
cd hermes-agent-platform
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:
```env
DATABASE_URL=file:./dev.db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

Generate a secret with:
```bash
openssl rand -base64 32
```

3. **Initialize the database:**
```bash
npm run db:push
npm run db:generate
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

The platform supports multiple authentication methods:

- **Credentials** - Email and password
- **GitHub OAuth** - Sign in with GitHub
- **Google OAuth** - Sign in with Google

Configure OAuth providers in `.env.local`:
```env
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

## 🏗️ Project Structure

```
hermes-agent-platform/
├── prisma/
│   └── schema.prisma     # Database schema
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── (auth)/       # Auth pages (login, register)
│   │   └── (dashboard)/  # Protected dashboard pages
│   ├── components/       # React components
│   │   ├── ui/           # Base UI components
│   │   └── providers/    # Context providers
│   └── lib/              # Utilities and helpers
├── .env.example          # Environment template
└── package.json
```

## 📝 API Keys Management

Users can add their own API keys in the dashboard:

1. Go to Settings → API Keys
2. Click \"Add New Key\"
3. Enter a name and your API key
4. Keys are encrypted and stored securely

Supported providers:
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Custom endpoints

## 👥 Teams

Create teams to collaborate:

1. Go to Settings → Teams
2. Click \"Create Team\"
3. Invite members by email
4. Share workspaces with your team

## 📊 Pricing Plans

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Workspaces | 3 | Unlimited | Unlimited |
| Messages/mo | 100 | 10,000 | Unlimited |
| Team members | - | ✓ | ✓ |
| Analytics | Basic | Advanced | Advanced |
| Support | - | Priority | Dedicated |

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the project:
```bash
npm run build
npm start
```

## 📄 License

MIT License - see LICENSE file for details.

---

Built with precision for the AI era.