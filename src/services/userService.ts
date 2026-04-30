import api from './api';
import { API_PATHS } from '../constants';
import type { LeaderboardEntry, UserMeResponse, Achievement } from '../types';

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    const response = await api.get<LeaderboardEntry[]>(API_PATHS.LEADERBOARD);
    return response.data;
};

export const getUserMe = async (): Promise<UserMeResponse> => {
    const response = await api.get<UserMeResponse>(API_PATHS.ME);
    return response.data;
};

export const getAchievements = async (): Promise<Achievement[]> => {
    const response = await api.get<Achievement[]>(API_PATHS.ACHIEVEMENTS);
    return response.data;
};
