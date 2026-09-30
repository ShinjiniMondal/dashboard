import React, { useState, useMemo } from 'react';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  DollarSign,
  Receipt,
  FolderKanban,
  CheckCircle2,
  X,
  Plus,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Client, Project, Invoice, ActiveNavTab } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface ClientsViewProps {
  clients: Client[];
  projects: Project[];
  invoices: Invoice[];
  selectedCountry: string;
  onNavigate: (tab: ActiveNavTab) => void;
  onShowToast: (msg: string) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  projects,
  invoices,
  selectedCountry,
  onNavigate,
  onShowToast
}) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = useMemo(() => {
    if (selectedCountry === 'All') return clients;
    return clients.filter((c) => c.market === selectedCountry);
  }, [clients, selectedCountry]);

  const clientProjects = useMemo(() => {
    if (!selectedClient) return [];
    return projects.filter((p) => p.clientId === selectedClient.id);
  }, [projects, selectedClient]);

  const clientInvoices = useMemo(() => {
    if (!selectedClient) return [];
    return invoices.filter((i) => i.clientId === selectedClient.id);
  }, [invoices, selectedClient]);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Client Accounts Directory</h1>
            <DataBadge isRealData={false} text="Demo CRM Dataset" />
          </div>
          <p className="dashboard-subheadline">
            Active roofing business accounts, contracted digital platforms, and billing balances.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onShowToast('New Client onboarding workflow initiated')}
        >
          <Plus size={15} />
          <span>New Client Account</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="enterprise-card">
        <div className="table-responsive-wrapper">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Company / Client</th>
                <th>Market & Country</th>
                <th>Contact</th>
                <th style={{ textAlign: 'right' }}>Total Contract</th>
                <th style={{ textAlign: 'right' }}>Collected</th>
                <th style={{ textAlign: 'right' }}>Outstanding</th>
                <th>Tags</th>
                <th style={{ textAlign: 'center' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--brand-primary-subtle)',
                          color: 'var(--brand-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          fontSize: '13px'
                        }}
                      >
                        {client.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong>{client.company}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          {client.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>{client.market}</span>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {client.country}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px' }}>{client.email}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {client.phone}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }} className="tabular-nums">
                    <strong>{formatCurrency(client.totalContractValue)}</strong>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--color-success)' }} className="tabular-nums">
                    {formatCurrency(client.totalCollected)}
                  </td>
                  <td style={{ textAlign: 'right' }} className="tabular-nums">
                    {client.outstandingBalance > 0 ? (
                      <span style={{ color: 'var(--color-danger)', fontWeight: '600' }}>
                        {formatCurrency(client.outstandingBalance)}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-tertiary)' }}>$0</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {client.tags.slice(0, 2).map((t) => (
                        <span key={t} className="badge badge-slate" style={{ fontSize: '10px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                      }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Slide-over Modal */}
      {selectedClient && (
        <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
          <div
            className="command-palette-modal"
            style={{ maxWidth: '680px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-header">
              <div className="card-header-left">
                <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={18} color="var(--brand-primary)" />
                  {selectedClient.company}
                </span>
                <span className="card-subtitle">
                  Primary Contact: {selectedClient.name} • {selectedClient.market} ({selectedClient.country})
                </span>
              </div>
              <button className="sidebar-collapse-btn" onClick={() => setSelectedClient(null)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ maxHeight: '520px', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Financial Stats Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Contract Value</span>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }} className="tabular-nums">
                    {formatCurrency(selectedClient.totalContractValue)}
                  </div>
                </div>
                <div style={{ padding: '12px', background: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-success-border)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-success-text)', textTransform: 'uppercase' }}>Total Collected</span>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-success-text)' }} className="tabular-nums">
                    {formatCurrency(selectedClient.totalCollected)}
                  </div>
                </div>
                <div style={{ padding: '12px', background: selectedClient.outstandingBalance > 0 ? 'var(--color-danger-bg)' : '#f8fafc', borderRadius: 'var(--radius-md)', border: `1px solid ${selectedClient.outstandingBalance > 0 ? 'var(--color-danger-border)' : 'var(--surface-border)'}` }}>
                  <span style={{ fontSize: '11px', color: selectedClient.outstandingBalance > 0 ? 'var(--color-danger-text)' : 'var(--text-tertiary)', textTransform: 'uppercase' }}>Outstanding</span>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: selectedClient.outstandingBalance > 0 ? 'var(--color-danger-text)' : 'var(--text-tertiary)' }} className="tabular-nums">
                    {formatCurrency(selectedClient.outstandingBalance)}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Contact & Territory Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div><strong>Email:</strong> {selectedClient.email}</div>
                  <div><strong>Phone:</strong> {selectedClient.phone}</div>
                  <div><strong>Market:</strong> {selectedClient.market}</div>
                  <div><strong>Customer Since:</strong> {selectedClient.joinedDate}</div>
                </div>
              </div>

              {/* Associated Digital Projects */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Contracted Projects ({clientProjects.length})
                </h4>
                {clientProjects.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--surface-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}
                  >
                    <div>
                      <strong>{p.name}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        Package: {p.packageName} • Launch target: {p.expectedLaunch}
                      </div>
                    </div>
                    <span className="badge badge-blue">{p.status}</span>
                  </div>
                ))}
              </div>

              {/* Invoices */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Invoices & Statements ({clientInvoices.length})
                </h4>
                {clientInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--surface-border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px'
                    }}
                  >
                    <span>{inv.invoiceNumber} — {inv.dueDate}</span>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <strong className="tabular-nums">{formatCurrency(inv.amount)}</strong>
                      <span className={`badge ${inv.status === 'paid' ? 'badge-emerald' : 'badge-amber'}`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '14px 20px', background: '#f8fafc', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSelectedClient(null);
                  onNavigate('conversations');
                }}
              >
                Send Message / SMS
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedClient(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
