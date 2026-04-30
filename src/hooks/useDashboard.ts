import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { getDashboardData, completeTask as completeTaskApi } from '../services/dashboardService';
import { getAchievements } from '../services/userService';
import type { Achievement, DashboardData, ToastType } from '../types';
import { POLLING_INTERVALS, UI_STRINGS, ERROR_MESSAGES } from '../constants';
import axios from 'axios';

export function useDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [toast, setToast] = useState<{ type: ToastType; title: string; description?: string } | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [achievementPopup, setAchievementPopup] = useState<string | null>(null);

    const unlockedRef = useRef<number[]>([]);
    const achievementsRef = useRef<Achievement[]>([]);

    const hasVerifyingTasks = useMemo(() => {
        return data?.tasks.some(t => t.status === 'VERIFYING') ?? false;
    }, [data?.tasks]);

    const fetchDashboard = useCallback(async (isBackground = false) => {
        try {
            if (!isBackground) setLoading(true);
            setError(null);

            const newData = await getDashboardData();

            setData(prev => {
                if (prev && newData.level > prev.level) {
                    setToast({
                        type: 'LEVEL',
                        title: UI_STRINGS.LEVEL_UP,
                        description: `You reached Level ${newData.level} 🎉`
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
                        const name = achievement ? achievement.name : UI_STRINGS.NEW_BADGE;
                        setAchievementPopup(name);
                    }
                }

                unlockedRef.current = newData.unlockedAchievementIds || [];
                return newData;
            });
        } catch (err) {
            console.error("Failed to fetch dashboard", err);
            if (!isBackground) {
                if (axios.isAxiosError(err) && err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError(ERROR_MESSAGES.UNEXPECTED);
                }
            }
        } finally {
            if (!isBackground) setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAchievements()
            .then(data => {
                achievementsRef.current = data;
            })
            .catch(err => console.error("Failed to load achievement definitions", err));

        fetchDashboard();
    }, [fetchDashboard]);

    useEffect(() => {
        if (!hasVerifyingTasks) return;

        const intervalId = setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetchDashboard(true);
            }
        }, POLLING_INTERVALS.DASHBOARD_VERIFYING);

        return () => clearInterval(intervalId);
    }, [hasVerifyingTasks, fetchDashboard]);

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
                title: UI_STRINGS.TASK_SUBMITTED,
                description: UI_STRINGS.VERIFYING
            });

            await completeTaskApi(userTaskId);
        } catch (err) {
            console.error("Failed to complete task", err);
            fetchDashboard(true);
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

    return {
        data,
        loading,
        error,
        toast,
        showConfetti,
        achievementPopup,
        setToast,
        setAchievementPopup,
        sortedTasks,
        completeTask
    };
}
