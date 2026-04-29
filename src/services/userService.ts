import api from './api';
import type { LeaderboardEntry, UserMeResponse, Achievement } from '../types';

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    const response = await api.get<LeaderboardEntry[]>('/user/leaderboard');
    return response.data;
};

export const getUserMe = async (): Promise<UserMeResponse> => {
    const response = await api.get<UserMeResponse>('/user/me');
    return response.data;
};

export const getAchievements = async (): Promise<Achievement[]> => {
    const response = await api.get<Achievement[]>('/user/achievements');
    return response.data;
};
