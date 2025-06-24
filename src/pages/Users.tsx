
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import EmptyState from '@/components/UI/EmptyState';

const Users = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage user accounts and permissions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={User}
            title="User management coming soon"
            description="Manage user accounts, roles, and permissions. This feature will be implemented soon."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
