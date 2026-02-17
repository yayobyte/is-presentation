import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Briefcase, Globe, GraduationCap } from 'lucide-react';

export default function CurrentSlide() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-5xl font-display font-bold text-primary mb-2">The Summit</h1>
                <h2 className="text-2xl text-muted-foreground">International Engineer & Leader</h2>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                {/* 1. Dubai & Saudi */}
                <motion.div variants={item}>
                    <Card className="h-full bg-gradient-to-br from-card to-secondary/50">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                            <div className="p-3 bg-primary/20 rounded-full">
                                <Globe className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Dubai & Saudi Arabia</h3>
                            <p className="text-muted-foreground">
                                Banque Saudi Fransi.
                                Escalated from Developer → Team Lead → Engineering Manager.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="h-full bg-gradient-to-br from-card to-secondary/50">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                            <div className="p-3 bg-primary/20 rounded-full">
                                <Briefcase className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Role Today</h3>
                            <p className="text-muted-foreground">
                                Service Fusion.
                                Scrum Master, Engineering Manager, and Fullstack Lead Engineer.
                                15+ years of experience.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="h-full bg-gradient-to-br from-card to-secondary/50">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                            <div className="p-3 bg-primary/20 rounded-full">
                                <GraduationCap className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">The Next Step</h3>
                            <p className="text-muted-foreground">
                                Back in Colombia.
                                Plan to finish university and continue professional studies.
                                Life Coach.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
