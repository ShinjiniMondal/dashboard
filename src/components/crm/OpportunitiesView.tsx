import React, { useState, useMemo } from 'react';
import {
  Target,
  Plus,
  Filter,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  LayoutGrid,
  List,
  BarChart2,
  Calendar
} from 'lucide-react';
import { Opportunity, OpportunityStage, Package } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface OpportunitiesViewProps {
  opportunities: Opportunity[];
  packages: Package[];
  selectedCountry: string;
  onUpdateStage: (oppId: string, newStage: OpportunityStage) => void;
  onCreateOpportunity: (opp: Partial<Opportunity>) => void;
  onShowToast: (msg: string) => void;
}

const STAGES: { id: OpportunityStage; label: string; color: string }[] = [
  { id: 'new_lead', label: 'New Lead', color: '#94a3b8' },
  { id: 'contacted', label: 'Contacted', color: '#64748b' },
  { id: 'qualified', label: 'Qualified', color: '#8b5cf6' },
  { id: 'proposal_sent', label: 'Proposal Sent', color: '#3b82f6' },
  { id: 'negotiation', label: 'Negotiation', color: '#f59e0b' },
  { id: 'won', label: 'Won Contract', color: '#10b981' },
  { id: 'lost', label: 'Archived / Lost', color: '#ef4444' }
];

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  packages,
  selectedCountry,
  onUpdateStage,
  onCreateOpportunity,
  onShowToast
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table' | 'funnel'>('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [newCompany, setNewCompany] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newMarket, setNewMarket] = useState('Las Vegas');
  const [newPackage, setNewPackage] = useState('Pro Plus');
  const [newValue, setNewValue] = useState(2499);
  const [newOwner, setNewOwner] = useState('Sarah Jenkins');

  const filteredOpps = useMemo(() => {
    if (selectedCountry === 'All') return opportunities;
    return opportunities.filter((o) => o.market === selectedCountry);
  }, [opportunities, selectedCountry]);

  const totalPipelineValue = useMemo(() => {
    return filteredOpps
      .filter((o) => o.stage !== 'lost')
      .reduce((sum, o) => sum + o.potentialValue, 0);
  }, [filteredOpps]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newContact) return;

    onCreateOpportunity({
      company: newCompany,
      contactName: newContact,
      market: newMarket as any,
      country: newMarket === 'Las Vegas' ? 'United States' : newMarket,
      packageName: newPackage,
      potentialValue: Number(newValue),
      assignedPerson: newOwner,
      stage: 'new_lead',
      nextTask: 'Schedule 15-min discovery call',
      isDemoData: true
    });

    setIsModalOpen(false);
    setNewCompany('');
    setNewContact('');
    onShowToast(`Opportunity for ${newCompany} created in pipeline`);
  };

  const getNextStage = (curr: OpportunityStage): OpportunityStage | null => {
    const idx = STAGES.findIndex((s) => s.id === curr);
    if (idx < STAGES.length - 2) return STAGES[idx + 1].id;
    return null;
  };

  const getPrevStage = (curr: OpportunityStage): OpportunityStage | null => {
    const idx = STAGES.findIndex((s) => s.id === curr);
    if (idx > 0 && idx < STAGES.length - 1) return STAGES[idx - 1].id;
    return null;
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Opportunity Pipeline</h1>
            <DataBadge isRealData={false} text="Demo CRM Dataset" />
          </div>
          <p className="dashboard-subheadline">
            Track deals from initial roofing contractor contact through signed web platform contracts.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View Mode Toggle */}
          <div style={{ display: 'flex', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <button
              className={`btn btn-sm ${viewMode === 'kanban' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('kanban')}
              style={{ borderRadius: 0, border: 'none' }}
              title="Kanban Board"
            >
              <LayoutGrid size={14} /> Kanban
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('table')}
              style={{ borderRadius: 0, border: 'none' }}
              title="Table View"
            >
              <List size={14} /> Table
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'funnel' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('funnel')}
              style={{ borderRadius: 0, border: 'none' }}
              title="Funnel Analysis"
            >
              <BarChart2 size={14} /> Funnel
            </button>
          </div>

          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={15} />
            <span>Create Opportunity</span>
          </button>
        </div>
      </div>

      {/* Pipeline Summary Bar */}
      <div
        style={{
          padding: '14px 20px',
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--surface-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '600' }}>
              Active Pipeline Deals
            </span>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {filteredOpps.filter((o) => o.stage !== 'lost' && o.stage !== 'won').length}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '600' }}>
              Total Pipeline Value
            </span>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-primary)' }} className="tabular-nums">
              {formatCurrency(totalPipelineValue)}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '600' }}>
              Closed Won Deals
            </span>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-success)' }}>
              {filteredOpps.filter((o) => o.stage === 'won').length}
            </div>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          Showing opportunities for: <strong>{selectedCountry}</strong>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="kanban-board-container">
          {STAGES.map((col) => {
            const colOpps = filteredOpps.filter((o) => o.stage === col.id);
            const colSum = colOpps.reduce((sum, o) => sum + o.potentialValue, 0);

            return (
              <div key={col.id} className="kanban-column">
                <div className="kanban-column-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: col.color }} />
                    <span>{col.label}</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>({colOpps.length})</span>
                  </div>
                  <span className="tabular-nums" style={{ fontSize: '11px', fontWeight: '600' }}>
                    {formatCurrency(colSum)}
                  </span>
                </div>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '10px' }}>
                  {colOpps.map((opp) => (
                    <div key={opp.id} className="kanban-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>
                          {opp.company}
                        </span>
                        <span className="badge badge-blue">{opp.packageName}</span>
                      </div>

                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        Contact: {opp.contactName} ({opp.market})
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontWeight: '700', color: 'var(--brand-primary)', fontSize: '14px' }} className="tabular-nums">
                          {formatCurrency(opp.potentialValue)}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <User size={11} /> {opp.assignedPerson}
                        </span>
                      </div>

                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', borderTop: '1px solid var(--surface-subtle)', paddingTop: '6px' }}>
                        Next: {opp.nextTask}
                      </div>

                      {/* Stage Progression Buttons */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid var(--surface-subtle)' }}>
                        {getPrevStage(opp.stage) && (
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => onUpdateStage(opp.id, getPrevStage(opp.stage)!)}
                            title="Move to previous stage"
                          >
                            <ChevronLeft size={12} /> Back
                          </button>
                        )}
                        {getNextStage(opp.stage) && (
                          <button
                            className="btn btn-primary btn-sm"
                            style={{ padding: '2px 8px', fontSize: '10px', marginLeft: 'auto' }}
                            onClick={() => onUpdateStage(opp.id, getNextStage(opp.stage)!)}
                            title="Advance to next stage"
                          >
                            Advance <ChevronRight size={12} />
                          </button>
                        )}
                        {opp.stage === 'negotiation' && (
                          <button
                            className="btn btn-sm"
                            style={{ backgroundColor: 'var(--color-success)', color: '#ffffff', padding: '2px 8px', fontSize: '10px', marginLeft: 'auto' }}
                            onClick={() => onUpdateStage(opp.id, 'won')}
                            title="Mark as Won contract"
                          >
                            <CheckCircle2 size={12} /> Won
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {colOpps.length === 0 && (
                    <div style={{ padding: '24px 12px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '12px' }}>
                      No deals in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="enterprise-card">
          <div className="table-responsive-wrapper">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Company / Contact</th>
                  <th>Territory</th>
                  <th>Package</th>
                  <th style={{ textAlign: 'right' }}>Deal Value</th>
                  <th>Stage</th>
                  <th>Assigned Owner</th>
                  <th>Next Action</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOpps.map((opp) => (
                  <tr key={opp.id}>
                    <td>
                      <div>
                        <strong>{opp.company}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{opp.contactName}</div>
                      </div>
                    </td>
                    <td>{opp.market}</td>
                    <td><span className="badge badge-blue">{opp.packageName}</span></td>
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      <strong>{formatCurrency(opp.potentialValue)}</strong>
                    </td>
                    <td><span className="badge badge-slate">{opp.stage.replace('_', ' ')}</span></td>
                    <td>{opp.assignedPerson}</td>
                    <td style={{ fontSize: '12px' }}>{opp.nextTask}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onUpdateStage(opp.id, opp.stage === 'won' ? 'negotiation' : 'won')}
                      >
                        {opp.stage === 'won' ? 'Reopen' : 'Mark Won'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FUNNEL ANALYSIS VIEW */}
      {viewMode === 'funnel' && (
        <div className="enterprise-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
            Pipeline Conversion Funnel Progression
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '700px' }}>
            {STAGES.filter((s) => s.id !== 'lost').map((stage, idx) => {
              const count = filteredOpps.filter((o) => o.stage === stage.id).length;
              const width = Math.max(20, 100 - idx * 12);

              return (
                <div key={stage.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '130px', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    {stage.label}
                  </span>
                  <div style={{ flex: 1, backgroundColor: 'var(--surface-subtle)', borderRadius: 'var(--radius-full)', height: '28px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${width}%`,
                        height: '100%',
                        backgroundColor: stage.color,
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '12px',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}
                    >
                      {count} deals
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Opportunity Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="command-palette-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="card-header">
              <span className="card-title">Create Roofing Opportunity</span>
              <button className="sidebar-collapse-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Roofing Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Summit Roofing"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Primary Contact Person</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Target Market</label>
                  <select
                    value={newMarket}
                    onChange={(e) => setNewMarket(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                  >
                    <option value="Las Vegas">Las Vegas (US)</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Package</label>
                  <select
                    value={newPackage}
                    onChange={(e) => {
                      setNewPackage(e.target.value);
                      if (e.target.value === 'Basic') setNewValue(499);
                      if (e.target.value === 'Pro') setNewValue(1499);
                      if (e.target.value === 'Pro Plus') setNewValue(2499);
                    }}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                  >
                    <option value="Basic">Basic ($499)</option>
                    <option value="Pro">Pro ($1,499)</option>
                    <option value="Pro Plus">Pro Plus ($2,499)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Potential Contract Value ($ USD)</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Opportunity</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
