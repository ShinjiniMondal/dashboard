import React, { useState, useMemo } from 'react';
import {
  Receipt,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  DollarSign,
  FileText
} from 'lucide-react';
import { Invoice, InvoiceStatus } from '../../types';
import { formatCurrency, exportToCSV } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface InvoicesViewProps {
  invoices: Invoice[];
  selectedCountry: string;
  onUpdateStatus: (id: string, status: InvoiceStatus) => void;
  onCreateInvoice: (inv: Partial<Invoice>) => void;
  onShowToast: (msg: string) => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  invoices,
  selectedCountry,
  onUpdateStatus,
  onCreateInvoice,
  onShowToast
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [company, setCompany] = useState('');
  const [market, setMarket] = useState('Las Vegas');
  const [packageName, setPackageName] = useState('Pro Plus');
  const [amount, setAmount] = useState(2499);
  const [dueDate, setDueDate] = useState('2026-10-15');

  const filteredInvoices = useMemo(() => {
    return invoices.filter((i) => {
      const matchCountry = selectedCountry === 'All' || i.market === selectedCountry;
      const matchStatus = filterStatus === 'All' || i.status === filterStatus;
      return matchCountry && matchStatus;
    });
  }, [invoices, selectedCountry, filterStatus]);

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return <span className="badge badge-emerald">Paid in Full</span>;
      case 'partially_paid':
        return <span className="badge badge-blue">Partially Paid</span>;
      case 'sent':
        return <span className="badge badge-slate">Sent to Client</span>;
      case 'overdue':
        return <span className="badge badge-rose">Overdue</span>;
      case 'cancelled':
        return <span className="badge badge-slate">Cancelled</span>;
      case 'draft':
      default:
        return <span className="badge badge-amber">Draft</span>;
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Invoice Number',
      'Client Company',
      'Territory',
      'Package Description',
      'Invoice Amount (USD)',
      'Amount Paid (USD)',
      'Due Date',
      'Status'
    ];

    const rows = filteredInvoices.map((i) => [
      i.invoiceNumber,
      i.company,
      i.market,
      i.packageName,
      i.amount,
      i.amountPaid,
      i.dueDate,
      i.status
    ]);

    exportToCSV('Intellobyte_Invoices_Billing_Report', headers, rows);
    onShowToast('Exported Invoices to CSV file');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    onCreateInvoice({
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      company,
      clientName: company,
      market: market as any,
      country: market === 'Las Vegas' ? 'United States' : market,
      projectName: `${company} Roofing Portal`,
      packageName,
      amount: Number(amount),
      amountPaid: 0,
      dueDate,
      issueDate: new Date().toISOString().slice(0, 10),
      status: 'sent',
      isDemoData: true
    });

    setIsModalOpen(false);
    setCompany('');
    onShowToast(`Invoice created and sent to ${company}`);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Invoices & Client Billing</h1>
            <DataBadge isRealData={false} text="Demo Billing Dataset" />
          </div>
          <p className="dashboard-subheadline">
            Manage contract deposits, milestone payments, and overdue reminders for roofing clients.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={15} />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#ffffff', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)' }}>Filter Status:</span>
        {['All', 'paid', 'sent', 'partially_paid', 'overdue', 'draft'].map((st) => (
          <button
            key={st}
            className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus(st)}
            style={{ textTransform: 'capitalize' }}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="enterprise-card">
        <div className="table-responsive-wrapper">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Company / Client</th>
                <th>Territory</th>
                <th>Package / Scope</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ textAlign: 'right' }}>Paid</th>
                <th>Due Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                      {inv.invoiceNumber}
                    </strong>
                  </td>
                  <td>
                    <div>
                      <strong>{inv.company}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{inv.clientName}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-slate">{inv.market}</span>
                  </td>
                  <td>{inv.packageName}</td>
                  <td style={{ textAlign: 'right' }} className="tabular-nums">
                    <strong>{formatCurrency(inv.amount)}</strong>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--color-success)' }} className="tabular-nums">
                    {formatCurrency(inv.amountPaid)}
                  </td>
                  <td style={{ fontSize: '12px' }}>{inv.dueDate}</td>
                  <td>{getStatusBadge(inv.status)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                      {inv.status !== 'paid' && (
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                          onClick={() => {
                            onUpdateStatus(inv.id, 'paid');
                            onShowToast(`Marked ${inv.invoiceNumber} as Paid`);
                          }}
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '11px' }}
                        onClick={() => onShowToast(`Downloaded PDF for ${inv.invoiceNumber}`)}
                        title="Download Invoice PDF"
                      >
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="command-palette-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="card-header">
              <span className="card-title">Generate Roofing Contract Invoice</span>
              <button className="sidebar-collapse-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Roofing Company</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Summit Roofing LLC"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Market Territory</label>
                  <select
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    className="filter-select"
                    style={{ width: '100%', marginTop: '4px' }}
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
                    value={packageName}
                    onChange={(e) => {
                      setPackageName(e.target.value);
                      if (e.target.value === 'Basic') setAmount(499);
                      if (e.target.value === 'Pro') setAmount(1499);
                      if (e.target.value === 'Pro Plus') setAmount(2499);
                    }}
                    className="filter-select"
                    style={{ width: '100%', marginTop: '4px' }}
                  >
                    <option value="Basic">Basic ($499)</option>
                    <option value="Pro">Pro ($1,499)</option>
                    <option value="Pro Plus">Pro Plus ($2,499)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Amount ($ USD)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{ width: '100%', padding: '7px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Generate & Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
