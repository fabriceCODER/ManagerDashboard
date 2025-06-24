
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import EmptyState from '@/components/UI/EmptyState';

const StockTransfers = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stock Transfers</h1>
          <p className="text-gray-500 dark:text-gray-400">Move inventory between warehouses and locations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowRight className="h-5 w-5 mr-2" />
            Transfer History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ArrowRight}
            title="No stock transfers"
            description="Track stock movements between different locations here. This feature will be implemented soon."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StockTransfers;
