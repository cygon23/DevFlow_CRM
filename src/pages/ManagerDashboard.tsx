import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/StatsCard';
import { ActivityItem } from '@/components/ActivityItem';
import { Briefcase, Users as UsersIcon, TrendingUp as TrendingUpIcon, DollarSign } from 'lucide-react';

export default function ManagerDashboard() {
  useEffect(() => {
    document.title = 'Manager Dashboard | DevFlow';
  }, []);

  return (
    <div className="container max-w-6xl mx-auto px-4 space-y-6">
      <header>
        <h1 className="text-heading-2 font-semibold text-foreground">Manager Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of team performance and pipeline.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Active Projects" value="12" change="+8% WoW" icon={Briefcase} trend="up" />
        <StatsCard title="Open Deals" value="23" change="+3 this week" icon={TrendingUpIcon} trend="up" />
        <StatsCard title="Team Members" value="9" change="-1 change" icon={UsersIcon} trend="down" />
        <StatsCard title="Revenue (M)" value="$0.84" change="+12%" icon={DollarSign} trend="up" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Team Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ActivityItem icon={UsersIcon} title="Anna updated project timeline" description="Shifted milestones for Website Redesign" time="2h ago" />
            <ActivityItem icon={TrendingUpIcon} title="Liam moved deal to Negotiation" description="Deal: ACME Integration" time="4h ago" />
            <ActivityItem icon={Briefcase} title="Noah added client ACME Corp" description="Client added to Q4 pipeline" time="Yesterday" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pipeline Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Conversion rate up 3% WoW. Focus on stalled deals in Proposal stage.
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
