import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LayoutDashboard, Trophy, Award, LogOut } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import Landing from './pages/Landing';

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function Navigation() {
    const { logout } = useAuth();
    const location = useLocation();

    if (['/login', '/register'].includes(location.pathname)) return null;

    const links = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
        { path: '/achievements', label: 'Achievements', icon: Award },
    ];

    return (
        <nav className="
            fixed bottom-0 w-full bg-ctp-mantle border-t border-ctp-surface0 z-50
            md:w-64 md:h-screen md:border-r md:border-t-0 md:static
            flex md:flex-col justify-around md:justify-start p-2 md:p-6 gap-2
        ">
            <div className="hidden md:flex items-center gap-3 mb-10 px-2 mt-4">
                <div className="bg-ctp-mauve text-ctp-base p-2.5 rounded-xl shadow-lg shadow-ctp-mauve/20">
                    <Trophy size={24} strokeWidth={2.5} />
                </div>
                <h1 className="text-2xl font-bold text-ctp-text tracking-tight">LevelUp</h1>
            </div>

            <div className="flex md:flex-col w-full gap-2">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`
                                flex flex-col md:flex-row items-center md:gap-4 p-2 md:px-4 md:py-3.5 rounded-xl transition-all duration-300
                                ${isActive
                                ? 'bg-ctp-surface0 text-ctp-mauve font-semibold shadow-inner'
                                : 'text-ctp-subtext0 hover:bg-ctp-surface0/50 hover:text-ctp-text'
                            }
                            `}
                        >
                            <link.icon
                                size={24}
                                className={`md:w-5 md:h-5 transition-transform ${isActive ? 'scale-110' : ''}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="text-[10px] md:text-sm lg:text-base">{link.label}</span>
                        </Link>
                    );
                })}
            </div>

            <button
                onClick={logout}
                className="hidden md:flex items-center gap-4 px-4 py-3.5 text-ctp-red hover:bg-ctp-red/10 rounded-xl w-full mt-auto transition-colors font-medium"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </nav>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-ctp-base text-ctp-text font-sans">
            <Navigation />
            <main className="flex-1 h-screen overflow-y-auto pb-24 md:pb-0">
                {children}
            </main>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
                <Route path="/leaderboard" element={<ProtectedRoute><Layout><Leaderboard /></Layout></ProtectedRoute>} />
                <Route path="/achievements" element={<ProtectedRoute><Layout><Achievements /></Layout></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}