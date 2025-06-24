
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Box,
  Users,
  Archive,
  ArrowDown,
  ArrowUp,
  ArrowRight,
  FileText,
  User,
  Settings,
  Database,
  ShoppingCart,
  Receipt,
  Tags,
  ClipboardList,
  Activity,
  Calendar,
  BarChart3,
  Package
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Box },
  { name: 'Categories', href: '/categories', icon: Tags },
  { name: 'Suppliers', href: '/suppliers', icon: Users },
  { name: 'Purchase Orders', href: '/purchase-orders', icon: ShoppingCart },
  { name: 'Sales Orders', href: '/sales-orders', icon: Receipt },
  { name: 'Incoming Stock', href: '/incoming', icon: ArrowDown },
  { name: 'Outgoing Stock', href: '/outgoing', icon: ArrowUp },
  { name: 'Stock Transfers', href: '/transfers', icon: ArrowRight },
  { name: 'Adjustments', href: '/adjustments', icon: ClipboardList },
  { name: 'Activity Logs', href: '/activity', icon: Activity },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Users', href: '/users', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Database className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="font-bold text-xl text-gray-900 dark:text-white">
              StockManager
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                collapsed ? "justify-center" : "justify-start"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn(
                "flex-shrink-0 h-5 w-5",
                collapsed ? "" : "mr-3"
              )} />
              {!collapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2024 StockManager
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
