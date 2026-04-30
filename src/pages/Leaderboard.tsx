import { useAuth } from '../context/AuthContext';
import { Medal, Trophy, Loader2, AlertCircle } from 'lucide-react';
import { useLeaderboard } from '../hooks/useLeaderboard';

export default function Leaderboard() {
    const { username } = useAuth();
    const { leaderboard, loading, error } = useLeaderboard();

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy className="text-ctp-yellow fill-ctp-yellow" size={20} />;
        if (index === 1) return <Medal className="text-ctp-subtext1" size={20} />;
        if (index === 2) return <Medal className="text-ctp-maroon" size={20} />;
        return <span className="text-ctp-overlay1 font-mono">#{index + 1}</span>;
    };

    if (loading) return (
        <div className="min-h-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-ctp-mauve animate-spin" />
        </div>
    );

    if (error) return (
        <div className="flex justify-center p-12">
            <div className="bg-ctp-red/10 p-6 rounded-xl border border-ctp-red/20 text-ctp-red flex items-center gap-3">
                <AlertCircle /> {error}
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-ctp-text mb-2">Global Leaderboard</h1>
                    <p className="text-ctp-subtext0">See who's topping the charts across all programs</p>
                </div>

                <div className="bg-ctp-surface0 rounded-2xl shadow-xl overflow-hidden border border-ctp-surface1">
                    <table className="w-full text-left border-collapse" aria-label="Global Leaderboard">
                        <thead
                            className="bg-ctp-mantle border-b border-ctp-surface1 text-ctp-subtext1 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-5 font-semibold">Rank</th>
                            <th className="p-5 font-semibold">Student</th>
                            <th className="p-5 font-semibold">Level</th>
                            <th className="p-5 font-semibold text-right">Total XP</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaderboard.map((entry, index) => {
                            const isMe = entry.username === username;
                            return (
                                <tr
                                    key={index}
                                    className={`
                                            border-b border-ctp-surface1 last:border-0 transition-colors
                                            ${isMe ? 'bg-ctp-mauve/10 hover:bg-ctp-mauve/20' : 'hover:bg-ctp-surface1/50'}
                                        `}
                                >
                                    <td className="p-5 font-bold flex items-center justify-start">
                                        {getRankIcon(index)}
                                    </td>
                                    <td className="p-5">
                                        <div className="font-medium text-ctp-text flex items-center gap-2">
                                            {entry.username}
                                            {isMe && <span
                                                className="text-[10px] bg-ctp-blue text-ctp-base px-1.5 rounded font-bold">YOU</span>}
                                        </div>
                                    </td>
                                    <td className="p-5 text-ctp-subtext0">
                                        <span
                                            className="bg-ctp-surface1 px-2 py-1 rounded text-xs">Lvl {entry.currentLevel}</span>
                                    </td>
                                    <td className="p-5 text-right font-bold text-ctp-mauve font-mono">{entry.currentXp.toLocaleString()}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}