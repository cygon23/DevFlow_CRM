import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  FileText,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  Download,
  Copy,
  Edit,
  Calendar,
  DollarSign,
  User
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NewProposalModal } from '@/components/modals/NewProposalModal';

interface Proposal {
  id: string;
  title: string;
  client: {
    name: string;
    company: string;
    avatar: string;
  };
  value: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  createdDate: string;
  sentDate?: string;
  viewedDate?: string;
  expiryDate: string;
  views: number;
  timeSpent: string;
  lastViewed?: string;
  sections: number;
  tags: string[];
}

export default function Proposals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNewProposalModal, setShowNewProposalModal] = useState(false);

  const proposals: Proposal[] = [
    {
      id: '1',
      title: 'E-commerce Platform Development',
      client: {
        name: 'Sarah Chen',
        company: 'TechStart Inc',
        avatar: 'SC'
      },
      value: 45000,
      status: 'viewed',
      createdDate: '2024-01-10',
      sentDate: '2024-01-12',
      viewedDate: '2024-01-13',
      expiryDate: '2024-02-12',
      views: 8,
      timeSpent: '23 minutes',
      lastViewed: '2 hours ago',
      sections: 6,
      tags: ['E-commerce', 'React', 'Node.js']
    },
    {
      id: '2',
      title: 'Mobile App MVP Development',
      client: {
        name: 'Mike Rodriguez',
        company: 'Startup Labs',
        avatar: 'MR'
      },
      value: 28000,
      status: 'sent',
      createdDate: '2024-01-08',
      sentDate: '2024-01-09',
      expiryDate: '2024-02-09',
      views: 3,
      timeSpent: '12 minutes',
      lastViewed: '1 day ago',
      sections: 5,
      tags: ['Mobile', 'React Native', 'MVP']
    },
    {
      id: '3',
      title: 'SaaS Dashboard Redesign',
      client: {
        name: 'Emily Watson',
        company: 'DataFlow Corp',
        avatar: 'EW'
      },
      value: 35000,
      status: 'accepted',
      createdDate: '2024-01-05',
      sentDate: '2024-01-06',
      viewedDate: '2024-01-07',
      expiryDate: '2024-02-06',
      views: 15,
      timeSpent: '45 minutes',
      lastViewed: '3 days ago',
      sections: 8,
      tags: ['Dashboard', 'SaaS', 'UI/UX']
    },
    {
      id: '4',
      title: 'API Integration & Documentation',
      client: {
        name: 'James Liu',
        company: 'FinTech Pro',
        avatar: 'JL'
      },
      value: 18000,
      status: 'draft',
      createdDate: '2024-01-14',
      expiryDate: '2024-02-14',
      views: 0,
      timeSpent: '0 minutes',
      sections: 4,
      tags: ['API', 'Documentation', 'Integration']
    },
    {
      id: '5',
      title: 'Brand Website Development',
      client: {
        name: 'Lisa Park',
        company: 'Creative Studio',
        avatar: 'LP'
      },
      value: 22000,
      status: 'rejected',
      createdDate: '2024-01-03',
      sentDate: '2024-01-04',
      viewedDate: '2024-01-05',
      expiryDate: '2024-02-04',
      views: 5,
      timeSpent: '18 minutes',
      lastViewed: '1 week ago',
      sections: 7,
      tags: ['Website', 'Branding', 'CMS']
    },
    {
      id: '6',
      title: 'Legacy System Migration',
      client: {
        name: 'David Kim',
        company: 'Enterprise Solutions',
        avatar: 'DK'
      },
      value: 65000,
      status: 'expired',
      createdDate: '2023-12-20',
      sentDate: '2023-12-22',
      viewedDate: '2023-12-23',
      expiryDate: '2024-01-22',
      views: 2,
      timeSpent: '8 minutes',
      lastViewed: '3 weeks ago',
      sections: 9,
      tags: ['Migration', 'Enterprise', 'Backend']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'sent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'viewed': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'accepted': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'expired': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="w-3 h-3" />;
      case 'sent': return <Send className="w-3 h-3" />;
      case 'viewed': return <Eye className="w-3 h-3" />;
      case 'accepted': return <CheckCircle2 className="w-3 h-3" />;
      case 'rejected': return <XCircle className="w-3 h-3" />;
      case 'expired': return <Clock className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getEngagementScore = (proposal: Proposal) => {
    if (proposal.status === 'draft') return 0;
    const baseScore = proposal.views * 10;
    const timeBonus = parseInt(proposal.timeSpent.split(' ')[0]) * 2;
    return Math.min(100, baseScore + timeBonus);
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.client.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statsCards = [
    {
      title: 'Total Value',
      value: formatCurrency(proposals.reduce((sum, p) => sum + p.value, 0)),
      change: '+12% this month',
      icon: DollarSign,
      trend: 'up' as const
    },
    {
      title: 'Acceptance Rate',
      value: '68%',
      change: '+5% vs last month',
      icon: CheckCircle2,
      trend: 'up' as const
    },
    {
      title: 'Avg. Response Time',
      value: '2.3 days',
      change: '-0.5 days',
      icon: Clock,
      trend: 'up' as const
    },
    {
      title: 'Active Proposals',
      value: proposals.filter(p => ['sent', 'viewed'].includes(p.status)).length.toString(),
      change: '+3 this week',
      icon: FileText,
      trend: 'up' as const
    }
  ];

  return (
    <div className="px-6 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-hero gradient-primary bg-clip-text text-transparent">
            Proposals
          </h1>
          <p className="text-muted-foreground mt-2">
            Create, send, and track professional proposals
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="gradient-primary text-white" onClick={() => setShowNewProposalModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Proposal
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <Card key={index} className="glass-hover p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-small text-muted-foreground font-medium">{stat.title}</p>
                <p className="text-heading-2 font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-accent-success font-medium mt-1">{stat.change}</p>
              </div>
              <div className="gradient-primary p-3 rounded-xl">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'draft', 'sent', 'viewed', 'accepted', 'rejected'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Proposals Grid */}
      {filteredProposals.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No proposals found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? 'Try adjusting your search terms.' : 'Create your first proposal to get started.'}
          </p>
          <Button className="gradient-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Proposal
          </Button>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredProposals.map((proposal) => (
            <Card key={proposal.id} className="glass-hover transition-all duration-200 hover:shadow-lg group">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 truncate">
                      {proposal.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs gradient-primary text-white">
                          {proposal.client.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {proposal.client.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {proposal.client.company}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Proposal
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status and Value */}
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getStatusColor(proposal.status)}>
                    {getStatusIcon(proposal.status)}
                    <span className="ml-1 capitalize">{proposal.status}</span>
                  </Badge>
                  <span className="text-lg font-bold text-foreground">
                    {formatCurrency(proposal.value)}
                  </span>
                </div>

                {/* Engagement Metrics */}
                {proposal.status !== 'draft' && (
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Engagement</span>
                      <span className="font-medium">{getEngagementScore(proposal)}%</span>
                    </div>
                    <Progress value={getEngagementScore(proposal)} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{proposal.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{proposal.timeSpent}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="text-foreground">{proposal.createdDate}</span>
                  </div>
                  
                  {proposal.sentDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sent</span>
                      <span className="text-foreground">{proposal.sentDate}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Expires</span>
                    <span className={`${new Date(proposal.expiryDate) < new Date() ? 'text-red-500' : 'text-foreground'}`}>
                      {proposal.expiryDate}
                    </span>
                  </div>
                  
                  {proposal.lastViewed && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last viewed</span>
                      <span className="text-foreground">{proposal.lastViewed}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {proposal.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* New Proposal Modal */}
      <NewProposalModal open={showNewProposalModal} onOpenChange={setShowNewProposalModal} />
    </div>
  );
}