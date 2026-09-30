import React, { useState, useMemo } from 'react';
import { Download, ArrowUpDown, Globe2, Search, CheckCircle2 } from 'lucide-react';
import { MarketData, CalculatedMarketMetric } from '../../types';
import { enrichMarketData, formatCurrency, formatPercent, formatNumber, exportToCSV } from '../../utils/calculations';

interface CountryPerformanceTableProps {
  markets: MarketData[];
  selectedCountry: string;
  onSelectCountry?: (country: string) => void;
  onShowToast?: (msg: string) => void;
}

type SortField = 'market' | 'projects' | 'revenue' | 'avgRevenuePerProject' | 'revenueSharePercent' | 'projectSharePercent';

export const CountryPerformanceTable: React.FC<CountryPerformanceTableProps> = ({
  markets,
  selectedCountry,
  onSelectCountry,
  onShowToast
}) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Enriched metrics calculated dynamically
  const enriched = useMemo(() => enrichMarketData(markets), [markets]);

  // Filter & Sort
  const processedData = useMemo(() => {
    let result = enriched.filter((item) => {
      const q = search.toLowerCase();
      const matchSearch = item.market.toLowerCase().includes(q) || item.country.toLowerCase().includes(q);
      const matchCountry = selectedCountry === 'All' || item.market === selectedCountry;
      return matchSearch && matchCountry;
    });

    result.sort((a, b) => {
      let valA: string | number = a[sortField];
      let valB: string | number = b[sortField];

      if (typeof valA === 'string') {
        return sortAsc
          ? valA.localeCompare(valB as string)
          : (valB as string).localeCompare(valA);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

    return result;
  }, [enriched, search, selectedCountry, sortField, sortAsc]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleExport = () => {
    const headers = [
      'Market / Region',
      'Country',
      'Projects Completed',
      'Generated Revenue (USD)',
      'Average Revenue Per Project (USD)',
      'Share of Total Revenue (%)',
      'Share of Total Projects (%)',
      'Market Operational Status'
    ];

    const rows = processedData.map((d) => [
      d.market,
      d.country,
      d.projects,
      d.revenue,
      d.avgRevenuePerProject.toFixed(2),
      d.revenueSharePercent.toFixed(2),
      d.projectSharePercent.toFixed(2),
      'Active Operating Territory'
    ]);

    exportToCSV('Intellobyte_Geographic_Market_Performance', headers, rows);
    if (onShowToast) onShowToast('Exported Country Performance CSV successfully');
  };

  return (
    <div className="enterprise-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-title">
            <Globe2 size={16} color="var(--brand-primary)" />
            Territory & Country Performance Matrix
          </div>
          <div className="card-subtitle">
            Dynamic breakdown of projects, revenue yield, and portfolio contribution across all 9 markets
          </div>
        </div>
        <div className="card-header-actions">
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search territory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '6px 12px 6px 30px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--surface-border)',
                fontSize: '12px',
                outline: 'none',
                width: '180px'
              }}
            />
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleExport} title="Download verified data as CSV">
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort('market')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Market / Country <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('projects')} style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  Projects <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('revenue')} style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  Generated Revenue <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('avgRevenuePerProject')} style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  Revenue / Project <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('revenueSharePercent')} style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  % of Total Rev <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('projectSharePercent')} style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  % of Total Proj <ArrowUpDown size={12} />
                </div>
              </th>
              <th style={{ textAlign: 'center' }}>Operating Status</th>
            </tr>
          </thead>
          <tbody>
            {processedData.map((item) => (
              <tr
                key={item.market}
                onClick={() => onSelectCountry && onSelectCountry(item.market)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{item.market}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{item.country}</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }} className="tabular-nums">
                  <strong>{formatNumber(item.projects)}</strong>
                </td>
                <td style={{ textAlign: 'right' }} className="tabular-nums">
                  <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(item.revenue)}</strong>
                </td>
                <td style={{ textAlign: 'right' }} className="tabular-nums">
                  <span style={{ fontWeight: '600', color: 'var(--brand-primary)' }}>
                    {formatCurrency(item.avgRevenuePerProject, true)}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}> /proj</span>
                </td>
                <td style={{ textAlign: 'right' }} className="tabular-nums">
                  {formatPercent(item.revenueSharePercent)}
                </td>
                <td style={{ textAlign: 'right' }} className="tabular-nums">
                  {formatPercent(item.projectSharePercent)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="badge badge-emerald">
                    <CheckCircle2 size={10} /> Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
