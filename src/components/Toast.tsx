import { useEffect } from 'react';
import { CheckCircle, Trophy, X } from 'lucide-react';

export type ToastType = 'TASK' | 'LEVEL';

interface ToastProps {
    type: ToastType;
    message: string;
    onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
    useEffect(() => {
        const duration = type === 'LEVEL' ? 5000 : 3500;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, type]);

    const isLevel = type === 'LEVEL';

    if (isLevel) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
                <div className="
                    bg-ctp-surface0 border-2 border-ctp-yellow
                    p-8 rounded-3xl shadow-2xl
                    flex flex-col items-center text-center gap-4
                    max-w-sm w-full mx-4
                    animate-[scaleIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]
                    relative
                ">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-ctp-overlay1 hover:text-ctp-text transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="bg-ctp-yellow/20 p-6 rounded-full text-ctp-yellow mb-2 ring-4 ring-ctp-yellow/10">
                        <Trophy size={48} strokeWidth={2} />
                    </div>

                    <div>
                        <h2 className="text-2xl font-black text-ctp-yellow uppercase tracking-widest mb-2">Level Up!</h2>
                        <p className="text-lg font-medium text-ctp-text leading-relaxed">
                            {message.replace('LEVEL UP! ', '')}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-4 bg-ctp-yellow text-ctp-base font-bold px-8 py-3 rounded-xl hover:bg-ctp-yellow/90 transition-transform active:scale-95 shadow-lg shadow-ctp-yellow/20"
                    >
                        Awesome!
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`
            fixed top-6 right-6 z-50 flex items-center gap-4
            px-6 py-4 rounded-2xl shadow-2xl border
            animate-[slideIn_0.4s_ease-out]
            bg-ctp-green/90 text-ctp-base border-ctp-green
        `}>
            <CheckCircle size={28} />
            <div className="font-bold">{message}</div>
        </div>
    );
}