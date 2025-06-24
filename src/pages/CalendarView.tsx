
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import EmptyState from '@/components/UI/EmptyState';

const CalendarView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar View</h1>
          <p className="text-gray-500 dark:text-gray-400">Visualize stock movements and deliveries on a calendar</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Stock Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Calendar}
            title="Calendar view coming soon"
            description="View your stock movements, deliveries, and important dates in a calendar format. This feature will be implemented soon."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
