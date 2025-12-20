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
}

export interface TaskDetail {
    id: number;
    title: string;
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