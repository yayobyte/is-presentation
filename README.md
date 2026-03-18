# Interactive Presentation & Exam System

A real-time, synchronized presentation platform with built-in exam capabilities, built with **React**, **Vite**, and **Supabase**.

## 🚀 Key Features

### 👨‍🏫 Presenter Dashboard
- **Live Slide Control**: Synchronize slide transitions across all student devices in real-time.
- **Session Control**: Start and stop exams globally, with optional per-student timers.
- **Management Center**:
    - **Student CRM**: Register, edit, and search for students.
    - **Group Administration**: Manage class cohorts and assignments.
- **Results Tracking**: View aggregated group performance and individual student scores.
- **Data Export**: Export results to CSV for external analysis.

### 🎓 Student View
- **Live Sync**: Automatically follows the presenter's slides.
- **Timed Exams**: Interactive exam interface that activates only when the presenter triggers it.
- **Auto-submission**: Prevents multiple submissions and handles timing out.

## 🏗 Architecture

The project follows a modular, service-oriented architecture:

- **`/src/services`**: Abstraction layer for all Supabase interactions (Auth, Exam, Presentation, Students, Groups). No raw database calls are made within UI components.
- **`/src/features`**: Domain-driven feature organization (Exam logic, Sync hooks, Presenter UI).
- **`/src/store`**: Global state management via **Zustand** for real-time presentation state.
- **`/src/features/shared/providers`**: Context providers for Authentication and Results aggregation.

## 🛠 Setup & Deployment

### 1. Database Initialization
This project requires a Supabase backend. To set up the schema:
1. Create a new Supabase project.
2. Go to the **SQL Editor**.
3. Copy the contents of [`supabase_schema.sql`](./supabase_schema.sql) and run it. This script is idempotent and sets up all tables, RLS policies, and initial sequences.

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Local Development
```bash
npm install
npm run dev
```

## 📜 Database Schema Recap
- `presentation_state`: Tracks slides and exam status.
- `exam_submissions`: Stores student answers and scores.
- `students`: Registry of authorized student IDs.
- `groups`: Class cohorts for results aggregation.
