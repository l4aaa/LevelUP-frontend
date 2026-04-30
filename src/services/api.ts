import axios from 'axios';
import { STORAGE_KEYS, ERROR_MESSAGES } from '../constants';

/**
 * SECURITY NOTE: 
 * We are currently using localStorage to store the JWT. 
 * This is susceptible to XSS attacks. 
 * If the backend supports httpOnly cookies, we should migrate to that for better security.
 */

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
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
        let message: string = ERROR_MESSAGES.UNEXPECTED;
        
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            
            switch (status) {
                case 401:
                    message = ERROR_MESSAGES.SESSION_EXPIRED;
                    localStorage.removeItem(STORAGE_KEYS.TOKEN);
                    localStorage.removeItem(STORAGE_KEYS.USERNAME);
                    localStorage.removeItem(STORAGE_KEYS.ROLE);
                    window.dispatchEvent(new CustomEvent('auth-error'));
                    break;
                case 403:
                    message = ERROR_MESSAGES.ACCESS_DENIED;
                    break;
                case 500:
                    message = ERROR_MESSAGES.SERVER_ERROR;
                    break;
                default:
                    if (error.response.data) {
                        const data = error.response.data as { message?: string };
                        message = data.message || message;
                    }
            }
        }
        
        window.dispatchEvent(new CustomEvent('global-toast', { 
            detail: { type: 'ERROR', message } 
        }));

        return Promise.reject(error);
    }
);

export default api;
