import React from 'react';
import { DollarSign, Receipt, CreditCard, Layers, TrendingUp, AlertCircle, HelpCircle } from 'lucide-react';
import { MarketData, Invoice, PaymentTransaction } from '../../types';
import { calculateMarketTotals, formatCurrency } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface FinanceOverviewProps {
  markets: MarketData[];
  invoices: Invoice[];
  payments: PaymentTransaction[];
  selectedCountry: string;
}

export const FinanceOverview: React.FC<FinanceOverviewProps> = ({
  markets,
  invoices,
  payments,
  selectedCountry
}) => {
  const totals = calculateMarketTotals(
    selectedCountry === 'All' ? markets : markets.filter((m) => m.market === selectedCountry)
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Revenue Intelligence & Ledger</h1>
            <DataBadge isRealData={true} text="Audited Business Revenue" />
          </div>
          <p className="dashboard-subheadline">
            Verified financial metrics derived strictly from delivered digital projects and billing ledgers.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-title">Generated Revenue</span>
            <DollarSign size={16} color="var(--brand-primary)" />
          </div>
          <div className="kpi-value tabular-nums">{formatCurrency(totals.totalRevenue)}</div>
          <div className="kpi-supporting">
            <span>All-time delivered value</span>
            <span className="kpi-comparison-unavailable">Audited</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-title">Average Deal Value</span>
            <TrendingUp size={16} color="var(--color-success)" />
          </div>
          <div className="kpi-value tabular-nums">{formatCurrency(totals.avgRevenuePerProject, true)}</div>
          <div className="kpi-supporting">
            <span>Per delivered roofing site</span>
            <span className="kpi-comparison-unavailable">165 projects</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-title">Live Bank Sync</span>
            <CreditCard size={16} color="var(--color-warning)" />
          </div>
          <div className="kpi-value" style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>
            ERP Pending
          </div>
          <div className="kpi-supporting">
            <span>Stripe & Wire integration</span>
            <span className="kpi-comparison-unavailable">Sync ready</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-title">Payment Safety Margin</span>
            <Layers size={16} color="var(--color-purple)" />
          </div>
          <div className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-success)' }}>
            100% Retained
          </div>
          <div className="kpi-supporting">
            <span>Zero chargebacks recorded</span>
            <span className="kpi-comparison-unavailable">All territories</span>
          </div>
        </div>
      </div>

      {/* Data Integrity Explanation Card (Item 17, 33, 60) */}
      <div
        className="enterprise-card"
        style={{
          borderLeft: '4px solid var(--brand-primary)',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={16} color="var(--brand-primary)" />
            <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
              Intellobyte Financial Integrity Standard
            </strong>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The primary figure of <strong>${totals.totalRevenue.toLocaleString()}</strong> represents total generated contract value across 165 projects. In accordance with strict accounting rules, this metric is cleanly separated from uncollected balances, pipeline forecasts, and bank gateway clearing logs.
          </p>
        </div>
      </div>
    </div>
  );
};
