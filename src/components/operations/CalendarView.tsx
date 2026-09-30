import React from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';
import { DataBadge } from '../common/DataBadge';

interface CalendarViewProps {
  projects: Project[];
  onShowToast: (msg: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ projects, onShowToast }) => {
  return (
    <div className="page-container">
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Production & Launch Milestones</h1>
            <DataBadge isRealData={false} text="Demo Production Schedule" />
          </div>
          <p className="dashboard-subheadline">
            Scheduled website cutovers, DNS propagations, and client preview demos.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onShowToast('Previous month loaded')}>
            <ChevronLeft size={14} />
          </button>
          <span style={{ fontSize: '13px', fontWeight: '700' }}>October 2026</span>
          <button className="btn btn-secondary btn-sm" onClick={() => onShowToast('Next month loaded')}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="enterprise-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Upcoming Project Launches</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--surface-border)',
                backgroundColor: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--surface-subtle)',
                    textAlign: 'center',
                    minWidth: '70px'
                  }}
                >
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>TARGET</div>
                  <strong style={{ fontSize: '13px', color: 'var(--brand-primary)' }}>{p.expectedLaunch.slice(5)}</strong>
                </div>

                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{p.name}</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    Client: {p.company} • Territory: {p.market} • Package: {p.packageName}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge badge-blue">{p.status}</span>
                <span style={{ fontSize: '12px', fontWeight: '600' }} className="tabular-nums">
                  {p.progress}% Ready
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
