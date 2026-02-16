import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';

export default function IntroSlide() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-5xl font-display font-bold text-primary mb-2">Phase 1: The Struggle</h1>
                <h2 className="text-2xl text-muted-foreground">Medellín & The Violent Decade</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                >
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-destructive">The Context</h3>
                            <p className="text-muted-foreground">
                                Born in Medellín during the Pablo Escobar era. My father was a police officer, making our family a target.
                                We had to have an escape plan. Access to education was non-existent.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-accent-foreground">The Hustle (Child Labor)</h3>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                <li>Coffee collector on a farm</li>
                                <li>Washing buses</li>
                                <li>Wood maker & Metal worker</li>
                                <li>Delivery & Bicycle carrier</li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card className="h-full bg-secondary/20">
                        <CardContent className="p-6 flex flex-col justify-center h-full">
                            <blockquote className="text-2xl italic border-l-4 border-primary pl-4 mb-4">
                                "I did not have any access to proper education. So I had to find myself a way out."
                            </blockquote>
                            <p className="text-lg">
                                High school in the morning, work in the afternoon.
                                University at 18 (paid by working as taxi driver, support, sales).
                                Dropped out at semester 6 due to financial issues, but continued as a self-taught web developer.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
