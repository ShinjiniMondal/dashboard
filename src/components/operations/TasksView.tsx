import React, { useState, useMemo } from 'react';
import { CheckSquare, Plus, Filter, CheckCircle2, Clock, Calendar, User } from 'lucide-react';
import { OperationalTask, TaskPriority } from '../../types';
import { DataBadge } from '../common/DataBadge';

interface TasksViewProps {
  tasks: OperationalTask[];
  onToggleComplete: (taskId: string) => void;
  onSnooze: (taskId: string) => void;
  onAddTask: (task: Partial<OperationalTask>) => void;
  onShowToast: (msg: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleComplete,
  onSnooze,
  onAddTask,
  onShowToast
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New task form
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [owner, setOwner] = useState('Elena R.');
  const [dueDate, setDueDate] = useState('2026-10-05');

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchPrio = filterPriority === 'All' || t.priority === filterPriority;
      const matchStatus = filterStatus === 'All' || t.status === filterStatus;
      return matchPrio && matchStatus;
    });
  }, [tasks, filterPriority, filterStatus]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddTask({
      title,
      company: company || 'Agency General',
      clientName: company || 'Team Internal',
      priority,
      status: 'pending',
      owner,
      dueDate,
      isDemoData: true
    });

    setIsModalOpen(false);
    setTitle('');
    setCompany('');
    onShowToast(`Created task: ${title}`);
  };

  const getPriorityBadge = (p: TaskPriority) => {
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
    <div className="page-container">
      <div className="dashboard-header-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Operational Tasks Board</h1>
            <DataBadge isRealData={false} text="Demo Operations Data" />
          </div>
          <p className="dashboard-subheadline">
            Assign and complete production checkpoints, DNS cutovers, and contractor review tasks.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={15} />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '12px', background: '#ffffff', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Priority:</span>
          <select
            className="filter-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Status:</span>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="enterprise-card">
        <div className="table-responsive-wrapper">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>Done</th>
                <th>Task Description</th>
                <th>Associated Account</th>
                <th>Due Date</th>
                <th>Owner</th>
                <th>Priority</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t) => (
                <tr key={t.id} style={{ backgroundColor: t.status === 'completed' ? '#fcfdfd' : '#ffffff' }}>
                  <td>
                    <button
                      onClick={() => onToggleComplete(t.id)}
                      style={{
                        cursor: 'pointer',
                        color: t.status === 'completed' ? 'var(--color-success)' : 'var(--text-tertiary)'
                      }}
                      title="Toggle completion"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                  </td>
                  <td>
                    <span
                      style={{
                        fontWeight: '600',
                        color: t.status === 'completed' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                        textDecoration: t.status === 'completed' ? 'line-through' : 'none'
                      }}
                    >
                      {t.title}
                    </span>
                  </td>
                  <td>{t.company}</td>
                  <td style={{ fontSize: '12px' }}>{t.dueDate}</td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                      <User size={12} /> {t.owner}
                    </span>
                  </td>
                  <td>{getPriorityBadge(t.priority)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSnooze(t.id)}
                      title="Postpone 2 days"
                    >
                      <Clock size={12} /> Snooze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="command-palette-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="card-header">
              <span className="card-title">Create Operational Task</span>
              <button className="sidebar-collapse-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Task Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit DNS records for Munich client"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Client Account</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Summit Roofing"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="filter-select"
                    style={{ width: '100%', marginTop: '4px' }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{ width: '100%', padding: '7px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
