import React, { useState } from 'react';
import { Layers, Settings2, Plus, CheckCircle2, HelpCircle, Edit3, Archive, X } from 'lucide-react';
import { Package } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface PackagesViewProps {
  packages: Package[];
  onUpdatePackagePrice: (pkgId: string, newPrice: number) => void;
  onShowToast: (msg: string) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  packages,
  onUpdatePackagePrice,
  onShowToast
}) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);

  const handleOpenEdit = (pkg: Package) => {
    setEditingPkg(pkg);
    setEditPriceVal(pkg.price);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    onUpdatePackagePrice(editingPkg.id, editPriceVal);
    onShowToast(`Updated price of ${editingPkg.name} to $${editPriceVal.toLocaleString()}`);
    setEditingPkg(null);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Package Architecture & Performance</h1>
            <DataBadge isRealData={true} text="Official Tier Pricing" />
          </div>
          <p className="dashboard-subheadline">
            Intellobyte standard digital service offerings tailored for international roofing companies.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setIsConfigModalOpen(true)}
          >
            <Settings2 size={14} />
            <span>Configure Package Tracking</span>
          </button>
        </div>
      </div>

      {/* Package Pricing Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="enterprise-card"
            style={{
              borderTop: pkg.name === 'Pro Plus' ? '3px solid var(--brand-primary)' : '1px solid var(--surface-border)'
            }}
          >
            <div className="card-header">
              <div className="card-header-left">
                <span className="card-title">{pkg.name}</span>
                <span className="card-subtitle">Roofing Web Platform</span>
              </div>
              <span className="badge badge-emerald">
                <CheckCircle2 size={10} /> Active Tier
              </span>
            </div>

            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }} className="tabular-nums">
                  {formatCurrency(pkg.price)}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>One-time build & deployment fee</div>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {pkg.description}
              </p>

              {/* Features list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--surface-subtle)', paddingTop: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                  Included Capabilities
                </span>
                {pkg.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={14} color="var(--color-success)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '12px 20px', background: '#f8fafc', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>SKU: {pkg.id}</span>
              <button className="btn btn-secondary btn-sm" onClick={() => handleOpenEdit(pkg)}>
                <Edit3 size={12} /> Edit Price
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Performance Tracking Table (Strictly obeying Prompt Section 12) */}
      <div className="enterprise-card">
        <div className="card-header">
          <div className="card-header-left">
            <span className="card-title">Package Sales & Revenue Tracking</span>
            <span className="card-subtitle">
              Strict Data Integrity Rule: Current historical purchase distribution across tiers is not yet tracked.
            </span>
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Package Tier</th>
                <th style={{ textAlign: 'right' }}>Official Price</th>
                <th style={{ textAlign: 'center' }}>Projects Sold</th>
                <th style={{ textAlign: 'center' }}>Revenue Generated</th>
                <th style={{ textAlign: 'center' }}>Conversion Rate</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td>
                    <strong>{pkg.name}</strong>
                  </td>
                  <td style={{ textAlign: 'right' }} className="tabular-nums">
                    <strong>{formatCurrency(pkg.price)}</strong>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '12px' }}>
                      Not yet tracked
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '12px' }}>
                      Not yet tracked
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '12px' }}>
                      Not yet tracked
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="badge badge-slate">Ready for Telemetry</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Price Modal */}
      {editingPkg && (
        <div className="modal-overlay" onClick={() => setEditingPkg(null)}>
          <div className="command-palette-modal" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <span className="card-title">Adjust Price for {editingPkg.name}</span>
              <button className="sidebar-collapse-btn" onClick={() => setEditingPkg(null)}>✕</button>
            </div>
            <form onSubmit={handleSavePrice} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Price (USD)</label>
                <input
                  type="number"
                  required
                  value={editPriceVal}
                  onChange={(e) => setEditPriceVal(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingPkg(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Price</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Configure Tracking Modal */}
      {isConfigModalOpen && (
        <div className="modal-overlay" onClick={() => setIsConfigModalOpen(false)}>
          <div className="command-palette-modal" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <span className="card-title">Configure Package Tracking</span>
              <button className="sidebar-collapse-btn" onClick={() => setIsConfigModalOpen(false)}>✕</button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                To attribute Intellobyte’s 165 historical projects to their respective Basic ($499), Pro ($1,499), or Pro Plus ($2,499) tiers, you can connect your contract repository or upload an attribution mapping file.
              </p>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                <strong>Required CSV Format:</strong>
                <pre style={{ fontSize: '11px', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                  project_id,client_name,package_id,contract_value
                </pre>
              </div>
            </div>
            <div style={{ padding: '14px 20px', background: '#f8fafc', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setIsConfigModalOpen(false)}>Close</button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setIsConfigModalOpen(false);
                  onShowToast('Package tracking configuration initiated');
                }}
              >
                Import Attribution File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
