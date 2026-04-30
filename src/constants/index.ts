export const API_PATHS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    STUDY_PROGRAMS: '/auth/study-programs',
    DASHBOARD: '/dashboard',
    ACHIEVEMENTS: '/user/achievements',
    LEADERBOARD: '/user/leaderboard',
    ME: '/user/me',
    COMPLETE_TASK: (id: number) => `/tasks/${id}/complete`,
    USERS: '/admin/users',
    USER: (id: number) => `/admin/users/${id}`
} as const;

export const STORAGE_KEYS = {
    TOKEN: 'token',
    USERNAME: 'username',
    ROLE: 'role'
} as const;

export const POLLING_INTERVALS = {
    DASHBOARD_VERIFYING: 2000
} as const;

export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER'
} as const;

export const ERROR_MESSAGES = {
    SESSION_EXPIRED: 'Session expired',
    ACCESS_DENIED: 'Access denied',
    SERVER_ERROR: 'Server error, please try again',
    UNEXPECTED: 'An unexpected error occurred',
    INVALID_CREDENTIALS: 'Invalid username or password',
    REGISTRATION_FAILED: 'Registration failed. Please try again.'
} as const;

export const UI_STRINGS = {
    LEVEL_UP: 'LEVEL UP!',
    TASK_SUBMITTED: 'Task submitted!',
    VERIFYING: 'Verifying with the server...',
    NEW_BADGE: 'New Badge'
} as const;

export const XP_PER_LEVEL = 100;
