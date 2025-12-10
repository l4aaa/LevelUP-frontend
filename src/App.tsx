import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LayoutDashboard, Trophy, Award, LogOut, UserPlus } from 'lucide-react';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';

// 1. Guard Component: Protects routes that require login
function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

// 2. Navigation Component: The Sidebar/Navbar
function Navigation() {
    const { logout } = useAuth();
    const location = useLocation();

    // Hide navigation on public pages
    if (['/login', '/register'].includes(location.pathname)) return null;

    const links = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
        { path: '/achievements', label: 'Achievements', icon: Award },
    ];

    return (
        <nav className="
      fixed bottom-0 w-full bg-white border-t border-gray-200 z-10
      md:w-64 md:h-screen md:border-r md:border-t-0 md:static
      flex md:flex-col justify-around md:justify-start p-2 md:p-4 gap-2
    ">
            <div className="hidden md:flex items-center gap-2 mb-8 px-4 mt-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <Trophy size={20} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">LevelUp</h1>
            </div>

            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`
            flex flex-col md:flex-row items-center md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all
            ${location.pathname === link.path
                        ? 'text-blue-600 bg-blue-50 font-medium'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
          `}
                >
                    <link.icon size={24} className="md:w-5 md:h-5" />
                    <span className="text-xs md:text-base">{link.label}</span>
                </Link>
            ))}

            <button
                onClick={logout}
                className="hidden md:flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full mt-auto"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </nav>
    );
}

// 3. Layout Wrapper
function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Navigation />
            <main className="flex-1 pb-20 md:pb-0 h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

// 4. Main App Component
export default function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes (Wrapped in Layout) */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Layout><Dashboard /></Layout>
                    </ProtectedRoute>
                } />

                <Route path="/leaderboard" element={
                    <ProtectedRoute>
                        <Layout><Leaderboard /></Layout>
                    </ProtectedRoute>
                } />

                <Route path="/achievements" element={
                    <ProtectedRoute>
                        <Layout><Achievements /></Layout>
                    </ProtectedRoute>
                } />

                {/* Default Redirect */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}