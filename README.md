# 🚀 DevFlow - The Complete Freelancer Business OS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **From Idea to Invoice - All in One Platform**  
> The only tool freelancers and developers need to capture ideas, manage projects, nurture client relationships, and grow revenue.


## ✨ Why DevFlow?

As a freelancer, you've probably experienced this:
- 💡 Brilliant ideas strike while coding but get forgotten
- 📊 Juggling 10+ different tools (Notion, Trello, HubSpot, QuickBooks...)
- 😤 Clients going silent mid-project with no tracking
- 💸 Manual invoicing and chasing payments
- 🔄 Constant context switching between projects

**DevFlow solves all of this in one beautiful, developer-focused platform.**

## 🎯 Key Features

### 💡 Intelligent Idea Capture
- **Lightning-fast capture** - Global hotkeys work anywhere (Cmd+I)
- **Voice-to-text** with auto-categorization
- **Screenshot annotations** for UI inspirations
- **AI-powered connections** between ideas and projects
- **Zero disruption** to your coding flow

### 🤝 Professional CRM
- **Client relationship timeline** with all interactions
- **Visual sales pipeline** with drag-and-drop deals
- **Communication tracking** across all channels
- **Client health scores** and behavior insights
- **Automated follow-up sequences**

### 📋 Smart Project Management
- **Context switching mastery** - Resume any project instantly
- **Client-linked projects** with full communication history
- **AI-powered insights** and recommendations
- **Progress tracking** with automated reporting
- **Seamless project handoffs**

### 💰 Revenue Growth Tools
- **Professional proposal builder** with templates
- **Automated invoicing** and payment tracking
- **Revenue analytics** and forecasting
- **Client lifetime value** calculations
- **Overdue payment management**

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: GSAP for smooth micro-interactions
- **Backend**: Supabase (Auth + Database + Storage) + FastAPI
- **Payments**: Stripe integration 
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier works great)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cygon23/DevFlow_CRM.git
   cd DevFlow_CRM.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database setup**
   ```bash
   # Run the SQL scripts in /database folder in Supabase SQL editor
   # Or use the migration files
   npm run db:migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Visit `http://localhost:3000` and start building your freelance empire! 🎉

## 📁 Project Structure
but these chnages as project grows so keep in midn and use command 'tree' to discover

```
devflow/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── forms/          # Form components
│   │   └── charts/         # Data visualization
│   ├── pages/              # Application pages
│   │   ├── dashboard/      # Dashboard and analytics
│   │   ├── projects/       # Project management
│   │   ├── clients/        # CRM featuress
│   │   └── proposals/      # Proposal builder
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and configurations
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and themes
├── database/               # Database schemas and migrations
├── docs/                   # Documentation
└── public/                 # Static assets
```

## 🎨 Design System

DevFlow uses a carefully crafted design system inspired by modern developer tools:

- **Dark-first theme** with light mode support
- **Purple/Indigo gradients** (#6366f1, #8b5cf6)
- **Glassmorphism effects** for depth and elegance
- **Smooth GSAP animations** for premium feel
- **Mobile-responsive** design for all devices

## 📊 Features Roadmap

- [x] Core project management(UI)- complete 80%
- [x] Idea capture system
- [x] Client CRM basics
- [x] Beautiful UI with animations
- [ ] AI-powered insights (v2.0)
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API for integrations
- [ ] White-label solutions

## 🤝 Contributing

We love contributions! Whether you're fixing bugs, adding features, or improving documentation, your help makes DevFlow better for everyone.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines

- Use TypeScript for type safety
- Follow the existing code style and patterns
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📈 Performance & Analytics

DevFlow is built for performance:
- **< 2s initial load time**
- **Optimistic UI updates** for instant feedback
- **Offline-first approach** with data sync
- **Bundle size optimization** with code splitting
- **SEO optimized** for discoverability

## 🔒 Security & Privacy

Your data security is our priority:
- **End-to-end encryption** for sensitive data
- **SOC 2 compliant** infrastructure (Supabase)
- **GDPR compliant** with data export/deletion
- **Regular security audits** and updates
- **No data selling** - ever.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support & Community

- 📧 **Email**: godfreymuganyizi45@gmail.com
- 💬 **Discord**: [Join our community](https://discord.gg/cygon24)
-

## 🌟 Show Your Support

If DevFlow helps you build a better freelance business, please:
- ⭐ Star this repository
- 🐦 Share it on Twitter
- 🗣 Tell your developer friends
- 🤝 Contribute to the project

## 🎉 Sponsors & Backers

DevFlow is an open-source project made possible by amazing sponsors and backers. 

[Become a sponsor](https://github.com/sponsors/yourusername) and get your logo here!

---

**Built with ❤️ by freelancers, for freelancers.**

*Stop juggling tools. Start building your empire.*