import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

// ToastContainer provides context and renders toasts
const ToastContext = createContext(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((toast) => {
    const id = crypto.randomUUID();
    const newToast = {
      ...toast,
      id,
      onClose: removeToast,
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};