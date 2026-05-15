# Feedback Management System (FMS)

## Project Overview

A full-stack web application that allows participants to submit feedback for training programs, events, or products, and enables admins to manage, view, search, and analyse all submitted feedback. The system supports two roles — **Admin** and **User** — each with their own dedicated interface.

---

## Features Implemented

### Admin
- Dashboard with total feedback count and average rating
- View all submitted feedback in a searchable, filterable table
- Search by keyword, rating, and program/event name
- View full details of individual feedback entries
- Edit and delete feedback entries

### User
- Submit feedback with participant name, program/event name, rating (1–5), and comments
- View all submitted feedback in read-only mode
- View individual feedback details (read-only, no edit/delete)

### General
- Role-based access control (Admin vs User) managed on the frontend
- Session isolation — switching roles always starts a fresh session
- Responsive layout

---

## Technology Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, React Router DOM 6, Axios |
| Backend   | FastAPI (Python 3.13)               |
| Database  | SQLite via SQLAlchemy ORM           |

---

## Project Structure

```
AFDE_May26_Shruthi_FMS/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── models.py            # SQLAlchemy ORM models
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── routers/
│   │   └── feedback.py      # API route handlers
│   └── services/
│       └── feedback_service.py  # Business logic
├── database/
│   ├── database.py          # DB connection and session setup
│   └── feedback.db          # SQLite database file
├── frontend/
│   └── src/
│       ├── App.js
│       ├── index.css
│       ├── pages/
│       │   ├── RoleSelect.jsx
│       │   ├── Dashboard.jsx
│       │   ├── FeedbackList.jsx
│       │   ├── FeedbackDetail.jsx
│       │   └── SubmitFeedback.jsx
│       ├── components/
│       │   └── FeedbackForm.jsx
│       └── services/
│           └── feedbackService.js
├── requirements.txt
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 16+
- npm

---

### Backend Setup

1. Navigate to the project root:
   ```bash
   cd AFDE_May26_Shruthi_FMS
   ```

2. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn backend.main:app --reload
   ```

   The API will be available at `http://127.0.0.1:8000`

---

### Database Setup

The SQLite database is created automatically when the backend starts for the first time. No manual setup is required.

- Database file location: `database/feedback.db`
- Tables are created via SQLAlchemy's `Base.metadata.create_all()`

To inspect the database manually, open `database/feedback.db` with any SQLite viewer (e.g., DB Browser for SQLite).

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

> Make sure the backend is running before starting the frontend so API calls succeed.

---

## API Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/`                   | API health check             |
| POST   | `/feedback`           | Submit new feedback          |
| GET    | `/feedback`           | Get all feedback             |
| GET    | `/feedback/{id}`      | Get feedback by ID           |
| PUT    | `/feedback/{id}`      | Update feedback by ID        |
| DELETE | `/feedback/{id}`      | Delete feedback by ID        |
| GET    | `/search`             | Search/filter feedback       |
| GET    | `/stats`              | Get dashboard statistics     |

API documentation (Swagger UI) is available at `http://127.0.0.1:8000/docs`
