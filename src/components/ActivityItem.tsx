import { LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  project?: string;
  user?: {
    name: string;
    initials: string;
  };
}

export function ActivityItem({ 
  icon: Icon, 
  title, 
  description, 
  time, 
  project, 
  user 
}: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-4 p-4 glass-hover rounded-lg animate-slide-up">
      <div className="flex-shrink-0">
        {user ? (
          <Avatar className="h-8 w-8">
            <AvatarFallback className="gradient-secondary text-white text-xs font-medium">
              {user.initials}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="gradient-primary p-2 rounded-lg">
            <Icon className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground truncate">
            {title}
          </p>
          <p className="text-xs text-muted-foreground flex-shrink-0 ml-2">
            {time}
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {description}
        </p>
        
        {project && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {project}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}