import React, { useState, useMemo } from 'react';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Plus,
  Filter,
  X,
  Calendar,
  AlertCircle,
  Users,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Project, ProjectStatus, ActiveNavTab } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface ProjectsViewProps {
  projects: Project[];
  selectedCountry: string;
  onUpdateStatus: (projectId: string, newStatus: ProjectStatus) => void;
  onShowToast: (msg: string) => void;
  onNavigate: (tab: ActiveNavTab) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  selectedCountry,
  onUpdateStatus,
  onShowToast,
  onNavigate
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCountry = selectedCountry === 'All' || p.market === selectedCountry;
      const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
      return matchCountry && matchStatus;
    });
  }, [projects, selectedCountry, selectedStatus]);

  // Project KPI counts
  const activeCount = projects.filter((p) => !['completed', 'cancelled'].includes(p.status)).length;
  const liveCount = projects.filter((p) => p.status === 'live' || p.status === 'completed').length;
  const inDevCount = projects.filter((p) => ['development', 'design'].includes(p.status)).length;
  const reviewCount = projects.filter((p) => ['review', 'client_approval'].includes(p.status)).length;

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'live':
      case 'completed':
        return <span className="badge badge-emerald">Live / Completed</span>;
      case 'client_approval':
      case 'review':
        return <span className="badge badge-purple">Client Approval</span>;
      case 'development':
        return <span className="badge badge-blue">Development</span>;
      case 'design':
        return <span className="badge badge-blue">Design Sprint</span>;
      case 'on_hold':
        return <span className="badge badge-amber">On Hold</span>;
      case 'cancelled':
        return <span className="badge badge-rose">Cancelled</span>;
      default:
        return <span className="badge badge-slate">Onboarding</span>;
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Project Management & Builds</h1>
            <DataBadge isRealData={false} text="Demo Production Dataset" />
          </div>
          <p className="dashboard-subheadline">
            Tracking active development sprints, design reviews, milestone approvals, and live deployments.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onShowToast('Initiated New Project provisioning workflow')}
        >
          <Plus size={15} />
          <span>New Project Build</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-title">Active Sprints</span>
          <div className="kpi-value">{activeCount}</div>
          <div className="kpi-supporting">Projects actively in delivery</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">In Development & Design</span>
          <div className="kpi-value" style={{ color: 'var(--brand-primary)' }}>{inDevCount}</div>
          <div className="kpi-supporting">Engineering and UI mockups</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Client Approvals</span>
          <div className="kpi-value" style={{ color: 'var(--color-purple)' }}>{reviewCount}</div>
          <div className="kpi-supporting">Awaiting contractor sign-off</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Completed & Live</span>
          <div className="kpi-value" style={{ color: 'var(--color-success)' }}>{liveCount}</div>
          <div className="kpi-supporting">Deployed on live custom domains</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'wrap',
          background: '#ffffff',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--surface-border)'
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)' }}>Filter Status:</span>
        {['All', 'onboarding', 'design', 'development', 'client_approval', 'live', 'completed'].map((status) => (
          <button
            key={status}
            className={`btn btn-sm ${selectedStatus === status ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedStatus(status)}
            style={{ textTransform: 'capitalize' }}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Master Projects Table */}
      <div className="enterprise-card">
        <div className="table-responsive-wrapper">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Project Title & Company</th>
                <th>Territory</th>
                <th>Package</th>
                <th>Progress</th>
                <th style={{ textAlign: 'right' }}>Contract Value</th>
                <th style={{ textAlign: 'right' }}>Paid / Outst.</th>
                <th>Target Launch</th>
                <th>Assigned Engineers</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setActiveProjectModal(p)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div>
                      <strong>{p.name}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        Client: {p.company} ({p.clientName})
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-slate">{p.market}</span>
                  </td>
                  <td>
                    <span className="badge badge-blue">{p.packageName}</span>
                  </td>
                  <td style={{ minWidth: '130px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="bar-track" style={{ height: '6px', flex: 1 }}>
                        <div
                          className="bar-fill blue"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="tabular-nums" style={{ fontSize: '11px', fontWeight: '600' }}>
                        {p.progress}%
                      </span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }} className="tabular-nums">
                    <strong>{formatCurrency(p.contractValue)}</strong>
                  </td>
                  <td style={{ textAlign: 'right' }} className="tabular-nums">
                    <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>
                      {formatCurrency(p.amountPaid)}
                    </span>
                    {p.amountOutstanding > 0 && (
                      <div style={{ fontSize: '10px', color: 'var(--color-danger)' }}>
                        Out: {formatCurrency(p.amountOutstanding)}
                      </div>
                    )}
                  </td>
                  <td style={{ fontSize: '12px' }}>{p.expectedLaunch}</td>
                  <td>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {p.assignedTeam.join(', ')}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>{getStatusBadge(p.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Detail Modal (Item 58) */}
      {activeProjectModal && (
        <div className="modal-overlay" onClick={() => setActiveProjectModal(null)}>
          <div
            className="command-palette-modal"
            style={{ maxWidth: '650px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-header">
              <div className="card-header-left">
                <span className="card-title">{activeProjectModal.name}</span>
                <span className="card-subtitle">
                  {activeProjectModal.company} • {activeProjectModal.market}
                </span>
              </div>
              <button className="sidebar-collapse-btn" onClick={() => setActiveProjectModal(null)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '520px', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>PACKAGE</span>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>{activeProjectModal.packageName}</div>
                </div>
                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>CONTRACT</span>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--brand-primary)' }}>
                    {formatCurrency(activeProjectModal.contractValue)}
                  </div>
                </div>
                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>TARGET LAUNCH</span>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>{activeProjectModal.expectedLaunch}</div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>
                  Current Engineering Progress: {activeProjectModal.progress}%
                </label>
                <div className="bar-track" style={{ height: '8px' }}>
                  <div className="bar-fill blue" style={{ width: `${activeProjectModal.progress}%` }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>
                  Project Status Workflow
                </label>
                <select
                  value={activeProjectModal.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as ProjectStatus;
                    onUpdateStatus(activeProjectModal.id, newStatus);
                    setActiveProjectModal({ ...activeProjectModal, status: newStatus });
                    onShowToast(`Updated status of ${activeProjectModal.name} to ${newStatus}`);
                  }}
                  className="filter-select"
                  style={{ width: '100%' }}
                >
                  <option value="onboarding">Onboarding</option>
                  <option value="design">Design Sprint</option>
                  <option value="development">Development</option>
                  <option value="review">Internal Review</option>
                  <option value="client_approval">Client Approval</option>
                  <option value="live">Live on Production</option>
                  <option value="completed">Completed & Maintained</option>
                  <option value="on_hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>
                  Sprint Notes & Scope
                </label>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', background: '#f8fafc', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                  {activeProjectModal.notes || 'Standard roofing digital portal deployment.'}
                </p>
              </div>
            </div>

            <div style={{ padding: '14px 20px', background: '#f8fafc', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveProjectModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
