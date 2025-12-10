import { useEffect, useState } from 'react';
import api from '../services/api';
import { Lock, Unlock, Trophy, Loader, AlertCircle } from 'lucide-react';

interface Achievement {
    id: number;
    name: string;
    description: string;
    conditionValue?: number;
}

interface UserResponse {
    unlockedAchievementIds: number[];
}

export default function Achievements() {
    const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
    const [unlockedIds, setUnlockedIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Execute both requests in parallel for better performance
                const [achievementsRes, userRes] = await Promise.all([
                    api.get<Achievement[]>('/user/achievements'),
                    api.get<UserResponse>('/user/me')
                ]);

                setAllAchievements(achievementsRes.data);

                const ids = userRes.data.unlockedAchievementIds || [];
                setUnlockedIds(new Set(ids));
            } catch (err) {
                console.error("Failed to sync achievements:", err);
                setError("Failed to load achievement data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 flex items-center gap-3 text-red-600 max-w-md">
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-yellow-100 p-3 rounded-xl">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Achievements</h1>
                        <p className="text-gray-500">
                            You have unlocked {unlockedIds.size} out of {allAchievements.length} badges
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allAchievements.map((ach) => {
                        const isUnlocked = unlockedIds.has(ach.id);

                        return (
                            <div
                                key={ach.id}
                                className={`
                                    relative p-6 rounded-2xl border transition-all duration-300
                                    flex flex-col items-center text-center
                                    ${isUnlocked
                                    ? 'bg-white border-blue-200 shadow-md shadow-blue-50/50 scale-100'
                                    : 'bg-gray-100 border-gray-200 opacity-75 grayscale-[0.8] scale-95'
                                }
                                `}
                            >
                                {/* Icon Circle */}
                                <div className={`
                                    w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white shadow-sm
                                    ${isUnlocked
                                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                                    : 'bg-gray-300'
                                }
                                `}>
                                    {isUnlocked ? <Unlock size={28} /> : <Lock size={28} />}
                                </div>

                                <h3 className={`font-bold text-lg mb-2 ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {ach.name}
                                </h3>

                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {ach.description}
                                </p>

                                {/* Badge for Status */}
                                <div className={`
                                    mt-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                    ${isUnlocked
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-200 text-gray-500'
                                }
                                `}>
                                    {isUnlocked ? 'Unlocked' : 'Locked'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}