import React from 'react';
import { X, BookOpen, Layers, ShieldCheck, Database, HelpCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="command-palette-modal"
        style={{ maxWidth: '580px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-header">
          <div className="card-header-left">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--brand-primary)" />
              Intellobyte Operational Architecture
            </span>
            <span className="card-subtitle">Roofing Operating System & Revenue Intelligence Guide</span>
          </div>
          <button className="sidebar-collapse-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div style={{ maxHeight: '460px', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              1. Ground Truth Financial Principles
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              All global revenue ($125,640) and project volume (165) across 9 markets are treated as ground-truth real data. Calculations (such as overall average $761.45/project and market percentage shares) are calculated dynamically and never hardcoded.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              2. Strict Separation of Real vs Demo Data
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Where pipeline stages, CRM threads, or call logs require demonstration records, they are tagged with a green/slate badge indicator. No fictional metrics are blended into the actual financial dataset.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              3. Package Tracking Configuration
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Intellobyte offers Basic ($499), Pro ($1,499), and Pro Plus ($2,499). Because historical package distribution is currently unrecorded, the platform transparently reports "Not yet tracked" instead of fabricating numbers.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              4. Global Keyboard Shortcuts
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li><kbd className="kbd-shortcut">⌘K</kbd> or <kbd className="kbd-shortcut">Ctrl+K</kbd> : Open Command Palette & Quick Search</li>
              <li><kbd className="kbd-shortcut">Esc</kbd> : Close open drawers and modals</li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '12px 20px', background: '#f8fafc', borderTop: '1px solid var(--surface-border)', textAlign: 'right' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Got it, thanks
          </button>
        </div>
      </div>
    </div>
  );
};
