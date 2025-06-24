
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Eye, Edit, Trash2, ShoppingCart } from 'lucide-react';
import DataTable from '@/components/UI/DataTable';
import EmptyState from '@/components/UI/EmptyState';
import { InputField, SelectField } from '@/components/UI/FormField';

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'received' | 'cancelled';
  orderDate: string;
  expectedDate: string;
  items: number;
}

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    orderNumber: 'PO-2024-001',
    supplier: 'Tech Components Ltd',
    totalAmount: 15750.00,
    status: 'pending',
    orderDate: '2024-01-15',
    expectedDate: '2024-01-25',
    items: 5
  },
  {
    id: '2',
    orderNumber: 'PO-2024-002',
    supplier: 'Global Electronics',
    totalAmount: 8420.50,
    status: 'approved',
    orderDate: '2024-01-14',
    expectedDate: '2024-01-22',
    items: 3
  }
];

const PurchaseOrders = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    supplier: '',
    expectedDate: '',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'received': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const columns = [
    { key: 'orderNumber', label: 'Order Number', sortable: true },
    { key: 'supplier', label: 'Supplier', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status: string) => (
        <Badge className={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
    { key: 'orderDate', label: 'Order Date', sortable: true },
    { key: 'expectedDate', label: 'Expected Date', sortable: true },
    { key: 'items', label: 'Items', sortable: true },
    { 
      key: 'totalAmount', 
      label: 'Total Amount', 
      sortable: true,
      render: (amount: number) => `$${amount.toLocaleString()}`
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, order: PurchaseOrder) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const supplierOptions = [
    { value: 'tech-components', label: 'Tech Components Ltd' },
    { value: 'global-electronics', label: 'Global Electronics' },
    { value: 'supply-chain-pro', label: 'Supply Chain Pro' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Purchase Orders</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage purchase orders from suppliers</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Purchase Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <SelectField
                label="Supplier"
                value={newOrder.supplier}
                onChange={(value) => setNewOrder({ ...newOrder, supplier: value })}
                options={supplierOptions}
                placeholder="Select supplier"
                required
              />
              <InputField
                label="Expected Delivery Date"
                type="text"
                value={newOrder.expectedDate}
                onChange={(value) => setNewOrder({ ...newOrder, expectedDate: value })}
                placeholder="YYYY-MM-DD"
                required
              />
              <InputField
                label="Notes"
                type="text"
                value={newOrder.notes}
                onChange={(value) => setNewOrder({ ...newOrder, notes: value })}
                placeholder="Additional notes"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Create Order</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Purchase Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <DataTable
              columns={columns}
              data={orders}
              searchable
              pagination
              pageSize={10}
            />
          ) : (
            <EmptyState
              icon={ShoppingCart}
              title="No purchase orders"
              description="Get started by creating your first purchase order from a supplier."
              actionLabel="Create Order"
              onAction={() => setIsCreateModalOpen(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseOrders;
