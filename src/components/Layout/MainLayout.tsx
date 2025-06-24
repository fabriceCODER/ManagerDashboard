
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { NotificationProvider } from '@/context/NotificationContext';
import { cn } from '@/lib/utils';

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-background">
        <div className="flex h-screen overflow-hidden">
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onCollapse={setSidebarCollapsed} 
          />
          
          <div className={cn(
            "flex-1 flex flex-col transition-all duration-300",
            sidebarCollapsed ? "ml-16" : "ml-64"
          )}>
            <TopBar 
              onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              sidebarCollapsed={sidebarCollapsed}
            />
            
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
              <div className="p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default MainLayout;
