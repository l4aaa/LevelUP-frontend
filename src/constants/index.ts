export const API_PATHS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    STUDY_PROGRAMS: '/auth/study-programs',
    DASHBOARD: '/dashboard',
    ACHIEVEMENTS: '/user/achievements',
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
