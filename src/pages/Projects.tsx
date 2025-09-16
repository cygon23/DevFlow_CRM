import { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Grid3X3, 
  List,
  Filter,
  Search,
  Clock,
  Users,
  MoreHorizontal,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NewProjectModal } from '@/components/modals/NewProjectModal';

type ViewMode = 'grid' | 'list';
type ProjectStatus = 'active' | 'paused' | 'completed' | 'at-risk';

interface Project {
  id: string;
  title: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  lastActivity: string;
  team: Array<{ name: string; initials: string }>;
  dueDate: string;
  description: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'DevFlow Web Application',
    client: 'Internal',
    status: 'active',
    progress: 75,
    lastActivity: '2 hours ago',
    team: [
      { name: 'John Doe', initials: 'JD' },
      { name: 'Sarah Miller', initials: 'SM' },
      { name: 'Alex Johnson', initials: 'AJ' }
    ],
    dueDate: 'Dec 15, 2024',
    description: 'Complete project management platform with AI-powered insights'
  },
  {
    id: '2',
    title: 'TechCorp Mobile App',
    client: 'TechCorp',
    status: 'at-risk',
    progress: 45,
    lastActivity: '1 day ago',
    team: [
      { name: 'Emma Davis', initials: 'ED' },
      { name: 'Mike Wilson', initials: 'MW' }
    ],
    dueDate: 'Nov 30, 2024',
    description: 'Native mobile application for inventory management'
  },
  {
    id: '3',
    title: 'API Infrastructure Redesign',
    client: 'StartupXYZ',
    status: 'active',
    progress: 90,
    lastActivity: '30 minutes ago',
    team: [
      { name: 'David Brown', initials: 'DB' },
      { name: 'Lisa Chen', initials: 'LC' }
    ],
    dueDate: 'Nov 25, 2024',
    description: 'Scalable microservices architecture with improved performance'
  },
  {
    id: '4',
    title: 'E-commerce Platform',
    client: 'RetailCo',
    status: 'completed',
    progress: 100,
    lastActivity: '2 weeks ago',
    team: [
      { name: 'Tom Anderson', initials: 'TA' },
      { name: 'Rachel Green', initials: 'RG' }
    ],
    dueDate: 'Oct 30, 2024',
    description: 'Full-featured online store with payment integration'
  },
  {
    id: '5',
    title: 'Marketing Dashboard',
    client: 'MarketPro',
    status: 'paused',
    progress: 35,
    lastActivity: '1 week ago',
    team: [
      { name: 'Chris Lee', initials: 'CL' }
    ],
    dueDate: 'Jan 15, 2025',
    description: 'Analytics dashboard for marketing campaign management'
  }
];

const getStatusIcon = (status: ProjectStatus) => {
  switch (status) {
    case 'active': return <Play className="h-3 w-3" />;
    case 'paused': return <Pause className="h-3 w-3" />;
    case 'completed': return <CheckCircle className="h-3 w-3" />;
    case 'at-risk': return <AlertTriangle className="h-3 w-3" />;
  }
};

const getStatusClass = (status: ProjectStatus) => {
  switch (status) {
    case 'active': return 'status-active';
    case 'paused': return 'status-paused';
    case 'completed': return 'status-completed';
    case 'at-risk': return 'status-at-risk';
  }
};

export default function Projects() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="glass-hover p-6 animate-fade-in group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-heading-3 font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <Badge className={`${getStatusClass(project.status)} border text-xs`}>
              {getStatusIcon(project.status)}
              <span className="ml-1 capitalize">{project.status}</span>
            </Badge>
          </div>
          <p className="text-small text-muted-foreground mb-1">{project.client}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
        </div>
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{project.lastActivity}</span>
          </div>
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, index) => (
              <Avatar key={index} className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="gradient-secondary text-white text-xs">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{project.team.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{project.team.length} members</span>
          </div>
          <span className="text-xs text-muted-foreground">Due {project.dueDate}</span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="px-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-hero text-foreground font-bold">Projects</h1>
          <p className="text-body text-muted-foreground mt-2">
            Manage your active projects and track progress
          </p>
        </div>
        <Button 
          className="gradient-primary text-white hover:opacity-90 mt-4 md:mt-0"
          onClick={() => setShowNewProjectModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-border"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="glass-hover">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <div className="flex items-center rounded-lg border border-border p-1 glass">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'gradient-primary text-white' : ''}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'gradient-primary text-white' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="glass-hover p-12 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-heading-3 font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-body text-muted-foreground mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first project'}
          </p>
          <Button 
            className="gradient-primary text-white hover:opacity-90"
            onClick={() => setShowNewProjectModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </Card>
      )}

      <NewProjectModal 
        open={showNewProjectModal} 
        onOpenChange={setShowNewProjectModal} 
      />
    </div>
  );
}