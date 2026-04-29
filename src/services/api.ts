import axios from 'axios';
import { STORAGE_KEYS } from '../constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    // SECURITY WARNING: Storing JWT in localStorage exposes it to Cross-Site Scripting (XSS) attacks.
    // If the backend supports it, migrate to httpOnly, secure cookies for session management.
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = 'An unexpected error occurred';
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            if (status === 401) {
                message = 'Session expired';
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USERNAME);
                localStorage.removeItem(STORAGE_KEYS.ROLE);
                // Dispatch event to context or force reload to login
                window.dispatchEvent(new CustomEvent('auth-error'));
            } else if (status === 403) {
                message = 'Access denied';
            } else if (status >= 500) {
                message = 'Server error, please try again';
            } else if (error.response.data) {
                 const data = error.response.data as { message?: string };
                 message = data.message || message;
            }
        }
        
        // Dispatch global toast event
        window.dispatchEvent(new CustomEvent('global-toast', { 
            detail: { type: 'ERROR', message } 
        }));

        return Promise.reject(error);
    }
);

export default api;
