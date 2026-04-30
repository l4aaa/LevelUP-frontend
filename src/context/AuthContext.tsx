import {createContext, useState, useMemo, useEffect, useCallback, use} from 'react';
import type {ReactNode} from 'react';
import { STORAGE_KEYS } from '../constants';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    logout: () => void;
    username: string | null;
    role: string | null;
    login: (token: string, username: string, role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem(STORAGE_KEYS.TOKEN));
    const [username, setUsername] = useState<string | null>(localStorage.getItem(STORAGE_KEYS.USERNAME));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
    const [role, setRole] = useState<string | null>(localStorage.getItem(STORAGE_KEYS.ROLE));

    const login = useCallback((newToken: string, newUsername: string, newRole: string) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
        localStorage.setItem(STORAGE_KEYS.USERNAME, newUsername);
        localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
        setToken(newToken);
        setUsername(newUsername);
        setRole(newRole);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USERNAME);
        localStorage.removeItem(STORAGE_KEYS.ROLE);
        setToken(null);
        setUsername(null);
        setRole(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        const handleAuthError = () => {
            logout();
        };
        window.addEventListener('auth-error', handleAuthError);
        return () => window.removeEventListener('auth-error', handleAuthError);
    }, [logout]);

    const value = useMemo(() => ({
        isAuthenticated,
        token,
        login,
        logout,
        username,
        role
    }), [isAuthenticated, token, login, logout, username, role]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = use(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
