import React, { useState } from 'react';

const PRIORITY_LABELS = { high: '⚑ High', medium: '◈ Medium', low: '◇ Low' };

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  const due = task.dueDate ? new Date(task.dueDate) : null;
  const overdue = task.isOverdue;

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} priority-border-${task.priority}`}>
      <button className="check-btn" onClick={onToggle} aria-label="toggle complete">
        <span className={`check ${task.completed ? 'checked' : ''}`}>
          {task.completed ? '✓' : ''}
        </span>
      </button>

      <div className="task-body">
        <div className="task-header">
          <span className="task-title">{task.title}</span>
          <span className={`priority-tag priority-${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
        </div>
        {task.description && <p className="task-desc">{task.description}</p>}
        <div className="task-meta">
          {due && (
            <span className={`due-date ${overdue ? 'overdue' : ''}`}>
              {overdue ? '⚠ Overdue · ' : '◷ '}
              {due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
          {task.tags?.map((tag) => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      </div>

      <div className="task-actions">
        <button className="action-btn" onClick={onEdit} title="Edit">✎</button>
        {confirming ? (
          <>
            <button className="action-btn danger" onClick={onDelete} title="Confirm delete">✓</button>
            <button className="action-btn" onClick={() => setConfirming(false)} title="Cancel">✕</button>
          </>
        ) : (
          <button className="action-btn" onClick={() => setConfirming(true)} title="Delete">⌫</button>
        )}
      </div>
    </div>
  );
}
