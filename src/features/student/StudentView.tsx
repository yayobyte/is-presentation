import { MainLayout } from '@/layouts/MainLayout';
import { usePresentationStore } from '@/store/presentationStore';
import { Card } from '@/components/ui/Card';
import SlideDeck from '@/features/talk/SlideDeck';
import ExamLayout from '@/features/exam/ExamLayout';
import { useSupabaseSync } from '@/features/sync/useSupabaseSync';

export default function StudentView() {
    const { examStarted } = usePresentationStore();

    // Enable sync as student (listens for changes)
    useSupabaseSync(false);

    return (
        <MainLayout showClock={examStarted}>
            {examStarted ? (
                <ExamLayout />
            ) : (
                <div className="max-w-6xl mx-auto h-[80vh] flex items-center justify-center">
                    <Card className="min-h-[400px] w-full flex items-center justify-center bg-transparent border-none shadow-none text-foreground">
                        <SlideDeck />
                    </Card>
                </div>
            )}
        </MainLayout>
    );
}
