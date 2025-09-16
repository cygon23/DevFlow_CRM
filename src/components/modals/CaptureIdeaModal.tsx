import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Lightbulb, 
  Mic, 
  Camera, 
  Link as LinkIcon,
  Zap, 
  X,
  Plus,
  Brain,
  Target,
  Sparkles,
  Upload,
  Type
} from 'lucide-react';

interface CaptureIdeaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const captureTypes = [
  { id: 'text', label: 'Text Note', icon: Type, description: 'Write your idea in detail' },
  { id: 'voice', label: 'Voice Recording', icon: Mic, description: 'Record your idea while you think' },
  { id: 'image', label: 'Screenshot/Image', icon: Camera, description: 'Visual inspiration or mockup' },
  { id: 'link', label: 'Web Link', icon: LinkIcon, description: 'Save inspiring content from the web' },
];

const categories = [
  { value: 'raw', label: 'Raw Idea', color: 'bg-muted' },
  { value: 'feature', label: 'Feature Request', color: 'bg-accent-warning/20 text-accent-warning' },
  { value: 'improvement', label: 'Improvement', color: 'bg-accent-info/20 text-accent-info' },
  { value: 'business', label: 'Business Opportunity', color: 'bg-accent-success/20 text-accent-success' },
];

const suggestedTags = [
  'AI', 'UI/UX', 'Performance', 'Mobile', 'API', 'Integration', 
  'Automation', 'Analytics', 'Security', 'Scalability'
];

export function CaptureIdeaModal({ open, onOpenChange }: CaptureIdeaModalProps) {
  const [captureType, setCaptureType] = useState('text');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    priority: '',
    inspiration: '',
    relatedProjects: [] as string[],
  });
  const [newTag, setNewTag] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Capturing idea:', { ...formData, captureType });
    // Here you would typically call an API to save the idea
    onOpenChange(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: [],
      priority: '',
      inspiration: '',
      relatedProjects: [],
    });
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
  };

  const renderCaptureInterface = () => {
    switch (captureType) {
      case 'voice':
        return (
          <Card className="p-6 text-center border-dashed">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              isRecording ? 'bg-accent-danger animate-pulse' : 'bg-primary/10'
            }`}>
              <Mic className={`h-8 w-8 ${isRecording ? 'text-white' : 'text-primary'}`} />
            </div>
            <Button 
              type="button"
              onClick={toggleRecording}
              className={isRecording ? 'bg-accent-danger hover:bg-accent-danger/90' : 'gradient-primary'}
              size="lg"
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {isRecording ? 'Recording your idea...' : 'Click to start voice recording'}
            </p>
          </Card>
        );
      
      case 'image':
        return (
          <Card className="p-6 text-center border-dashed">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <Button type="button" variant="outline" className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Take Screenshot
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Capture visual inspiration or mockups
            </p>
          </Card>
        );
      
      case 'link':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-sm font-medium">Web URL</Label>
              <Input
                id="url"
                placeholder="https://example.com/inspiration"
                className="mt-1"
              />
            </div>
            <Button type="button" variant="outline" className="w-full">
              <LinkIcon className="h-4 w-4 mr-2" />
              Fetch Preview
            </Button>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">Idea Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="What's your big idea?"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your idea in detail..."
                className="mt-1 min-h-[120px]"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-primary bg-clip-text text-transparent flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-primary" />
            Capture New Idea
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Capture Type Selector */}
          <div>
            <Label className="text-sm font-medium mb-3 block">How would you like to capture this idea?</Label>
            <div className="grid grid-cols-2 gap-3">
              {captureTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.id}
                    className={`p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                      captureType === type.id ? 'ring-2 ring-primary border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}
                    onClick={() => setCaptureType(type.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        captureType === type.id ? 'bg-primary text-white' : 'bg-muted'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Dynamic Capture Interface */}
          {renderCaptureInterface()}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Category</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Categorize your idea" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Priority</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="How urgent is this?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium">Tags</Label>
            <div className="flex space-x-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add custom tag..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newTag))}
              />
              <Button type="button" onClick={() => addTag(newTag)} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Suggested Tags */}
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-white text-xs"
                    onClick={() => addTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <Badge key={tag} className="flex items-center space-x-1 bg-primary text-white">
                    <span>{tag}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          <Card className="p-4 bg-secondary/5 border-secondary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">AI Suggestions</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">This idea could connect with your "API Redesign" project</span>
                <Button size="sm" variant="ghost" className="h-6 text-xs">
                  <LinkIcon className="h-3 w-3 mr-1" />
                  Link
                </Button>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Similar to ideas tagged with "Performance"</span>
                <Button size="sm" variant="ghost" className="h-6 text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Explore
                </Button>
              </div>
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              <Zap className="h-4 w-4 mr-2" />
              Capture Idea
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}