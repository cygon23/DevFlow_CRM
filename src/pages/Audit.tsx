import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AuditEntry {
  id: string;
  actor: string;
  role: 'admin' | 'manager' | 'user';
  action: string;
  target: string;
  ip: string;
  at: string; // ISO string
}

const SAMPLE_AUDIT: AuditEntry[] = [
  { id: '1', actor: 'Admin Jane', role: 'admin', action: 'UPDATED_USER_ROLE', target: 'user: mark@company.com -> manager', ip: '192.168.1.10', at: new Date().toISOString() },
  { id: '2', actor: 'Manager Lee', role: 'manager', action: 'CREATED_PROJECT', target: 'project: Website Redesign', ip: '10.10.0.11', at: new Date(Date.now() - 3600_000).toISOString() },
  { id: '3', actor: 'User Sam', role: 'user', action: 'DOWNLOADED_INVOICE', target: 'invoice: INV-2025-014', ip: '172.16.0.22', at: new Date(Date.now() - 7200_000).toISOString() },
];

export default function Audit() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<'all' | 'admin' | 'manager' | 'user'>('all');

  useEffect(() => {
    document.title = 'Audit Log | DevFlow';
  }, []);

  const filtered = useMemo(() => {
    return SAMPLE_AUDIT.filter((e) => {
      const roleOk = role === 'all' ? true : e.role === role;
      const q = query.toLowerCase();
      const text = `${e.actor} ${e.action} ${e.target} ${e.ip}`.toLowerCase();
      return roleOk && text.includes(q);
    });
  }, [query, role]);

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <header className="mb-6">
        <h1 className="text-heading-2 font-semibold text-foreground">Audit Log</h1>
        <p className="text-sm text-muted-foreground">Track critical actions across the platform for security and compliance.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3 mb-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Search actor, action, target, IP"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select value={role} onValueChange={(v) => setRole(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{new Date(e.at).toLocaleString()}</TableCell>
                      <TableCell>{e.actor}</TableCell>
                      <TableCell className="capitalize">{e.role}</TableCell>
                      <TableCell>{e.action.split('_').join(' ')}</TableCell>
                      <TableCell>{e.target}</TableCell>
                      <TableCell>{e.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
