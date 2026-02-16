import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { QUESTIONS } from './questions';
import ResultsView from './ResultsView';


export default function ExamLayout() {
    const [studentName, setStudentName] = useState('');
    const [started, setStarted] = useState(false);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [submitted, setSubmitted] = useState(false);
    // const { examDuration, examStartTime } = usePresentationStore();

    const handleSubmit = async () => {
        setSubmitted(true);
        // TODO: Submit to Supabase with studentName
        console.log('Submitting for', studentName, answers);
    };

    if (!started) {
        return (
            <div className="max-w-md mx-auto h-[60vh] flex flex-col items-center justify-center space-y-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Welcome to the Evaluation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name / Student Code</label>
                            <input
                                id="name"
                                type="text"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Enter your name or code"
                            />
                        </div>
                        <Button
                            className="w-full"
                            onClick={() => setStarted(true)}
                            disabled={!studentName.trim()}
                        >
                            Start Knowledge Check
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (submitted) {
        return <ResultsView answers={answers} />;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6 pb-20">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-display font-bold">Knowledge Check</h1>
                <div className="text-sm text-muted-foreground">
                    Student: <span className="font-bold text-foreground">{studentName}</span>
                </div>
            </div>

            {QUESTIONS.map((q, index) => (
                <Card key={q.id}>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            <span className="text-primary mr-2">{index + 1}.</span>
                            {q.text}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {q.options.map((option, optIndex) => (
                            <Button
                                key={optIndex}
                                variant={answers[q.id] === optIndex ? 'primary' : 'outline'}
                                className="w-full justify-start text-left"
                                onClick={() => setAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                            >
                                {option}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            ))}

            <div className="flex justify-center pt-8">
                <Button size="lg" onClick={handleSubmit} disabled={Object.keys(answers).length < QUESTIONS.length}>
                    Submit Exam
                </Button>
            </div>
        </div>
    );
}
