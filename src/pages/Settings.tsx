
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';
import EmptyState from '@/components/UI/EmptyState';

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Configure system preferences and settings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={SettingsIcon}
            title="Settings coming soon"
            description="Configure your system preferences, company information, and other settings. This feature will be implemented soon."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
