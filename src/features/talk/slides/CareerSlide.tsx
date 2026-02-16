import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';

export default function CareerSlide() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-5xl font-display font-bold text-primary mb-2">Phase 2: The Ascent</h1>
                <h2 className="text-2xl text-muted-foreground">From OPA to Endava</h2>
            </motion.div>

            <div className="relative border-l-4 border-primary/20 ml-4 md:ml-8 space-y-12 py-4">
                {/* Timeline Item 1 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative pl-8 md:pl-12"
                >
                    <div className="absolute -left-[10px] top-2 w-5 h-5 bg-primary rounded-full" />
                    <h3 className="text-2xl font-bold">2010: OPA</h3>
                    <p className="text-muted-foreground mb-2">The Breakdown & Breakthrough</p>
                    <Card>
                        <CardContent className="p-4">
                            <p>
                                Hired not as an engineer, but as a <strong className="text-foreground">delivery guy</strong>.
                                Then accountant helper.
                                Finally, started creating websites using basic university knowledge.
                                Became an intern/apprentice web developer.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Timeline Item 2 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative pl-8 md:pl-12"
                >
                    <div className="absolute -left-[10px] top-2 w-5 h-5 bg-primary rounded-full" />
                    <h3 className="text-2xl font-bold">Endava</h3>
                    <p className="text-muted-foreground mb-2">English as a Catalyst</p>
                    <Card>
                        <CardContent className="p-4">
                            <p>
                                Moved to Endava driven by expertise in <strong className="text-foreground">English</strong>.
                                During this time, managed to study a technologist in computer sciences.
                                Solidified fullstack skills.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
