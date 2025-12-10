import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Circle, Trophy } from 'lucide-react';

interface Task {
    userTaskId: number;
    status: 'PENDING' | 'COMPLETED';
    task: {
        title: string;
        xpReward: number;
        category: string;
    };
}

interface DashboardData {
    username: string;
    level: number;
    currentXp: number;
    xpToNextLevel: number;
    streak: number;
    studyProgramName: string;
    tasks: Task[];
}

export default function Dashboard() {
    const { logout } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            const response = await api.get('/dashboard');
            setData(response.data);
        } catch (error) {
            console.error("Failed to fetch dashboard", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const completeTask = async (userTaskId: number) => {
        try {
            await api.post(`/tasks/${userTaskId}/complete`);
            // Optimistically update UI or refetch
            fetchDashboard();
        } catch (error) {
            console.error("Failed to complete task", error);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!data) return <div className="p-8">Error loading dashboard</div>;

    const progressPercent = (data.currentXp / (data.currentXp + data.xpToNextLevel)) * 100;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome, {data.username}!</h1>
                        <p className="text-gray-600">{data.studyProgramName} • Streak: {data.streak} 🔥</p>
                    </div>
                    <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                <Trophy size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Current Level</p>
                                <p className="text-2xl font-bold">{data.level}</p>
                            </div>
                        </div>
                    </div>
                    {/* Add more stats cards if needed */}
                </div>

                {/* Level Progress */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Level Progress</span>
                        <span className="text-gray-500">{data.currentXp} XP / Next Level</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Task List */}
                <h2 className="text-xl font-bold mb-4">Today's Tasks</h2>
                <div className="space-y-4">
                    {data.tasks.map((t) => (
                        <div key={t.userTaskId} className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${t.status === 'COMPLETED' ? 'bg-gray-50 border-gray-200 opacity-75' : 'bg-white border-gray-100'}`}>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => t.status === 'PENDING' && completeTask(t.userTaskId)}
                                    disabled={t.status === 'COMPLETED'}
                                    className={`p-2 rounded-full ${t.status === 'COMPLETED' ? 'text-green-500' : 'text-gray-300 hover:text-blue-500'}`}
                                >
                                    {t.status === 'COMPLETED' ? <CheckCircle size={24} /> : <Circle size={24} />}
                                </button>
                                <div>
                                    <h3 className={`font-medium ${t.status === 'COMPLETED' ? 'line-through text-gray-500' : 'text-gray-900'}`}>{t.task.title}</h3>
                                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{t.task.category}</span>
                                </div>
                            </div>
                            <div className="font-bold text-gray-400">+{t.task.xpReward} XP</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}