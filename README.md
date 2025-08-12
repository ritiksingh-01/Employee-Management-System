# 🚀 Employee Management System

A modern, intuitive web-based Employee Management System built with React.js. This project streamlines task assignment and management, providing distinct dashboards for employees and administrators.

---

## 🛠️ Technologies Used

- **React.js** — Fast, component-based frontend library
- **Tailwind CSS** — Utility-first, responsive styling
- **Local Storage API** — In-browser persistence for users and tasks

---

## 🎯 Features Overview

### 👤 Employee Dashboard
- View all assigned tasks with status (Active, Completed, Failed, New)
- Task categorization (Development, Marketing, Logistics, etc.)
- Task details: title, description, category, due date, and status

### 🧑‍💼 Admin Dashboard
- Create new tasks for employees via a simple form
- Assign tasks with title, date, assignee, category, and full description
- Overview of all company tasks, statuses, and assignees

### 🔐 Authentication & Data
- Role-based login for Admin and Employees
- “Remember Me” option for convenience
- Local Storage for fast, persistent data (no backend required)

---

## 🗂️ Project Structure

```
src/
 ├── components/
 │    ├── Auth/           # Login logic and UI
 │    ├── Dashboard/      # Dashboards for admin and employees
 │    ├── Other/          # Task creation and overview
 │    └── TaskList/       # Employee task display
 └── utils/
      └── localStorage.jsx # Data models and local storage utils
```

---

## 📝 Sample Data Model

- **Employees:** ID, email, password, tasks (list)
- **Admin:** ID, email, password
- **Tasks:** title, description, date, category, status flags

---

## 🚦 How It Works

1. **Login:** Choose your role, enter email and password.
2. **Dashboard:** 
   - Admin — create and assign tasks, view all tasks.
   - Employee — view and manage your assigned tasks.
3. **Task Management:** Tasks are tracked by status and updated dynamically.
4. **Persistence:** Data is stored in the browser for instant access.

---

## ⚡ Getting Started

1. **Clone this repository:**
   ```bash
   git clone https://github.com/ritiksingh-01/Employee-Management-System.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app:**
   ```bash
   npm start
   ```
4. **Visit:** [http://localhost:3000](http://localhost:3000)

---

## 🚫 Contributing

**Thank you for your interest! This project is personal and closed to outside contributions.**

---

## 📃 License

_No license specified._

---

**Made with ❤️ by [Ritik Singh](https://github.com/ritiksingh-01)**
