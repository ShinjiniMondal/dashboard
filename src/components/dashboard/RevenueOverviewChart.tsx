import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Info, DollarSign } from 'lucide-react';
import { MarketData } from '../../types';
import { enrichMarketData, formatCurrency, formatPercent } from '../../utils/calculations';

interface RevenueOverviewChartProps {
  markets: MarketData[];
  selectedCountry: string;
  onSelectCountry?: (country: string) => void;
}

export const RevenueOverviewChart: React.FC<RevenueOverviewChartProps> = ({
  markets,
  selectedCountry,
  onSelectCountry
}) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);

  // Dynamically calculate metrics & sort
  const enrichedData = useMemo(() => {
    const data = enrichMarketData(markets);
    return [...data].sort((a, b) => {
      return sortOrder === 'desc' ? b.revenue - a.revenue : a.revenue - b.revenue;
    });
  }, [markets, sortOrder]);

  const maxRevenue = useMemo(() => {
    return Math.max(...enrichedData.map((d) => d.revenue), 1);
  }, [enrichedData]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <div className="enterprise-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-title">
            <DollarSign size={16} color="var(--brand-primary)" />
            Revenue by Geographic Market
          </div>
          <div className="card-subtitle">
            All-time generated revenue across 9 verified operating regions
          </div>
        </div>
        <div className="card-header-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={toggleSort}
            title="Toggle ascending / descending sort"
          >
            <ArrowUpDown size={13} />
            <span>Sort: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}</span>
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="horizontal-bars-container">
          {enrichedData.map((item) => {
            const isSelected = selectedCountry === 'All' || selectedCountry === item.market;
            const isHovered = hoveredMarket === item.market;
            const barWidthPercent = (item.revenue / maxRevenue) * 100;

            return (
              <div
                key={item.market}
                className="bar-row"
                style={{
                  opacity: isSelected ? 1 : 0.35,
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isHovered ? 'var(--surface-subtle)' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={() => setHoveredMarket(item.market)}
                onMouseLeave={() => setHoveredMarket(null)}
                onClick={() => onSelectCountry && onSelectCountry(item.market)}
              >
                <div className="bar-row-labels">
                  <span className="bar-country-name">
                    {item.market}
                    {item.market === 'Las Vegas' && (
                      <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 'normal' }}>
                        (US Market)
                      </span>
                    )}
                  </span>
                  <div className="bar-metrics-values">
                    <span className="bar-main-val tabular-nums">{formatCurrency(item.revenue)}</span>
                    <span className="bar-sub-val tabular-nums">
                      ({formatPercent(item.revenueSharePercent)} share)
                    </span>
                  </div>
                </div>

                <div className="bar-track">
                  <div
                    className="bar-fill blue"
                    style={{ width: `${barWidthPercent}%` }}
                  />
                </div>

                {isHovered && (
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      gap: '12px',
                      marginTop: '2px'
                    }}
                  >
                    <span>{item.projects} projects completed</span>
                    <span>•</span>
                    <span>Avg {formatCurrency(item.avgRevenuePerProject, true)} / project</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
