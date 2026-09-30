import React, { useState, useMemo } from 'react';
import { Users, Filter, Plus, Phone, Mail, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Opportunity, ActiveNavTab } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface LeadsViewProps {
  opportunities: Opportunity[];
  selectedCountry: string;
  onUpdateStage: (id: string, stage: Opportunity['stage']) => void;
  onNavigate: (tab: ActiveNavTab) => void;
  onShowToast: (msg: string) => void;
}

export const LeadsView: React.FC<LeadsViewProps> = ({
  opportunities,
  selectedCountry,
  onUpdateStage,
  onNavigate,
  onShowToast
}) => {
  const [filterSource, setFilterSource] = useState('All');

  const leads = useMemo(() => {
    return opportunities.filter((o) => {
      const matchCountry = selectedCountry === 'All' || o.market === selectedCountry;
      const matchSource = filterSource === 'All' || o.leadSource === filterSource;
      return matchCountry && matchSource;
    });
  }, [opportunities, selectedCountry, filterSource]);

  return (
    <div className="page-container">
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Roofing Inbound Leads</h1>
            <DataBadge isRealData={false} text="Demo CRM Dataset" />
          </div>
          <p className="dashboard-subheadline">
            Qualify incoming roofing contractors from Google Ads, local SEO, and referral channels.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            className="filter-select"
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            aria-label="Filter by Lead Source"
          >
            <option value="All">All Lead Sources</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Organic SEO">Organic SEO</option>
            <option value="Referral">Referral</option>
            <option value="Cold Outreach">Cold Outreach</option>
            <option value="Trade Association">Trade Association</option>
          </select>
          <button className="btn btn-primary" onClick={() => onNavigate('opportunities')}>
            <span>Pipeline Board</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="enterprise-card">
        <div className="table-responsive-wrapper">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Roofing Prospect</th>
                <th>Territory</th>
                <th>Lead Source</th>
                <th>Package Interest</th>
                <th style={{ textAlign: 'right' }}>Est. Deal Value</th>
                <th>Assigned Specialist</th>
                <th>Next Action</th>
                <th style={{ textAlign: 'center' }}>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div>
                      <strong>{lead.company}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {lead.contactName} • {lead.email}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-slate">{lead.market}</span>
                  </td>
                  <td>{lead.leadSource}</td>
                  <td>
                    <span className="badge badge-blue">{lead.packageName}</span>
                  </td>
                  <td style={{ textAlign: 'right' }} className="tabular-nums">
                    <strong>{formatCurrency(lead.potentialValue)}</strong>
                  </td>
                  <td>{lead.assignedPerson}</td>
                  <td style={{ fontSize: '12px' }}>{lead.nextTask}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '11px' }}
                        onClick={() => {
                          onUpdateStage(lead.id, 'qualified');
                          onShowToast(`Qualified ${lead.company}`);
                        }}
                      >
                        Qualify
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '11px' }}
                        onClick={() => onNavigate('conversations')}
                      >
                        Message
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
