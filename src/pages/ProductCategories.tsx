
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Tags, Package } from 'lucide-react';
import DataTable from '@/components/UI/DataTable';
import EmptyState from '@/components/UI/EmptyState';
import { InputField, TextareaField } from '@/components/UI/FormField';

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  createdDate: string;
  color: string;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices and components',
    productCount: 45,
    createdDate: '2024-01-10',
    color: 'blue'
  },
  {
    id: '2',
    name: 'Furniture',
    description: 'Office and home furniture items',
    productCount: 23,
    createdDate: '2024-01-08',
    color: 'green'
  },
  {
    id: '3',
    name: 'Stationery',
    description: 'Office supplies and stationery items',
    productCount: 67,
    createdDate: '2024-01-05',
    color: 'purple'
  }
];

const ProductCategories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: 'blue'
  });

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'purple': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'red': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Category Name', 
      sortable: true,
      render: (name: string, category: Category) => (
        <div className="flex items-center space-x-2">
          <Badge className={getColorClass(category.color)}>
            <Tags className="h-3 w-3 mr-1" />
            {name}
          </Badge>
        </div>
      )
    },
    { key: 'description', label: 'Description', sortable: true },
    { 
      key: 'productCount', 
      label: 'Products', 
      sortable: true,
      render: (count: number) => (
        <div className="flex items-center space-x-1">
          <Package className="h-4 w-4 text-gray-400" />
          <span>{count}</span>
        </div>
      )
    },
    { key: 'createdDate', label: 'Created Date', sortable: true },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, category: Category) => (
        <div className="flex space-x-2">
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

  const colorOptions = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'yellow', label: 'Yellow' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Categories</h1>
          <p className="text-gray-500 dark:text-gray-400">Organize products into categories and tags</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <InputField
                label="Category Name"
                value={newCategory.name}
                onChange={(value) => setNewCategory({ ...newCategory, name: value })}
                placeholder="Enter category name"
                required
              />
              <TextareaField
                label="Description"
                value={newCategory.description}
                onChange={(value) => setNewCategory({ ...newCategory, description: value })}
                placeholder="Describe this category"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Create Category</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Tags className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold">Avg</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg per Category</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(categories.reduce((sum, cat) => sum + cat.productCount, 0) / categories.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tags className="h-5 w-5 mr-2" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length > 0 ? (
            <DataTable
              columns={columns}
              data={categories}
              searchable
              pagination
              pageSize={10}
            />
          ) : (
            <EmptyState
              icon={Tags}
              title="No categories"
              description="Get started by creating your first product category to organize your inventory."
              actionLabel="Add Category"
              onAction={() => setIsCreateModalOpen(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCategories;
