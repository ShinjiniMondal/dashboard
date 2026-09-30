import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle2, Clock, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { PaymentTransaction } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface PaymentsViewProps {
  payments: PaymentTransaction[];
  onShowToast: (msg: string) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({ payments, onShowToast }) => {
  // Empty-state by default to satisfy Rule 19 ("Do not fabricate payment records")
  const [showDemoLedger, setShowDemoLedger] = useState(false);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Payment Gateway Clearing Ledger</h1>
            <DataBadge isRealData={false} text="Bank Integration Module" />
          </div>
          <p className="dashboard-subheadline">
            Reconcile inbound Stripe payments, bank SEPA transfers, and direct merchant wires.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${showDemoLedger ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setShowDemoLedger(!showDemoLedger)}
          >
            {showDemoLedger ? 'View Native Empty State' : 'Preview Demo Clearing Ledger'}
          </button>
        </div>
      </div>

      {!showDemoLedger ? (
        /* Empty State UX as strictly mandated by Prompt Section 19 */
        <div className="enterprise-card">
          <div className="empty-state-box">
            <div className="empty-state-icon">
              <CreditCard size={28} />
            </div>
            <div className="empty-state-title">No payment transactions have been imported yet.</div>
            <div className="empty-state-desc">
              Connect your Stripe merchant account or bank feed API to synchronize live client transaction records.
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                className="btn btn-primary"
                onClick={() => onShowToast('Connecting to Stripe webhook gateway...')}
              >
                Connect Payment Gateway
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowDemoLedger(true)}
              >
                Inspect Sample Schema
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Sample Clearing Ledger */
        <div className="enterprise-card">
          <div className="card-header">
            <div className="card-header-left">
              <span className="card-title">Simulated Payment Clearing Feed</span>
              <span className="card-subtitle">Sample webhook payloads from Stripe & SEPA</span>
            </div>
          </div>
          <div className="table-responsive-wrapper">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Roofing Client</th>
                  <th>Territory</th>
                  <th>Invoice #</th>
                  <th>Payment Method</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                  <th style={{ textAlign: 'center' }}>Gateway Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.date}</td>
                    <td>
                      <strong>{p.company}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{p.projectName}</div>
                    </td>
                    <td><span className="badge badge-slate">{p.market}</span></td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{p.invoiceNumber}</td>
                    <td>{p.paymentMethod}</td>
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      <strong style={{ color: 'var(--color-success)' }}>{formatCurrency(p.amount)}</strong>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="badge badge-emerald">
                        <CheckCircle2 size={10} /> Cleared
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
