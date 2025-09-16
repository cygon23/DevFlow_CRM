import React, { useState } from 'react';
import { X, FileText, User, DollarSign, Calendar, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface NewProposalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProposalModal({ open, onOpenChange }: NewProposalModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    template: '',
    value: '',
    validUntil: '',
    currency: 'USD',
    paymentTerms: '',
    deliveryTimeline: '',
    projectDescription: '',
    scopeOfWork: '',
    assumptions: '',
    tags: [] as string[],
    currentTag: '',
    sendImmediately: false,
    includeTerms: true,
    requireSignature: true
  });

  const clients = [
    { id: '1', name: 'Sarah Chen', company: 'TechStart Inc', email: 'sarah@techstart.com' },
    { id: '2', name: 'Mike Rodriguez', company: 'Startup Labs', email: 'mike@startuplabs.com' },
    { id: '3', name: 'Emily Watson', company: 'DataFlow Corp', email: 'emily@dataflow.com' },
    { id: '4', name: 'James Liu', company: 'FinTech Pro', email: 'james@fintechpro.com' },
    { id: '5', name: 'Lisa Park', company: 'Creative Studio', email: 'lisa@creativestudio.com' }
  ];

  const templates = [
    { id: 'web-dev', name: 'Web Development', description: 'Standard web development proposal' },
    { id: 'mobile-app', name: 'Mobile App', description: 'Mobile application development proposal' },
    { id: 'ecommerce', name: 'E-commerce', description: 'E-commerce platform proposal' },
    { id: 'saas', name: 'SaaS Development', description: 'Software as a Service development proposal' },
    { id: 'consulting', name: 'Consulting', description: 'Technical consulting proposal' },
    { id: 'custom', name: 'Custom', description: 'Start from scratch' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = formData.sendImmediately ? 'sent' : 'saved as draft';
    toast({
      title: "Proposal Created Successfully!",
      description: `${formData.title} has been ${action}.`,
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      client: '',
      template: '',
      value: '',
      validUntil: '',
      currency: 'USD',
      paymentTerms: '',
      deliveryTimeline: '',
      projectDescription: '',
      scopeOfWork: '',
      assumptions: '',
      tags: [],
      currentTag: '',
      sendImmediately: false,
      includeTerms: true,
      requireSignature: true
    });
  };

  const addTag = () => {
    if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && formData.currentTag.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  // Set default expiry date (30 days from now)
  const getDefaultExpiryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      
      <Card className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass border-border/40 mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div>
            <h2 className="text-heading-2 font-bold text-foreground">Create New Proposal</h2>
            <p className="text-body text-muted-foreground mt-1">
              Create a professional proposal to win more clients
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Proposal Title *</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="E-commerce Platform Development Proposal"
                required
                className="glass"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Client *</span>
                </Label>
                <Select value={formData.client} onValueChange={(value) => setFormData(prev => ({ ...prev, client: value }))}>
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} - {client.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <Select value={formData.template} onValueChange={(value) => setFormData(prev => ({ ...prev, template: value }))}>
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Total Value *</span>
              </Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                placeholder="25000"
                required
                className="glass"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="validUntil" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Valid Until</span>
              </Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil || getDefaultExpiryDate()}
                onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                className="glass"
              />
            </div>
          </div>

          {/* Timeline and Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryTimeline" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Delivery Timeline</span>
              </Label>
              <Select value={formData.deliveryTimeline} onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryTimeline: value }))}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-weeks">2 Weeks</SelectItem>
                  <SelectItem value="1-month">1 Month</SelectItem>
                  <SelectItem value="2-months">2 Months</SelectItem>
                  <SelectItem value="3-months">3 Months</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="custom">Custom Timeline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select value={formData.paymentTerms} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50-50">50% Upfront, 50% on Completion</SelectItem>
                  <SelectItem value="33-33-34">33% Upfront, 33% Midway, 34% on Completion</SelectItem>
                  <SelectItem value="monthly">Monthly Payments</SelectItem>
                  <SelectItem value="milestone">Milestone-based</SelectItem>
                  <SelectItem value="full-upfront">100% Upfront</SelectItem>
                  <SelectItem value="net-30">Net 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description *</Label>
              <Textarea
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                placeholder="Provide a brief overview of the project, client needs, and objectives..."
                rows={3}
                required
                className="glass resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scopeOfWork">Scope of Work *</Label>
              <Textarea
                id="scopeOfWork"
                value={formData.scopeOfWork}
                onChange={(e) => setFormData(prev => ({ ...prev, scopeOfWork: e.target.value }))}
                placeholder="Detail what will be delivered, features included, and any technical specifications..."
                rows={4}
                required
                className="glass resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assumptions">Assumptions & Exclusions</Label>
              <Textarea
                id="assumptions"
                value={formData.assumptions}
                onChange={(e) => setFormData(prev => ({ ...prev, assumptions: e.target.value }))}
                placeholder="List any assumptions made and what's excluded from the scope..."
                rows={3}
                className="glass resize-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={formData.currentTag}
                onChange={(e) => setFormData(prev => ({ ...prev, currentTag: e.target.value }))}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag..."
                className="glass"
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4 p-4 bg-surface/50 rounded-lg border border-border/40">
            <h3 className="text-sm font-medium text-foreground">Proposal Settings</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="includeTerms" className="text-sm">Include Terms & Conditions</Label>
                <Switch
                  id="includeTerms"
                  checked={formData.includeTerms}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeTerms: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="requireSignature" className="text-sm">Require Digital Signature</Label>
                <Switch
                  id="requireSignature"
                  checked={formData.requireSignature}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requireSignature: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sendImmediately" className="text-sm flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Send Immediately</span>
                </Label>
                <Switch
                  id="sendImmediately"
                  checked={formData.sendImmediately}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendImmediately: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              {formData.sendImmediately ? 'Create & Send' : 'Create Proposal'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}