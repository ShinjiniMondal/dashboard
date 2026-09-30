import React from 'react';
import { FolderKanban, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Project, ActiveNavTab } from '../../types';
import { formatCurrency } from '../../utils/calculations';

interface RecentProjectsWidgetProps {
  projects: Project[];
  onNavigate: (tab: ActiveNavTab) => void;
}

export const RecentProjectsWidget: React.FC<RecentProjectsWidgetProps> = ({ projects, onNavigate }) => {
  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'live':
      case 'completed':
        return <span className="badge badge-emerald">Live / Completed</span>;
      case 'client_approval':
      case 'review':
        return <span className="badge badge-purple">Client Approval</span>;
      case 'development':
      case 'design':
        return <span className="badge badge-blue">In Production</span>;
      case 'onboarding':
      default:
        return <span className="badge badge-slate">Onboarding</span>;
    }
  };

  return (
    <div className="enterprise-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-title">
            <FolderKanban size={16} color="var(--brand-primary)" />
            Active Client Builds
          </div>
          <div className="card-subtitle">Current website engineering and design sprints</div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('projects')}>
          <span>View All</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="card-body" style={{ padding: '0' }}>
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Client / Project</th>
              <th>Market</th>
              <th>Progress</th>
              <th>Value</th>
              <th style={{ textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 4).map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '600' }}>{p.company}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{p.name}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-slate">{p.market}</span>
                </td>
                <td style={{ minWidth: '120px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="bar-track" style={{ height: '6px', flex: 1 }}>
                      <div
                        className="bar-fill blue"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '600' }} className="tabular-nums">
                      {p.progress}%
                    </span>
                  </div>
                </td>
                <td className="tabular-nums" style={{ fontWeight: '600' }}>
                  {formatCurrency(p.contractValue)}
                </td>
                <td style={{ textAlign: 'right' }}>{getStatusBadge(p.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
