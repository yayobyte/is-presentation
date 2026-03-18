import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { usePresentationStore } from '@/store/presentationStore';
import { useSupabaseSync } from '@/features/sync/useSupabaseSync';
import { useExamResults } from '@/providers/ResultsProvider';
import SlideDeck from '@/features/talk/SlideDeck';

export default function PresenterDashboard() {
    const {
        currentSlide, setSlide, startExam, stopExam,
        examStarted, isTimerEnabled, setTimerEnabled
    } = usePresentationStore();

    // Enable sync as presenter (pushes changes)
    useSupabaseSync(true);

    const handleStopExam = () => {
        if (window.confirm('Are you sure you want to STOP the exam for all students? This will prevent any further submissions.')) {
            stopExam();
        }
    };

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
                    <CardContent className="space-y-4">
                        <div className="flex flex-col space-y-4">
                            {!examStarted && (
                                <div className="flex items-center gap-3 p-4 bg-secondary/10 rounded-lg border border-border/50">
                                    <input
                                        type="checkbox"
                                        id="timer-toggle"
                                        checked={isTimerEnabled}
                                        onChange={(e) => setTimerEnabled(e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="timer-toggle" className="text-sm font-medium cursor-pointer">
                                        Enable 20-minute counter for students
                                    </label>
                                </div>
                            )}

                            <div className="flex gap-4">
                                {examStarted ? (
                                    <Button variant="destructive" size="lg" onClick={handleStopExam} className="w-full">Stop Exam</Button>
                                ) : (
                                    <Button size="lg" onClick={() => startExam()} className="w-full">
                                        Start Exam {isTimerEnabled ? '(with 20m timer)' : '(no timer)'}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {examStarted && isTimerEnabled && (
                            <PresenterTimer />
                        )}
                        {examStarted && !isTimerEnabled && (
                            <div className="p-6 bg-secondary/10 rounded-xl border border-border/50 text-center">
                                <p className="text-sm font-medium text-muted-foreground">Exam is running WITHOUT a timer limit.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <PresenterResults />

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

function PresenterTimer() {
    const { examStartTime, examDuration } = usePresentationStore();
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!examStartTime) return;

        const updateTimer = () => {
            const elapsed = Math.floor((Date.now() - examStartTime) / 1000);
            const remaining = Math.max(0, examDuration - elapsed);
            setTimeLeft(remaining);

            if (remaining === 0) {
                // We don't necessarily stop the exam globally automatically, 
                // but we show it's ended.
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [examStartTime, examDuration]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const isUrgent = timeLeft <= 120; // 2 minutes

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-secondary/20 rounded-xl border border-border/50">
            <span className="text-sm font-medium text-muted-foreground mb-1">Exam Time Remaining</span>
            <div className={`text-6xl font-display font-bold tabular-nums ${isUrgent ? 'text-destructive animate-pulse' : 'text-primary'}`}>
                {formatTime(timeLeft)}
            </div>
            {timeLeft === 0 && (
                <p className="text-sm text-destructive font-bold mt-2">TIME IS UP!</p>
            )}
        </div>
    );
}

function PresenterResults() {
    const { groupResults, isResultsVisible, toggleResults, refreshResults, loading } = useExamResults();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50 mb-4">
                <CardTitle>Group Performance Results</CardTitle>
                <Button variant={isResultsVisible ? 'secondary' : 'primary'} size="sm" onClick={toggleResults}>
                    {isResultsVisible ? 'Hide Results' : 'Show Results'}
                </Button>
            </CardHeader>
            {isResultsVisible && (
                <CardContent className="space-y-4">
                    <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={refreshResults} disabled={loading}>
                            {loading ? 'Refreshing...' : 'Refresh Results'}
                        </Button>
                    </div>
                    {groupResults.length === 0 && !loading ? (
                        <p className="text-sm text-muted-foreground text-center py-8">No matching data available yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupResults.map(g => (
                                <div key={g.groupId} className="p-5 bg-gradient-to-br from-secondary/5 to-secondary/20 rounded-xl border border-border/50 shadow-sm relative overflow-hidden">
                                    <h3 className="font-bold text-lg tracking-tight mb-4">{g.groupName}</h3>
                                    <div className="space-y-3 text-sm text-muted-foreground z-10 relative">
                                        <div className="flex justify-between items-center">
                                            <span>Participation:</span>
                                            <span className="font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded text-primary">
                                                {g.completedCount} / {g.studentCount}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Average Score:</span>
                                            <span className="font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded text-primary">
                                                {g.averageScore} / {g.maxScore}
                                            </span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2 mt-4 overflow-hidden shadow-inner">
                                            <div 
                                                className="bg-primary h-full transition-all duration-1000 ease-out" 
                                                style={{ width: `${Math.min(100, (g.averageScore / g.maxScore) * 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Decorative background element */}
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    );
}
