import { useEffect, useState } from 'react';
import { getAchievements, getUserMe } from '../services/userService';
import type { Achievement } from '../types';

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
                setError("Failed to load achievement data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { allAchievements, unlockedIds, loading, error };
}
