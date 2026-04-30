import {useEffect, useState} from 'react';
import Toast from './Toast';
import type { ToastType } from '../types';

interface ToastMessage {
    id: number;
    type: ToastType;
    title: string;
    description?: string;
}

export default function GlobalToast() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        const handleToast = (e: Event) => {
            const customEvent = e as CustomEvent<{type: ToastType, message: string}>;
            
            let title = 'Notification';
            if (customEvent.detail.type === 'ERROR') title = 'Error';
            else if (customEvent.detail.type === 'LEVEL') title = 'Level Up!';
            else if (customEvent.detail.type === 'TASK') title = 'Task Update';
            else if (customEvent.detail.type === 'ACHIEVEMENT') title = 'Achievement Unlocked!';

            const newToast: ToastMessage = {
                id: Date.now() + Math.random(),
                type: customEvent.detail.type,
                title,
                description: customEvent.detail.message
            };
            setToasts(prev => [...prev, newToast]);
        };

        window.addEventListener('global-toast', handleToast);
        return () => window.removeEventListener('global-toast', handleToast);
    }, []);

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2">
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    type={toast.type}
                    title={toast.title}
                    description={toast.description}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}