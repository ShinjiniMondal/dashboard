import React from 'react';
import { X, AlertCircle, CheckCircle2, Clock, Info } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'urgent' | 'important' | 'info';
  read: boolean;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      title: 'Final Client Review Pending',
      message: 'Apex Summit Roofing LLC awaiting final drone visualizer approval before cutover.',
      timestamp: '15m ago',
      priority: 'urgent',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Milestone Deposit Confirmed',
      message: '$1,250 received via Stripe for Toitures de Provence & Fils (INV-2026-094).',
      timestamp: '2h ago',
      priority: 'important',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Automated Lead Workflow Triggered',
      message: 'Speed-to-Lead Instant Response successfully contacted Durban Zinc & Tile Contractors.',
      timestamp: '5h ago',
      priority: 'info',
      read: true
    },
    {
      id: 'notif-4',
      title: 'Invoice Due in 3 Days',
      message: 'INV-2026-093 for Thames & Cotswold Roofing Ltd ($1,000.00) scheduled for auto-reminder.',
      timestamp: '1d ago',
      priority: 'important',
      read: true
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="command-palette-modal"
        style={{ maxWidth: '480px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-header" style={{ borderBottom: '1px solid var(--surface-border)' }}>
          <div className="card-header-left">
            <span className="card-title">Notification Center</span>
            <span className="card-subtitle">Real-time alerts, operations & billing updates</span>
          </div>
          <button className="sidebar-collapse-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: n.read ? '#ffffff' : 'var(--brand-primary-subtle)',
                  border: `1px solid ${n.read ? 'var(--surface-border)' : 'var(--brand-primary-border)'}`,
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ marginTop: '2px' }}>
                  {n.priority === 'urgent' && <AlertCircle size={18} color="var(--color-danger)" />}
                  {n.priority === 'important' && <Clock size={18} color="var(--color-warning)" />}
                  {n.priority === 'info' && <CheckCircle2 size={18} color="var(--brand-primary)" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{n.title}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{n.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {n.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 16px', background: '#f8fafc', borderTop: '1px solid var(--surface-border)', textAlign: 'right' }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
