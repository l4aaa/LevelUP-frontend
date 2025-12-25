# 🚀 LevelUp – Frontend

![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.0-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38b2ac.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

The modern, responsive client for **LevelUp**, a platform that transforms academic tasks into an RPG-style adventure. Built with the latest web standards, this Single Page Application (SPA) provides students with a visually engaging interface to track progress, complete quests, and compete on global leaderboards.

---

## ✨ Key Features

### 🔐 Authentication & Security
* **Secure Access**: Dedicated Login and Registration screens with client-side validation using **React Hook Form**.
* **JWT Management**: Industry-standard token-based authentication stored securely in LocalStorage with automated Axios interceptors.
* **Role-Based Access**: Centralized `AuthContext` manages User vs. Admin roles, protecting routes and UI elements accordingly.

### 📊 Interactive Dashboard
* **Real-time Progression**: Visualizes Level, Total XP, and Daily Streaks with animated progress bars and pulse effects.
* **Quest Engine**: Manages daily tasks with three distinct states: `PENDING`, `VERIFYING` (with polling), and `COMPLETED`.
* **Visual Feedback**: Integrated **Confetti** effects and **Toast** notifications celebrate level-ups, task submissions, and milestones.

### 🏆 Gamification UI
* **Achievement Gallery**: A rich grid layout displaying locked and unlocked badges with detailed unlock conditions.
* **Global Leaderboard**: A competitive table highlighting the user's rank against students from all other faculties.
* **Dynamic UI**: Utilizes Lucide icons and Tailwind animations (float, slide-in, scale) for an immersive experience.

### 🛡️ Admin Dashboard
* **User Management**: dedicated interface for Administrators to view all registered users.
* **CRUD Operations**: Edit user stats (Level, XP, Streak), change roles, or delete users directly from the UI.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite 7
* **Styling**: Tailwind CSS v4 (Catppuccin Mocha Palette)
* **Routing**: React Router DOM v7
* **State Management**: React Context API (Auth)
* **HTTP Client**: Axios
* **Icons**: Lucide React
* **Validation**: React Hook Form

---

## 📸 Screenshots

| Login Screen | Student Dashboard |
|:---:|:---:|
| <img width="600" height="300" alt="Login Screen" src="https://github.com/user-attachments/assets/d350efbd-cb2e-4d29-818f-d0abaf0949a1" /> | <img width="600" height="300" alt="Dashboard" src="https://github.com/user-attachments/assets/a89e3b24-0ba3-480f-81b3-96ca8584dbb1" /> |

| Achievements | Global Leaderboard |
|:---:|:---:|
| <img width="600" height="300" alt="Achievements" src="https://github.com/user-attachments/assets/b84f25ff-0d41-4cad-b710-b559f050a2fe" /> | <img width="600" height="300" alt="Leaderboard" src="https://github.com/user-attachments/assets/67599c6c-84b9-40e1-9fd8-f4dc9ccc7751" /> |

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** (LTS version)
* **LevelUp Backend** running locally on port `8080` (Check the [Backend Repo](https://github.com/l4aaa/LevelUP-backend) for setup).

### 2. Installation

```bash
# Clone the repository
git clone [https://github.com/l4aaa/LevelUP-frontend.git](https://github.com/l4aaa/LevelUP-frontend.git)
cd LevelUP-frontend

# Install dependencies
npm install
```

### 3. Configuration
The application is pre-configured to connect to `http://localhost:8080/api` via `src/services/api.ts`.
If your backend runs elsewhere, update the `baseURL` in that file.

### 4. Development Server
Start the Vite development server:

```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

---

## 📂 Project Structure

```bash
src/
├── components/      # Reusable UI components (Toast, Confetti, AchievementPopup)
├── context/         # React Context for global Auth and Role state
├── pages/           # Main route views
│   ├── AdminDashboard.tsx  # User management panel
│   ├── Dashboard.tsx       # Main student hub
│   ├── Leaderboard.tsx     # Global rankings
│   └── ...                 # Login, Register, Landing, Achievements
├── services/        # Axios configuration and API interceptors
├── types/           # TypeScript interfaces (User, Task, DashboardData)
├── App.tsx          # Main routing logic and Layout wrapper
└── index.css        # Tailwind directives and custom keyframe animations
```

---

## 🎨 Theme & Styling

LevelUp uses the **Catppuccin Mocha** color palette for a soft, high-contrast dark mode experience.

* **Base:** `#1e1e2e` (Background)
* **Mauve:** `#cba6f7` (Primary Accents)
* **Blue:** `#89b4fa` (Secondary Accents)
* **Green:** `#a6e3a1` (Success States)
* **Peach:** `#fab387` (Warnings/Verifying)
* **Yellow:** `#f9e2af` (Gold/Achievements)

---

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingUI`)
3.  Commit your changes (`git commit -m 'Add some AmazingUI'`)
4.  Push to the branch (`git push origin feature/AmazingUI`)
5.  Open a Pull Request

## 📝 License

Distributed under the MIT License.