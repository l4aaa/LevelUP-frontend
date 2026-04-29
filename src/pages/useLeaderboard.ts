import { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/userService';
import type { LeaderboardEntry } from '../types';

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
                setError("Failed to load leaderboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return { leaderboard, loading, error };
}
