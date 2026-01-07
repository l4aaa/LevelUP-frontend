import { useState } from 'react';

interface Particle {
    id: number;
    style: React.CSSProperties;
}

const COLORS = ['#cba6f7', '#89b4fa', '#a6e3a1', '#f9e2af'];

export default function Confetti() {
    const [particles] = useState<Particle[]>(() => {
        return Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 100}vw`,
                backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random()}s`,
            },
        }));
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-9999">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="confetti"
                    style={p.style}
                />
            ))}
        </div>
    );
}