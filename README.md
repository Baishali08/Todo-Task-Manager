# ✦ Taskflow — Full Stack Todo App

A production-ready task manager built with **React**, **Node/Express**, and **MongoDB**.

---

## Project Structure

```
todo-app/
├── backend/           # Express API server
│   ├── models/        # Mongoose schemas
│   │   └── Task.js
│   ├── routes/        # REST API routes
│   │   └── tasks.js
│   ├── server.js      # Entry point
│   ├── .env.example   # Environment template
│   └── package.json
├── frontend/          # React app
│   ├── public/
│   ├── src/
│   │   ├── api/       # API client layer
│   │   ├── components/# TaskCard, TaskForm
│   │   ├── hooks/     # useTasks custom hook
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env — set your MONGODB_URI
npm install
npm run dev    # runs on http://localhost:5000
```

### 2. Frontend Setup (new terminal)

```bash
cd frontend
npm install
npm start      # runs on http://localhost:3000
```

---

## API Reference

| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| GET    | /api/tasks                 | List tasks (filterable)  |
| GET    | /api/tasks/:id             | Get single task          |
| POST   | /api/tasks                 | Create task              |
| PATCH  | /api/tasks/:id             | Update task              |
| PATCH  | /api/tasks/:id/toggle      | Toggle complete          |
| DELETE | /api/tasks/:id             | Delete task              |
| GET    | /api/health                | Health check             |

### Query Parameters (GET /api/tasks)
- `completed=true|false` — filter by status
- `priority=high|medium|low` — filter by priority
- `search=text` — search in title

### Task Schema

```json
{
  "title": "string (required)",
  "description": "string",
  "completed": "boolean (default: false)",
  "priority": "low | medium | high (default: medium)",
  "dueDate": "ISO date string | null",
  "tags": ["string"]
}
```

---

## Features

- ✅ Create, edit, delete, and complete tasks
- ⚑ Priority levels (high / medium / low)
- 📅 Due dates with overdue detection
- 🏷 Tags support
- 🔍 Search + filter by status and priority
- 📊 Completion progress bar
- 💾 Persistent MongoDB storage
- 📱 Responsive design

---

## Tech Stack

| Layer     | Tech                         |
|-----------|------------------------------|
| Frontend  | React 18, CSS custom props   |
| Backend   | Node.js, Express 4           |
| Database  | MongoDB + Mongoose           |
| Fonts     | Syne, DM Mono (Google Fonts) |
