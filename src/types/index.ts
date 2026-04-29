export interface Achievement {
    id: number;
    name: string;
    description: string;
    conditionValue?: number;
    criteriaType?: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    currentLevel: number;
    currentXp: number;
    streak: number;
    unlockedAchievementIds: number[];
    role: string;
}

export interface TaskDetail {
    id: number;
    title: string;
    description: string;
    category: string;
    xpReward: number;
}

export interface UserTask {
    userTaskId: number;
    status: 'PENDING' | 'VERIFYING' | 'COMPLETED' | 'FAILED';
    task: TaskDetail;
    assignedDate: string;
    completedAt?: string;
}

export interface DashboardData {
    username: string;
    level: number;
    currentXp: number;
    xpToNextLevel: number;
    streak: number;
    studyProgramName: string;
    tasks: UserTask[];
    unlockedAchievementIds: number[];
}

export interface StudyProgram {
    id: number;
    name: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    role: string;
}

export interface LeaderboardEntry {
    username: string;
    currentLevel: number;
    currentXp: number;
}

export interface UserMeResponse {
    unlockedAchievementIds: number[];
}
