import React from 'react';
import { Globe2 } from 'lucide-react';
import { MarketData } from '../../types';
import { DataBadge } from '../common/DataBadge';
import { CountryPerformanceTable } from '../dashboard/CountryPerformanceTable';
import { RevenueOverviewChart } from '../dashboard/RevenueOverviewChart';
import { ProjectDistributionChart } from '../dashboard/ProjectDistributionChart';
import { RevenueVsProjectsScatter } from '../dashboard/RevenueVsProjectsScatter';

interface CountryPerformanceViewProps {
  markets: MarketData[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  onShowToast: (msg: string) => void;
}

export const CountryPerformanceView: React.FC<CountryPerformanceViewProps> = ({
  markets,
  selectedCountry,
  setSelectedCountry,
  onShowToast
}) => {
  return (
    <div className="page-container">
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Geographic Market Intelligence</h1>
            <DataBadge isRealData={true} text="Real Verified Financials" />
          </div>
          <p className="dashboard-subheadline">
            Operational footprint across 9 sovereign regions including European, North American, African, and Asia-Pacific markets.
          </p>
        </div>
      </div>

      <CountryPerformanceTable
        markets={markets}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
        onShowToast={onShowToast}
      />

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

      <RevenueVsProjectsScatter
        markets={markets}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};
