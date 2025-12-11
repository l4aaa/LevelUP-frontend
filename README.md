# 🚀 LevelUp – Frontend

A gamified student engagement platform built with **React**, **TypeScript**, and **Vite**. LevelUp allows students to complete daily missions, earn XP, view leaderboards, and unlock achievements — all through a clean and responsive interface.

---

## ✨ Features

### 🔐 Authentication
- Secure Login & Registration screens  
- JWT-based auth stored in LocalStorage  
- Full AuthContext for user state management

### 📊 Student Dashboard
- View **Level**, **Total XP**, and **Daily Streak**
- Animated progress bar showing XP to next level
- **Daily Missions** list with states:
  - `PENDING`
  - `VERIFYING` (auto-polled)
  - `COMPLETED`
- Automatic backend polling for tasks under verification

### 🏆 Achievements
- Gallery-style achievements page  
- Locked / unlocked badge display  
- Populated dynamically through API

### 📈 Global Leaderboard
- Sorted rankings based on Level & XP  
- View the top performers across all study programs

### 📱 Responsive UI
- Fully responsive layout  
- Sidebar/mobile navigation  
- Built with **Tailwind CSS v4**

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + TypeScript  
- **Bundler:** Vite  
- **Styling:** Tailwind CSS v4  
- **Routing:** React Router DOM v7  
- **State Management:** React Context API (`AuthContext`)  
- **Forms:** React Hook Form  
- **HTTP Client:** Axios  
- **Icons:** Lucide React  

---

## ⚙️ Prerequisites

Make sure you have installed:

- **Node.js** (LTS recommended)
- The **LevelUp Backend** running at `http://localhost:8080` (default)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/levelup-frontend.git
cd levelup-frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will start the project at:

```
http://localhost:5173
```

---

## 🔌 API Configuration

The frontend communicates with the backend through an Axios instance.

Default API base URL is set in:

```
src/services/api.ts
```

```ts
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Update if backend runs elsewhere
});
```

**Tip:**
You may extract this into a `.env` file by creating:

```
VITE_API_URL=http://localhost:8080/api
```

and updating the Axios instance accordingly.

---

## 📜 Available Scripts

Inside `package.json`:

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Vite dev server            |
| `npm run build`   | Build production bundle          |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |

---

## 📂 Project Structure

```
src/
├── context/
│   └── AuthContext.tsx        # Auth state (token, user, login/logout)
│
├── pages/
│   ├── Achievements.tsx       # Badge gallery view
│   ├── Dashboard.tsx          # User hub: XP, streak, tasks
│   ├── Leaderboard.tsx        # Global ranking by XP/Level
│   ├── Login.tsx              # Authentication (Login)
│   └── Register.tsx           # Sign-up with study program selection
│
├── services/
│   └── api.ts                 # Axios client & auth interceptor
│
├── types/
│   └── index.ts               # Shared TypeScript interfaces (User, Task, etc.)
│
├── App.tsx                    # Routing and layout
└── main.tsx                   # Entry point
```

---

## 🛡️ Route Protection

Authenticated pages (Dashboard, Leaderboard, Achievements) are wrapped with a `ProtectedRoute` component.

* If the user is **not logged in**, they are automatically redirected to `/login`.
* If authenticated, the user gains full access to app features.

---

## 🎯 Future Improvements (Optional)

* Move API URL to `.env`
* Add loading skeletons for all pages
* Add dark/light mode
* Refresh JWT tokens automatically
* Implement optimistic UI updates for task status changes

---

## ❤️ Credits

Designed as the frontend companion to the **LevelUp Backend** (Spring Boot + PostgreSQL).
