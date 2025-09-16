import React, { useState } from 'react';
import { X, Target, User, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface NewDealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewDealModal({ open, onOpenChange }: NewDealModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    company: '',
    stage: 'lead',
    value: '',
    probability: [25],
    expectedCloseDate: '',
    priority: 'medium',
    description: '',
    tags: [] as string[],
    currentTag: '',
    source: '',
    nextAction: '',
    nextActionDate: ''
  });

  const clients = [
    { id: '1', name: 'Sarah Chen', company: 'TechStart Inc' },
    { id: '2', name: 'Mike Rodriguez', company: 'Startup Labs' },
    { id: '3', name: 'Emily Watson', company: 'DataFlow Corp' },
    { id: '4', name: 'James Liu', company: 'FinTech Pro' },
    { id: '5', name: 'Lisa Park', company: 'Creative Studio' }
  ];

  const stages = [
    { value: 'lead', label: 'Lead', probability: 25 },
    { value: 'qualified', label: 'Qualified', probability: 50 },
    { value: 'proposal', label: 'Proposal Sent', probability: 75 },
    { value: 'negotiation', label: 'Negotiation', probability: 85 },
    { value: 'won', label: 'Won', probability: 100 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Deal Created Successfully!",
      description: `${formData.title} has been added to your sales pipeline.`,
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      client: '',
      company: '',
      stage: 'lead',
      value: '',
      probability: [25],
      expectedCloseDate: '',
      priority: 'medium',
      description: '',
      tags: [],
      currentTag: '',
      source: '',
      nextAction: '',
      nextActionDate: ''
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

  const handleStageChange = (stage: string) => {
    const selectedStage = stages.find(s => s.value === stage);
    setFormData(prev => ({
      ...prev,
      stage,
      probability: [selectedStage?.probability || 25]
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass border-border/40 mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div>
            <h2 className="text-heading-2 font-bold text-foreground">Create New Deal</h2>
            <p className="text-body text-muted-foreground mt-1">
              Add a new opportunity to your sales pipeline
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
                <Target className="h-4 w-4" />
                <span>Deal Title *</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="E-commerce Website Development"
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
                <Select value={formData.client} onValueChange={(value) => {
                  const selectedClient = clients.find(c => c.id === value);
                  setFormData(prev => ({ 
                    ...prev, 
                    client: value,
                    company: selectedClient?.company || ''
                  }));
                }}>
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
                <Label htmlFor="stage">Pipeline Stage *</Label>
                <Select value={formData.stage} onValueChange={handleStageChange}>
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Deal Value *</span>
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
              <Label htmlFor="expectedCloseDate" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Expected Close Date *</span>
              </Label>
              <Input
                id="expectedCloseDate"
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedCloseDate: e.target.value }))}
                required
                className="glass"
              />
            </div>
          </div>

          {/* Probability Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center space-x-2">
                <span>Win Probability</span>
              </Label>
              <span className="text-sm font-medium text-foreground">{formData.probability[0]}%</span>
            </div>
            <Slider
              value={formData.probability}
              onValueChange={(value) => setFormData(prev => ({ ...prev, probability: value }))}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Priority and Source */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Priority</span>
              </Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
              <Badge className={getPriorityColor(formData.priority)}>
                {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source">Lead Source</Label>
              <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="How did you find this lead?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                  <SelectItem value="event">Event/Conference</SelectItem>
                  <SelectItem value="existing-client">Existing Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Next Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nextAction">Next Action</Label>
              <Input
                id="nextAction"
                value={formData.nextAction}
                onChange={(e) => setFormData(prev => ({ ...prev, nextAction: e.target.value }))}
                placeholder="Schedule discovery call"
                className="glass"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nextActionDate">Action Due Date</Label>
              <Input
                id="nextActionDate"
                type="date"
                value={formData.nextActionDate}
                onChange={(e) => setFormData(prev => ({ ...prev, nextActionDate: e.target.value }))}
                className="glass"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the project requirements, client needs, and any important details..."
              rows={4}
              className="glass resize-none"
            />
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
                placeholder="Add a tag (e.g., React, E-commerce, Mobile)..."
                className="glass"
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
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
              Create Deal
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}