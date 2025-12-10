import { useEffect, useState } from 'react';
import api from '../services/api';
import { Lock, Unlock } from 'lucide-react';

interface Achievement {
    id: number;
    name: string;
    description: string;
}

export default function Achievements() {
    const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
    // In a real app, fetch user's unlocked IDs separately or add 'unlocked' boolean to the backend DTO
    // For now, let's assume we fetch all and check against user data (which we might need to fetch too)
    // To keep it simple based on your backend:
    // 1. Fetch /api/user/me -> get 'unlockedAchievements' (Wait, your UserDTO doesn't have this list!)
    // Correction: Your UserDTO is light. Let's just list all for now, OR update UserDTO to include unlocked IDs.
    // Ideally, add `List<Long> unlockedAchievementIds` to UserDTO.

    // Assuming simpler display for now: List all available achievements
    useEffect(() => {
        api.get('/user/achievements')
            .then(res => setAllAchievements(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Achievements 🏆</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allAchievements.map((ach) => (
                        <div key={ach.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="p-4 bg-gray-100 rounded-full mb-4 text-gray-400">
                                {/* Logic to show Lock/Unlock icon would go here if we had the user data */}
                                <Unlock size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{ach.name}</h3>
                            <p className="text-sm text-gray-500">{ach.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}