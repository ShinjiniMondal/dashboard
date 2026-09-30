import React, { useState } from 'react';
import { Zap, Play, Pause, ArrowDown, Clock, CheckCircle2, Plus, Sparkles, X, GitBranch } from 'lucide-react';
import { AutomationWorkflow } from '../../types';
import { DataBadge } from '../common/DataBadge';

interface AutomationsViewProps {
  automations: AutomationWorkflow[];
  onToggleStatus: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({
  automations,
  onToggleStatus,
  onShowToast
}) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<AutomationWorkflow | null>(null);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Workflow Automations Engine</h1>
            <DataBadge isRealData={false} text="Active Automation Rules" />
          </div>
          <p className="dashboard-subheadline">
            Speed-to-lead routing, automatic payment milestone reminders, and review generation triggers.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onShowToast('Opened Visual Workflow Builder')}
        >
          <Plus size={15} />
          <span>New Automation Workflow</span>
        </button>
      </div>

      {/* Automations Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
        {automations.map((aut) => (
          <div key={aut.id} className="enterprise-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              <div className="card-header-left">
                <span className="card-title" style={{ fontSize: '14px' }}>
                  <Zap size={15} color={aut.status === 'active' ? 'var(--brand-primary)' : 'var(--text-tertiary)'} />
                  {aut.name}
                </span>
                <span className="card-subtitle">{aut.category} Workflow</span>
              </div>
              <button
                className={`btn btn-sm ${aut.status === 'active' ? 'btn-secondary' : 'btn-primary'}`}
                style={{ padding: '4px 8px', fontSize: '11px' }}
                onClick={() => {
                  onToggleStatus(aut.id);
                  onShowToast(`Automation "${aut.name}" is now ${aut.status === 'active' ? 'Paused' : 'Active'}`);
                }}
              >
                {aut.status === 'active' ? <Pause size={12} /> : <Play size={12} />}
                <span>{aut.status === 'active' ? 'Pause' : 'Activate'}</span>
              </button>
            </div>

            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {aut.description}
              </p>

              {/* Trigger */}
              <div style={{ padding: '8px 10px', background: 'var(--brand-primary-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--brand-primary-border)', fontSize: '11px' }}>
                <strong style={{ color: 'var(--brand-primary)' }}>TRIGGER:</strong> {aut.trigger}
              </div>

              {/* Action Sequence Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '4px 0' }}>
                {aut.actions.map((act, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700' }}>
                      {idx + 1}
                    </span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>

              {/* Stats Footer */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--surface-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                <span>Executed: <strong>{aut.executionCount}</strong> times</span>
                <span>Success: <strong style={{ color: 'var(--color-success)' }}>{aut.successRate}%</strong></span>
              </div>
            </div>

            <div style={{ padding: '10px 16px', background: '#f8fafc', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', padding: '3px 8px' }}
                onClick={() => setSelectedWorkflow(aut)}
              >
                Inspect Workflow Steps
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Inspection Modal */}
      {selectedWorkflow && (
        <div className="modal-overlay" onClick={() => setSelectedWorkflow(null)}>
          <div className="command-palette-modal" style={{ maxWidth: '550px' }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <span className="card-title">{selectedWorkflow.name}</span>
              <button className="sidebar-collapse-btn" onClick={() => setSelectedWorkflow(null)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-blue">Category: {selectedWorkflow.category}</span>
                <span className={`badge ${selectedWorkflow.status === 'active' ? 'badge-emerald' : 'badge-slate'}`}>
                  Status: {selectedWorkflow.status}
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Execution Flow Diagram
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ padding: '8px 12px', background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '12px' }}>
                    ⚡ Trigger: {selectedWorkflow.trigger}
                  </div>
                  {selectedWorkflow.actions.map((action, i) => (
                    <React.Fragment key={i}>
                      <div style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>↓</div>
                      <div style={{ padding: '8px 12px', background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}>
                        Step {i + 1}: {action}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '14px 20px', background: '#f8fafc', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedWorkflow(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
