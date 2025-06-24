
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/UI/DataTable';
import { Plus, Edit, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react';

const Suppliers = () => {
  const suppliers = [
    {
      id: 'SUP001',
      name: 'Apple Inc.',
      email: 'orders@apple.com',
      phone: '+1-800-APL-CARE',
      address: 'Cupertino, CA, USA',
      products: 15,
      totalOrders: 45,
      lastOrder: '2024-01-15',
      status: 'Active',
      rating: 5.0
    },
    {
      id: 'SUP002',
      name: 'Samsung Electronics',
      email: 'b2b@samsung.com',
      phone: '+1-800-SAMSUNG',
      address: 'Seoul, South Korea',
      products: 23,
      totalOrders: 67,
      lastOrder: '2024-01-14',
      status: 'Active',
      rating: 4.8
    },
    {
      id: 'SUP003',
      name: 'Logitech',
      email: 'sales@logitech.com',
      phone: '+41-21-863-5111',
      address: 'Lausanne, Switzerland',
      products: 12,
      totalOrders: 29,
      lastOrder: '2024-01-12',
      status: 'Active',
      rating: 4.6
    },
    {
      id: 'SUP004',
      name: 'ErgoChair Co.',
      email: 'contact@ergochair.com',
      phone: '+1-555-ERGO-CHAIR',
      address: 'Austin, TX, USA',
      products: 8,
      totalOrders: 18,
      lastOrder: '2024-01-10',
      status: 'Inactive',
      rating: 4.2
    }
  ];

  const columns = [
    { key: 'name', label: 'Supplier Name', sortable: true },
    { 
      key: 'contact', 
      label: 'Contact Info',
      render: (_, row: any) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <Mail className="h-3 w-3 mr-1 text-gray-400" />
            {row.email}
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-3 w-3 mr-1 text-gray-400" />
            {row.phone}
          </div>
        </div>
      )
    },
    { 
      key: 'address', 
      label: 'Location',
      render: (value: string) => (
        <div className="flex items-center text-sm">
          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
          {value}
        </div>
      )
    },
    { key: 'products', label: 'Products', sortable: true },
    { key: 'totalOrders', label: 'Total Orders', sortable: true },
    { 
      key: 'rating', 
      label: 'Rating',
      render: (value: number) => (
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 font-medium">{value}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Suppliers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your supplier relationships and contacts
          </p>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {suppliers.filter(s => s.status === 'Active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.reduce((sum, s) => sum + s.products, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={suppliers}
            searchable={true}
            pagination={true}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Suppliers;
