import React from 'react';
import { Activity, ShieldCheck, DollarSign, Target, FolderKanban, Receipt, Zap } from 'lucide-react';
import { AuditLogEntry, ActiveNavTab } from '../../types';

interface RecentActivityFeedProps {
  logs: AuditLogEntry[];
  onNavigate: (tab: ActiveNavTab) => void;
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ logs, onNavigate }) => {
  const getEntityIcon = (type: AuditLogEntry['entityType']) => {
    switch (type) {
      case 'Payment':
        return <DollarSign size={14} color="var(--color-success)" />;
      case 'Project':
        return <FolderKanban size={14} color="var(--brand-primary)" />;
      case 'Opportunity':
        return <Target size={14} color="var(--color-purple)" />;
      case 'Invoice':
        return <Receipt size={14} color="var(--color-warning)" />;
      default:
        return <Zap size={14} color="var(--text-tertiary)" />;
    }
  };

  return (
    <div className="enterprise-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-title">
            <Activity size={16} color="var(--color-success)" />
            Real-Time Audit Activity Feed
          </div>
          <div className="card-subtitle">Verified immutable agency operations trail</div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('settings')}>
          <ShieldCheck size={13} />
          <span>Audit Log</span>
        </button>
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {logs.slice(0, 5).map((log) => (
          <div
            key={log.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--surface-border-subtle)'
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}
            >
              {getEntityIcon(log.entityType)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {log.what}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }} className="tabular-nums">
                  {log.when}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {log.details}
              </p>
              <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                <span>Actor: {log.who}</span>
                {log.newValue && (
                  <>
                    <span>•</span>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: '500' }}>
                      Status: {log.newValue}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
