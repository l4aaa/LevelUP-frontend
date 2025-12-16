import { useEffect } from 'react';

export default function Confetti() {
    useEffect(() => {
        const duration = 2000;
        const end = Date.now() + duration;

        const interval = setInterval(() => {
            const timeLeft = end - Date.now();
            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            for (let i = 0; i < 20; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = [
                    '#cba6f7', '#89b4fa', '#a6e3a1', '#f9e2af'
                ][Math.floor(Math.random() * 4)];
                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 2000);
            }
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return null;
}
