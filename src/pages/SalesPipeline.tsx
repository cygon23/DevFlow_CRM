import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  Target,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NewDealModal } from '@/components/modals/NewDealModal';

interface Deal {
  id: string;
  title: string;
  client: {
    name: string;
    company: string;
    avatar: string;
  };
  value: number;
  probability: number;
  expectedCloseDate: string;
  priority: 'high' | 'medium' | 'low';
  stage: string;
  lastActivity: string;
  tags: string[];
}

interface PipelineStage {
  id: string;
  name: string;
  deals: Deal[];
  color: string;
}

export default function SalesPipeline() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showNewDealModal, setShowNewDealModal] = useState(false);

  const pipelineStages: PipelineStage[] = [
    {
      id: 'lead',
      name: 'Leads',
      color: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
      deals: [
        {
          id: '1',
          title: 'E-commerce Website Redesign',
          client: {
            name: 'Sarah Chen',
            company: 'TechStart Inc',
            avatar: 'SC'
          },
          value: 15000,
          probability: 25,
          expectedCloseDate: '2024-02-15',
          priority: 'high',
          stage: 'lead',
          lastActivity: '2 hours ago',
          tags: ['Website', 'Redesign']
        },
        {
          id: '2', 
          title: 'Mobile App Development',
          client: {
            name: 'Mike Rodriguez',
            company: 'Startup Labs',
            avatar: 'MR'
          },
          value: 25000,
          probability: 15,
          expectedCloseDate: '2024-03-01',
          priority: 'medium',
          stage: 'lead',
          lastActivity: '1 day ago',
          tags: ['Mobile', 'React Native']
        }
      ]
    },
    {
      id: 'qualified',
      name: 'Qualified',
      color: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
      deals: [
        {
          id: '3',
          title: 'SaaS Dashboard Development',
          client: {
            name: 'Emily Watson',
            company: 'DataFlow Corp',
            avatar: 'EW'
          },
          value: 35000,
          probability: 60,
          expectedCloseDate: '2024-01-30',
          priority: 'high',
          stage: 'qualified',
          lastActivity: '3 hours ago',
          tags: ['Dashboard', 'SaaS', 'React']
        }
      ]
    },
    {
      id: 'proposal',
      name: 'Proposal Sent',
      color: 'text-amber-400 border-amber-400/20 bg-amber-400/5',
      deals: [
        {
          id: '4',
          title: 'API Integration Project',
          client: {
            name: 'James Liu',
            company: 'FinTech Pro',
            avatar: 'JL'
          },
          value: 18000,
          probability: 75,
          expectedCloseDate: '2024-01-25',
          priority: 'high',
          stage: 'proposal',
          lastActivity: '5 hours ago',
          tags: ['API', 'Integration', 'Backend']
        },
        {
          id: '5',
          title: 'Brand Website Development',
          client: {
            name: 'Lisa Park',
            company: 'Creative Studio',
            avatar: 'LP'
          },
          value: 12000,
          probability: 65,
          expectedCloseDate: '2024-02-10',
          priority: 'medium',
          stage: 'proposal',
          lastActivity: '1 day ago',
          tags: ['Website', 'Branding']
        }
      ]
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
      deals: [
        {
          id: '6',
          title: 'Enterprise CRM System',
          client: {
            name: 'David Kim',
            company: 'Enterprise Solutions',
            avatar: 'DK'
          },
          value: 50000,
          probability: 85,
          expectedCloseDate: '2024-01-20',
          priority: 'high',
          stage: 'negotiation',
          lastActivity: '30 min ago',
          tags: ['CRM', 'Enterprise', 'Full Stack']
        }
      ]
    },
    {
      id: 'won',
      name: 'Won',
      color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
      deals: [
        {
          id: '7',
          title: 'Portfolio Website',
          client: {
            name: 'Anna Thompson',
            company: 'Personal Brand',
            avatar: 'AT'
          },
          value: 8000,
          probability: 100,
          expectedCloseDate: '2024-01-15',
          priority: 'low',
          stage: 'won',
          lastActivity: '2 days ago',
          tags: ['Portfolio', 'Website']
        }
      ]
    }
  ];

  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getWeightedValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalPipelineValue = pipelineStages.reduce((sum, stage) => sum + getTotalValue(stage.deals), 0);
  const totalWeightedValue = pipelineStages.reduce((sum, stage) => sum + getWeightedValue(stage.deals), 0);

  return (
    <div className="px-6 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-hero gradient-primary bg-clip-text text-transparent">
            Sales Pipeline
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your deals and track revenue opportunities
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="gradient-primary text-white" onClick={() => setShowNewDealModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-small text-muted-foreground font-medium">Total Pipeline Value</p>
              <p className="text-heading-2 font-bold text-foreground mt-1">
                {formatCurrency(totalPipelineValue)}
              </p>
            </div>
            <div className="gradient-primary p-3 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-small text-muted-foreground font-medium">Weighted Value</p>
              <p className="text-heading-2 font-bold text-foreground mt-1">
                {formatCurrency(totalWeightedValue)}
              </p>
            </div>
            <div className="gradient-secondary p-3 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-small text-muted-foreground font-medium">Active Deals</p>
              <p className="text-heading-2 font-bold text-foreground mt-1">
                {pipelineStages.reduce((sum, stage) => sum + stage.deals.length, 0)}
              </p>
            </div>
            <div className="gradient-accent p-3 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-small text-muted-foreground font-medium">Close Rate</p>
              <p className="text-heading-2 font-bold text-foreground mt-1">68%</p>
              <p className="text-xs text-accent-success font-medium mt-1">+5% vs last month</p>
            </div>
            <div className="gradient-success p-3 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {['all', 'high', 'medium', 'low'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="capitalize"
            >
              {filter} Priority
            </Button>
          ))}
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="space-y-4">
            {/* Stage Header */}
            <div className={`p-4 rounded-lg border ${stage.color}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{stage.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {stage.deals.length}
                </Badge>
              </div>
              <p className="text-xs opacity-80">
                {formatCurrency(getTotalValue(stage.deals))}
              </p>
            </div>

            {/* Deals */}
            <div className="space-y-3 min-h-[400px]">
              {stage.deals.map((deal) => (
                <Card key={deal.id} className="p-4 glass-hover cursor-pointer hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {deal.title}
                    </h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                        <DropdownMenuItem>Move Stage</DropdownMenuItem>
                        <DropdownMenuItem>View Client</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs gradient-primary text-white">
                        {deal.client.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {deal.client.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {deal.client.company}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Value</span>
                      <span className="font-semibold text-foreground">{formatCurrency(deal.value)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="font-semibold text-foreground">{deal.probability}%</span>
                    </div>
                    
                    <div className="w-full bg-surface rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{deal.expectedCloseDate}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(deal.priority)}`} />
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {deal.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Last activity: {deal.lastActivity}
                  </p>
                </Card>
              ))}
              
              {/* Add Deal Button */}
              <Button 
                variant="ghost" 
                className="w-full h-20 border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors"
                onClick={() => setShowNewDealModal(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Deal
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* New Deal Modal */}
      <NewDealModal open={showNewDealModal} onOpenChange={setShowNewDealModal} />
    </div>
  );
}