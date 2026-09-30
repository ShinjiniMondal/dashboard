import React, { useState, useEffect } from 'react';
import { ActiveNavTab, UserRole, OpportunityStage, ProjectStatus, InvoiceStatus } from './types';
import {
  REAL_MARKET_DATA,
  INITIAL_PACKAGES,
  DEMO_CLIENTS,
  DEMO_PROJECTS,
  DEMO_OPPORTUNITIES,
  DEMO_INVOICES,
  DEMO_PAYMENTS,
  DEMO_CONVERSATIONS,
  DEMO_CALLS,
  DEMO_TASKS,
  DEMO_AUTOMATIONS,
  DEMO_AUDIT_LOGS
} from './data/initialData';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { CommandPalette } from './components/layout/CommandPalette';
import { NotificationsModal } from './components/layout/NotificationsModal';
import { HelpModal } from './components/layout/HelpModal';
import { ToastContainer, ToastNotification } from './components/common/Toast';

// Dashboard & Views
import { MainDashboard } from './components/dashboard/MainDashboard';
import { OpportunitiesView } from './components/crm/OpportunitiesView';
import { LeadsView } from './components/crm/LeadsView';
import { ClientsView } from './components/crm/ClientsView';
import { ProjectsView } from './components/projects/ProjectsView';
import { ProjectPipelineView } from './components/operations/ProjectPipelineView';
import { TasksView } from './components/operations/TasksView';
import { CalendarView } from './components/operations/CalendarView';
import { AutomationsView } from './components/operations/AutomationsView';
import { FinanceOverview } from './components/finance/FinanceOverview';
import { InvoicesView } from './components/finance/InvoicesView';
import { PaymentsView } from './components/finance/PaymentsView';
import { PackagesView } from './components/finance/PackagesView';
import { ConversationsView } from './components/communication/ConversationsView';
import { CallsView } from './components/communication/CallsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { CountryPerformanceView } from './components/analytics/CountryPerformanceView';
import { SettingsView } from './components/settings/SettingsView';

export function App() {
  // Navigation & Global Filter States
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all_time');
  const [userRole, setUserRole] = useState<UserRole>('owner');

  // Modals & Drawers
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // State Datasets
  const [markets] = useState(REAL_MARKET_DATA);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [clients, setClients] = useState(DEMO_CLIENTS);
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [opportunities, setOpportunities] = useState(DEMO_OPPORTUNITIES);
  const [invoices, setInvoices] = useState(DEMO_INVOICES);
  const [payments] = useState(DEMO_PAYMENTS);
  const [conversations, setConversations] = useState(DEMO_CONVERSATIONS);
  const [calls] = useState(DEMO_CALLS);
  const [tasks, setTasks] = useState(DEMO_TASKS);
  const [automations, setAutomations] = useState(DEMO_AUTOMATIONS);
  const [auditLogs, setAuditLogs] = useState(DEMO_AUDIT_LOGS);

  // Keyboard shortcut listener for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Action handlers
  const handleUpdateOpportunityStage = (oppId: string, newStage: OpportunityStage) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, stage: newStage, updatedAt: 'Just now' } : o))
    );
    const opp = opportunities.find((o) => o.id === oppId);
    if (opp) {
      const newAudit: any = {
        id: `aud-${Date.now()}`,
        who: `${userRole.toUpperCase()} (Session)`,
        what: 'Opportunity Stage Updated',
        when: 'Just now',
        entityType: 'Opportunity',
        details: `Moved ${opp.company} to ${newStage.replace('_', ' ').toUpperCase()}`,
        previousValue: opp.stage,
        newValue: newStage
      };
      setAuditLogs((prev) => [newAudit, ...prev]);
    }
  };

  const handleCreateOpportunity = (newOppData: any) => {
    const newId = `opp-${Date.now()}`;
    const fullOpp = {
      ...newOppData,
      id: newId,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: 'Just now'
    };
    setOpportunities((prev) => [fullOpp, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        who: `${userRole.toUpperCase()} (Session)`,
        what: 'Opportunity Created',
        when: 'Just now',
        entityType: 'Opportunity',
        details: `Created new deal for ${newOppData.company} (${newOppData.market})`,
        newValue: newOppData.company
      },
      ...prev
    ]);
  };

  const handleUpdateProjectStatus = (projectId: string, newStatus: ProjectStatus) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: newStatus, updatedAt: 'Just now' } : p))
    );
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      setAuditLogs((prev) => [
        {
          id: `aud-${Date.now()}`,
          who: `${userRole.toUpperCase()} (Session)`,
          what: 'Project Status Updated',
          when: 'Just now',
          entityType: 'Project',
          details: `Updated ${proj.name} status to ${newStatus}`,
          previousValue: proj.status,
          newValue: newStatus
        },
        ...prev
      ]);
    }
  };

  const handleUpdateInvoiceStatus = (invId: string, newStatus: InvoiceStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invId ? { ...inv, status: newStatus } : inv))
    );
    const inv = invoices.find((i) => i.id === invId);
    if (inv) {
      setAuditLogs((prev) => [
        {
          id: `aud-${Date.now()}`,
          who: `${userRole.toUpperCase()} (Session)`,
          what: 'Invoice Status Changed',
          when: 'Just now',
          entityType: 'Invoice',
          details: `Marked invoice ${inv.invoiceNumber} as ${newStatus}`,
          previousValue: inv.status,
          newValue: newStatus
        },
        ...prev
      ]);
    }
  };

  const handleCreateInvoice = (newInv: any) => {
    const fullInv = {
      ...newInv,
      id: `inv-${Date.now()}`
    };
    setInvoices((prev) => [fullInv, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        who: `${userRole.toUpperCase()} (Session)`,
        what: 'Invoice Created',
        when: 'Just now',
        entityType: 'Invoice',
        details: `Issued ${newInv.invoiceNumber} to ${newInv.company} ($${newInv.amount})`,
        newValue: newInv.invoiceNumber
      },
      ...prev
    ]);
  };

  const handleUpdatePackagePrice = (pkgId: string, newPrice: number) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === pkgId ? { ...p, price: newPrice } : p))
    );
    const pkg = packages.find((p) => p.id === pkgId);
    if (pkg) {
      setAuditLogs((prev) => [
        {
          id: `aud-${Date.now()}`,
          who: `${userRole.toUpperCase()} (Session)`,
          what: 'Package Price Adjusted',
          when: 'Just now',
          entityType: 'Package',
          details: `Adjusted ${pkg.name} price to $${newPrice.toLocaleString()}`,
          previousValue: `$${pkg.price}`,
          newValue: `$${newPrice}`
        },
        ...prev
      ]);
    }
  };

  const handleToggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const nextSt = task.status === 'completed' ? 'pending' : 'completed';
      showToast(`Task "${task.title}" marked as ${nextSt}`);
    }
  };

  const handleSnoozeTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, dueDate: '2026-10-10' } : t))
    );
    showToast('Task snoozed for 2 business days');
  };

  const handleAddTask = (taskData: any) => {
    const newTask = {
      ...taskData,
      id: `tsk-${Date.now()}`
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleAutomation = (autId: string) => {
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === autId ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a
      )
    );
  };

  const handleSendMessage = (convId: string, text: string, channel: 'sms' | 'email' | 'internal_note') => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'agent' as const,
      senderName: `${userRole.toUpperCase()} (Intellobyte)`,
      timestamp: 'Just now',
      text,
      channel
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              lastMessageSnippet: text,
              lastMessageTimestamp: 'Just now',
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );
  };

  return (
    <div className="app-container">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole={userRole}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={2}
      />

      {/* Main Layout Area */}
      <div className={`app-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Navigation */}
        <TopNav
          activeTab={activeTab}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          userRole={userRole}
          setUserRole={setUserRole}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={2}
        />

        {/* Dynamic Route View */}
        <main>
          {activeTab === 'dashboard' && (
            <MainDashboard
              markets={markets}
              projects={projects}
              opportunities={opportunities}
              tasks={tasks}
              auditLogs={auditLogs}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedDateRange={selectedDateRange}
              onNavigate={setActiveTab}
              onToggleTaskComplete={handleToggleTaskComplete}
              onSnoozeTask={handleSnoozeTask}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'opportunities' && (
            <OpportunitiesView
              opportunities={opportunities}
              packages={packages}
              selectedCountry={selectedCountry}
              onUpdateStage={handleUpdateOpportunityStage}
              onCreateOpportunity={handleCreateOpportunity}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsView
              opportunities={opportunities}
              selectedCountry={selectedCountry}
              onUpdateStage={handleUpdateOpportunityStage}
              onNavigate={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsView
              clients={clients}
              projects={projects}
              invoices={invoices}
              selectedCountry={selectedCountry}
              onNavigate={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={projects}
              selectedCountry={selectedCountry}
              onUpdateStatus={handleUpdateProjectStatus}
              onShowToast={showToast}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'project_pipeline' && (
            <ProjectPipelineView
              projects={projects}
              selectedCountry={selectedCountry}
              onUpdateStatus={handleUpdateProjectStatus}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={tasks}
              onToggleComplete={handleToggleTaskComplete}
              onSnooze={handleSnoozeTask}
              onAddTask={handleAddTask}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              projects={projects}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'automations' && (
            <AutomationsView
              automations={automations}
              onToggleStatus={handleToggleAutomation}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'revenue' && (
            <FinanceOverview
              markets={markets}
              invoices={invoices}
              payments={payments}
              selectedCountry={selectedCountry}
            />
          )}

          {activeTab === 'invoices' && (
            <InvoicesView
              invoices={invoices}
              selectedCountry={selectedCountry}
              onUpdateStatus={handleUpdateInvoiceStatus}
              onCreateInvoice={handleCreateInvoice}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsView
              payments={payments}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'packages' && (
            <PackagesView
              packages={packages}
              onUpdatePackagePrice={handleUpdatePackagePrice}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'conversations' && (
            <ConversationsView
              conversations={conversations}
              onSendMessage={handleSendMessage}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'calls' && (
            <CallsView
              calls={calls}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              markets={markets}
              projects={projects}
              opportunities={opportunities}
              selectedCountry={selectedCountry}
            />
          )}

          {activeTab === 'country_performance' && (
            <CountryPerformanceView
              markets={markets}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              userRole={userRole}
              setUserRole={setUserRole}
              auditLogs={auditLogs}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setActiveTab}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Toast Overlay */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
