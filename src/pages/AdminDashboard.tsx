import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Search,
  MoreHorizontal,
  Shield,
  Crown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.3%',
      trend: 'up',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Monthly Revenue',
      value: '$47,251',
      change: '+8.7%',
      trend: 'up',
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      title: 'Active Projects',
      value: '8,924',
      change: '+15.2%',
      trend: 'up',
      icon: <Activity className="w-5 h-5" />
    },
    {
      title: 'Growth Rate',
      value: '23.1%',
      change: '+2.4%',
      trend: 'up',
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      plan: 'Professional',
      status: 'Active',
      joined: '2024-01-15',
      projects: 12,
      revenue: '$348'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      plan: 'Enterprise',
      status: 'Active',
      joined: '2023-12-03',
      projects: 28,
      revenue: '$1,200'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      plan: 'Starter',
      status: 'Trial',
      joined: '2024-01-20',
      projects: 3,
      revenue: '$0'
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david@example.com',
      plan: 'Professional',
      status: 'Suspended',
      joined: '2023-11-10',
      projects: 15,
      revenue: '$435'
    }
  ];

  const systemAlerts = [
    {
      type: 'warning',
      message: 'High server load detected on US-East region',
      time: '2 minutes ago',
      severity: 'medium'
    },
    {
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      time: '1 hour ago',
      severity: 'low'
    },
    {
      type: 'error',
      message: 'Payment gateway timeout for 3 transactions',
      time: '3 hours ago',
      severity: 'high'
    }
  ];

  const recentActivities = [
    {
      user: 'Sarah Johnson',
      action: 'Created new project',
      details: '"E-commerce Redesign"',
      time: '5 minutes ago'
    },
    {
      user: 'Mike Chen',
      action: 'Upgraded to Enterprise',
      details: 'Annual billing',
      time: '1 hour ago'
    },
    {
      user: 'Emma Wilson',
      action: 'Started free trial',
      details: 'Professional plan',
      time: '2 hours ago'
    },
    {
      user: 'David Brown',
      action: 'Completed project',
      details: '"Mobile App UI"',
      time: '4 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Trial': return 'bg-blue-100 text-blue-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return <Crown className="w-4 h-4 text-purple-600" />;
      case 'Professional': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your DevFlow platform</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
              <div className="text-primary">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* System Alerts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
        <div className="space-y-3">
          {systemAlerts.map((alert, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                alert.severity === 'high' ? 'bg-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">User Management</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Plan</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Projects</th>
                    <th className="text-left py-3 px-4">Revenue</th>
                    <th className="text-left py-3 px-4">Joined</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getPlanIcon(user.plan)}
                          <span className="text-sm">{user.plan}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{user.projects}</td>
                      <td className="py-3 px-4 font-medium">{user.revenue}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{user.joined}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project Analytics</h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Project analytics chart would go here
            </div>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Revenue analytics chart would go here
            </div>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 pb-3 border-b last:border-b-0">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span>{activity.action}</span>
                      {' '}
                      <span className="text-muted-foreground">{activity.details}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;