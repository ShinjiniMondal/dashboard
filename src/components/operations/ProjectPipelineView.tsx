import React, { useMemo } from 'react';
import { GitPullRequest, ArrowRight, FolderKanban } from 'lucide-react';
import { Project, ProjectStatus } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface ProjectPipelineViewProps {
  projects: Project[];
  selectedCountry: string;
  onUpdateStatus: (id: string, status: ProjectStatus) => void;
  onShowToast: (msg: string) => void;
}

const PIPELINE_COLUMNS: { id: ProjectStatus; label: string }[] = [
  { id: 'onboarding', label: '1. Onboarding' },
  { id: 'design', label: '2. Design' },
  { id: 'development', label: '3. Dev Sprint' },
  { id: 'client_approval', label: '4. Review & Approval' },
  { id: 'live', label: '5. Production Live' },
  { id: 'completed', label: '6. Completed' }
];

export const ProjectPipelineView: React.FC<ProjectPipelineViewProps> = ({
  projects,
  selectedCountry,
  onUpdateStatus,
  onShowToast
}) => {
  const filtered = useMemo(() => {
    if (selectedCountry === 'All') return projects;
    return projects.filter((p) => p.market === selectedCountry);
  }, [projects, selectedCountry]);

  return (
    <div className="page-container">
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Production Pipeline Board</h1>
            <DataBadge isRealData={false} text="Demo Production Dataset" />
          </div>
          <p className="dashboard-subheadline">
            Visual kanban tracking build stages from onboarding questionnaire through live custom domain launch.
          </p>
        </div>
      </div>

      <div className="kanban-board-container" style={{ gridTemplateColumns: 'repeat(6, minmax(260px, 1fr))' }}>
        {PIPELINE_COLUMNS.map((col) => {
          const colProjects = filtered.filter((p) => p.status === col.id);

          return (
            <div key={col.id} className="kanban-column">
              <div className="kanban-column-header">
                <span>{col.label}</span>
                <span className="badge badge-slate" style={{ fontSize: '10px' }}>
                  {colProjects.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {colProjects.map((p) => (
                  <div key={p.id} className="kanban-card">
                    <div style={{ fontWeight: '700', fontSize: '13px' }}>{p.company}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{p.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span className="badge badge-blue">{p.packageName}</span>
                      <strong className="tabular-nums" style={{ color: 'var(--brand-primary)', fontSize: '13px' }}>
                        {formatCurrency(p.contractValue)}
                      </strong>
                    </div>

                    <div style={{ marginTop: '8px' }}>
                      <div className="bar-track" style={{ height: '4px' }}>
                        <div className="bar-fill blue" style={{ width: `${p.progress}%` }} />
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Progress</span>
                        <span>{p.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}

                {colProjects.length === 0 && (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '12px' }}>
                    No projects in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
