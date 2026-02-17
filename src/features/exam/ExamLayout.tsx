import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { QUESTIONS, CATEGORIES, MAX_POINTS_PER_CATEGORY } from './questions';
import { supabase } from '@/lib/supabase';
import ResultsView from './ResultsView';
import { ChevronLeft, ChevronRight, User, AlertCircle, Clock } from 'lucide-react';

const EXAM_DURATION_SECONDS = 20 * 60; // 20 minutes

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function ExamLayout() {
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [error, setError] = useState('');
    const [validating, setValidating] = useState(false);
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
    const [previousResults, setPreviousResults] = useState<{
        answers: Record<string, number>,
        name: string,
        categoryScores: Record<string, number>
    } | null>(null);
    const [currentCategoryScores, setCurrentCategoryScores] = useState<Record<string, number> | null>(null);

    // Pre-shuffle options for each question once per session
    const shuffledQuestions = useMemo(() => {
        return QUESTIONS.map(q => ({
            ...q,
            shuffledOptions: shuffleArray(q.options)
        }));
    }, []);

    const handleSubmit = useCallback(async () => {
        if (submitting || submitted) return;
        setSubmitting(true);

        const categoryScores: Record<string, number> = {};
        for (const cat of CATEGORIES) {
            const catQuestions = shuffledQuestions.filter(q => q.category === cat);
            let score = 0;
            for (const q of catQuestions) {
                const selectedIdx = answers[q.id];
                if (selectedIdx !== undefined) {
                    // Check if it's the "I don't know" option (idx 4)
                    if (selectedIdx === 4) {
                        score += 0;
                    } else {
                        // Get points from the shuffled option
                        score += q.shuffledOptions[selectedIdx].points;
                    }
                }
            }
            categoryScores[cat] = score;
        }

        const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);
        setCurrentCategoryScores(categoryScores);

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
    }, [answers, shuffledQuestions, studentId, studentName, submitting, submitted]);

    // ── Timer Logic (Only for auto-submit, display is removed later) ──
    useEffect(() => {
        if (!started || submitted) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [started, submitted, handleSubmit]);

    const handleValidateStudent = async () => {
        setError('');
        setValidating(true);

        try {
            // Check if student exists in the database
            const { data: student, error: fetchError } = await supabase
                .from('students')
                .select('name')
                .eq('id', studentId.trim())
                .single();

            if (fetchError || !student) {
                setError('Student ID not found. Please check your document number.');
                setValidating(false);
                return;
            }

            // Check if student already submitted
            const { data: existing } = await supabase
                .from('exam_submissions')
                .select('student_name, answers, category_scores')
                .eq('student_id', studentId.trim())
                .order('submitted_at', { ascending: false })
                .limit(1);

            if (existing && existing.length > 0) {
                // Instead of blocking, prepare to show previous results
                setPreviousResults({
                    answers: existing[0].answers,
                    name: existing[0].student_name,
                    categoryScores: existing[0].category_scores
                });
                setStudentName(existing[0].student_name);
            } else {
                setStudentName(student.name);
                setPreviousResults(null);
            }
        } catch {
            setError('Connection error. Please try again.');
        }

        setValidating(false);
    };

    const handleStart = () => {
        if (previousResults) {
            setSubmitted(true);
        } else if (studentName) {
            setStarted(true);
            setTimeLeft(EXAM_DURATION_SECONDS);
        }
    };

    const handleSelectOption = (questionId: string, optionIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    // ── Entry Screen ──
    if (!started && !submitted) {
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
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>20 minutes • Assessment Mode</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="studentId" className="text-sm font-medium">
                                Student ID (Document Number)
                            </label>
                            <div className="flex gap-2 mt-4">
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
                                <Button onClick={handleValidateStudent} disabled={!studentId.trim() || validating}>
                                    {validating ? '...' : 'Verify'}
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
                                {previousResults && (
                                    <p className="text-xs text-amber-600 mt-2 font-medium">
                                        You have already submitted this assessment. Clicking start will show your previous result.
                                    </p>
                                )}
                            </motion.div>
                        )}

                        <Button
                            className="w-full"
                            size="sm"
                            onClick={handleStart}
                            disabled={!studentName}
                        >
                            {previousResults ? 'View My Results' : `Start Assessment (${shuffledQuestions.length} questions)`}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // ── Results Screen ──
    if (submitted) {
        const scoresToDisplay = previousResults
            ? previousResults.categoryScores
            : (currentCategoryScores || {});

        const categoryScoresArray = CATEGORIES.map(cat => ({
            category: cat,
            score: scoresToDisplay[cat] || 0,
            max: MAX_POINTS_PER_CATEGORY
        }));

        return <ResultsView categoryScores={categoryScoresArray} studentName={studentName} />;
    }

    // ── Question Slide ──
    const question = shuffledQuestions[currentQuestion];
    const selectedOption = answers[question.id];
    const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
    const categoryQuestions = shuffledQuestions.filter(q => q.category === question.category);
    const categoryIndex = categoryQuestions.indexOf(question) + 1;
    const isLastQuestion = currentQuestion === shuffledQuestions.length - 1;
    const allAnswered = Object.keys(answers).length === shuffledQuestions.length;

    // Combine shuffled options with the fixed 5th option
    const displayOptions = [
        ...question.shuffledOptions,
        { text: "I don't know", points: 0 }
    ];

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Question {currentQuestion + 1} of {shuffledQuestions.length}
                    </p>
                    <h2 className="text-3xl font-bold text-primary">{question.category}</h2>
                    <p className="text-xs text-muted-foreground">({categoryIndex} of {categoryQuestions.length} in category)</p>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-foreground">{studentName}</p>
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
                            {displayOptions.map((option, idx) => (
                                <Button
                                    key={idx}
                                    variant={selectedOption === idx ? 'primary' : 'outline'}
                                    className="w-full justify-start text-left min-h-[48px] h-auto whitespace-normal py-3 px-4"
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
                {shuffledQuestions.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentQuestion(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentQuestion
                            ? 'bg-primary scale-125'
                            : answers[shuffledQuestions[idx].id] !== undefined
                                ? 'bg-primary/50'
                                : 'bg-secondary'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
