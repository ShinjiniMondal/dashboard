import React from 'react';
import { Target, ArrowRight } from 'lucide-react';
import { Opportunity, ActiveNavTab } from '../../types';
import { formatCurrency } from '../../utils/calculations';

interface RecentOpportunitiesWidgetProps {
  opportunities: Opportunity[];
  onNavigate: (tab: ActiveNavTab) => void;
}

export const RecentOpportunitiesWidget: React.FC<RecentOpportunitiesWidgetProps> = ({
  opportunities,
  onNavigate
}) => {
  const getStageBadge = (stage: Opportunity['stage']) => {
    switch (stage) {
      case 'won':
        return <span className="badge badge-emerald">Won Contract</span>;
      case 'negotiation':
        return <span className="badge badge-amber">Negotiation</span>;
      case 'proposal_sent':
        return <span className="badge badge-blue">Proposal Sent</span>;
      case 'qualified':
        return <span className="badge badge-purple">Qualified</span>;
      default:
        return <span className="badge badge-slate">New Lead</span>;
    }
  };

  return (
    <div className="enterprise-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-title">
            <Target size={16} color="var(--color-purple)" />
            High-Intent Pipeline Deals
          </div>
          <div className="card-subtitle">Active roofing contractors in sales discussion</div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('opportunities')}>
          <span>View Pipeline</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="card-body" style={{ padding: '0' }}>
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Company / Prospect</th>
              <th>Package</th>
              <th>Potential Value</th>
              <th>Owner</th>
              <th style={{ textAlign: 'right' }}>Stage</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.slice(0, 4).map((opp) => (
              <tr key={opp.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '600' }}>{opp.company}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {opp.contactName} ({opp.market})
                    </span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-blue">{opp.packageName}</span>
                </td>
                <td className="tabular-nums" style={{ fontWeight: '600', color: 'var(--brand-primary)' }}>
                  {formatCurrency(opp.potentialValue)}
                </td>
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {opp.assignedPerson}
                </td>
                <td style={{ textAlign: 'right' }}>{getStageBadge(opp.stage)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
