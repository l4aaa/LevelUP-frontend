import { Suspense, lazy } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { BrowserRouter as Router, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Award, LayoutDashboard, LogOut, ShieldCheck, Trophy, Loader2 } from 'lucide-react';
import GlobalToast from './components/GlobalToast';
import ErrorBoundary from './components/ErrorBoundary';
import { ROLES } from './constants';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Landing = lazy(() => import('./pages/Landing'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function ProtectedRoute({ children }: { children: ReactElement }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: ReactElement }) {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (role !== ROLES.ADMIN) return <Navigate to="/dashboard" />;

    return children;
}

function Navigation() {
    const { logout, role } = useAuth();
    const location = useLocation();
    if (['/login', '/register', '/'].includes(location.pathname)) return null;

    const links = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
        { path: '/achievements', label: 'Achievements', icon: Award },
    ];

    if (role === ROLES.ADMIN) {
        links.push({ path: '/admin', label: 'Admin Panel', icon: ShieldCheck });
    }

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
                            aria-label={`Go to ${link.label}`}
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
                
                <button
                    onClick={logout}
                    className="
                        flex flex-col md:flex-row items-center md:gap-4 p-2 md:px-4 md:py-3.5 rounded-xl transition-all duration-300
                        text-ctp-red hover:bg-ctp-red/10
                        md:hidden
                    "
                    aria-label="Logout"
                >
                    <LogOut
                        size={24}
                        className="md:w-5 md:h-5 transition-transform"
                        strokeWidth={2}
                    />
                    <span className="text-[10px] md:text-sm lg:text-base">Logout</span>
                </button>
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

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-ctp-base text-ctp-text font-sans">
            <Navigation />
            <main className="flex-1 h-screen overflow-y-auto pb-24 md:pb-0">
                <Suspense fallback={
                    <div className="min-h-full flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-ctp-mauve animate-spin" />
                    </div>
                }>
                    {children}
                </Suspense>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <ErrorBoundary>
            <GlobalToast />
            <Router>
                <Suspense fallback={
                    <div className="min-h-screen bg-ctp-base flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-ctp-mauve animate-spin" />
                    </div>
                }>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* User Routes */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Layout>
                                    <Dashboard />
                                </Layout>
                            </ProtectedRoute>
                        } />

                        <Route path="/leaderboard" element={
                            <ProtectedRoute>
                                <Layout>
                                    <Leaderboard />
                                </Layout>
                            </ProtectedRoute>
                        } />

                        <Route path="/achievements" element={
                            <ProtectedRoute>
                                <Layout>
                                    <Achievements />
                                </Layout>
                            </ProtectedRoute>
                        } />

                        {/* Admin Route */}
                        <Route path="/admin" element={
                            <AdminRoute>
                                <Layout>
                                    <AdminDashboard />
                                </Layout>
                            </AdminRoute>
                        } />
                    </Routes>
                </Suspense>
            </Router>
        </ErrorBoundary>
    );
}
