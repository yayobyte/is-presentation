import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { QUESTIONS } from './questions';
import { motion } from 'framer-motion';

interface ResultsViewProps {
    answers: Record<string, number>;
    onRetry?: () => void;
}

export default function ResultsView({ answers }: ResultsViewProps) {
    const totalQuestions = QUESTIONS.length;
    const correctAnswers = QUESTIONS.filter(q => answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-display font-bold text-primary">
                        Results
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="text-8xl font-bold text-foreground"
                    >
                        {score}%
                    </motion.div>
                    <p className="text-muted-foreground text-xl">
                        You got {correctAnswers} out of {totalQuestions} correct.
                    </p>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-2xl font-bold">Review</h3>
                {QUESTIONS.map((q, index) => {
                    const userAnswer = answers[q.id];
                    const isCorrect = userAnswer === q.correctAnswer;

                    return (
                        <Card key={q.id} className={isCorrect ? 'border-primary/50' : 'border-destructive/50'}>
                            <CardHeader>
                                <CardTitle className="text-lg flex justify-between">
                                    <span>{index + 1}. {q.text}</span>
                                    {isCorrect ? (
                                        <span className="text-primary">Correct</span>
                                    ) : (
                                        <span className="text-destructive">Incorrect</span>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Your Answer:</p>
                                    <div className={isCorrect ? "text-primary font-bold" : "text-destructive font-bold"}>
                                        {q.options[userAnswer] || "No Answer"}
                                    </div>

                                    {!isCorrect && (
                                        <>
                                            <p className="text-sm text-muted-foreground mt-2">Correct Answer:</p>
                                            <div className="text-primary font-bold">
                                                {q.options[q.correctAnswer]}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
