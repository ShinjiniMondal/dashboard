import React from 'react';
import { Database, Sparkles } from 'lucide-react';

interface DataBadgeProps {
  isRealData: boolean;
  text?: string;
}

export const DataBadge: React.FC<DataBadgeProps> = ({ isRealData, text }) => {
  return (
    <span
      className={`data-integrity-pill ${isRealData ? 'real' : 'demo'}`}
      title={
        isRealData
          ? 'Sourced directly from verified Intellobyte financial records ($125,640 across 9 markets).'
          : 'Demonstration CRM operational dataset for pipeline, mock tasks, and messaging.'
      }
    >
      <span className="data-integrity-dot" />
      {isRealData ? <Database size={11} /> : <Sparkles size={11} />}
      <span>{text || (isRealData ? 'Real Business Data' : 'Demo Operations Data')}</span>
    </span>
  );
};
