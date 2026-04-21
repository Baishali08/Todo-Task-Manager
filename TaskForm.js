import React, { useState } from 'react';

export default function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : '',
    tags: task?.tags?.join(', ') || '',
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setErr('Title is required'); return; }
    setSaving(true);
    setErr('');
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        dueDate: form.dueDate || null,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      };
      await onSave(payload);
    } catch (error) {
      setErr(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-title">{task ? 'Edit Task' : 'New Task'}</div>
      {err && <div className="form-error">{err}</div>}

      <input
        className="form-input"
        placeholder="Task title *"
        value={form.title}
        onChange={set('title')}
        autoFocus
      />
      <textarea
        className="form-input form-textarea"
        placeholder="Description (optional)"
        value={form.description}
        onChange={set('description')}
        rows={2}
      />
      <div className="form-row">
        <select className="form-input form-select" value={form.priority} onChange={set('priority')}>
          <option value="low">◇ Low Priority</option>
          <option value="medium">◈ Medium Priority</option>
          <option value="high">⚑ High Priority</option>
        </select>
        <input
          className="form-input"
          type="date"
          value={form.dueDate}
          onChange={set('dueDate')}
          placeholder="Due date"
        />
      </div>
      <input
        className="form-input"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={set('tags')}
      />
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-save" disabled={saving}>
          {saving ? 'Saving…' : task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
