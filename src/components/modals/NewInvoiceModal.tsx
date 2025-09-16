import React, { useState } from 'react';
import { X, Receipt, User, DollarSign, Calendar, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface NewInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewInvoiceModal({ open, onOpenChange }: NewInvoiceModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    client: '',
    project: '',
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: 'USD',
    taxRate: '',
    discountType: 'none',
    discountValue: '',
    notes: '',
    paymentTerms: '',
    tags: [] as string[],
    currentTag: '',
    sendImmediately: false,
    items: [
      { description: '', quantity: 1, rate: 0, amount: 0 }
    ] as InvoiceItem[]
  });

  const clients = [
    { id: '1', name: 'Sarah Chen', company: 'TechStart Inc', email: 'sarah@techstart.com' },
    { id: '2', name: 'Mike Rodriguez', company: 'Startup Labs', email: 'mike@startuplabs.com' },
    { id: '3', name: 'Emily Watson', company: 'DataFlow Corp', email: 'emily@dataflow.com' },
    { id: '4', name: 'James Liu', company: 'FinTech Pro', email: 'james@fintechpro.com' },
    { id: '5', name: 'Lisa Park', company: 'Creative Studio', email: 'lisa@creativestudio.com' }
  ];

  const projects = [
    'E-commerce Website',
    'Mobile App Development',
    'SaaS Dashboard',
    'API Integration',
    'Brand Website',
    'Custom Software'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = formData.sendImmediately ? 'sent' : 'saved as draft';
    toast({
      title: "Invoice Created Successfully!",
      description: `Invoice ${formData.invoiceNumber} has been ${action}.`,
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      client: '',
      project: '',
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      currency: 'USD',
      taxRate: '',
      discountType: 'none',
      discountValue: '',
      notes: '',
      paymentTerms: '',
      tags: [],
      currentTag: '',
      sendImmediately: false,
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      // Calculate amount if quantity or rate changed
      if (field === 'quantity' || field === 'rate') {
        newItems[index].amount = newItems[index].quantity * newItems[index].rate;
      }
      
      return { ...prev, items: newItems };
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

  // Calculate totals
  const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = formData.discountType === 'percentage' 
    ? (subtotal * (parseFloat(formData.discountValue) || 0)) / 100
    : parseFloat(formData.discountValue) || 0;
  const taxAmount = ((subtotal - discountAmount) * (parseFloat(formData.taxRate) || 0)) / 100;
  const total = subtotal - discountAmount + taxAmount;

  // Set default due date (30 days from issue date)
  const getDefaultDueDate = () => {
    const date = new Date(formData.issueDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      
      <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass border-border/40 mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div>
            <h2 className="text-heading-2 font-bold text-foreground">Create New Invoice</h2>
            <p className="text-body text-muted-foreground mt-1">
              Generate a professional invoice for your client
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
              <Label htmlFor="project">Project</Label>
              <Select value={formData.project} onValueChange={(value) => setFormData(prev => ({ ...prev, project: value }))}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber" className="flex items-center space-x-2">
                <Receipt className="h-4 w-4" />
                <span>Invoice Number *</span>
              </Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
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
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Issue Date *</span>
              </Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                required
                className="glass"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate || getDefaultDueDate()}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                required
                className="glass"
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Invoice Items *</Label>
              <Button type="button" onClick={addItem} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <Card key={index} className="p-4 glass-hover">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-5 space-y-2">
                      <Label>Description *</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="Web development services"
                        required
                        className="glass"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        min="0"
                        step="1"
                        className="glass"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label>Rate</Label>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className="glass"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        value={item.amount.toFixed(2)}
                        readOnly
                        className="glass bg-muted/50"
                      />
                    </div>
                    
                    <div className="md:col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        disabled={formData.items.length === 1}
                        className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Totals and Adjustments */}
          <Card className="p-4 glass-hover">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discountType">Discount</Label>
                <div className="flex space-x-2">
                  <Select value={formData.discountType} onValueChange={(value) => setFormData(prev => ({ ...prev, discountType: value }))}>
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Discount</SelectItem>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.discountType !== 'none' && (
                    <Input
                      type="number"
                      value={formData.discountValue}
                      onChange={(e) => setFormData(prev => ({ ...prev, discountValue: e.target.value }))}
                      placeholder="0"
                      min="0"
                      className="glass w-24"
                    />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, taxRate: e.target.value }))}
                  placeholder="0"
                  min="0"
                  max="100"
                  step="0.01"
                  className="glass"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Invoice Total</Label>
                <div className="text-right space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Subtotal: {formData.currency} {subtotal.toFixed(2)}
                  </div>
                  {discountAmount > 0 && (
                    <div className="text-sm text-green-600">
                      Discount: -{formData.currency} {discountAmount.toFixed(2)}
                    </div>
                  )}
                  {taxAmount > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Tax: {formData.currency} {taxAmount.toFixed(2)}
                    </div>
                  )}
                  <div className="text-lg font-bold text-foreground">
                    Total: {formData.currency} {total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select value={formData.paymentTerms} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Due Immediately</SelectItem>
                  <SelectItem value="net-15">Net 15 Days</SelectItem>
                  <SelectItem value="net-30">Net 30 Days</SelectItem>
                  <SelectItem value="net-60">Net 60 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sendImmediately" className="flex items-center space-x-2">
                <span>Send Immediately</span>
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sendImmediately"
                  checked={formData.sendImmediately}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendImmediately: checked }))}
                />
                <span className="text-sm text-muted-foreground">
                  {formData.sendImmediately ? 'Will be sent to client' : 'Save as draft'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Thank you for your business! Payment is due within 30 days."
              rows={3}
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
                placeholder="Add a tag..."
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
              {formData.sendImmediately ? 'Create & Send' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}