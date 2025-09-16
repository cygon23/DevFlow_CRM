import { useState } from 'react';
import { Mic, MicOff, Paperclip, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuickCaptureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const suggestedTags = ['Feature', 'Bug', 'Improvement', 'Research', 'Design', 'Technical'];
const projects = ['DevFlow Web App', 'Mobile App', 'API Redesign', 'New Landing Page'];

export function QuickCapture({ open, onOpenChange }: QuickCaptureProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState('');

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSave = () => {
    // In a real app, this would save to your backend
    console.log('Saving:', { content, selectedTags, selectedProject });
    
    // Reset form
    setContent('');
    setSelectedTags([]);
    setSelectedProject('');
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glass border-border p-0 overflow-hidden">
        <div className="gradient-surface p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="gradient-primary p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-heading-3 text-foreground font-semibold">Quick Capture</h2>
                <p className="text-small text-muted-foreground">Capture your ideas instantly</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Main Content Area */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Your Idea</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                    className={isRecording ? "animate-pulse" : ""}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Voice Note
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File
                  </Button>
                </div>
              </div>

              <Textarea
                placeholder="Describe your idea, feature request, or anything that comes to mind..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-32 glass border-border resize-none focus:border-primary/50"
              />

              {isRecording && (
                <div className="flex items-center justify-center p-4 glass rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-primary rounded animate-pulse" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{ animationDelay: '100ms' }}></div>
                      <div className="w-1 h-8 bg-primary rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-1 h-4 bg-primary rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{ animationDelay: '400ms' }}></div>
                    </div>
                    <span className="text-sm text-primary font-medium">Recording...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tags Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedTags.includes(tag) 
                        ? 'gradient-primary text-white hover:opacity-80' 
                        : 'glass-hover'
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Link to Project (Optional)</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="glass border-border">
                  <SelectValue placeholder="Select a project to link this idea" />
                </SelectTrigger>
                <SelectContent className="glass border-border">
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-success rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Auto-saving...</span>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="gradient-primary text-white hover:opacity-90"
                  disabled={!content.trim()}
                >
                  Capture Idea
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}