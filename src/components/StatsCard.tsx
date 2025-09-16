import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({ title, value, change, icon: Icon, trend = 'neutral' }: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-accent-success';
      case 'down': return 'text-accent-danger';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="glass-hover p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-small text-muted-foreground font-medium">{title}</p>
          <p className="text-heading-2 font-bold text-foreground mt-1">{value}</p>
          {change && (
            <p className={`text-xs font-medium mt-1 ${getTrendColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className="gradient-primary p-3 rounded-xl">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );
}