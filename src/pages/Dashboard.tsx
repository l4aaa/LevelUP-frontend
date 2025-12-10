import { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Circle, Trophy, Star, Zap, Loader2 } from 'lucide-react';
import type { DashboardData } from '../types';

export default function Dashboard() {
    const { logout } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    // Track if we need to poll the server
    const shouldPoll = useRef(false);

    const fetchDashboard = async (isBackground = false) => {
        try {
            if (!isBackground) setLoading(true);
            const response = await api.get('/dashboard');
            const newData: DashboardData = response.data;
            setData(newData);

            // Check if any task is VERIFYING. If so, keep polling.
            const hasVerifyingTasks = newData.tasks.some(t => t.status === 'VERIFYING');
            shouldPoll.current = hasVerifyingTasks;

        } catch (error) {
            console.error("Failed to fetch dashboard", error);
        } finally {
            if (!isBackground) setLoading(false);
        }
    };

    // Initial Load
    useEffect(() => {
        fetchDashboard();
    }, []);

    // Polling Logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (shouldPoll.current) {
                fetchDashboard(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const completeTask = async (userTaskId: number) => {
        try {
            // Optimistic Update: Immediately show verifying state
            setData(prev => prev ? {
                ...prev,
                tasks: prev.tasks.map(t =>
                    t.userTaskId === userTaskId ? { ...t, status: 'VERIFYING' } : t
                )
            } : null);

            // Start Polling immediately so we catch the completion
            shouldPoll.current = true;

            await api.post(`/tasks/${userTaskId}/complete`);

        } catch (error) {
            console.error("Failed to complete task", error);
            fetchDashboard(); // Revert data on error
        }
    };

    if (loading && !data) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
    );

    if (!data) return <div className="p-8 text-center text-red-500">Error loading dashboard</div>;

    const progressPercent = (data.currentXp / (data.currentXp + data.xpToNextLevel)) * 100;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome, {data.username}!</h1>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
                                {data.studyProgramName}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-orange-500 font-bold">
                                <Zap size={16} fill="currentColor" /> {data.streak} Day Streak
                            </span>
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase">Current Level</p>
                            <p className="text-2xl font-bold text-gray-900">{data.level}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                            <Star size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase">Total XP</p>
                            <p className="text-2xl font-bold text-gray-900">{data.currentXp}</p>
                        </div>
                    </div>
                </div>

                {/* Level Progress */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-gray-700">Level {data.level} Progress</span>
                        <span className="text-gray-500 font-mono">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <p className="text-xs text-right text-gray-400 mt-2">{data.xpToNextLevel} XP to Level {data.level + 1}</p>
                </div>

                {/* Task List */}
                <h2 className="text-xl font-bold mb-4 text-gray-800">Today's Missions</h2>
                <div className="space-y-3">
                    {data.tasks.map((t) => (
                        <div
                            key={t.userTaskId}
                            className={`
                                group p-4 rounded-xl border transition-all duration-200
                                flex items-center justify-between
                                ${t.status === 'COMPLETED'
                                ? 'bg-gray-50 border-gray-100 opacity-60'
                                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                            }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => t.status === 'PENDING' && completeTask(t.userTaskId)}
                                    disabled={t.status !== 'PENDING'}
                                    className={`
                                        p-2 rounded-full transition-all duration-300
                                        ${t.status === 'COMPLETED'
                                        ? 'text-green-500 bg-green-50 scale-110'
                                        : t.status === 'VERIFYING'
                                            ? 'text-yellow-600 bg-yellow-50 cursor-wait'
                                            : 'text-gray-300 hover:text-blue-500 hover:bg-blue-50'
                                    }
                                    `}
                                >
                                    {t.status === 'COMPLETED' && <CheckCircle size={28} weight="fill" />}
                                    {t.status === 'PENDING' && <Circle size={28} />}
                                    {t.status === 'VERIFYING' && <Loader2 size={28} className="animate-spin" />}
                                </button>

                                <div>
                                    <h3 className={`font-medium text-lg ${t.status === 'COMPLETED' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                        {t.task.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`
                                            text-xs px-2 py-0.5 rounded text-gray-500 font-medium
                                            ${t.status !== 'COMPLETED' && 'bg-gray-100'}
                                        `}>
                                            {t.task.category}
                                        </span>
                                        {t.status === 'VERIFYING' && (
                                            <span className="text-xs text-yellow-600 font-bold animate-pulse">
                                                Verifying...
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={`
                                font-bold text-sm px-3 py-1 rounded-lg
                                ${t.status === 'COMPLETED' ? 'text-gray-400 bg-gray-100' : 'text-blue-600 bg-blue-50'}
                            `}>
                                +{t.task.xpReward} XP
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}