import {Trophy} from 'lucide-react';
import {useEffect} from 'react';

interface Props {
    name: string;
    onClose: () => void;
}

export default function AchievementPopup({name, onClose}: Props) {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="
            fixed bottom-6 right-6 z-50
            bg-ctp-surface0 border border-ctp-yellow
            px-6 py-4 rounded-2xl shadow-2xl
            animate-[slideUp_0.4s_ease-out]
        ">
            <div className="flex items-center gap-4">
                <div className="bg-ctp-yellow p-3 rounded-xl text-ctp-base">
                    <Trophy size={26}/>
                </div>
                <div>
                    <p className="text-xs text-ctp-subtext0 uppercase font-bold">Achievement Unlocked</p>
                    <p className="font-bold text-ctp-text">{name}</p>
                </div>
            </div>
        </div>
    );
}
