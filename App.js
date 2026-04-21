import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import './App.css';

const FILTERS = ['all', 'active', 'completed'];
const PRIORITIES = ['all', 'high', 'medium', 'low'];

export default function App() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const apiFilters = {};
  if (statusFilter === 'active') apiFilters.completed = false;
  if (statusFilter === 'completed') apiFilters.completed = true;
  if (priorityFilter !== 'all') apiFilters.priority = priorityFilter;
  if (search) apiFilters.search = search;

  const { tasks, loading, error, addTask, editTask, toggleTask, removeTask } = useTasks(apiFilters);

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.completed).length,
    high: tasks.filter((t) => t.priority === 'high' && !t.completed).length,
  };

  const handleSave = async (data) => {
    if (editingTask) {
      await editTask(editingTask._id, data);
      setEditingTask(null);
    } else {
      await addTask(data);
      setShowForm(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">✦</span>
            <span className="brand-name">Taskflow</span>
          </div>
          <div className="stats">
            <span className="stat"><strong>{stats.done}</strong>/{stats.total} done</span>
            {stats.high > 0 && <span className="stat stat-urgent">⚑ {stats.high} urgent</span>}
          </div>
          <button className="btn-new" onClick={() => { setShowForm(true); setEditingTask(null); }}>
            + New Task
          </button>
        </div>
      </header>

      <main className="main">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn ${statusFilter === f ? 'active' : ''}`}
                onClick={() => setStatusFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="filter-group">
            {PRIORITIES.map((p) => (
              <button
                key={p}
                className={`filter-btn priority-btn priority-${p} ${priorityFilter === p ? 'active' : ''}`}
                onClick={() => setPriorityFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {stats.total > 0 && (
          <div className="progress-wrap">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(stats.done / stats.total) * 100}%` }} />
            </div>
            <span className="progress-label">{Math.round((stats.done / stats.total) * 100)}% complete</span>
          </div>
        )}

        {/* Inline forms */}
        {showForm && (
          <TaskForm onSave={handleSave} onCancel={() => setShowForm(false)} />
        )}
        {editingTask && (
          <TaskForm task={editingTask} onSave={handleSave} onCancel={() => setEditingTask(null)} />
        )}

        {/* Task list */}
        {loading && <div className="state-msg">Loading tasks…</div>}
        {error && <div className="state-msg error">⚠ {error}</div>}
        {!loading && !error && tasks.length === 0 && (
          <div className="empty">
            <div className="empty-icon">◎</div>
            <p>No tasks here. Create one!</p>
          </div>
        )}
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={() => toggleTask(task._id)}
              onEdit={() => handleEdit(task)}
              onDelete={() => removeTask(task._id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
