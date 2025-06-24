
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp } from 'lucide-react';
import EmptyState from '@/components/UI/EmptyState';

const OutgoingStock = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Outgoing Stock</h1>
          <p className="text-gray-500 dark:text-gray-400">Track and manage outgoing inventory shipments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowUp className="h-5 w-5 mr-2" />
            Outgoing Shipments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ArrowUp}
            title="No outgoing shipments"
            description="Track outgoing shipments and stock movements here. This feature will be implemented soon."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OutgoingStock;
