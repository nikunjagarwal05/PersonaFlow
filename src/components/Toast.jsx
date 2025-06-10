import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

// Toast component for showing notification messages
const Toast = ({ id, type, title, message, duration = 4000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: AlertCircle,
  };

  const colors = {
    success: 'bg-green-500 border-green-400',
    error: 'bg-red-500 border-red-400',
    warning: 'bg-yellow-500 border-yellow-400',
    info: 'bg-blue-500 border-blue-400',
  };

  const Icon = icons[type];

  return (
    <div className={`${colors[type]} border-l-4 rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-out animate-slide-in`}>
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm">{title}</h4>
          {message && (
            <p className="text-white/90 text-sm mt-1">{message}</p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="text-white/80 hover:text-white transition-colors duration-200 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;