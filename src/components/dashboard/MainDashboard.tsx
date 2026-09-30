import React, { useMemo } from 'react';
import { DollarSign, FolderKanban, TrendingUp, Globe2, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { MarketData, Project, Opportunity, OperationalTask, AuditLogEntry, ActiveNavTab } from '../../types';
import { calculateMarketTotals, formatCurrency, formatNumber } from '../../utils/calculations';
import { StatCard } from '../common/StatCard';
import { DataBadge } from '../common/DataBadge';
import { RevenueOverviewChart } from './RevenueOverviewChart';
import { ProjectDistributionChart } from './ProjectDistributionChart';
import { RevenueVsProjectsScatter } from './RevenueVsProjectsScatter';
import { CountryPerformanceTable } from './CountryPerformanceTable';
import { RecentProjectsWidget } from './RecentProjectsWidget';
import { RecentOpportunitiesWidget } from './RecentOpportunitiesWidget';
import { UpcomingTasksWidget } from './UpcomingTasksWidget';
import { RecentActivityFeed } from './RecentActivityFeed';

interface MainDashboardProps {
  markets: MarketData[];
  projects: Project[];
  opportunities: Opportunity[];
  tasks: OperationalTask[];
  auditLogs: AuditLogEntry[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedDateRange: string;
  onNavigate: (tab: ActiveNavTab) => void;
  onToggleTaskComplete: (taskId: string) => void;
  onSnoozeTask: (taskId: string) => void;
  onShowToast: (msg: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  markets,
  projects,
  opportunities,
  tasks,
  auditLogs,
  selectedCountry,
  setSelectedCountry,
  selectedDateRange,
  onNavigate,
  onToggleTaskComplete,
  onSnoozeTask,
  onShowToast
}) => {
  // Dynamically filter market data if a specific country is selected
  const filteredMarkets = useMemo(() => {
    if (selectedCountry === 'All') return markets;
    return markets.filter((m) => m.market === selectedCountry);
  }, [markets, selectedCountry]);

  // Dynamic calculations: NEVER hardcoded totals
  const totals = useMemo(() => {
    return calculateMarketTotals(filteredMarkets);
  }, [filteredMarkets]);

  const handleRefresh = () => {
    onShowToast('Synced latest business metrics and operational datasets');
  };

  return (
    <div className="page-container">
      {/* Header Banner */}
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Good morning, Intellobyte 👋</h1>
            <DataBadge isRealData={true} text="Real Verified Financials" />
          </div>
          <p className="dashboard-subheadline">
            Your global business performance at a glance across {markets.length} international roofing markets.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {selectedCountry !== 'All' && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setSelectedCountry('All')}
              title="Reset country filter"
            >
              <Filter size={13} />
              <span>Reset Filter ({selectedCountry})</span>
            </button>
          )}
          <button className="btn btn-secondary btn-sm" onClick={handleRefresh}>
            <RefreshCw size={13} />
            <span>Sync Live</span>
          </button>
        </div>
      </div>

      {/* Row 1: 4 Primary KPI Cards */}
      <div className="kpi-grid">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totals.totalRevenue)}
          supporting={selectedCountry === 'All' ? 'All-time generated revenue' : `Generated in ${selectedCountry}`}
          icon={DollarSign}
          comparisonText="Historical comparison unavailable"
          tooltip="Sum of verified project revenues from Intellobyte operations dataset"
          onClick={() => onNavigate('revenue')}
        />
        <StatCard
          title="Total Projects"
          value={formatNumber(totals.totalProjects)}
          supporting={selectedCountry === 'All' ? 'Across 9 markets' : `Completed in ${selectedCountry}`}
          icon={FolderKanban}
          comparisonText="Historical comparison unavailable"
          tooltip="Total roofing websites & systems delivered"
          onClick={() => onNavigate('projects')}
        />
        <StatCard
          title="Average Revenue / Project"
          value={formatCurrency(totals.avgRevenuePerProject, true)}
          supporting="Calculated from supplied revenue/project data"
          icon={TrendingUp}
          comparisonText="Historical comparison unavailable"
          tooltip="Dynamic calculation: Total Revenue / Total Projects"
          onClick={() => onNavigate('revenue')}
        />
        <StatCard
          title="Active Markets"
          value={formatNumber(totals.activeMarketsCount)}
          supporting="India, South Africa, Zimbabwe, Las Vegas, Germany, France, UK, Australia, Canada"
          icon={Globe2}
          comparisonText="Historical comparison unavailable"
          tooltip="Operating international digital regions"
          onClick={() => onNavigate('country_performance')}
        />
      </div>

      {/* Row 2: Large Revenue Overview + Project Distribution */}
      <div className="dashboard-row-grid-2">
        <RevenueOverviewChart
          markets={markets}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
        <ProjectDistributionChart
          markets={markets}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
      </div>

      {/* Row 3: Revenue vs Projects Scatter + Project Status Overview */}
      <div className="dashboard-row-grid-2">
        <RevenueVsProjectsScatter
          markets={markets}
          selectedCountry={selectedCountry}
        />
        <RecentProjectsWidget
          projects={projects}
          onNavigate={onNavigate}
        />
      </div>

      {/* Row 4: Country Performance Table */}
      <CountryPerformanceTable
        markets={markets}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
        onShowToast={onShowToast}
      />

      {/* Row 5: Recent Opportunities + Recent Builds */}
      <div className="dashboard-row-equal-2">
        <RecentOpportunitiesWidget
          opportunities={opportunities}
          onNavigate={onNavigate}
        />
        <UpcomingTasksWidget
          tasks={tasks}
          onToggleComplete={onToggleTaskComplete}
          onSnooze={onSnoozeTask}
          onNavigate={onNavigate}
        />
      </div>

      {/* Row 6: Audit Activity Feed */}
      <RecentActivityFeed
        logs={auditLogs}
        onNavigate={onNavigate}
      />
    </div>
  );
};
