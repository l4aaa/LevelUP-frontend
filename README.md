# 🚀 LevelUp – Frontend

A high-performance gamified student engagement platform built with **React 19**, **TypeScript**, and **Vite**. LevelUp transforms academic tasks into immersive quests through a sleek, responsive interface designed for the modern student.

---

## ✨ Features

### 🔐 Authentication & Security

* **Secure Access**: Dedicated Login and Registration screens with client-side validation using React Hook Form.
* **JWT Management**: Industry-standard token-based authentication stored securely in LocalStorage.
* **AuthContext**: Centralized state management for user sessions, tokens, and identity.
* **Protected Routing**: Automated redirection for unauthenticated users attempting to access dashboard features.

---

### 📊 Performance Dashboard

* **Progression Tracking**: Real-time visualization of Level, Total XP, and Daily Streaks.
* **Dynamic UI**: Animated progress bars showing XP required for the next level.
* **Quest Engine**: Interactive task list supporting three distinct states: `PENDING`, `VERIFYING`, and `COMPLETED`.
* **Async Syncing**: Automated polling to update task status as soon as background verification finishes.

---

### 🏆 Gamification

* **Achievement Gallery**: A visually rich gallery displaying locked and unlocked badges dynamically fetched from the API.
* **Global Leaderboard**: Competitive ranking system based on Level and XP across all study programs.
* **Visual Feedback**: Integrated confetti effects and toast notifications for level-ups and task submissions.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Styling**: Tailwind CSS v4 (Catppuccin Mocha Palette)
* **Routing**: React Router DOM v7
* **API Client**: Axios with automated Authorization Interceptors
* **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites

* **Node.js** (LTS version recommended)
* **LevelUp Backend** running at `http://localhost:8080`

---

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/levelup-frontend.git
cd levelup-frontend

# Install dependencies
npm install
```
## 3. Development

```bash
# Start the Vite development server
npm run dev
```

#### *The application will be available at: http://localhost:5173*
