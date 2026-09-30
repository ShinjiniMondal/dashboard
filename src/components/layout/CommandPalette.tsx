import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  FolderKanban,
  Building2,
  Target,
  Receipt,
  Globe2,
  ArrowRight,
  Zap
} from 'lucide-react';
import { ActiveNavTab } from '../../types';
import { REAL_MARKET_DATA, DEMO_CLIENTS, DEMO_PROJECTS, DEMO_INVOICES, DEMO_OPPORTUNITIES } from '../../data/initialData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveNavTab) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search Results
  const matchedCountries = REAL_MARKET_DATA.filter(
    (m) => m.market.toLowerCase().includes(cleanQuery) || m.country.toLowerCase().includes(cleanQuery)
  );

  const matchedProjects = DEMO_PROJECTS.filter(
    (p) => p.name.toLowerCase().includes(cleanQuery) || p.company.toLowerCase().includes(cleanQuery)
  );

  const matchedClients = DEMO_CLIENTS.filter(
    (c) => c.name.toLowerCase().includes(cleanQuery) || c.company.toLowerCase().includes(cleanQuery)
  );

  const matchedOpportunities = DEMO_OPPORTUNITIES.filter(
    (o) => o.company.toLowerCase().includes(cleanQuery) || o.contactName.toLowerCase().includes(cleanQuery)
  );

  const matchedInvoices = DEMO_INVOICES.filter(
    (i) => i.invoiceNumber.toLowerCase().includes(cleanQuery) || i.company.toLowerCase().includes(cleanQuery)
  );

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="command-palette-modal" onClick={(e) => e.stopPropagation()}>
        <div className="command-search-input-wrapper">
          <Search size={18} color="var(--brand-primary)" />
          <input
            ref={inputRef}
            type="text"
            className="command-search-input"
            placeholder="Type to search markets, projects, clients, invoices, or jump to tab..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="sidebar-collapse-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="command-results-list">
          {/* Quick Nav Shortcut Results */}
          {!query && (
            <>
              <div className="sidebar-nav-group-title" style={{ padding: '8px 12px 4px' }}>Quick Navigation</div>
              <div className="command-result-item" onClick={() => { onNavigate('dashboard'); onClose(); }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={14} color="var(--brand-primary)" /> Dashboard Overview
                </span>
                <kbd className="kbd-shortcut">Jump</kbd>
              </div>
              <div className="command-result-item" onClick={() => { onNavigate('opportunities'); onClose(); }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={14} color="var(--color-purple)" /> Opportunity Pipeline (Kanban)
                </span>
                <kbd className="kbd-shortcut">Jump</kbd>
              </div>
              <div className="command-result-item" onClick={() => { onNavigate('country_performance'); onClose(); }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe2 size={14} color="var(--color-success)" /> Country Performance Table (9 Markets)
                </span>
                <kbd className="kbd-shortcut">Jump</kbd>
              </div>
            </>
          )}

          {/* Matched Markets */}
          {matchedCountries.length > 0 && (
            <>
              <div className="sidebar-nav-group-title" style={{ padding: '8px 12px 4px' }}>Markets & Countries</div>
              {matchedCountries.map((m) => (
                <div
                  key={m.market}
                  className="command-result-item"
                  onClick={() => { onNavigate('country_performance'); onClose(); }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe2 size={15} color="var(--brand-primary)" />
                    <strong>{m.market}</strong> ({m.country}) — {m.projects} projects, ${m.revenue.toLocaleString()}
                  </span>
                  <ArrowRight size={14} color="var(--text-tertiary)" />
                </div>
              ))}
            </>
          )}

          {/* Matched Projects */}
          {matchedProjects.length > 0 && (
            <>
              <div className="sidebar-nav-group-title" style={{ padding: '8px 12px 4px' }}>Projects</div>
              {matchedProjects.map((p) => (
                <div
                  key={p.id}
                  className="command-result-item"
                  onClick={() => { onNavigate('projects'); onClose(); }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FolderKanban size={15} color="#3b82f6" />
                    <span>{p.name} ({p.company})</span>
                  </span>
                  <span className="badge badge-blue">{p.status}</span>
                </div>
              ))}
            </>
          )}

          {/* Matched Clients */}
          {matchedClients.length > 0 && (
            <>
              <div className="sidebar-nav-group-title" style={{ padding: '8px 12px 4px' }}>Clients</div>
              {matchedClients.map((c) => (
                <div
                  key={c.id}
                  className="command-result-item"
                  onClick={() => { onNavigate('clients'); onClose(); }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={15} color="#10b981" />
                    <span>{c.name} — {c.company}</span>
                  </span>
                  <span className="badge badge-emerald">{c.market}</span>
                </div>
              ))}
            </>
          )}

          {/* Matched Invoices */}
          {matchedInvoices.length > 0 && (
            <>
              <div className="sidebar-nav-group-title" style={{ padding: '8px 12px 4px' }}>Invoices</div>
              {matchedInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="command-result-item"
                  onClick={() => { onNavigate('invoices'); onClose(); }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Receipt size={15} color="#f59e0b" />
                    <span>{inv.invoiceNumber} — {inv.company} (${inv.amount.toLocaleString()})</span>
                  </span>
                  <span className="badge badge-amber">{inv.status}</span>
                </div>
              ))}
            </>
          )}

          {query &&
            matchedCountries.length === 0 &&
            matchedProjects.length === 0 &&
            matchedClients.length === 0 &&
            matchedOpportunities.length === 0 &&
            matchedInvoices.length === 0 && (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                No results found for "{query}".
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
