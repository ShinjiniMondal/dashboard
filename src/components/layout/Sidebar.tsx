import React from 'react';
import {
  LayoutDashboard,
  Users,
  Target,
  Building2,
  FolderKanban,
  MessageSquare,
  PhoneCall,
  DollarSign,
  Receipt,
  CreditCard,
  Layers,
  GitPullRequest,
  CheckSquare,
  Calendar,
  Zap,
  BarChart3,
  Globe2,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Bell
} from 'lucide-react';
import { ActiveNavTab, UserRole } from '../../types';

interface SidebarProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userRole: UserRole;
  onOpenHelp: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  userRole,
  onOpenHelp,
  onOpenNotifications,
  unreadCount = 2
}) => {
  const navSections = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard' as ActiveNavTab, label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'CRM',
      items: [
        { id: 'leads' as ActiveNavTab, label: 'Leads', icon: Users, badge: '5' },
        { id: 'opportunities' as ActiveNavTab, label: 'Opportunities', icon: Target, badge: '7' },
        { id: 'clients' as ActiveNavTab, label: 'Clients', icon: Building2, badge: '6' },
        { id: 'projects' as ActiveNavTab, label: 'Projects', icon: FolderKanban, badge: '5' }
      ]
    },
    {
      title: 'Communication',
      items: [
        { id: 'conversations' as ActiveNavTab, label: 'Conversations', icon: MessageSquare, badge: '1' },
        { id: 'calls' as ActiveNavTab, label: 'Calls', icon: PhoneCall }
      ]
    },
    {
      title: 'Finance',
      items: [
        { id: 'revenue' as ActiveNavTab, label: 'Revenue', icon: DollarSign },
        { id: 'invoices' as ActiveNavTab, label: 'Invoices', icon: Receipt, badge: '5' },
        { id: 'payments' as ActiveNavTab, label: 'Payments', icon: CreditCard },
        { id: 'packages' as ActiveNavTab, label: 'Packages', icon: Layers }
      ]
    },
    {
      title: 'Operations',
      items: [
        { id: 'project_pipeline' as ActiveNavTab, label: 'Project Pipeline', icon: GitPullRequest },
        { id: 'tasks' as ActiveNavTab, label: 'Tasks', icon: CheckSquare, badge: '4' },
        { id: 'calendar' as ActiveNavTab, label: 'Calendar', icon: Calendar },
        { id: 'automations' as ActiveNavTab, label: 'Automations', icon: Zap, badge: '5' }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { id: 'analytics' as ActiveNavTab, label: 'Business Analytics', icon: BarChart3 },
        { id: 'country_performance' as ActiveNavTab, label: 'Country Performance', icon: Globe2 }
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'settings' as ActiveNavTab, label: 'Settings & Audit', icon: Settings }
      ]
    }
  ];

  return (
    <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Main Navigation">
      {/* Brand Header */}
      <div className="sidebar-header">
        {!collapsed && (
          <div className="brand-badge">
            <div className="brand-logo-icon">
              <span>IB</span>
            </div>
            <div className="brand-text-container">
              <span className="brand-title">INTELLOBYTE</span>
              <span className="brand-subtitle">Roofing OS</span>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="brand-logo-icon" style={{ margin: '0 auto' }}>
            <span>IB</span>
          </div>
        )}

        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav Scroll Area */}
      <div className="sidebar-scroll-area">
        {navSections.map((section) => (
          <div key={section.title} className="sidebar-nav-group">
            {!collapsed && <div className="sidebar-nav-group-title">{section.title}</div>}
            <ul className="sidebar-nav-list">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={18} className="nav-item-icon" />
                      {!collapsed && <span className="nav-item-label">{item.label}</span>}
                      {!collapsed && item.badge && (
                        <span className="nav-badge-pill">{item.badge}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer / User Profile & Quick Actions */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', gap: '4px', justifyContent: collapsed ? 'center' : 'space-between' }}>
          <button
            className="sidebar-collapse-btn"
            onClick={onOpenNotifications}
            title="Notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={16} />
            {unreadCount > 0 && <span className="notification-badge-dot" style={{ top: 2, right: 2 }} />}
          </button>
          {!collapsed && (
            <>
              <button
                className="sidebar-collapse-btn"
                onClick={onOpenHelp}
                title="System Help & Documentation"
              >
                <HelpCircle size={16} />
              </button>
              <button
                className="sidebar-collapse-btn"
                onClick={() => setActiveTab('settings')}
                title="System Security"
              >
                <ShieldCheck size={16} />
              </button>
            </>
          )}
        </div>

        <div className="user-profile-preview" onClick={() => setActiveTab('settings')} style={{ cursor: 'pointer' }}>
          <div className="user-avatar">
            {userRole.slice(0, 2).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="user-info-text">
              <span className="user-name">Founder / Admin</span>
              <span className="user-role-badge">Role: {userRole}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
