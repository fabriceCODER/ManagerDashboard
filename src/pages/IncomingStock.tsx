
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import EmptyState from '@/components/UI/EmptyState';

const IncomingStock = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Incoming Stock</h1>
          <p className="text-gray-500 dark:text-gray-400">Track and manage incoming inventory deliveries</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowDown className="h-5 w-5 mr-2" />
            Incoming Deliveries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ArrowDown}
            title="No incoming deliveries"
            description="Track expected deliveries and stock receipts here. This feature will be implemented soon."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomingStock;
