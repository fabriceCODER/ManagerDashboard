
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import EmptyState from '@/components/UI/EmptyState';

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">Generate and download inventory reports</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Report Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={FileText}
            title="Reports coming soon"
            description="Generate comprehensive reports for your inventory data. This feature will be implemented soon."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
