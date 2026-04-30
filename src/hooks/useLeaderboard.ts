import { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/userService';
import type { LeaderboardEntry } from '../types';
import { ERROR_MESSAGES } from '../constants';
import axios from 'axios';

export function useLeaderboard() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const data = await getLeaderboard();
                setLeaderboard(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load leaderboard:", err);
                if (axios.isAxiosError(err) && err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError(ERROR_MESSAGES.UNEXPECTED);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return { leaderboard, loading, error };
}
