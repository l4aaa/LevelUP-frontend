import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface LeaderboardEntry {
    username: string;
    currentLevel: number;
    currentXp: number;
}

export default function Leaderboard() {
    const { username } = useAuth();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        api.get('/user/leaderboard')
            .then(res => setLeaderboard(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Global Leaderboard 🌍</h1>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Rank</th>
                            <th className="p-4 font-medium text-gray-500">Student</th>
                            <th className="p-4 font-medium text-gray-500">Level</th>
                            <th className="p-4 font-medium text-gray-500 text-right">Total XP</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaderboard.map((entry, index) => (
                            <tr key={index} className={`border-b border-gray-50 last:border-0 ${entry.username === username ? 'bg-blue-50' : ''}`}>
                                <td className="p-4 font-bold text-gray-400">#{index + 1}</td>
                                <td className="p-4 font-medium">
                                    {entry.username}
                                    {index === 0 && " 👑"}
                                </td>
                                <td className="p-4 text-gray-600">Lvl {entry.currentLevel}</td>
                                <td className="p-4 text-right font-bold text-blue-600">{entry.currentXp} XP</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}