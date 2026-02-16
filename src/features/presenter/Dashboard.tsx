import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { usePresentationStore } from '@/store/presentationStore';
import { useSupabaseSync } from '@/features/sync/useSupabaseSync';

export default function PresenterDashboard() {
    const { currentSlide, setSlide, startExam, stopExam, examStarted } = usePresentationStore();

    // Enable sync as presenter (pushes changes)
    useSupabaseSync(true);

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Slide Control</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4 items-center justify-between">
                        <Button onClick={() => setSlide(Math.max(0, currentSlide - 1))} disabled={currentSlide === 0}>
                            Previous
                        </Button>
                        <span className="text-4xl font-bold font-display w-20 text-center">{currentSlide}</span>
                        <Button onClick={() => setSlide(currentSlide + 1)}>
                            Next
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Session Control</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        {examStarted ? (
                            <Button variant="destructive" size="lg" onClick={stopExam} className="w-full">Stop Exam</Button>
                        ) : (
                            <Button size="lg" onClick={() => startExam()} className="w-full">Start Exam</Button>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Button variant="outline" onClick={() => window.open('/student', '_blank')}>Open Student View</Button>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
