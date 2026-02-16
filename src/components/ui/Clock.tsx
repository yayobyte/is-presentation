import { Clock as ClockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePresentationStore } from '@/store/presentationStore';

export function Clock() {
    const { examStarted, examStartTime, examDuration } = usePresentationStore();
    const [time, setTime] = useState<string>('');
    const [examTimeLeft, setExamTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

            if (examStarted && examStartTime) {
                const elapsed = Math.floor((Date.now() - examStartTime) / 1000);
                const remaining = Math.max(0, examDuration - elapsed);
                setExamTimeLeft(remaining);
            } else {
                setExamTimeLeft(null);
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [examStarted, examStartTime, examDuration]);

    const formatDuration = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center space-x-2 font-mono text-sm bg-secondary/50 px-3 py-1 rounded-full backdrop-blur-md border border-border/50">
            <ClockIcon className="h-4 w-4 text-primary" />
            <span>{time}</span>
            {examTimeLeft !== null && (
                <span className="text-destructive font-bold ml-2">
                    Exam: {formatDuration(examTimeLeft)}
                </span>
            )}
        </div>
    );
}
