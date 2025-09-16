import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search,
  MessageSquare,
  Clock,
  TrendingUp,
  Mail,
  Phone,
  Building,
  Calendar,
  Star,
  Activity
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NewClientModal } from '@/components/modals/NewClientModal';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  avatar?: string;
  initials: string;
  projects: number;
  lastContact: string;
  responseTime: string;
  communicationScore: number;
  status: 'active' | 'inactive' | 'prospect';
  totalRevenue: string;
  nextMeeting?: string;
}

const clients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'TechCorp',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    initials: 'SJ',
    projects: 2,
    lastContact: '2 hours ago',
    responseTime: '< 2 hours',
    communicationScore: 95,
    status: 'active',
    totalRevenue: '$125,000',
    nextMeeting: 'Tomorrow 10:00 AM'
  },
  {
    id: '2', 
    name: 'Michael Chen',
    company: 'StartupXYZ',
    email: 'michael@startupxyz.com',
    initials: 'MC',
    projects: 1,
    lastContact: '1 day ago',
    responseTime: '4 hours',
    communicationScore: 88,
    status: 'active',
    totalRevenue: '$85,000'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'RetailCo',
    email: 'emily.r@retailco.com',
    phone: '+1 (555) 987-6543',
    initials: 'ER',
    projects: 1,
    lastContact: '2 weeks ago',
    responseTime: '1 day',
    communicationScore: 100,
    status: 'inactive',
    totalRevenue: '$95,000'
  },
  {
    id: '4',
    name: 'David Kim',
    company: 'MarketPro',
    email: 'david.kim@marketpro.com',
    initials: 'DK',
    projects: 0,
    lastContact: '3 days ago',
    responseTime: 'N/A',
    communicationScore: 75,
    status: 'prospect',
    totalRevenue: '$0',
    nextMeeting: 'Friday 2:00 PM'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    company: 'FinanceFirst',
    email: 'lisa.t@financefirst.com',
    initials: 'LT',
    projects: 3,
    lastContact: '5 hours ago',
    responseTime: '30 minutes',
    communicationScore: 92,
    status: 'active',
    totalRevenue: '$200,000'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'status-active';
    case 'inactive': return 'status-paused';
    case 'prospect': return 'status-at-risk';
    default: return 'bg-muted';
  }
};

const getCommunicationScoreColor = (score: number) => {
  if (score >= 90) return 'text-accent-success';
  if (score >= 70) return 'text-accent-warning';
  return 'text-accent-danger';
};

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all');
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ClientCard = ({ client }: { client: Client }) => (
    <Card className="glass-hover p-6 animate-fade-in group cursor-pointer hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="gradient-primary text-white font-semibold">
              {client.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {client.name}
            </h3>
            <div className="flex items-center space-x-2">
              <Building className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{client.company}</span>
            </div>
          </div>
        </div>
        
        <Badge className={`${getStatusColor(client.status)} capitalize`}>
          {client.status}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground truncate">{client.email}</span>
            </div>
            {client.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{client.phone}</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">{client.totalRevenue}</div>
            <div className="text-xs text-muted-foreground">Total Revenue</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-3 border-y border-border">
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">{client.projects}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">{client.responseTime}</div>
            <div className="text-xs text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center">
            <div className={`text-sm font-semibold ${getCommunicationScoreColor(client.communicationScore)}`}>
              {client.communicationScore}%
            </div>
            <div className="text-xs text-muted-foreground">Communication</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last contact: {client.lastContact}</span>
          </div>
          
          {client.nextMeeting && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-primary" />
              <span className="text-xs text-primary font-medium">{client.nextMeeting}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1 glass-hover">
            <MessageSquare className="h-3 w-3 mr-2" />
            Message
          </Button>
          <Button size="sm" variant="outline" className="flex-1 glass-hover">
            <Activity className="h-3 w-3 mr-2" />
            View Activity
          </Button>
        </div>
      </div>
    </Card>
  );

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    prospects: clients.filter(c => c.status === 'prospect').length,
    totalRevenue: clients.reduce((sum, client) => {
      const revenue = parseInt(client.totalRevenue.replace(/[^0-9]/g, ''));
      return sum + revenue;
    }, 0)
  };

  return (
    <div className="px-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-hero text-foreground font-bold">Clients</h1>
          <p className="text-body text-muted-foreground mt-2">
            Manage client relationships and track communications
          </p>
        </div>
        <Button className="gradient-primary text-white hover:opacity-90 mt-4 md:mt-0" onClick={() => setShowNewClientModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-hover p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </Card>
        
        <Card className="glass-hover p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-foreground">{stats.active}</p>
            </div>
            <Activity className="h-8 w-8 text-accent-success" />
          </div>
        </Card>
        
        <Card className="glass-hover p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Prospects</p>
              <p className="text-2xl font-bold text-foreground">{stats.prospects}</p>
            </div>
            <Star className="h-8 w-8 text-accent-warning" />
          </div>
        </Card>
        
        <Card className="glass-hover p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-accent-success" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-border"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {['all', 'active', 'inactive', 'prospect'].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status as any)}
              className={statusFilter === status ? 'gradient-primary text-white' : 'glass-hover'}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Clients Grid */}
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <Card className="glass-hover p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-heading-3 font-semibold text-foreground mb-2">No clients found</h3>
          <p className="text-body text-muted-foreground mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first client'}
          </p>
          <Button className="gradient-primary text-white hover:opacity-90" onClick={() => setShowNewClientModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </Card>
      )}
      
      {/* New Client Modal */}
      <NewClientModal open={showNewClientModal} onOpenChange={setShowNewClientModal} />
    </div>
  );
}