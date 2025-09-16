import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Receipt,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Send,
  Download,
  Eye,
  Edit,
  Copy,
  Calendar,
  CreditCard,
  TrendingUp
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
import { NewInvoiceModal } from '@/components/modals/NewInvoiceModal';

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: {
    name: string;
    company: string;
    avatar: string;
  };
  amount: number;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  project: string;
  paymentMethod?: 'stripe' | 'paypal' | 'bank' | 'check';
  currency: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  notes?: string;
  tags: string[];
}

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      client: {
        name: 'Sarah Chen',
        company: 'TechStart Inc',
        avatar: 'SC'
      },
      amount: 15000,
      status: 'paid',
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      paidDate: '2024-01-28',
      project: 'E-commerce Website',
      paymentMethod: 'stripe',
      currency: 'USD',
      items: [
        { description: 'Frontend Development', quantity: 80, rate: 125, amount: 10000 },
        { description: 'Backend API', quantity: 40, rate: 125, amount: 5000 }
      ],
      tags: ['Website', 'Development']
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      client: {
        name: 'Mike Rodriguez',
        company: 'Startup Labs',
        avatar: 'MR'
      },
      amount: 8500,
      status: 'overdue',
      issueDate: '2024-01-05',
      dueDate: '2024-01-20',
      project: 'Mobile App MVP',
      currency: 'USD',
      items: [
        { description: 'UI/UX Design', quantity: 30, rate: 100, amount: 3000 },
        { description: 'React Native Development', quantity: 55, rate: 100, amount: 5500 }
      ],
      tags: ['Mobile', 'Design', 'Development']
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      client: {
        name: 'Emily Watson',
        company: 'DataFlow Corp',
        avatar: 'EW'
      },
      amount: 12000,
      status: 'sent',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      project: 'SaaS Dashboard',
      currency: 'USD',
      items: [
        { description: 'Dashboard Development', quantity: 60, rate: 150, amount: 9000 },
        { description: 'Data Visualization', quantity: 20, rate: 150, amount: 3000 }
      ],
      tags: ['Dashboard', 'SaaS']
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      client: {
        name: 'James Liu',
        company: 'FinTech Pro',
        avatar: 'JL'
      },
      amount: 6500,
      status: 'draft',
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      project: 'API Integration',
      currency: 'USD',
      items: [
        { description: 'API Development', quantity: 30, rate: 130, amount: 3900 },
        { description: 'Documentation', quantity: 20, rate: 130, amount: 2600 }
      ],
      tags: ['API', 'Integration']
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      client: {
        name: 'Lisa Park',
        company: 'Creative Studio',
        avatar: 'LP'
      },
      amount: 9500,
      status: 'viewed',
      issueDate: '2024-01-12',
      dueDate: '2024-02-12',
      project: 'Brand Website',
      currency: 'USD',
      items: [
        { description: 'Website Development', quantity: 50, rate: 120, amount: 6000 },
        { description: 'CMS Setup', quantity: 25, rate: 120, amount: 3000 },
        { description: 'Training', quantity: 5, rate: 100, amount: 500 }
      ],
      tags: ['Website', 'CMS', 'Training']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'sent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'viewed': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'paid': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'cancelled': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="w-3 h-3" />;
      case 'sent': return <Send className="w-3 h-3" />;
      case 'viewed': return <Eye className="w-3 h-3" />;
      case 'paid': return <CheckCircle2 className="w-3 h-3" />;
      case 'overdue': return <AlertTriangle className="w-3 h-3" />;
      case 'cancelled': return <Clock className="w-3 h-3" />;
      default: return <Receipt className="w-3 h-3" />;
    }
  };

  const getPaymentMethodIcon = (method?: string) => {
    switch (method) {
      case 'stripe': return <CreditCard className="w-3 h-3" />;
      case 'paypal': return <DollarSign className="w-3 h-3" />;
      case 'bank': return <Receipt className="w-3 h-3" />;
      default: return null;
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = invoices.filter(i => ['sent', 'viewed'].includes(i.status)).reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);

  const statsCards = [
    {
      title: 'Revenue This Month',
      value: formatCurrency(totalRevenue),
      change: '+18% vs last month',
      icon: DollarSign,
      trend: 'up' as const
    },
    {
      title: 'Pending Payments',
      value: formatCurrency(pendingAmount),
      change: `${invoices.filter(i => ['sent', 'viewed'].includes(i.status)).length} invoices`,
      icon: Clock,
      trend: 'neutral' as const
    },
    {
      title: 'Overdue Amount',
      value: formatCurrency(overdueAmount),
      change: `${invoices.filter(i => i.status === 'overdue').length} overdue`,
      icon: AlertTriangle,
      trend: overdueAmount > 0 ? 'down' as const : 'neutral' as const
    },
    {
      title: 'Average Payment Time',
      value: '18 days',
      change: '-2 days vs last month',
      icon: TrendingUp,
      trend: 'up' as const
    }
  ];

  return (
    <div className="px-6 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-hero gradient-primary bg-clip-text text-transparent">
            Invoices
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage invoices and track payments
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="gradient-primary text-white" onClick={() => setShowNewInvoiceModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
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
                <p className={`text-xs font-medium mt-1 ${
                  stat.trend === 'up' ? 'text-accent-success' : 
                  stat.trend === 'down' ? 'text-accent-danger' : 
                  'text-muted-foreground'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="gradient-primary p-3 rounded-xl">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions for Overdue */}
      {overdueAmount > 0 && (
        <Card className="p-4 mb-6 bg-red-500/5 border-red-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="font-medium text-foreground">
                  {invoices.filter(i => i.status === 'overdue').length} overdue invoices
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(overdueAmount)} in overdue payments needs attention
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Send Reminders
              </Button>
              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                View Overdue
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'draft', 'sent', 'viewed', 'paid', 'overdue'].map((status) => (
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

      {/* Invoices Grid */}
      {filteredInvoices.length === 0 ? (
        <Card className="p-12 text-center">
          <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No invoices found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? 'Try adjusting your search terms.' : 'Create your first invoice to get started.'}
          </p>
          <Button className="gradient-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="glass-hover transition-all duration-200 hover:shadow-lg group">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {invoice.invoiceNumber}
                      </h3>
                      {invoice.paymentMethod && (
                        <div className="flex items-center text-muted-foreground">
                          {getPaymentMethodIcon(invoice.paymentMethod)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs gradient-primary text-white">
                          {invoice.client.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {invoice.client.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {invoice.client.company}
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
                        View Invoice
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
                      {invoice.status === 'draft' && (
                        <DropdownMenuItem>
                          <Send className="h-4 w-4 mr-2" />
                          Send Invoice
                        </DropdownMenuItem>
                      )}
                      {invoice.status !== 'paid' && (
                        <DropdownMenuItem>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark as Paid
                        </DropdownMenuItem>
                      )}
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

                {/* Status and Amount */}
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getStatusColor(invoice.status)}>
                    {getStatusIcon(invoice.status)}
                    <span className="ml-1 capitalize">{invoice.status}</span>
                  </Badge>
                  <span className="text-lg font-bold text-foreground">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </span>
                </div>

                {/* Project */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Project</p>
                  <p className="font-medium text-foreground">{invoice.project}</p>
                </div>

                {/* Due Date Progress */}
                {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Due Date</span>
                      <span className={`font-medium ${
                        getDaysUntilDue(invoice.dueDate) < 0 ? 'text-red-500' : 
                        getDaysUntilDue(invoice.dueDate) <= 3 ? 'text-orange-500' : 
                        'text-foreground'
                      }`}>
                        {getDaysUntilDue(invoice.dueDate) < 0 
                          ? `${Math.abs(getDaysUntilDue(invoice.dueDate))} days overdue`
                          : getDaysUntilDue(invoice.dueDate) === 0 
                          ? 'Due today'
                          : `${getDaysUntilDue(invoice.dueDate)} days left`
                        }
                      </span>
                    </div>
                    
                    {getDaysUntilDue(invoice.dueDate) < 7 && (
                      <Progress 
                        value={Math.max(0, 100 - (getDaysUntilDue(invoice.dueDate) * 14.3))} 
                        className={`h-2 ${getDaysUntilDue(invoice.dueDate) < 0 ? '[&>div]:bg-red-500' : '[&>div]:bg-orange-500'}`}
                      />
                    )}
                  </div>
                )}

                {/* Dates */}
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Issued</span>
                    <span className="text-foreground">{invoice.issueDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Due</span>
                    <span className="text-foreground">{invoice.dueDate}</span>
                  </div>
                  
                  {invoice.paidDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Paid</span>
                      <span className="text-accent-success">{invoice.paidDate}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {invoice.tags.map((tag) => (
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
      
      {/* New Invoice Modal */}
      <NewInvoiceModal open={showNewInvoiceModal} onOpenChange={setShowNewInvoiceModal} />
    </div>
  );
}