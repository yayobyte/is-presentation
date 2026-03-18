import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { usePresentationStore } from '@/store/presentationStore';
import { useSupabaseSync } from '@/features/sync/useSupabaseSync';
import { useExamResults } from '@/features/shared/providers/ResultsProvider';
import SlideDeck from '@/features/talk/SlideDeck';
import { Trash2, Download, LayoutDashboard, Database } from 'lucide-react';
import { Tabs } from '@/components/ui/Tabs';
import ManagementView from './ManagementView';

export default function PresenterDashboard() {
    const {
        currentSlide, setSlide, startExam, stopExam,
        examStarted, isTimerEnabled, setTimerEnabled
    } = usePresentationStore();

    // Enable sync as presenter (pushes changes)
    useSupabaseSync(true);

    const [activeTab, setActiveTab] = useState('presentation');

    const handleStopExam = () => {
        if (window.confirm('Are you sure you want to STOP the exam for all students? This will prevent any further submissions.')) {
            stopExam();
        }
    };

    const dashboardTabs = [
        { id: 'presentation', label: 'Presentation Control', icon: <LayoutDashboard className="h-4 w-4" /> },
        { id: 'management', label: 'Database Management', icon: <Database className="h-4 w-4" /> }
    ];

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-center">
                    <Tabs 
                        tabs={dashboardTabs} 
                        activeTab={activeTab} 
                        onTabChange={setActiveTab}
                    />
                </div>

                {activeTab === 'presentation' ? (
                    <div className="space-y-8">
                        {/* Live Preview */}
                        <Card className="overflow-hidden bg-background">
                            <CardHeader>
                                <CardTitle>Live Preview - What Students See</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center bg-muted/20 p-8">
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
                ) : (
                    <ManagementView />
                )}
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
    const { groupResults, isResultsVisible, toggleResults, refreshResults, loading, deleteSubmission } = useExamResults();

    const handleExportAllCSV = () => {
        if (groupResults.length === 0) {
            alert('No data to export.');
            return;
        }

        const headers = ['Group', 'Student ID', 'Student Name', 'Score', 'Max Score', 'Percentage'];
        const rows = groupResults.flatMap(group =>
            group.students.map(student => [
                `"${group.groupName}"`,
                student.studentId,
                `"${student.studentName}"`,
                student.score,
                group.maxScore,
                `${((student.score / group.maxScore) * 100).toFixed(0)}%`
            ])
        );

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `all_groups_results.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportCSV = (group: any) => {
        if (!group.students || group.students.length === 0) {
            alert('No data to export for this group.');
            return;
        }

        const headers = ['Student ID', 'Student Name', 'Score', 'Max Score', 'Percentage'];
        const rows = group.students.map((s: any) => [
            s.studentId,
            `"${s.studentName}"`, // Quote names for safety
            s.score,
            group.maxScore,
            `${((s.score / group.maxScore) * 100).toFixed(0)}%`
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map((r: any) => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${group.groupName.replace(/\s+/g, '_')}_results.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                    <div className="flex flex-wrap justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExportAllCSV}
                            disabled={loading || groupResults.length === 0}
                            className="bg-primary/5 hover:bg-primary/10 border-primary/20 min-h-9 w-full sm:w-auto"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export All Groups
                        </Button>
                        <Button variant="outline" size="sm" onClick={refreshResults} disabled={loading} className="min-h-9 w-full sm:w-auto">
                            {loading ? 'Refreshing...' : 'Refresh Results'}
                        </Button>
                    </div>
                    {groupResults.length === 0 && !loading ? (
                        <p className="text-sm text-muted-foreground text-center py-8">No matching data available yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {groupResults.map(group => (
                                <div key={group.groupId} className="p-5 bg-gradient-to-br from-secondary/5 to-secondary/20 rounded-xl border border-border/50 shadow-sm relative overflow-hidden">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                                        <h3 className="font-bold text-lg tracking-tight">{group.groupName}</h3>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleExportCSV(group)}
                                            className="gap-2 bg-background/50 backdrop-blur-sm min-h-9"
                                        >
                                            <Download className="h-4 w-4" />
                                            Export
                                        </Button>
                                    </div>
                                    <div className="space-y-3 text-sm text-muted-foreground z-10 relative">
                                        <div className="flex justify-between items-center">
                                            <span>Participation:</span>
                                            <span className="font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded text-primary">
                                                {group.completedCount} / {group.studentCount}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Average Score:</span>
                                            <span className="font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded text-primary">
                                                {group.averageScore} / {group.maxScore}
                                            </span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2 mt-4 overflow-hidden shadow-inner">
                                            <div
                                                className="bg-primary h-full transition-all duration-1000 ease-out"
                                                style={{ width: `${Math.min(100, (group.averageScore / group.maxScore) * 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Student List */}
                                    {group.students.length > 0 && (
                                        <div className="mt-6 pt-4 border-t border-border/50 relative z-10">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Individual Results ({group.students.length})</h4>
                                            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                                {group.students.map(student => (
                                                    <li key={student.submissionId} className="flex justify-between items-center text-sm p-2 rounded bg-background/50 border border-border/30 hover:border-primary/30 transition-colors">
                                                        <div className="truncate pr-2">
                                                            <span className="font-medium text-foreground block truncate" title={student.studentName}>{student.studentName}</span>
                                                            <span className="text-xs text-muted-foreground">{student.studentId}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 shrink-0">
                                                            <span className="font-mono bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-semibold">
                                                                {(student.score / group.maxScore * 100).toFixed(0)}%
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                onClick={() => {
                                                                    if (window.confirm(`Are you sure you want to delete ${student.studentName}'s result?`)) {
                                                                        deleteSubmission(student.submissionId);
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

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
