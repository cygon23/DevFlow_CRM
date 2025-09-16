import { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  Lightbulb, 
  Users, 
  TrendingUp,
  MessageSquare,
  Clock,
  Zap,
  Brain,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/StatsCard';
import { ActivityItem } from '@/components/ActivityItem';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const recentActivities = [
    {
      icon: Lightbulb,
      title: 'New idea captured',
      description: 'AI-powered search functionality for the project dashboard',
      time: '2 min ago',
      project: 'DevFlow Web App'
    },
    {
      icon: MessageSquare,
      title: 'Client message received',
      description: 'Sarah from TechCorp asked about the mobile app timeline',
      time: '15 min ago',
      project: 'Mobile App',
      user: { name: 'Sarah Johnson', initials: 'SJ' }
    },
    {
      icon: FolderOpen,
      title: 'Project milestone completed',
      description: 'Authentication system implementation finished',
      time: '1 hour ago',
      project: 'API Redesign'
    },
    {
      icon: Brain,
      title: 'AI suggestion generated',
      description: 'Consider adding real-time collaboration features',
      time: '2 hours ago'
    },
    {
      icon: Users,
      title: 'Team member added',
      description: 'Alex Miller joined the DevFlow Web App project',
      time: '3 hours ago',
      project: 'DevFlow Web App',
      user: { name: 'Alex Miller', initials: 'AM' }
    }
  ];

  const upcomingTasks = [
    {
      title: 'Design review meeting',
      time: '2:00 PM',
      project: 'Mobile App',
      priority: 'high'
    },
    {
      title: 'Code review: Authentication flow',
      time: '4:30 PM', 
      project: 'API Redesign',
      priority: 'medium'
    },
    {
      title: 'Client call with TechCorp',
      time: 'Tomorrow 10:00 AM',
      project: 'Mobile App',
      priority: 'high'
    },
    {
      title: 'Deploy staging environment',
      time: 'Tomorrow 2:00 PM',
      project: 'DevFlow Web App',
      priority: 'low'
    }
  ];

  const aiInsights = [
    {
      title: 'Project Velocity Alert',
      description: 'Mobile App project is 15% behind schedule. Consider reallocating resources.',
      action: 'View Analysis'
    },
    {
      title: 'Idea Connection Found',
      description: 'Your recent AI search idea could enhance 3 existing projects.',
      action: 'Explore Connections'
    },
    {
      title: 'Client Communication Opportunity', 
      description: 'TechCorp hasn\'t received an update in 4 days. Perfect time to share progress.',
      action: 'Send Update'
    }
  ];

  return (
    <div className="px-6 animate-fade-in">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-hero gradient-primary bg-clip-text text-transparent">
              {getGreeting()}, John
            </h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-body">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <Button className="gradient-primary text-white hover:opacity-90">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Projects"
          value={3}
          change="+1 this week"
          icon={FolderOpen}
          trend="up"
        />
        <StatsCard
          title="Captured Ideas"
          value={12}
          change="+4 today"
          icon={Lightbulb}
          trend="up"
        />
        <StatsCard
          title="Client Messages"
          value={5}
          change="2 pending"
          icon={MessageSquare}
          trend="neutral"
        />
        <StatsCard
          title="Completion Rate"
          value="87%"
          change="+12% vs last week"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="glass-hover p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-3 font-semibold text-foreground">Recent Activity</h2>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  icon={activity.icon}
                  title={activity.title}
                  description={activity.description}
                  time={activity.time}
                  project={activity.project}
                  user={activity.user}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card className="glass-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-heading-3 font-semibold text-foreground">Upcoming</h3>
              <Button variant="ghost" size="sm">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 glass-hover rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    task.priority === 'high' ? 'bg-accent-danger' :
                    task.priority === 'medium' ? 'bg-accent-warning' :
                    'bg-accent-success'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                    {task.project && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 mt-1">
                        {task.project}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="glass-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="gradient-secondary p-2 rounded-lg mr-3">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-heading-3 font-semibold text-foreground">AI Insights</h3>
              </div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 glass rounded-lg border border-secondary/20 animate-slide-up">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {insight.description}
                  </p>
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    <Zap className="h-3 w-3 mr-1" />
                    {insight.action}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}