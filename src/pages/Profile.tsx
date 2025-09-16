import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Edit3,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  Award
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userProfile = {
    name: 'Alex Johnson',
    title: 'Senior Product Designer & Developer',
    email: 'alex.johnson@devflow.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    joinDate: 'March 2023',
    bio: 'Passionate product designer and full-stack developer with 8+ years of experience building user-centered digital products. I specialize in design systems, React development, and turning complex problems into elegant solutions.',
    website: 'alexjohnson.dev',
    social: {
      github: 'alexjohnson',
      linkedin: 'alexjohnson-design',
      twitter: '@alexjohnson_dev'
    }
  };

  const stats = [
    { label: 'Projects Completed', value: 47, icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Ideas Captured', value: 312, icon: <Target className="w-5 h-5" /> },
    { label: 'Team Collaborations', value: 23, icon: <Users className="w-5 h-5" /> },
    { label: 'Client Rating', value: '4.9/5', icon: <Star className="w-5 h-5" /> }
  ];

  const achievements = [
    {
      title: 'Project Pioneer',
      description: 'Completed first project successfully',
      date: 'March 2023',
      icon: <Trophy className="w-6 h-6 text-yellow-500" />
    },
    {
      title: 'Idea Generator',
      description: 'Captured 100+ ideas',
      date: 'June 2023',
      icon: <Target className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Team Player',
      description: 'Collaborated on 20+ projects',
      date: 'September 2023',
      icon: <Users className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Quality Master',
      description: 'Maintained 4.8+ rating for 6 months',
      date: 'December 2023',
      icon: <Award className="w-6 h-6 text-purple-500" />
    }
  ];

  const recentProjects = [
    {
      name: 'E-commerce Redesign',
      client: 'TechCorp Inc.',
      status: 'Completed',
      progress: 100,
      date: 'Dec 2024'
    },
    {
      name: 'Mobile App UI',
      client: 'StartupXYZ',
      status: 'In Progress',
      progress: 75,
      date: 'Jan 2025'
    },
    {
      name: 'Dashboard Analytics',
      client: 'DataFlow Ltd.',
      status: 'Planning',
      progress: 25,
      date: 'Jan 2025'
    }
  ];

  const skills = [
    { name: 'UI/UX Design', level: 95 },
    { name: 'React Development', level: 90 },
    { name: 'Figma', level: 95 },
    { name: 'TypeScript', level: 85 },
    { name: 'Design Systems', level: 92 },
    { name: 'Node.js', level: 80 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-white">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">{userProfile.name}</h1>
                <p className="text-lg text-muted-foreground mb-2">{userProfile.title}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userProfile.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Badge className="bg-green-100 text-green-800">Online</Badge>
                <Badge variant="outline">Pro Member</Badge>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-2xl">{userProfile.bio}</p>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 text-center">
            <div className="flex items-center justify-center mb-2 text-primary">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userProfile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userProfile.website}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userProfile.timezone}</span>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Social Profiles</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary transition-colors">
                  <Github className="w-4 h-4" />
                  <span>github.com/{userProfile.social.github}</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span>linkedin.com/in/{userProfile.social.linkedin}</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span>{userProfile.social.twitter}</span>
                </a>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm">Completed project "E-commerce Redesign"</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pb-3 border-b">
                <Target className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm">Captured new idea: "AI-powered user onboarding"</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm">Joined collaboration on "Mobile App UI" project</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Projects</h3>
              <Button variant="outline" size="sm">View All Projects</Button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={project.status === 'Completed' ? 'default' : 
                                project.status === 'In Progress' ? 'secondary' : 'outline'}
                      >
                        {project.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{project.date}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Skills & Expertise</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Achievements & Milestones</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
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

export default Profile;