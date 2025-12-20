import { useEffect, useState, useRef, useMemo } from 'react';
import api from '../services/api';
import { CheckCircle, Circle, Trophy, Star, Zap, Loader2, Calendar } from 'lucide-react';
import type { DashboardData, Achievement } from '../types';
import Toast, { type ToastType } from '../components/Toast';
import Confetti from '../components/Confetti';
import AchievementPopup from '../components/AchievementPopup';

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const shouldPoll = useRef(false);
    const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [achievementPopup, setAchievementPopup] = useState<string | null>(null);

    const unlockedRef = useRef<number[]>([]);
    const achievementsRef = useRef<Achievement[]>([]);
    const isFetching = useRef(false);

    const fetchDashboard = async (isBackground = false) => {
        if (isFetching.current) return;
        isFetching.current = true;
        try {
            if (!isBackground) setLoading(true);
            const response = await api.get('/dashboard');
            const newData: DashboardData = response.data;

            setData(prev => {
                if (prev && newData.level > prev.level) {
                    setToast({
                        type: 'LEVEL',
                        message: `LEVEL UP! You reached Level ${newData.level} 🎉`
                    });

                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 5000);
                }

                if (prev) {
                    const previousUnlocked = unlockedRef.current;
                    const newUnlocked = newData.unlockedAchievementIds || [];
                    const diffId = newUnlocked.find(id => !previousUnlocked.includes(id));

                    if (diffId) {
                        const achievement = achievementsRef.current.find(a => a.id === diffId);
                        const name = achievement ? achievement.name : "New Badge";
                        setAchievementPopup(name);
                    }
                }

                unlockedRef.current = newData.unlockedAchievementIds || [];
                return newData;
            });
            shouldPoll.current = newData.tasks.some(t => t.status === 'VERIFYING');
        } catch (error) {
            console.error("Failed to fetch dashboard", error);
        } finally {
            if (!isBackground) setLoading(false);
            isFetching.current = false;
        }
    };

    useEffect(() => {
        api.get<Achievement[]>('/user/achievements')
            .then(res => {
                achievementsRef.current = res.data;
            })
            .catch(err => console.error("Failed to load achievement definitions", err));

        fetchDashboard();
        let timer: number;
        const loop = () => {
            if (shouldPoll.current && !isFetching.current) {
                fetchDashboard(true);
            }
            timer = setTimeout(loop, 1000);
        };
        loop();

        return () => clearTimeout(timer);
    }, []);

    const completeTask = async (userTaskId: number) => {
        try {
            setData(prev => prev ? {
                ...prev,
                tasks: prev.tasks.map(t =>
                    t.userTaskId === userTaskId ? { ...t, status: 'VERIFYING' } : t
                )
            } : null);

            setToast({
                type: 'TASK',
                message: 'Task submitted! Verifying...'
            });
            shouldPoll.current = true;
            await api.post(`/tasks/${userTaskId}/complete`);
        } catch (error) {
            console.error("Failed to complete task", error);
            fetchDashboard();
        }
    };

    const sortedTasks = useMemo(() => {
        if (!data) return [];
        return [...data.tasks].sort((a, b) => {
            const isACompleted = a.status === 'COMPLETED';
            const isBCompleted = b.status === 'COMPLETED';

            if (isACompleted && !isBCompleted) return 1;
            if (!isACompleted && isBCompleted) return -1;

            return a.userTaskId - b.userTaskId;
        });
    }, [data]);

    if (loading && !data) return (
        <div className="min-h-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-ctp-mauve animate-spin" />
        </div>
    );

    if (!data) return <div className="p-8 text-center text-ctp-red">Error loading dashboard</div>;

    const xpPerLevel = 100;
    const currentLevelProgress = data.currentXp % xpPerLevel;
    const progressPercent = (currentLevelProgress / xpPerLevel) * 100;

    return (
        <div className="p-6 md:p-12 max-w-6xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-ctp-text mb-2">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-ctp-mauve to-ctp-blue">{data.username}</span>!
                    </h1>
                    <div className="flex items-center gap-3 text-ctp-subtext0">
                        <span className="bg-ctp-surface0 border border-ctp-surface1 text-ctp-blue text-xs px-3 py-1 rounded-full font-medium">
                            {data.studyProgramName}
                        </span>
                        <span className="text-ctp-overlay1">•</span>
                        <span className="flex items-center gap-1 text-ctp-peach font-bold animate-pulse">
                            <Zap size={16} fill="currentColor" /> {data.streak} Day Streak
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-ctp-surface0 p-2 rounded-xl border border-ctp-surface1">
                    <div className="bg-ctp-surface1 p-2 rounded-lg text-ctp-text"><Calendar size={20}/></div>
                    <div className="pr-2">
                        <p className="text-xs text-ctp-overlay1 font-medium">Today</p>
                        <p className="text-sm font-bold text-ctp-text">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-ctp-surface0 p-6 rounded-2xl border border-ctp-surface1 relative overflow-hidden group hover:border-ctp-yellow/50 transition-colors">
                    <div className="absolute -right-4 -top-4 bg-ctp-yellow/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-ctp-yellow/20 transition-all"></div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-4 bg-ctp-yellow/20 rounded-2xl text-ctp-yellow shadow-inner shadow-ctp-yellow/10">
                            <Trophy size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-sm text-ctp-subtext0 font-medium uppercase tracking-wider">Current Level</p>
                            <p className="text-4xl font-black text-ctp-text">{data.level}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-ctp-surface0 p-6 rounded-2xl border border-ctp-surface1 relative overflow-hidden group hover:border-ctp-green/50 transition-colors">
                    <div className="absolute -right-4 -top-4 bg-ctp-green/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-ctp-green/20 transition-all"></div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-4 bg-ctp-green/20 rounded-2xl text-ctp-green shadow-inner shadow-ctp-green/10">
                            <Star size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-sm text-ctp-subtext0 font-medium uppercase tracking-wider">Total XP</p>
                            <p className="text-4xl font-black text-ctp-text">{data.currentXp}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-ctp-surface0 p-8 rounded-2xl border border-ctp-surface1 mb-10 shadow-lg shadow-ctp-base/50">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h3 className="font-bold text-xl text-ctp-text mb-1">Level Progress</h3>
                        <p className="text-sm text-ctp-subtext0">Keep going! You're doing great.</p>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-bold text-ctp-mauve">{Math.round(progressPercent)}%</span>
                    </div>
                </div>
                <div className="h-4 bg-ctp-surface1 rounded-full overflow-hidden p-1">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-ctp-blue to-ctp-mauve relative"
                        style={{ width: `${progressPercent === 0 ? 5 : progressPercent}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                    </div>
                </div>
                <p className="text-xs text-right text-ctp-overlay1 mt-3 font-mono">
                    {data.xpToNextLevel} XP remaining to Level {data.level + 1}
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-6 text-ctp-text flex items-center gap-2">
                    <Zap className="text-ctp-yellow fill-current" /> Daily Missions
                </h2>
                <div className="grid gap-4">
                    {sortedTasks.map((t) => {
                        const isCompleted = t.status === 'COMPLETED';
                        const isVerifying = t.status === 'VERIFYING';

                        return (
                            <div
                                key={t.userTaskId}
                                className={`
                                    group p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between
                                    ${isCompleted
                                    ? 'bg-ctp-surface0/50 border-ctp-surface0 opacity-60'
                                    : 'bg-ctp-surface0 border-ctp-surface1 hover:border-ctp-mauve hover:shadow-lg hover:shadow-ctp-mauve/5 hover:-translate-y-1'
                                }
                                `}
                            >
                                <div className="flex items-center gap-5">
                                    <button
                                        onClick={() => t.status === 'PENDING' && completeTask(t.userTaskId)}
                                        disabled={t.status !== 'PENDING'}
                                        className={`
                                            p-3 rounded-full transition-all duration-300 flex-shrink-0
                                            ${isCompleted
                                            ? 'text-ctp-green bg-ctp-green/10'
                                            : isVerifying
                                                ? 'text-ctp-peach bg-ctp-peach/10 cursor-wait'
                                                : 'text-ctp-overlay1 bg-ctp-surface1 hover:bg-ctp-mauve hover:text-ctp-base'
                                        }
                                        `}
                                    >
                                        {isCompleted && <CheckCircle size={24} strokeWidth={3} />}
                                        {t.status === 'PENDING' && <Circle size={24} strokeWidth={2.5} />}
                                        {isVerifying && <Loader2 size={24} className="animate-spin" />}
                                    </button>

                                    <div>
                                        <h3 className={`font-semibold text-lg ${isCompleted ? 'text-ctp-overlay1 line-through' : 'text-ctp-text'}`}>
                                            {t.task.title}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs px-2 py-0.5 rounded text-ctp-subtext1 bg-ctp-surface1 font-medium border border-ctp-surface2">
                                                {t.task.category}
                                            </span>
                                            {isVerifying && (
                                                <span className="text-xs text-ctp-peach font-bold animate-pulse flex items-center gap-1">
                                                    Verifying...
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={`
                                    font-bold text-sm px-4 py-2 rounded-xl whitespace-nowrap
                                    ${isCompleted ? 'text-ctp-overlay1 bg-transparent' : 'text-ctp-base bg-ctp-mauve'}
                                `}>
                                    +{t.task.xpReward} XP
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
            {showConfetti && <Confetti />}

            {achievementPopup && (
                <AchievementPopup
                    name={achievementPopup}
                    onClose={() => setAchievementPopup(null)}
                />
            )}
        </div>
    );
}