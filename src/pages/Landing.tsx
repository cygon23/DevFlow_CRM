import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Target, 
  Users, 
  BarChart3, 
  Lightbulb, 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Rocket,
  Shield,
  TrendingUp,
  FileText,
  Receipt,
  MessageCircle,
  Clock,
  Star,
  DollarSign,
  Brain,
  Play,
  Github,
  Mail
} from 'lucide-react';

const Landing = () => {
  const [activeTab, setActiveTab] = useState('capture');

  const features = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Instant Idea Capture",
      description: "Never lose a breakthrough moment. Voice recordings, screenshots, and smart categorization keep your creativity flowing."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Complete Client Management", 
      description: "From first contact to final invoice. Track relationships, communications, and project history in one unified CRM."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Visual Sales Pipeline",
      description: "Drag-and-drop deals through stages. See your revenue pipeline at a glance with AI-powered insights."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Professional Proposals",
      description: "Create stunning proposals with templates, real-time collaboration, and engagement tracking."
    },
    {
      icon: <Receipt className="w-6 h-6" />,
      title: "Smart Invoicing",
      description: "Automated invoicing, payment tracking, and financial reporting. Get paid faster with less effort."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Business Insights",
      description: "Discover opportunities, predict project risks, and optimize your workflow with intelligent recommendations."
    }
  ];

  const workflows = [
    {
      id: 'capture',
      title: 'Capture Ideas',
      description: 'From inspiration to implementation',
      steps: [
        'Voice record idea while coding',
        'AI categorizes and tags automatically', 
        'Connect to existing clients/projects',
        'Transform ideas into opportunities'
      ]
    },
    {
      id: 'pipeline',
      title: 'Manage Pipeline',
      description: 'From lead to loyal client',
      steps: [
        'Add leads from multiple sources',
        'Move through qualification stages',
        'Send proposals with one click',
        'Close deals and create projects'
      ]
    },
    {
      id: 'deliver',
      title: 'Deliver & Invoice',
      description: 'From project to payment',
      steps: [
        'Manage projects with client context',
        'Track milestones and communications',
        'Generate invoices automatically',
        'Receive payments faster'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Developer',
      company: 'SarahCodes.dev',
      avatar: 'SC',
      quote: 'DevFlow transformed my chaotic workflow into a streamlined business. I\'ve increased revenue by 40% in just 3 months.',
      revenue: '+40% revenue',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez', 
      role: 'Agency Owner',
      company: 'PixelCraft Studio',
      avatar: 'MR',
      quote: 'Managing 15+ clients used to be overwhelming. Now I can focus on creative work while DevFlow handles the business side.',
      revenue: '15+ clients',
      rating: 5
    },
    {
      name: 'Elena Petrov',
      role: 'Technical Consultant',
      company: 'TechConsult Pro',
      avatar: 'EP', 
      quote: 'The AI insights are incredible. It suggested client opportunities I would have never noticed on my own.',
      revenue: '+25% upsells',
      rating: 5
    }
  ];

  const pricing = [
    {
      name: "Solo Creator",
      price: "$19",
      period: "/month",
      description: "Perfect for freelancers just starting their business",
      features: [
        "Up to 5 active clients",
        "Unlimited idea capture", 
        "Basic CRM features",
        "Standard proposal templates",
        "Email support",
        "Mobile app access"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional", 
      price: "$49",
      period: "/month",
      description: "Ideal for established freelancers and small agencies",
      features: [
        "Unlimited clients & projects",
        "Advanced sales pipeline",
        "Custom proposal builder",
        "Automated invoicing & payments",
        "AI insights & recommendations", 
        "Priority support",
        "Team collaboration (up to 3)"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Business",
      price: "$99",
      period: "/month",
      description: "For growing agencies and development teams",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "White-label client portal",
        "Advanced reporting & analytics",
        "Custom integrations & API",
        "Dedicated account manager",
        "Custom training & onboarding"
      ],
      popular: false,
      cta: "Start Free Trial"
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '$2.4M+', label: 'Revenue Generated' },
    { number: '40%', label: 'Avg. Revenue Increase' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DevFlow CRM
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="gradient-primary text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
              <Rocket className="w-4 h-4 mr-2" />
              Your Complete Freelance Business OS
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in">
              From Idea to Invoice
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse-glow">
                All in One Platform
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up">
              Stop juggling 10+ tools. DevFlow combines idea capture, client management, project tracking, 
              and invoicing into one beautiful platform that grows your freelance business.
            </p>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 animate-slide-up">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/register">
                <Button size="lg" className="px-8 py-4 text-lg gradient-primary text-white hover-scale">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg hover-scale">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo (2 min)
              </Button>
            </div>

            {/* Product Preview */}
            <div className="relative max-w-6xl mx-auto animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20 bg-gradient-to-br from-surface/80 to-background/60 backdrop-blur-sm">
                <div className="bg-surface/50 backdrop-blur-sm border-b border-border/40 p-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="ml-4 text-sm text-muted-foreground">DevFlow CRM Dashboard</div>
                </div>
                
                <div className="p-8 min-h-[500px] grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Dashboard Preview */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Good morning, Sarah</h3>
                      <Badge className="bg-primary/10 text-primary">$12,450 this month</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Card className="p-4 bg-primary/5 border-primary/20">
                        <div className="text-sm text-muted-foreground">Active Projects</div>
                        <div className="text-2xl font-bold text-primary">8</div>
                      </Card>
                      <Card className="p-4 bg-secondary/5 border-secondary/20">
                        <div className="text-sm text-muted-foreground">Ideas Captured</div>
                        <div className="text-2xl font-bold text-secondary">23</div>
                      </Card>
                      <Card className="p-4 bg-accent-success/5 border-accent-success/20">
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="text-2xl font-bold text-accent-success">$12.4K</div>
                      </Card>
                    </div>
                  </div>
                  
                  {/* AI Insights Panel */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium">AI Insights</span>
                    </div>
                    <Card className="p-4 border-secondary/20 bg-secondary/5">
                      <div className="text-sm font-medium mb-2">Revenue Opportunity</div>
                      <div className="text-xs text-muted-foreground">Client "TechCorp" is ready for upsell based on usage patterns</div>
                      <Button size="sm" className="mt-3 text-xs">Explore</Button>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
              Stop Losing Money on Tool Chaos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The average freelancer uses 12+ different tools, losing 2+ hours daily switching between them. 
              That's $20,000+ in lost productivity per year.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Before - Tool Chaos */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-accent-danger mb-6">The Old Way: Tool Juggling</h3>
              <div className="space-y-4">
                {[
                  { tool: 'Notion + Evernote', problem: 'Ideas scattered everywhere' },
                  { tool: 'Trello + Asana', problem: 'Project chaos across platforms' },
                  { tool: 'HubSpot + Contacts', problem: 'Client data fragmentation' },
                  { tool: 'QuickBooks + PayPal', problem: 'Manual invoice tracking' },
                  { tool: '8 more tools...', problem: 'Context switching nightmare' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-accent-danger/5 border border-accent-danger/20 rounded-lg">
                    <div className="w-2 h-2 bg-accent-danger rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium text-accent-danger text-sm">{item.tool}</div>
                      <div className="text-xs text-muted-foreground">{item.problem}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-accent-danger/10 border border-accent-danger/30 rounded-lg">
                <div className="text-accent-danger font-semibold">Result: Lost revenue, missed opportunities, client churn</div>
              </div>
            </div>

            {/* After - DevFlow Solution */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-accent-success mb-6">The DevFlow Way: Unified Platform</h3>
              <div className="space-y-4">
                {[
                  { feature: 'Instant Idea Capture', benefit: 'Never lose a $50K idea again' },
                  { feature: 'Unified Project Management', benefit: 'All context in one place' },
                  { feature: 'Complete CRM System', benefit: '3x better client retention' },
                  { feature: 'Automated Invoicing', benefit: 'Get paid 40% faster' },
                  { feature: 'AI-Powered Insights', benefit: 'Discover hidden opportunities' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-accent-success/5 border border-accent-success/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent-success" />
                    <div className="flex-1">
                      <div className="font-medium text-accent-success text-sm">{item.feature}</div>
                      <div className="text-xs text-muted-foreground">{item.benefit}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-accent-success/10 border border-accent-success/30 rounded-lg">
                <div className="text-accent-success font-semibold">Result: 40% revenue increase, happier clients, more free time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See DevFlow in Action</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow a complete workflow from capturing your first idea to receiving payment
            </p>
          </div>

          {/* Workflow Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 p-2 bg-surface/50 rounded-lg">
              {workflows.map((workflow) => (
                <button
                  key={workflow.id}
                  onClick={() => setActiveTab(workflow.id)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === workflow.id 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                  }`}
                >
                  {workflow.title}
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Content */}
          <div className="max-w-4xl mx-auto">
            {workflows.map((workflow) => (
              <div key={workflow.id} className={`${activeTab === workflow.id ? 'block' : 'hidden'} animate-fade-in`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{workflow.title}</h3>
                  <p className="text-muted-foreground">{workflow.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {workflow.steps.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-center text-muted-foreground">{step}</p>
                      
                      {index < workflow.steps.length - 1 && (
                        <ArrowRight className="hidden md:block absolute top-6 -right-3 w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed specifically for freelancers and creative professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-surface/50 backdrop-blur-sm border-border/40 hover:border-primary/20 transition-all duration-300 group hover-scale">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Join 10,000+ Successful Freelancers</h2>
            <p className="text-xl text-muted-foreground">
              See how DevFlow has transformed businesses just like yours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-surface/50 backdrop-blur-sm border-border/40">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                
                <Badge className="bg-accent-success/10 text-accent-success border-accent-success/20">
                  {testimonial.revenue}
                </Badge>
              </Card>
            ))}
          </div>

          {/* Company Logos */}
          <div className="text-center">
            <p className="text-muted-foreground mb-8">Trusted by freelancers working with</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Google', 'Microsoft', 'Shopify', 'Stripe', 'Figma', 'GitHub'].map((company) => (
                <div key={company} className="text-2xl font-bold">{company}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Investment That Pays for Itself</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that matches your business goals. All plans include a 14-day free trial.
            </p>
            
            {/* ROI Calculator Teaser */}
            <div className="inline-flex items-center space-x-2 bg-accent-success/10 border border-accent-success/20 rounded-lg px-4 py-2 text-accent-success">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Average users save $2,400/month in tool costs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <Card key={index} className={`relative p-8 ${plan.popular ? 'ring-2 ring-primary bg-gradient-to-b from-primary/5 to-secondary/5 scale-105' : 'bg-surface/50'} backdrop-blur-sm border-border/40 hover-scale`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  
                  <Button className={`w-full mb-6 ${plan.popular ? 'gradient-primary text-white' : ''}`}>
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-accent-success mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-surface/50 border border-border/40 rounded-lg px-6 py-3">
              <Shield className="w-5 h-5 text-accent-success" />
              <span className="text-sm">30-day money-back guarantee • Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Freelance Business?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers and agencies already using DevFlow to capture more ideas, 
            close more deals, and grow their revenue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/register">
              <Button size="lg" className="px-8 py-4 text-lg gradient-primary text-white hover-scale">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg hover-scale">
              <MessageCircle className="w-5 h-5 mr-2" />
              Talk to Sales
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required • 14-day free trial • Setup in under 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-surface/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DevFlow CRM
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                The complete business platform for freelancers and creative professionals. 
                From idea capture to final invoice, we've got you covered.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 DevFlow CRM. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;