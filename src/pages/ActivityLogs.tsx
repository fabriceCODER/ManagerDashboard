
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, User, Package, Edit, Trash2, Plus, ArrowUpDown } from 'lucide-react';
import DataTable from '@/components/UI/DataTable';
import EmptyState from '@/components/UI/EmptyState';

interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  user: string;
  timestamp: string;
  details: string;
  type: 'create' | 'update' | 'delete' | 'transfer' | 'adjustment';
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    action: 'Product Created',
    entity: 'Wireless Mouse Pro',
    entityId: 'PRD-001',
    user: 'John Doe',
    timestamp: '2024-01-16T10:30:00Z',
    details: 'Created new product with SKU WM-PRO-001',
    type: 'create'
  },
  {
    id: '2',
    action: 'Stock Adjusted',
    entity: 'USB Cable',
    entityId: 'PRD-045',
    user: 'Jane Smith',
    timestamp: '2024-01-16T09:15:00Z',
    details: 'Increased stock by 10 units - Reason: Found items',
    type: 'adjustment'
  },
  {
    id: '3',
    action: 'Product Updated',
    entity: 'Bluetooth Headset',
    entityId: 'PRD-023',
    user: 'Mike Johnson',
    timestamp: '2024-01-16T08:45:00Z',
    details: 'Updated price from $89.99 to $79.99',
    type: 'update'
  },
  {
    id: '4',
    action: 'Stock Transfer',
    entity: 'Office Chair',
    entityId: 'PRD-067',
    user: 'Sarah Wilson',
    timestamp: '2024-01-15T16:20:00Z',
    details: 'Transferred 5 units from Warehouse A to Warehouse B',
    type: 'transfer'
  },
  {
    id: '5',
    action: 'Product Deleted',
    entity: 'Old Keyboard Model',
    entityId: 'PRD-012',
    user: 'Admin User',
    timestamp: '2024-01-15T14:30:00Z',
    details: 'Permanently deleted discontinued product',
    type: 'delete'
  }
];

const ActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>(mockActivityLogs);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'update': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'delete': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'transfer': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'adjustment': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'create': return <Plus className="h-3 w-3" />;
      case 'update': return <Edit className="h-3 w-3" />;
      case 'delete': return <Trash2 className="h-3 w-3" />;
      case 'transfer': return <ArrowUpDown className="h-3 w-3" />;
      case 'adjustment': return <Package className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredLogs = logs.filter(log => {
    const typeMatch = filterType === 'all' || log.type === filterType;
    const userMatch = filterUser === 'all' || log.user === filterUser;
    return typeMatch && userMatch;
  });

  const columns = [
    { 
      key: 'action', 
      label: 'Action', 
      sortable: true,
      render: (action: string, log: ActivityLog) => (
        <div className="flex items-center space-x-2">
          <Badge className={getTypeColor(log.type)}>
            {getTypeIcon(log.type)}
            <span className="ml-1">{action}</span>
          </Badge>
        </div>
      )
    },
    { key: 'entity', label: 'Entity', sortable: true },
    { key: 'entityId', label: 'ID', sortable: true },
    { 
      key: 'user', 
      label: 'User', 
      sortable: true,
      render: (user: string) => (
        <div className="flex items-center space-x-1">
          <User className="h-4 w-4 text-gray-400" />
          <span>{user}</span>
        </div>
      )
    },
    { 
      key: 'timestamp', 
      label: 'Timestamp', 
      sortable: true,
      render: (timestamp: string) => formatTimestamp(timestamp)
    },
    { key: 'details', label: 'Details', sortable: false }
  ];

  const uniqueUsers = Array.from(new Set(logs.map(log => log.user)));
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'adjustment', label: 'Adjustment' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
          <p className="text-gray-500 dark:text-gray-400">Track all system activities and changes</p>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {typeOptions.slice(1).map((type) => {
          const count = logs.filter(log => log.type === type.value).length;
          return (
            <Card key={type.value}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{type.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                  </div>
                  <Badge className={getTypeColor(type.value)}>
                    {getTypeIcon(type.value)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Activity History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLogs.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredLogs}
              searchable
              pagination
              pageSize={15}
            />
          ) : (
            <EmptyState
              icon={Activity}
              title="No activity logs"
              description="No activities match your current filters. Try adjusting the filters or check back later."
              actionLabel="Clear Filters"
              onAction={() => {
                setFilterType('all');
                setFilterUser('all');
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;
