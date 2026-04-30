import { useEffect, useState } from 'react';
import { getAchievements, getUserMe } from '../services/userService';
import type { Achievement } from '../types';
import { ERROR_MESSAGES } from '../constants';
import axios from 'axios';

export function useAchievements() {
    const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
    const [unlockedIds, setUnlockedIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [achievementsData, userData] = await Promise.all([
                    getAchievements(),
                    getUserMe()
                ]);
                setAllAchievements(achievementsData);
                setUnlockedIds(new Set(userData.unlockedAchievementIds || []));
                setError(null);
            } catch (err) {
                console.error("Failed to sync achievements:", err);
                if (axios.isAxiosError(err) && err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError(ERROR_MESSAGES.UNEXPECTED);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { allAchievements, unlockedIds, loading, error };
}
