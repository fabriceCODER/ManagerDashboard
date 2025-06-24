
import React, { createContext, useContext } from 'react';
import { toast } from '@/hooks/use-toast';

interface NotificationContextType {
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showSuccess = (message: string, title = 'Success') => {
    toast({
      title,
      description: message,
      variant: 'default',
    });
  };

  const showError = (message: string, title = 'Error') => {
    toast({
      title,
      description: message,
      variant: 'destructive',
    });
  };

  const showInfo = (message: string, title = 'Info') => {
    toast({
      title,
      description: message,
      variant: 'default',
    });
  };

  const showWarning = (message: string, title = 'Warning') => {
    toast({
      title,
      description: message,
      variant: 'default',
    });
  };

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showInfo, showWarning }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
