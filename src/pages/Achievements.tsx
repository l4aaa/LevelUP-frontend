import {useEffect, useState} from 'react';
import api from '../services/api';
import {AlertCircle, Loader, Lock, Trophy, Unlock} from 'lucide-react';

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
                const [achievementsRes, userRes] = await Promise.all([
                    api.get<Achievement[]>('/user/achievements'),
                    api.get<UserResponse>('/user/me')
                ]);
                setAllAchievements(achievementsRes.data);
                setUnlockedIds(new Set(userRes.data.unlockedAchievementIds || []));
            } catch (err) {
                console.error("Failed to sync achievements:", err);
                setError("Failed to load achievement data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-full flex items-center justify-center">
            <Loader className="w-10 h-10 text-ctp-mauve animate-spin"/>
        </div>
    );

    if (error) return (
        <div className="flex justify-center p-12">
            <div className="bg-ctp-red/10 p-6 rounded-xl border border-ctp-red/20 text-ctp-red flex items-center gap-3">
                <AlertCircle/> {error}
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-ctp-yellow text-ctp-base p-4 rounded-2xl shadow-lg shadow-ctp-yellow/20">
                        <Trophy className="w-8 h-8"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-ctp-text">Achievements Gallery</h1>
                        <p className="text-ctp-subtext0 mt-1">
                            Unlocked: <span
                            className="text-ctp-green font-bold">{unlockedIds.size}</span> / {allAchievements.length} badges
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
                                    relative p-6 rounded-2xl border transition-all duration-500
                                    flex flex-col items-center text-center group
                                    ${isUnlocked
                                    ? 'bg-ctp-surface0 border-ctp-blue/30 shadow-lg shadow-ctp-blue/5 hover:-translate-y-2'
                                    : 'bg-ctp-surface0/30 border-ctp-surface1 opacity-60 hover:opacity-100'
                                }
                                `}
                            >
                                <div className={`
                                    w-20 h-20 rounded-full flex items-center justify-center mb-5 text-white shadow-xl transition-all duration-500
                                    ${isUnlocked
                                    ? 'bg-gradient-to-br from-ctp-blue to-ctp-mauve scale-110 group-hover:rotate-12'
                                    : 'bg-ctp-surface1 text-ctp-overlay0'
                                }
                                `}>
                                    {isUnlocked ? <Unlock size={32}/> : <Lock size={32}/>}
                                </div>

                                <h3 className={`font-bold text-xl mb-2 ${isUnlocked ? 'text-ctp-text' : 'text-ctp-overlay1'}`}>
                                    {ach.name}
                                </h3>

                                <p className="text-sm text-ctp-subtext0 leading-relaxed mb-6">
                                    {ach.description}
                                </p>

                                <div className={`
                                    mt-auto px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                                    ${isUnlocked
                                    ? 'bg-ctp-green/10 text-ctp-green border border-ctp-green/20'
                                    : 'bg-ctp-surface1 text-ctp-overlay0 border border-ctp-surface2'
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