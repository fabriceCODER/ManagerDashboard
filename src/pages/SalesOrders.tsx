
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Eye, Edit, Trash2, Receipt, Download } from 'lucide-react';
import DataTable from '@/components/UI/DataTable';
import EmptyState from '@/components/UI/EmptyState';
import { InputField, SelectField } from '@/components/UI/FormField';

interface SalesOrder {
  id: string;
  orderNumber: string;
  customer: string;
  totalAmount: number;
  status: 'draft' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate: string;
  items: number;
}

const mockSalesOrders: SalesOrder[] = [
  {
    id: '1',
    orderNumber: 'SO-2024-001',
    customer: 'ABC Corporation',
    totalAmount: 12400.00,
    status: 'confirmed',
    orderDate: '2024-01-16',
    deliveryDate: '2024-01-20',
    items: 4
  },
  {
    id: '2',
    orderNumber: 'SO-2024-002',
    customer: 'XYZ Industries',
    totalAmount: 7850.50,
    status: 'shipped',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-18',
    items: 2
  }
];

const SalesOrders = () => {
  const [orders, setOrders] = useState<SalesOrder[]>(mockSalesOrders);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: '',
    deliveryDate: '',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const columns = [
    { key: 'orderNumber', label: 'Order Number', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
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
    { key: 'deliveryDate', label: 'Delivery Date', sortable: true },
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
      render: (_, order: SalesOrder) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
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

  const customerOptions = [
    { value: 'abc-corp', label: 'ABC Corporation' },
    { value: 'xyz-industries', label: 'XYZ Industries' },
    { value: 'tech-solutions', label: 'Tech Solutions Inc' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Orders</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage customer orders and invoices</p>
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
              <DialogTitle>Create Sales Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <SelectField
                label="Customer"
                value={newOrder.customer}
                onChange={(value) => setNewOrder({ ...newOrder, customer: value })}
                options={customerOptions}
                placeholder="Select customer"
                required
              />
              <InputField
                label="Delivery Date"
                type="text"
                value={newOrder.deliveryDate}
                onChange={(value) => setNewOrder({ ...newOrder, deliveryDate: value })}
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
            <Receipt className="h-5 w-5 mr-2" />
            Sales Orders
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
              icon={Receipt}
              title="No sales orders"
              description="Get started by creating your first sales order for a customer."
              actionLabel="Create Order"
              onAction={() => setIsCreateModalOpen(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOrders;
