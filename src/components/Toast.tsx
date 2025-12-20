import { useEffect } from 'react';
import { CheckCircle, Trophy } from 'lucide-react';

export type ToastType = 'TASK' | 'LEVEL';

interface ToastProps {
    type: ToastType;
    message: string;
    onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const isLevel = type === 'LEVEL';

    return (
        <div className={`
            fixed top-6 right-6 z-50 flex items-center gap-4
            px-6 py-4 rounded-2xl shadow-2xl border
            animate-[slideIn_0.4s_ease-out]
            ${isLevel
            ? 'bg-ctp-yellow/90 text-ctp-base border-ctp-yellow'
            : 'bg-ctp-green/90 text-ctp-base border-ctp-green'}
        `}>
            {isLevel ? <Trophy size={28} /> : <CheckCircle size={28} />}
            <div className="font-bold">{message}</div>
        </div>
    );
}
