import React, { useState, useMemo } from 'react';
import { ScatterChart as ScatterIcon, Info } from 'lucide-react';
import { MarketData } from '../../types';
import { enrichMarketData, formatCurrency, formatNumber } from '../../utils/calculations';

interface RevenueVsProjectsScatterProps {
  markets: MarketData[];
  selectedCountry: string;
}

export const RevenueVsProjectsScatter: React.FC<RevenueVsProjectsScatterProps> = ({
  markets,
  selectedCountry
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const enrichedData = useMemo(() => {
    return enrichMarketData(markets);
  }, [markets]);

  // Scaled bounds for SVG canvas
  const maxProjects = 35; // Maximum projects axis limit (India is 30, Germany is 31)
  const maxRevenue = 30000; // Revenue axis limit (UK is 25000)

  const svgWidth = 520;
  const svgHeight = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };

  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  const projectToX = (projects: number) => {
    return padding.left + (projects / maxProjects) * innerWidth;
  };

  const revenueToY = (rev: number) => {
    return padding.top + innerHeight - (rev / maxRevenue) * innerHeight;
  };

  const hoveredData = enrichedData.find((d) => d.market === hoveredPoint);

  return (
    <div className="enterprise-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-title">
            <ScatterIcon size={16} color="var(--brand-primary)" />
            Revenue vs. Project Volume Analysis
          </div>
          <div className="card-subtitle">
            Market positioning: High-Volume vs. High-Yield ($ / Project)
          </div>
        </div>
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          >
            {/* Grid Lines */}
            {[0, 10, 20, 30].map((tick) => {
              const x = projectToX(tick);
              return (
                <g key={`x-tick-${tick}`}>
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={padding.top + innerHeight}
                    stroke="#e2e8f0"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={x}
                    y={padding.top + innerHeight + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#64748b"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {[0, 10000, 20000, 30000].map((tick) => {
              const y = revenueToY(tick);
              return (
                <g key={`y-tick-${tick}`}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={padding.left + innerWidth}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#64748b"
                  >
                    ${tick / 1000}k
                  </text>
                </g>
              );
            })}

            {/* Axes */}
            <line
              x1={padding.left}
              y1={padding.top + innerHeight}
              x2={padding.left + innerWidth}
              y2={padding.top + innerHeight}
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={padding.top + innerHeight}
              stroke="#94a3b8"
              strokeWidth="1.5"
            />

            {/* Axis Labels */}
            <text
              x={padding.left + innerWidth / 2}
              y={svgHeight - 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#475569"
            >
              Project Volume (Projects Completed) →
            </text>
            <text
              transform={`rotate(-90)`}
              x={-(padding.top + innerHeight / 2)}
              y={18}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#475569"
            >
              Total Revenue ($) →
            </text>

            {/* Data Points */}
            {enrichedData.map((d) => {
              const cx = projectToX(d.projects);
              const cy = revenueToY(d.revenue);
              const isSelected = selectedCountry === 'All' || selectedCountry === d.market;
              const isHovered = hoveredPoint === d.market;

              return (
                <g
                  key={d.market}
                  onMouseEnter={() => setHoveredPoint(d.market)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 9 : 6}
                    fill={isHovered ? '#1d4ed8' : '#3b82f6'}
                    stroke="#ffffff"
                    strokeWidth={2}
                    opacity={isSelected ? 1 : 0.25}
                    style={{ transition: 'all 0.15s ease' }}
                  />
                  {/* Subtle label near circle */}
                  <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill={isHovered ? '#0f172a' : '#64748b'}
                    opacity={isSelected ? (isHovered ? 1 : 0.8) : 0.2}
                  >
                    {d.market}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip Card */}
          {hoveredData && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                background: '#0f172a',
                color: '#ffffff',
                borderRadius: 'var(--radius-md)',
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                boxShadow: 'var(--shadow-dropdown)'
              }}
            >
              <div>
                <strong>{hoveredData.market}</strong> ({hoveredData.country})
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span>Projects: <strong>{hoveredData.projects}</strong></span>
                <span>Revenue: <strong>{formatCurrency(hoveredData.revenue)}</strong></span>
                <span>
                  Yield: <strong>{formatCurrency(hoveredData.avgRevenuePerProject, true)} / proj</strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
