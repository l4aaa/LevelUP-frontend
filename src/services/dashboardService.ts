import api from './api';
import { API_PATHS } from '../constants';
import type { DashboardData, Achievement } from '../types';

export const getDashboardData = async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>(API_PATHS.DASHBOARD);
    return response.data;
};

export const getAchievements = async (): Promise<Achievement[]> => {
    const response = await api.get<Achievement[]>(API_PATHS.ACHIEVEMENTS);
    return response.data;
};

export const completeTask = async (taskId: number): Promise<void> => {
    await api.post(API_PATHS.COMPLETE_TASK(taskId));
};
