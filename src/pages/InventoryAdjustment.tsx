
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, ClipboardList, TrendingUp, TrendingDown } from 'lucide-react';
import DataTable from '@/components/UI/DataTable';
import EmptyState from '@/components/UI/EmptyState';
import { InputField, SelectField, TextareaField } from '@/components/UI/FormField';

interface Adjustment {
  id: string;
  product: string;
  sku: string;
  type: 'increase' | 'decrease';
  quantity: number;
  reason: string;
  adjustedBy: string;
  date: string;
  notes: string;
}

const mockAdjustments: Adjustment[] = [
  {
    id: '1',
    product: 'Wireless Mouse',
    sku: 'WM-001',
    type: 'decrease',
    quantity: 5,
    reason: 'damaged',
    adjustedBy: 'John Doe',
    date: '2024-01-16',
    notes: 'Water damage from warehouse leak'
  },
  {
    id: '2',
    product: 'USB Cable',
    sku: 'UC-045',
    type: 'increase',
    quantity: 10,
    reason: 'found',
    adjustedBy: 'Jane Smith',
    date: '2024-01-15',
    notes: 'Found during warehouse reorganization'
  }
];

const InventoryAdjustment = () => {
  const [adjustments, setAdjustments] = useState<Adjustment[]>(mockAdjustments);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAdjustment, setNewAdjustment] = useState({
    product: '',
    type: 'increase' as 'increase' | 'decrease',
    quantity: '',
    reason: '',
    notes: ''
  });

  const getTypeColor = (type: string) => {
    return type === 'increase' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const columns = [
    { key: 'product', label: 'Product', sortable: true },
    { key: 'sku', label: 'SKU', sortable: true },
    { 
      key: 'type', 
      label: 'Type', 
      sortable: true,
      render: (type: string) => (
        <Badge className={getTypeColor(type)}>
          {type === 'increase' ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      )
    },
    { 
      key: 'quantity', 
      label: 'Quantity', 
      sortable: true,
      render: (quantity: number, adjustment: Adjustment) => (
        <span className={adjustment.type === 'increase' ? 'text-green-600' : 'text-red-600'}>
          {adjustment.type === 'increase' ? '+' : '-'}{quantity}
        </span>
      )
    },
    { key: 'reason', label: 'Reason', sortable: true },
    { key: 'adjustedBy', label: 'Adjusted By', sortable: true },
    { key: 'date', label: 'Date', sortable: true }
  ];

  const productOptions = [
    { value: 'wireless-mouse', label: 'Wireless Mouse (WM-001)' },
    { value: 'usb-cable', label: 'USB Cable (UC-045)' },
    { value: 'keyboard', label: 'Wireless Keyboard (WK-023)' }
  ];

  const reasonOptions = [
    { value: 'damaged', label: 'Damaged' },
    { value: 'lost', label: 'Lost' },
    { value: 'found', label: 'Found' },
    { value: 'expired', label: 'Expired' },
    { value: 'correction', label: 'Stock Correction' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inventory Adjustments</h1>
          <p className="text-gray-500 dark:text-gray-400">Track manual inventory adjustments and corrections</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              New Adjustment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Inventory Adjustment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <SelectField
                label="Product"
                value={newAdjustment.product}
                onChange={(value) => setNewAdjustment({ ...newAdjustment, product: value })}
                options={productOptions}
                placeholder="Select product"
                required
              />
              <SelectField
                label="Adjustment Type"
                value={newAdjustment.type}
                onChange={(value) => setNewAdjustment({ ...newAdjustment, type: value as 'increase' | 'decrease' })}
                options={[
                  { value: 'increase', label: 'Increase Stock' },
                  { value: 'decrease', label: 'Decrease Stock' }
                ]}
                required
              />
              <InputField
                label="Quantity"
                type="number"
                value={newAdjustment.quantity}
                onChange={(value) => setNewAdjustment({ ...newAdjustment, quantity: value })}
                placeholder="Enter quantity"
                required
              />
              <SelectField
                label="Reason"
                value={newAdjustment.reason}
                onChange={(value) => setNewAdjustment({ ...newAdjustment, reason: value })}
                options={reasonOptions}
                placeholder="Select reason"
                required
              />
              <TextareaField
                label="Notes"
                value={newAdjustment.notes}
                onChange={(value) => setNewAdjustment({ ...newAdjustment, notes: value })}
                placeholder="Additional notes"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Create Adjustment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Increases</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {adjustments.filter(adj => adj.type === 'increase').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Decreases</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {adjustments.filter(adj => adj.type === 'decrease').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ClipboardList className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Adjustments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adjustments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-2" />
            Adjustment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {adjustments.length > 0 ? (
            <DataTable
              columns={columns}
              data={adjustments}
              searchable
              pagination
              pageSize={10}
            />
          ) : (
            <EmptyState
              icon={ClipboardList}
              title="No adjustments"
              description="No inventory adjustments have been made yet. Create your first adjustment to track stock changes."
              actionLabel="New Adjustment"
              onAction={() => setIsCreateModalOpen(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryAdjustment;
