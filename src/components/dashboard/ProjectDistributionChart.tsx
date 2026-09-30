import React, { useMemo } from 'react';
import { FolderKanban, CheckCircle } from 'lucide-react';
import { MarketData } from '../../types';
import { enrichMarketData, formatPercent, formatNumber } from '../../utils/calculations';

interface ProjectDistributionChartProps {
  markets: MarketData[];
  selectedCountry: string;
  onSelectCountry?: (country: string) => void;
}

export const ProjectDistributionChart: React.FC<ProjectDistributionChartProps> = ({
  markets,
  selectedCountry,
  onSelectCountry
}) => {
  const enrichedData = useMemo(() => {
    return enrichMarketData(markets).sort((a, b) => b.projects - a.projects);
  }, [markets]);

  const maxProjects = useMemo(() => {
    return Math.max(...enrichedData.map((d) => d.projects), 1);
  }, [enrichedData]);

  return (
    <div className="enterprise-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-title">
            <FolderKanban size={16} color="var(--color-success)" />
            Project Distribution by Market
          </div>
          <div className="card-subtitle">
            165 completed roofing client deployments across all active territories
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="horizontal-bars-container">
          {enrichedData.map((item) => {
            const isSelected = selectedCountry === 'All' || selectedCountry === item.market;
            const barWidth = (item.projects / maxProjects) * 100;

            return (
              <div
                key={item.market}
                className="bar-row"
                style={{
                  opacity: isSelected ? 1 : 0.35,
                  cursor: 'pointer',
                  padding: '4px 6px',
                  borderRadius: 'var(--radius-sm)'
                }}
                onClick={() => onSelectCountry && onSelectCountry(item.market)}
              >
                <div className="bar-row-labels">
                  <span className="bar-country-name" style={{ fontSize: '12px' }}>
                    {item.market}
                  </span>
                  <div className="bar-metrics-values">
                    <span className="bar-main-val tabular-nums">
                      {formatNumber(item.projects)} projects
                    </span>
                    <span className="bar-sub-val tabular-nums">
                      ({formatPercent(item.projectSharePercent, 1)})
                    </span>
                  </div>
                </div>

                <div className="bar-track" style={{ height: '6px' }}>
                  <div
                    className="bar-fill emerald"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
