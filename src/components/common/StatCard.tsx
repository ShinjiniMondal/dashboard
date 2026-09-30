import React from 'react';
import { HelpCircle, ArrowUpRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  supporting: string;
  icon?: LucideIcon;
  comparisonText?: string; // e.g. "Historical comparison unavailable"
  tooltip?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  supporting,
  icon: Icon,
  comparisonText = 'Historical comparison unavailable',
  tooltip,
  onClick
}) => {
  return (
    <div
      className="kpi-card"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      title={tooltip || title}
    >
      <div className="kpi-card-top">
        <span className="kpi-title">{title}</span>
        {Icon && (
          <div className="kpi-icon-wrapper">
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="kpi-value tabular-nums">{value}</div>

      <div className="kpi-supporting">
        <span>{supporting}</span>
        <span className="kpi-comparison-unavailable">
          <HelpCircle size={11} />
          {comparisonText}
        </span>
      </div>
    </div>
  );
};
