import {createContext, ReactNode, useContext, useState} from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    logout: () => void;
    username: string | null;
    role: string | null;
    login: (token: string, username: string, role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    const login = (newToken: string, newUsername: string, newRole: string) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', newUsername);
        localStorage.setItem('role', newRole);
        setToken(newToken);
        setUsername(newUsername);
        setRole(newRole);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
        localStorage.removeItem('role');
        setRole(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, token, login, logout, username, role}}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};