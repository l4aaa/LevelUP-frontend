import { Award, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAchievements } from '../hooks/useAchievements';

export default function Achievements() {
    const { allAchievements, unlockedIds, loading, error } = useAchievements();

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
        <div className="p-6 md:p-12 max-w-5xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-ctp-text mb-2">Achievements</h1>
                <p className="text-ctp-subtext0">Track your progress and unlock legendary badges</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allAchievements.map((achievement) => {
                    const isUnlocked = unlockedIds.has(achievement.id);
                    return (
                        <div
                            key={achievement.id}
                            className={`
                                p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden
                                ${isUnlocked
                                    ? 'bg-ctp-surface0 border-ctp-yellow/30 shadow-lg shadow-ctp-yellow/5'
                                    : 'bg-ctp-surface0/50 border-ctp-surface1 opacity-70 grayscale'
                                }
                            `}
                        >
                            {!isUnlocked && (
                                <div className="absolute top-4 right-4 text-ctp-overlay0">
                                    <Lock size={18} />
                                </div>
                            )}

                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center mb-4
                                ${isUnlocked ? 'bg-ctp-yellow/20 text-ctp-yellow' : 'bg-ctp-surface1 text-ctp-overlay1'}
                            `}>
                                <Award size={32} />
                            </div>

                            <h3 className={`font-bold text-lg mb-1 ${isUnlocked ? 'text-ctp-text' : 'text-ctp-subtext1'}`}>
                                {achievement.name}
                            </h3>
                            <p className="text-sm text-ctp-subtext0 leading-relaxed">
                                {achievement.description}
                            </p>

                            {isUnlocked && (
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-ctp-yellow/10 text-ctp-yellow px-2 py-0.5 rounded border border-ctp-yellow/20">
                                        Unlocked
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
