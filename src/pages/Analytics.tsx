
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import EmptyState from '@/components/UI/EmptyState';

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Advanced analytics and insights for your inventory</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Advanced Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={BarChart3}
            title="Advanced analytics coming soon"
            description="Get detailed insights into your inventory performance, trends, and forecasting. This feature will be implemented soon."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
