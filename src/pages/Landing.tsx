import {Link, useNavigate} from 'react-router-dom';
import {ArrowRight, Target, Trophy, Users, Zap} from 'lucide-react';
import React from 'react';
import {useAuth} from '../context/AuthContext';

export default function Landing() {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleResumeGame = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-ctp-base text-ctp-text font-sans flex flex-col">

            <nav
                className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center animate-[slideIn_0.4s_ease-out]">
                <div className="flex items-center gap-3">
                    <div className="bg-ctp-mauve text-ctp-base p-2 rounded-lg shadow-lg shadow-ctp-mauve/20">
                        <Trophy size={24} strokeWidth={2.5}/>
                    </div>
                    <span className="text-2xl font-bold tracking-tight">LevelUp</span>
                </div>
                <div className="flex gap-4">
                    <Link
                        to="/login"
                        className="hidden md:block px-5 py-2.5 font-semibold text-ctp-subtext0 hover:text-ctp-text transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="px-5 py-2.5 bg-ctp-blue text-ctp-base font-bold rounded-xl hover:bg-ctp-blue/90 transition-transform active:scale-95 shadow-lg shadow-ctp-blue/20"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            <main
                className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
                <div
                    className="absolute top-20 left-10 w-72 h-72 bg-ctp-mauve/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-ctp-blue/10 rounded-full blur-3xl -z-10"></div>

                <div
                    className="bg-ctp-surface0/50 border border-ctp-surface1 px-4 py-1.5 rounded-full mb-8 text-sm font-medium text-ctp-blue animate-[slideUp_0.4s_ease-out]">
                    🚀 Gamify your study routine today
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight animate-[slideUp_0.5s_ease-out]">
                    Turn Your <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-ctp-mauve to-ctp-blue">Tasks</span> Into <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-ctp-blue to-ctp-green">Quests</span>
                </h1>

                <p className="text-xl text-ctp-subtext0 max-w-2xl mb-10 leading-relaxed animate-[slideUp_0.6s_ease-out]">
                    LevelUp transforms boring assignments into an RPG adventure. Earn XP, unlock achievements, and
                    compete on the global leaderboard.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-[slideUp_0.7s_ease-out]">
                    <Link
                        to="/register"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-ctp-mauve text-ctp-base text-lg font-bold rounded-2xl hover:bg-ctp-mauve/90 transition-all hover:-translate-y-1 shadow-xl shadow-ctp-mauve/20"
                    >
                        Start Your Journey <ArrowRight size={20}/>
                    </Link>
                    <button
                        onClick={handleResumeGame}
                        className="px-8 py-4 bg-ctp-surface0 text-ctp-text text-lg font-bold rounded-2xl border border-ctp-surface1 hover:bg-ctp-surface1 transition-colors cursor-pointer"
                    >
                        Resume Game
                    </button>
                </div>
            </main>

            <section className="bg-ctp-mantle py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why LevelUp?</h2>
                        <p className="text-ctp-subtext0">Everything you need to stay motivated and consistent.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="text-ctp-yellow" size={32}/>}
                            title="Daily Quests"
                            desc="Complete daily tasks to earn XP. Our automated verification system ensures every completed task counts."
                        />
                        <FeatureCard
                            icon={<Target className="text-ctp-red" size={32}/>}
                            title="Achievements"
                            desc="Unlock badges for streaks, levels, and special milestones to show off on your profile."
                        />
                        <FeatureCard
                            icon={<Users className="text-ctp-green" size={32}/>}
                            title="Global Leaderboard"
                            desc="Compete with students across all study programs. See who holds the top rank this week."
                        />
                    </div>
                </div>
            </section>

            <footer className="border-t border-ctp-surface0 py-8 text-center text-ctp-overlay0 text-sm">
                <p>© 2024 LevelUp Platform. Built with Spring Boot & React.</p>
            </footer>
        </div>
    );
}

function FeatureCard({icon, title, desc}: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div
            className="bg-ctp-surface0 p-8 rounded-2xl border border-ctp-surface1 hover:border-ctp-mauve/50 transition-colors group">
            <div
                className="mb-6 p-4 bg-ctp-base rounded-xl inline-block shadow-inner group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-ctp-text">{title}</h3>
            <p className="text-ctp-subtext0 leading-relaxed">
                {desc}
            </p>
        </div>
    );
}