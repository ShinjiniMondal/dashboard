import React, { useState } from 'react';
import { Settings, ShieldCheck, UserCheck, Key, Database, RefreshCw, FileText } from 'lucide-react';
import { UserRole, AuditLogEntry } from '../../types';
import { DataBadge } from '../common/DataBadge';

interface SettingsViewProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  auditLogs: AuditLogEntry[];
  onShowToast: (msg: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userRole,
  setUserRole,
  auditLogs,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'security' | 'audit' | 'workspace'>('security');

  const permissionsMatrix = [
    { permission: 'View Real Financial Totals ($125,640)', owner: true, admin: true, manager: true, sales: true, developer: false, viewer: true },
    { permission: 'Export Invoices & Country CSVs', owner: true, admin: true, manager: true, sales: false, developer: false, viewer: false },
    { permission: 'Adjust Package Pricing Tiers', owner: true, admin: true, manager: false, sales: false, developer: false, viewer: false },
    { permission: 'Create & Update Opportunities', owner: true, admin: true, manager: true, sales: true, developer: false, viewer: false },
    { permission: 'Edit Project Code & Deployments', owner: true, admin: true, manager: false, sales: false, developer: true, viewer: false },
    { permission: 'Trigger System Automations', owner: true, admin: true, manager: true, sales: false, developer: true, viewer: false },
    { permission: 'Access Immutable Audit Log', owner: true, admin: true, manager: false, sales: false, developer: false, viewer: false }
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">System Settings & Security</h1>
            <DataBadge isRealData={true} text="Enterprise Security Matrix" />
          </div>
          <p className="dashboard-subheadline">
            Role-based access controls (RBAC), immutable system audit logs, and workspace configuration.
          </p>
        </div>

        <div style={{ display: 'flex', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <button
            className={`btn btn-sm ${activeTab === 'security' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('security')}
            style={{ borderRadius: 0, border: 'none' }}
          >
            RBAC Permissions
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'audit' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('audit')}
            style={{ borderRadius: 0, border: 'none' }}
          >
            Audit Log
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'workspace' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('workspace')}
            style={{ borderRadius: 0, border: 'none' }}
          >
            Workspace
          </button>
        </div>
      </div>

      {/* Role Switcher Banner */}
      <div
        style={{
          padding: '16px 20px',
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--surface-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
            Active Session Security Role
          </strong>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
            Current simulated role: <span style={{ textTransform: 'uppercase', fontWeight: '700', color: 'var(--brand-primary)' }}>{userRole}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {(['owner', 'admin', 'manager', 'sales', 'developer', 'viewer'] as UserRole[]).map((r) => (
            <button
              key={r}
              className={`btn btn-sm ${userRole === r ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => {
                setUserRole(r);
                onShowToast(`Switched active user role to ${r.toUpperCase()}`);
              }}
              style={{ textTransform: 'capitalize' }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'security' && (
        <div className="enterprise-card">
          <div className="card-header">
            <div className="card-header-left">
              <span className="card-title">Role-Based Access Control (RBAC) Matrix</span>
              <span className="card-subtitle">Server-enforced authorization policies for Intellobyte command center</span>
            </div>
          </div>
          <div className="table-responsive-wrapper">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Protected Capability</th>
                  <th style={{ textAlign: 'center' }}>Owner</th>
                  <th style={{ textAlign: 'center' }}>Admin</th>
                  <th style={{ textAlign: 'center' }}>Manager</th>
                  <th style={{ textAlign: 'center' }}>Sales</th>
                  <th style={{ textAlign: 'center' }}>Developer</th>
                  <th style={{ textAlign: 'center' }}>Viewer</th>
                </tr>
              </thead>
              <tbody>
                {permissionsMatrix.map((row, i) => (
                  <tr key={i}>
                    <td><strong>{row.permission}</strong></td>
                    <td style={{ textAlign: 'center' }}>{row.owner ? '✅' : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{row.admin ? '✅' : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{row.manager ? '✅' : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{row.sales ? '✅' : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{row.developer ? '✅' : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{row.viewer ? '✅' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="enterprise-card">
          <div className="card-header">
            <div className="card-header-left">
              <span className="card-title">Immutable System Audit Log</span>
              <span className="card-subtitle">Permanent historical record of invoice generation, status movements, and logins</span>
            </div>
          </div>
          <div className="table-responsive-wrapper">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Actor / User</th>
                  <th>Entity Type</th>
                  <th>Action</th>
                  <th>Description</th>
                  <th>New Value</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontSize: '12px' }}>{log.when}</td>
                    <td><strong>{log.who}</strong></td>
                    <td><span className="badge badge-slate">{log.entityType}</span></td>
                    <td><strong>{log.what}</strong></td>
                    <td style={{ fontSize: '12px' }}>{log.details}</td>
                    <td>
                      {log.newValue ? (
                        <span className="badge badge-blue">{log.newValue}</span>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'workspace' && (
        <div className="enterprise-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Workspace Configuration</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '600px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600' }}>Company Legal Name</label>
              <input
                type="text"
                disabled
                value="INTELLOBYTE DIGITAL SYSTEMS"
                style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px', background: '#f8fafc' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600' }}>Base Currency</label>
              <input
                type="text"
                disabled
                value="USD ($) - International Normalized"
                style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px', background: '#f8fafc' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
