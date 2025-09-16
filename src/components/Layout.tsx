import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Lightbulb, 
  Users, 
  Settings, 
  Plus,
  Menu,
  X,
  TrendingUp,
  FileText,
  Receipt,
  Bell,
  Search,
  UserPlus,
  Shield,
  Target,
  PieChart,
  LogOut,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { QuickCapture } from '@/components/QuickCapture';
import { toast } from 'sonner';

// Different navigation items for each role
const roleNavigation = {
  admin: [
    { name: 'Admin Dashboard', href: '/dashboard', icon: Shield },
    { name: 'Audit Log', href: '/audit', icon: History },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Pipeline', href: '/pipeline', icon: TrendingUp },
    { name: 'Proposals', href: '/proposals', icon: FileText },
    { name: 'Invoices', href: '/invoices', icon: Receipt },
  ],
  manager: [
    { name: 'Manager Dashboard', href: '/dashboard', icon: Target },
    { name: 'Team', href: '/clients', icon: Users },
    { name: 'Performance', href: '/pipeline', icon: PieChart },
    { name: 'Reports', href: '/proposals', icon: FileText },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Invoices', href: '/invoices', icon: Receipt },
  ],
  user: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', href: '/projects', icon: FolderOpen },
    { name: 'Ideas', href: '/ideas', icon: Lightbulb },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Pipeline', href: '/pipeline', icon: TrendingUp },
    { name: 'Proposals', href: '/proposals', icon: FileText },
    { name: 'Invoices', href: '/invoices', icon: Receipt },
  ]
};

// Get user role from localStorage (set during login)
const getUserRole = () => {
  return localStorage.getItem('userRole') || 'user';
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickCaptureOpen, setQuickCaptureOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const userRole = getUserRole();
  const navigation = roleNavigation[userRole as keyof typeof roleNavigation] || roleNavigation.user;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-50">
        <div className="flex flex-col flex-grow pt-5 pb-4 glass border-r border-border">
          <div className="flex items-center flex-shrink-0 px-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="gradient-primary p-2 rounded-lg">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-heading-3 text-foreground font-bold">DevFlow CRM</span>
              </div>
              
              {/* Quick Actions & Notifications */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-danger rounded-full animate-pulse" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex-1 flex flex-col">
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive(item.href)
                      ? 'gradient-primary text-white shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="px-4 mt-8 space-y-3">
              <Link to="/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              
              <Button 
                variant="destructive"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </Button>
              
              {/* Pro Section */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">DevFlow Pro</span>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">FREE</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Unlock advanced features and unlimited projects
                </p>
                <Button size="sm" className="w-full gradient-primary text-white">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 px-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="gradient-primary text-white text-sm font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">john@devflow.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 glass border-b border-border">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <div className="gradient-primary p-1.5 rounded-lg">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold text-foreground">DevFlow</span>
            </div>
          </div>
          
          <Avatar className="h-8 w-8">
            <AvatarFallback className="gradient-primary text-white text-sm font-medium">
              JD
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-0 left-0 w-64 h-full glass border-r border-border flex flex-col">
              <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center">
                  <div className="gradient-primary p-2 rounded-lg">
                    <LayoutDashboard className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 text-lg font-bold text-foreground">DevFlow</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="mt-8 px-4 space-y-2 flex-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive(item.href)
                        ? 'gradient-primary text-white shadow-lg'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
                      }
                    `}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {/* Bottom section for mobile */}
              <div className="px-4 pb-4 space-y-2">
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                
                <Button 
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="py-6">
          {children}
        </main>
      </div>

      {/* Quick Capture Floating Button */}
      <button
        onClick={() => setQuickCaptureOpen(true)}
        className="fixed bottom-6 right-6 gradient-primary p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow hover:scale-105 z-40"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      {/* Quick Capture Modal */}
      <QuickCapture open={quickCaptureOpen} onOpenChange={setQuickCaptureOpen} />
    </div>
  );
}