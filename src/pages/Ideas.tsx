import { useState } from 'react';
import { 
  Lightbulb, 
  Plus, 
  Search,
  Filter,
  Brain,
  Star,
  Clock,
  Tag,
  ArrowRight,
  Zap,
  TrendingUp,
  Link as LinkIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CaptureIdeaModal } from '@/components/modals/CaptureIdeaModal';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: 'raw' | 'development' | 'market-ready' | 'archived';
  tags: string[];
  capturedAt: string;
  maturityScore: number;
  connections: string[];
  aiSuggestion?: string;
  marketOpportunity?: 'high' | 'medium' | 'low';
}

const ideas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Code Review Assistant',
    description: 'An intelligent system that analyzes pull requests and provides contextual feedback, suggests improvements, and catches potential bugs before they reach production.',
    category: 'development',
    tags: ['AI', 'Development', 'Automation'],
    capturedAt: '2 hours ago',
    maturityScore: 75,
    connections: ['2', '4'],
    aiSuggestion: 'Could integrate with existing DevFlow project management',
    marketOpportunity: 'high'
  },
  {
    id: '2', 
    title: 'Real-time Collaboration Whiteboard',
    description: 'Digital whiteboard with real-time collaboration features for remote teams to brainstorm and visualize ideas together.',
    category: 'market-ready',
    tags: ['Collaboration', 'Design', 'Remote Work'],
    capturedAt: '5 hours ago',
    maturityScore: 90,
    connections: ['1', '3'],
    marketOpportunity: 'high'
  },
  {
    id: '3',
    title: 'Smart Project Timeline Generator',
    description: 'AI system that analyzes project requirements and automatically generates realistic timelines based on historical data and team capacity.',
    category: 'raw',
    tags: ['AI', 'Project Management', 'Planning'],
    capturedAt: '1 day ago',
    maturityScore: 40,
    connections: ['2'],
    aiSuggestion: 'Similar to Linear\'s cycle planning feature'
  },
  {
    id: '4',
    title: 'Voice-to-Action Task Creator',
    description: 'Voice interface that converts spoken instructions into actionable tasks with proper categorization and assignment.',
    category: 'development',
    tags: ['Voice', 'AI', 'Productivity'],
    capturedAt: '2 days ago',
    maturityScore: 60,
    connections: ['1'],
    marketOpportunity: 'medium'
  },
  {
    id: '5',
    title: 'Client Communication Intelligence',
    description: 'AI that analyzes client communication patterns and suggests optimal timing and content for follow-ups.',
    category: 'raw',
    tags: ['AI', 'Communication', 'CRM'],
    capturedAt: '3 days ago',
    maturityScore: 35,
    connections: [],
    aiSuggestion: 'High demand in agency management space'
  },
  {
    id: '6',
    title: 'Automated Testing Suite Generator',
    description: 'Tool that analyzes code structure and automatically generates comprehensive test suites with edge case coverage.',
    category: 'market-ready',
    tags: ['Testing', 'Automation', 'Development'],
    capturedAt: '1 week ago',
    maturityScore: 85,
    connections: ['1'],
    marketOpportunity: 'high'
  }
];

const categories = {
  'raw': { label: 'Raw Ideas', color: 'bg-muted', count: ideas.filter(i => i.category === 'raw').length },
  'development': { label: 'In Development', color: 'bg-accent-warning/20 border-accent-warning/30 text-accent-warning', count: ideas.filter(i => i.category === 'development').length },
  'market-ready': { label: 'Market Ready', color: 'bg-accent-success/20 border-accent-success/30 text-accent-success', count: ideas.filter(i => i.category === 'market-ready').length },
  'archived': { label: 'Archived', color: 'bg-muted/50', count: ideas.filter(i => i.category === 'archived').length }
};

const getMaturityColor = (score: number) => {
  if (score >= 80) return 'text-accent-success';
  if (score >= 60) return 'text-accent-warning';
  return 'text-muted-foreground';
};

const getOpportunityIcon = (opportunity?: string) => {
  switch (opportunity) {
    case 'high': return <TrendingUp className="h-3 w-3 text-accent-success" />;
    case 'medium': return <TrendingUp className="h-3 w-3 text-accent-warning" />;
    case 'low': return <TrendingUp className="h-3 w-3 text-muted-foreground" />;
    default: return null;
  }
};

export default function Ideas() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCaptureModal, setShowCaptureModal] = useState(false);

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const IdeaCard = ({ idea }: { idea: Idea }) => (
    <Card className="glass-hover p-5 animate-fade-in group cursor-pointer hover-lift" style={{ 
      breakInside: 'avoid',
      marginBottom: '1.5rem'
    }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="gradient-primary p-1.5 rounded-lg">
            <Lightbulb className="h-3 w-3 text-white" />
          </div>
          <Badge className={categories[idea.category].color}>
            {categories[idea.category].label}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-1">
          {getOpportunityIcon(idea.marketOpportunity)}
          {idea.connections.length > 0 && (
            <div className="flex items-center space-x-1">
              <LinkIcon className="h-3 w-3 text-primary" />
              <span className="text-xs text-primary font-medium">{idea.connections.length}</span>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {idea.title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {idea.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Maturity</span>
          </div>
          <span className={`text-sm font-medium ${getMaturityColor(idea.maturityScore)}`}>
            {idea.maturityScore}%
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {idea.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs glass">
              {tag}
            </Badge>
          ))}
        </div>

        {idea.aiSuggestion && (
          <div className="p-3 glass rounded-lg border border-secondary/20">
            <div className="flex items-center space-x-2 mb-1">
              <Brain className="h-3 w-3 text-secondary" />
              <span className="text-xs font-medium text-secondary">AI Insight</span>
            </div>
            <p className="text-xs text-muted-foreground">{idea.aiSuggestion}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{idea.capturedAt}</span>
          </div>
          <Button size="sm" variant="ghost" className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Expand
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="px-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-hero text-foreground font-bold">Ideas Hub</h1>
          <p className="text-body text-muted-foreground mt-2">
            Capture, organize, and develop your creative ideas
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="glass-hover">
            <Brain className="h-4 w-4 mr-2" />
            AI Suggestions
          </Button>
          <Button 
            className="gradient-primary text-white hover:opacity-90"
            onClick={() => setShowCaptureModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Capture Idea
          </Button>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(categories).map(([key, category]) => (
          <Card 
            key={key}
            className={`glass-hover p-4 cursor-pointer transition-all duration-200 ${
              selectedCategory === key ? 'ring-2 ring-primary border-primary/50' : ''
            }`}
            onClick={() => setSelectedCategory(key as keyof typeof categories)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{category.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{category.count}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ideas, tags, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-border"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' ? 'gradient-primary text-white' : 'glass-hover'}
          >
            All Ideas
          </Button>
          <Button variant="outline" className="glass-hover">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* AI Insights Bar */}
      <Card className="glass p-4 mb-6 border border-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="gradient-secondary p-2 rounded-lg">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">AI found 3 idea combinations</p>
              <p className="text-xs text-muted-foreground">Your AI assistant and Code Review ideas could merge into a powerful development tool</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="glass-hover">
            Explore Connections
          </Button>
        </div>
      </Card>

      {/* Ideas Masonry Grid */}
      {filteredIdeas.length > 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <Card className="glass-hover p-12 text-center">
          <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-heading-3 font-semibold text-foreground mb-2">No ideas found</h3>
          <p className="text-body text-muted-foreground mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Start capturing your brilliant ideas'}
          </p>
          <Button 
            className="gradient-primary text-white hover:opacity-90"
            onClick={() => setShowCaptureModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Capture First Idea
          </Button>
        </Card>
      )}

      <CaptureIdeaModal 
        open={showCaptureModal} 
        onOpenChange={setShowCaptureModal} 
      />
    </div>
  );
}