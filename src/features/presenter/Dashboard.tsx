import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { usePresentationStore } from '@/store/presentationStore';
import { useSupabaseSync } from '@/features/sync/useSupabaseSync';
import SlideDeck from '@/features/talk/SlideDeck';

export default function PresenterDashboard() {
    const { currentSlide, setSlide, startExam, stopExam, examStarted } = usePresentationStore();

    // Enable sync as presenter (pushes changes)
    useSupabaseSync(true);

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Live Preview */}
                <Card className="overflow-hidden bg-background">
                    <CardHeader>
                        <CardTitle>Live Preview - What Students See</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center bg-muted/20 p-8">
                        {/* 
                          Container mimics a 16:9 screen. 
                          We scale the SlideDeck down to fit. 
                        */}
                        <div className="relative w-full aspect-video border rounded-lg overflow-hidden shadow-sm bg-background">
                            <div className="absolute inset-0 transform scale-[0.5] origin-top-left w-[200%] h-[200%] pointer-events-none">
                                <SlideDeck />
                            </div>
                        </div>
                    </CardContent>
                </Card>

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
