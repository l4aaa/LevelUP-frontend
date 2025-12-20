# 🚀 LevelUp – Frontend

![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38b2ac.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

The modern, responsive client for **LevelUp**, a platform that transforms academic tasks into an RPG-style adventure. Built with the latest web standards, this Single Page Application (SPA) provides students with a visually engaging interface to track progress, complete quests, and compete on global leaderboards.

---

## ✨ Key Features

### 🔐 Authentication & Security
* **Secure Access**: Dedicated Login and Registration screens with client-side validation using **React Hook Form**.
* **JWT Management**: Industry-standard token-based authentication stored securely in LocalStorage with automated Axios interceptors.
* **Protected Routes**: Centralized `AuthContext` ensures only authenticated users can access the dashboard and game features.

### 📊 Interactive Dashboard
* **Real-time Progression**: Visualizes Level, Total XP, and Daily Streaks with animated progress bars.
* **Quest Engine**: Manages daily tasks with three distinct states: `PENDING`, `VERIFYING`, and `COMPLETED`.
* **Optimistic Updates**: UI updates instantly upon task submission while polling the backend for async verification results.

### 🏆 Gamification UI
* **Achievement Gallery**: A rich grid layout displaying locked and unlocked badges with tooltips and condition details.
* **Global Leaderboard**: A competitive table highlighting the user's rank against students from all other faculties.
* **Visual Feedback**: Integrated **Confetti** effects and **Toast** notifications celebrate level-ups and milestones.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4 (Catppuccin Mocha Palette)
* **Routing**: React Router DOM v7
* **State Management**: React Context API (Auth) + Local State
* **HTTP Client**: Axios
* **Icons**: Lucide React

---

## 📸 Screenshots

| Login Screen | Student Dashboard |
|:---:|:---:|
| ![Login Placeholder](https://via.placeholder.com/600x300?text=Login+UI) | ![Dashboard Placeholder](https://via.placeholder.com/600x300?text=Dashboard+UI) |

| Achievements | Global Leaderboard |
|:---:|:---:|
| ![Achievements Placeholder](https://via.placeholder.com/600x300?text=Achievements+Gallery) | ![Leaderboard Placeholder](https://via.placeholder.com/600x300?text=Leaderboard+UI) |

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** (LTS version)
* **LevelUp Backend** running locally on port `8080` (Check the [Backend Repo](https://github.com/your-username/levelup-backend) for setup).

### 2. Installation

```bash
# Clone the repository
git clone [https://github.com/l4aaa/LevelUP-frontend.git](https://github.com/your-username/levelup-frontend.git)
cd LevelUP-frontend

# Install dependencies
npm install
```

### 3. Configuration
The application is pre-configured to connect to `http://localhost:8080/api` via `src/services/api.ts`. If your backend runs elsewhere, update the `baseURL` in that file.

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
├── components/      # Reusable UI components (Toast, Confetti, Popups)
├── context/         # React Context for global Auth state
├── pages/           # Main route views (Dashboard, Login, Leaderboard)
├── services/        # Axios configuration and API interceptors
├── types/           # TypeScript interfaces (User, Task, Achievement)
├── App.tsx          # Main routing logic and Layout wrapper
└── index.css        # Tailwind directives and custom animations
```

---

## 🎨 Theme & Styling

LevelUp uses the **Catppuccin Mocha** color palette for a soft, high-contrast dark mode experience. Key colors include:
* **Base:** `#1e1e2e` (Background)
* **Mauve:** `#cba6f7` (Primary Accents)
* **Blue:** `#89b4fa` (Secondary Accents)
* **Green:** `#a6e3a1` (Success States)
* **Peach:** `#fab387` (Warnings/Verifying)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingUI`)
3. Commit your changes (`git commit -m 'Add some AmazingUI'`)
4. Push to the branch (`git push origin feature/AmazingUI`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License.