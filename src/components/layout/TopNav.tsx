import React from 'react';
import {
  Search,
  Calendar,
  Globe,
  Bell,
  UserCheck,
  ChevronDown,
  Layers,
  Database
} from 'lucide-react';
import { ActiveNavTab, UserRole } from '../../types';

interface TopNavProps {
  activeTab: ActiveNavTab;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedDateRange: string;
  setSelectedDateRange: (range: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

const TAB_TITLES: Record<ActiveNavTab, { title: string; category: string }> = {
  dashboard: { title: 'Executive Command Center', category: 'Main' },
  leads: { title: 'Roofing Leads Directory', category: 'CRM' },
  opportunities: { title: 'Opportunity Pipeline', category: 'CRM' },
  clients: { title: 'Client Accounts', category: 'CRM' },
  projects: { title: 'Project Management', category: 'CRM' },
  conversations: { title: 'Client Conversations', category: 'Communication' },
  calls: { title: 'Call Center & Voice Analytics', category: 'Communication' },
  revenue: { title: 'Revenue Intelligence', category: 'Finance' },
  invoices: { title: 'Invoices & Billing', category: 'Finance' },
  payments: { title: 'Payment Ledger', category: 'Finance' },
  packages: { title: 'Package Administration', category: 'Finance' },
  project_pipeline: { title: 'Production Pipeline Board', category: 'Operations' },
  tasks: { title: 'Operational Tasks', category: 'Operations' },
  calendar: { title: 'Launch Milestones Calendar', category: 'Operations' },
  automations: { title: 'Workflow Automations Engine', category: 'Operations' },
  analytics: { title: 'Deep Dive Business Analytics', category: 'Analytics' },
  country_performance: { title: 'Geographic Market Intelligence', category: 'Analytics' },
  settings: { title: 'System Settings & Audit Trail', category: 'System' }
};

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  selectedCountry,
  setSelectedCountry,
  selectedDateRange,
  setSelectedDateRange,
  userRole,
  setUserRole,
  onOpenCommandPalette,
  onOpenNotifications,
  unreadCount = 2
}) => {
  const currentMeta = TAB_TITLES[activeTab] || { title: 'Dashboard', category: 'Main' };

  return (
    <header className="app-topnav">
      {/* Left: Breadcrumb & Title */}
      <div className="topnav-left">
        <div className="topnav-title-group">
          <div className="topnav-breadcrumbs">
            <span>Intellobyte</span>
            <span>/</span>
            <span>{currentMeta.category}</span>
          </div>
          <h1 className="topnav-page-title">{currentMeta.title}</h1>
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <button
        className="global-search-trigger"
        onClick={onOpenCommandPalette}
        title="Search projects, clients, leads, invoices (Ctrl+K)"
        aria-label="Search"
      >
        <Search size={15} />
        <span>Search anything...</span>
        <kbd className="kbd-shortcut">⌘K</kbd>
      </button>

      {/* Right: Filters, Role Switcher, Notifications */}
      <div className="topnav-right">
        {/* Country Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Globe size={15} color="var(--text-tertiary)" />
          <select
            className="filter-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            aria-label="Filter by Country or Market"
          >
            <option value="All">All Markets (9)</option>
            <option value="India">India</option>
            <option value="South Africa">South Africa</option>
            <option value="Zimbabwe">Zimbabwe</option>
            <option value="Las Vegas">Las Vegas (US)</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        {/* Date Range Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={15} color="var(--text-tertiary)" />
          <select
            className="filter-select"
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            aria-label="Select Date Range"
          >
            <option value="all_time">All Time</option>
            <option value="this_year">This Year (2026)</option>
            <option value="90_days">Last 90 Days</option>
            <option value="30_days">Last 30 Days</option>
            <option value="7_days">Last 7 Days</option>
            <option value="today">Today</option>
          </select>
        </div>

        {/* Role Selector (Demonstrating Enterprise RBAC) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <UserCheck size={15} color="var(--text-tertiary)" />
          <select
            className="filter-select"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            aria-label="Current Role"
            title="Switch User Role to test RBAC permissions"
          >
            <option value="owner">Role: Owner</option>
            <option value="admin">Role: Admin</option>
            <option value="manager">Role: Manager</option>
            <option value="sales">Role: Sales</option>
            <option value="developer">Role: Developer</option>
            <option value="viewer">Role: Viewer</option>
          </select>
        </div>

        {/* Notifications Icon Button */}
        <button
          className="icon-button"
          onClick={onOpenNotifications}
          title="View Notifications"
          aria-label="Notifications"
        >
          <Bell size={16} />
          {unreadCount > 0 && <span className="notification-badge-dot" />}
        </button>
      </div>
    </header>
  );
};
