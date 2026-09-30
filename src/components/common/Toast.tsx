import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastNotification {
  id: string;
  type: 'success' | 'warning' | 'info';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-message">
          {toast.type === 'success' && <CheckCircle2 size={16} color="var(--color-success)" />}
          {toast.type === 'warning' && <AlertTriangle size={16} color="var(--color-warning)" />}
          {toast.type === 'info' && <Info size={16} color="var(--brand-primary)" />}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
