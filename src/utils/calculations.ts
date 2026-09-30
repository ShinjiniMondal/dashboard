// Financial and operational calculation utilities for Intellobyte Command Center
import { MarketData, CalculatedMarketMetric } from '../types';

export interface DashboardTotals {
  totalRevenue: number;
  totalProjects: number;
  avgRevenuePerProject: number;
  activeMarketsCount: number;
}

/**
 * Derives aggregate totals strictly from raw market data.
 * No hardcoded totals.
 */
export function calculateMarketTotals(markets: MarketData[]): DashboardTotals {
  const totalProjects = markets.reduce((acc, curr) => acc + curr.projects, 0);
  const totalRevenue = markets.reduce((acc, curr) => acc + curr.revenue, 0);
  const avgRevenuePerProject = totalProjects > 0 ? totalRevenue / totalProjects : 0;
  const activeMarketsCount = markets.length;

  return {
    totalRevenue,
    totalProjects,
    avgRevenuePerProject,
    activeMarketsCount
  };
}

/**
 * Enriches each market record with dynamically calculated metrics:
 * - Average Revenue / Project (country revenue / country projects)
 * - Share of total revenue (%)
 * - Share of total projects (%)
 */
export function enrichMarketData(markets: MarketData[]): CalculatedMarketMetric[] {
  const { totalRevenue, totalProjects } = calculateMarketTotals(markets);

  return markets.map((m) => {
    const avgRevenuePerProject = m.projects > 0 ? m.revenue / m.projects : 0;
    const revenueSharePercent = totalRevenue > 0 ? (m.revenue / totalRevenue) * 100 : 0;
    const projectSharePercent = totalProjects > 0 ? (m.projects / totalProjects) * 100 : 0;

    return {
      ...m,
      avgRevenuePerProject,
      revenueSharePercent,
      projectSharePercent
    };
  });
}

/**
 * Format currency with international commas and optional decimal places.
 */
export function formatCurrency(amount: number, showDecimals: boolean = false): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  }).format(amount);
}

/**
 * Format number with comma separators.
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format percentage with specified precision.
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Authentic CSV file exporter for any enterprise tabular view.
 */
export function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]): void {
  const escapeCSV = (val: string | number) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map((row) => row.map(escapeCSV).join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
