import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { QUESTIONS, CATEGORIES } from './questions';
import { findStudentById } from './students';
import { supabase } from '@/lib/supabase';
import ResultsView from './ResultsView';
import { ChevronLeft, ChevronRight, User, AlertCircle } from 'lucide-react';

export default function ExamLayout() {
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [error, setError] = useState('');
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleValidateStudent = () => {
        setError('');
        const student = findStudentById(studentId);
        if (student) {
            setStudentName(student.name);
        } else {
            setError('Student ID not found. Please check your document number.');
        }
    };

    const handleStart = () => {
        if (studentName) setStarted(true);
    };

    const handleSelectOption = (questionId: string, optionIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);

        // Calculate category scores
        const categoryScores: Record<string, number> = {};
        for (const cat of CATEGORIES) {
            const catQuestions = QUESTIONS.filter(q => q.category === cat);
            let score = 0;
            for (const q of catQuestions) {
                const selectedIndex = answers[q.id];
                if (selectedIndex !== undefined) {
                    score += q.options[selectedIndex].points;
                }
            }
            categoryScores[cat] = score;
        }

        const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);

        try {
            await supabase.from('exam_submissions').insert({
                student_id: studentId,
                student_name: studentName,
                answers,
                category_scores: categoryScores,
                total_score: totalScore,
            });
        } catch (err) {
            console.error('Failed to save submission:', err);
        }

        setSubmitted(true);
        setSubmitting(false);
    };

    // ── Entry Screen ──
    if (!started) {
        return (
            <div className="max-w-md mx-auto min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-4">
                <Card className="w-full">
                    <CardHeader className="text-center space-y-2">
                        <div className="mx-auto p-3 bg-primary/20 rounded-full w-fit">
                            <User className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-display">Market Position Assessment</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            This is NOT to disqualify you — it's to understand your position in the industry.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="studentId" className="text-sm font-medium">
                                Student ID (Document Number)
                            </label>
                            <div className="flex gap-2">
                                <input
                                    id="studentId"
                                    type="text"
                                    value={studentId}
                                    onChange={(e) => {
                                        setStudentId(e.target.value);
                                        setStudentName('');
                                        setError('');
                                    }}
                                    onKeyDown={(e) => e.key === 'Enter' && handleValidateStudent()}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    placeholder="Enter your document number"
                                />
                                <Button onClick={handleValidateStudent} disabled={!studentId.trim()}>
                                    Verify
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        {studentName && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-primary/10 rounded-lg text-center"
                            >
                                <p className="text-sm text-muted-foreground">Welcome,</p>
                                <p className="text-lg font-bold text-primary">{studentName}</p>
                            </motion.div>
                        )}

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleStart}
                            disabled={!studentName}
                        >
                            Start Assessment ({QUESTIONS.length} questions)
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // ── Results Screen ──
    if (submitted) {
        return <ResultsView answers={answers} studentName={studentName} />;
    }

    // ── Question Slide ──
    const question = QUESTIONS[currentQuestion];
    const selectedOption = answers[question.id];
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    const categoryQuestions = QUESTIONS.filter(q => q.category === question.category);
    const categoryIndex = categoryQuestions.indexOf(question) + 1;
    const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
    const allAnswered = Object.keys(answers).length === QUESTIONS.length;

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Question {currentQuestion + 1} of {QUESTIONS.length}
                    </p>
                    <h2 className="text-lg font-bold text-primary">{question.category}</h2>
                    <p className="text-xs text-muted-foreground">({categoryIndex} of {categoryQuestions.length} in category)</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">{studentName}</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl leading-relaxed">
                                {question.text}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {question.options.map((option, idx) => (
                                <Button
                                    key={idx}
                                    variant={selectedOption === idx ? 'primary' : 'outline'}
                                    className="w-full justify-start text-left min-h-[48px] h-auto whitespace-normal py-3"
                                    onClick={() => handleSelectOption(question.id, idx)}
                                >
                                    <span className="mr-3 text-primary font-bold shrink-0">
                                        {String.fromCharCode(65 + idx)}.
                                    </span>
                                    {option.text}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    disabled={currentQuestion === 0}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                </Button>

                {isLastQuestion ? (
                    <Button
                        size="lg"
                        onClick={handleSubmit}
                        disabled={!allAnswered || submitting}
                    >
                        {submitting ? 'Submitting...' : 'Submit Assessment'}
                    </Button>
                ) : (
                    <Button
                        onClick={() => setCurrentQuestion(prev => prev + 1)}
                        disabled={selectedOption === undefined}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                )}
            </div>

            {/* Category dots */}
            <div className="flex justify-center gap-1.5 flex-wrap pt-2">
                {QUESTIONS.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentQuestion(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentQuestion
                            ? 'bg-primary scale-125'
                            : answers[QUESTIONS[idx].id] !== undefined
                                ? 'bg-primary/50'
                                : 'bg-secondary'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
