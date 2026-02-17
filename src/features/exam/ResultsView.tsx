import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { motion } from 'framer-motion';

interface CategoryScore {
    category: string;
    score: number;
    max: number;
}

interface ResultsViewProps {
    categoryScores: CategoryScore[];
    studentName: string;
}

export default function ResultsView({ categoryScores, studentName }: ResultsViewProps) {
    const totalScore = categoryScores.reduce((a, b) => a + b.score, 0);
    const totalMax = categoryScores.reduce((a, b) => a + b.max, 0);
    const percentage = Math.round((totalScore / totalMax) * 100);

    const getScoreColor = (score: number, max: number) => {
        const pct = score / max;
        if (pct >= 0.7) return 'text-primary';
        if (pct >= 0.4) return 'text-yellow-500';
        return 'text-destructive';
    };

    const getBarColor = (score: number, max: number) => {
        const pct = score / max;
        if (pct >= 0.7) return 'bg-primary';
        if (pct >= 0.4) return 'bg-yellow-500';
        return 'bg-destructive';
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8 pb-20">
            {/* Overall Score */}
            <Card className="bg-gradient-to-br from-card to-secondary/30">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-display font-bold text-primary">
                        Assessment Results
                    </CardTitle>
                    <p className="text-muted-foreground">{studentName}</p>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="text-7xl font-bold text-foreground"
                    >
                        {percentage}%
                    </motion.div>
                    <p className="text-muted-foreground">
                        {totalScore} out of {totalMax} points
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                        This assessment reflects your current market awareness — not your worth as a professional.
                    </p>
                </CardContent>
            </Card>

            {/* Per-Category Breakdown */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold font-display">Category Breakdown</h3>
                {categoryScores.map(({ category, score, max }, index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-sm">{category}</h4>
                                    <span className={`font-bold text-sm ${getScoreColor(score, max)}`}>
                                        {score}/{max}
                                    </span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-3">
                                    <motion.div
                                        className={`h-3 rounded-full ${getBarColor(score, max)}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(score / max) * 100}%` }}
                                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
