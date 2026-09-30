import React from 'react';
import { CheckSquare, CheckCircle, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { OperationalTask, ActiveNavTab } from '../../types';

interface UpcomingTasksWidgetProps {
  tasks: OperationalTask[];
  onToggleComplete: (taskId: string) => void;
  onSnooze: (taskId: string) => void;
  onNavigate: (tab: ActiveNavTab) => void;
}

export const UpcomingTasksWidget: React.FC<UpcomingTasksWidgetProps> = ({
  tasks,
  onToggleComplete,
  onSnooze,
  onNavigate
}) => {
  const getPriorityBadge = (p: OperationalTask['priority']) => {
    switch (p) {
      case 'urgent':
        return <span className="badge badge-rose">Urgent</span>;
      case 'high':
        return <span className="badge badge-amber">High</span>;
      case 'medium':
        return <span className="badge badge-blue">Medium</span>;
      case 'low':
      default:
        return <span className="badge badge-slate">Low</span>;
    }
  };

  return (
    <div className="enterprise-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-title">
            <CheckSquare size={16} color="var(--brand-primary)" />
            Upcoming Operations Tasks
          </div>
          <div className="card-subtitle">Critical production milestones & client deliverables</div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('tasks')}>
          <span>View All Tasks</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: task.status === 'completed' ? '#f8fafc' : '#ffffff',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <button
                onClick={() => onToggleComplete(task.id)}
                style={{
                  marginTop: '2px',
                  color: task.status === 'completed' ? 'var(--color-success)' : 'var(--text-tertiary)',
                  cursor: 'pointer'
                }}
                title={task.status === 'completed' ? 'Mark incomplete' : 'Mark completed'}
              >
                <CheckCircle size={16} />
              </button>
              <div>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: task.status === 'completed' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                  }}
                >
                  {task.title}
                </span>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                  <span>{task.company}</span>
                  <span>•</span>
                  <span>Owner: {task.owner}</span>
                  <span>•</span>
                  <span>Due: {task.dueDate}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {getPriorityBadge(task.priority)}
              <button
                className="btn btn-secondary btn-sm"
                style={{ padding: '3px 8px', fontSize: '11px' }}
                onClick={() => onSnooze(task.id)}
                title="Snooze task 2 days"
              >
                <Clock size={11} /> Snooze
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
