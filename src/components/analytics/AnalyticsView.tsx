import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, FolderKanban, Globe2, Target, Layers } from 'lucide-react';
import { MarketData, Project, Opportunity } from '../../types';
import { calculateMarketTotals, enrichMarketData, formatCurrency, formatPercent, formatNumber } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface AnalyticsViewProps {
  markets: MarketData[];
  projects: Project[];
  opportunities: Opportunity[];
  selectedCountry: string;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  markets,
  projects,
  opportunities,
  selectedCountry
}) => {
  const [activeTab, setActiveTab] = useState<'revenue' | 'projects' | 'markets'>('revenue');

  const filteredMarkets = selectedCountry === 'All'
    ? markets
    : markets.filter((m) => m.market === selectedCountry);

  const totals = calculateMarketTotals(filteredMarkets);
  const enriched = enrichMarketData(filteredMarkets);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Business & Revenue Analytics</h1>
            <DataBadge isRealData={true} text="Real Verified Financials" />
          </div>
          <p className="dashboard-subheadline">
            Deep-dive metrics across international territories, project volume, and yield per build.
          </p>
        </div>

        <div style={{ display: 'flex', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <button
            className={`btn btn-sm ${activeTab === 'revenue' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('revenue')}
            style={{ borderRadius: 0, border: 'none' }}
          >
            Revenue Analytics
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('projects')}
            style={{ borderRadius: 0, border: 'none' }}
          >
            Project Analytics
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'markets' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('markets')}
            style={{ borderRadius: 0, border: 'none' }}
          >
            Territory Yield
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-title">Total Revenue</span>
          <div className="kpi-value tabular-nums">{formatCurrency(totals.totalRevenue)}</div>
          <div className="kpi-supporting">Verified All-Time</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Total Deployments</span>
          <div className="kpi-value tabular-nums">{formatNumber(totals.totalProjects)}</div>
          <div className="kpi-supporting">Across 9 Markets</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Average Revenue / Project</span>
          <div className="kpi-value tabular-nums" style={{ color: 'var(--brand-primary)' }}>
            {formatCurrency(totals.avgRevenuePerProject, true)}
          </div>
          <div className="kpi-supporting">Derived ($125,640 / 165)</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Highest Yield Market</span>
          <div className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-success)' }}>
            United Kingdom
          </div>
          <div className="kpi-supporting">$1,470.59 / project avg</div>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'revenue' && (
        <div className="enterprise-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>
            Territory Revenue Contribution Matrix
          </h3>
          <div className="table-responsive-wrapper">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Market</th>
                  <th style={{ textAlign: 'right' }}>Generated Revenue</th>
                  <th style={{ textAlign: 'right' }}>Share of Total Revenue</th>
                  <th style={{ textAlign: 'right' }}>Average Revenue / Project</th>
                </tr>
              </thead>
              <tbody>
                {enriched.map((m) => (
                  <tr key={m.market}>
                    <td><strong>{m.market}</strong> ({m.country})</td>
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      <strong>{formatCurrency(m.revenue)}</strong>
                    </td>
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      {formatPercent(m.revenueSharePercent)}
                    </td>
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      <span style={{ color: 'var(--brand-primary)', fontWeight: '600' }}>
                        {formatCurrency(m.avgRevenuePerProject, true)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="enterprise-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>
            Project Volume by Territory
          </h3>
          <div className="table-responsive-wrapper">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Market</th>
                  <th style={{ textAlign: 'right' }}>Completed Projects</th>
                  <th style={{ textAlign: 'right' }}>Share of Total Projects</th>
                  <th style={{ textAlign: 'right' }}>Average Value Delivered</th>
                </tr>
              </thead>
              <tbody>
                {enriched.map((m) => (
                  <tr key={m.market}>
                    <td><strong>{m.market}</strong></td>
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      <strong>{formatNumber(m.projects)}</strong>
                    </td>
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      {formatPercent(m.projectSharePercent)}
                    </td>
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      {formatCurrency(m.avgRevenuePerProject, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'markets' && (
        <div className="enterprise-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>
            Territory Revenue Efficiency (Yield per Build)
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Markets ranked by highest average revenue generated per single roofing website contract.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[...enriched]
              .sort((a, b) => b.avgRevenuePerProject - a.avgRevenuePerProject)
              .map((item, index) => (
                <div
                  key={item.market}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-tertiary)', width: '20px' }}>
                      #{index + 1}
                    </span>
                    <div>
                      <strong style={{ fontSize: '14px' }}>{item.market}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginLeft: '8px' }}>
                        ({item.country}) • {item.projects} projects
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ fontSize: '15px', color: 'var(--brand-primary)' }} className="tabular-nums">
                      {formatCurrency(item.avgRevenuePerProject, true)}
                    </strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>avg / project</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
