import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Building2, Wrench } from 'lucide-react';

export default function ColombiaSlide() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-primary mb-1">The Return 🇨🇴</h1>
                <h2 className="text-xl text-muted-foreground">Back to Colombia — Leading from Home</h2>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Amdocs */}
                <motion.div variants={item}>
                    <Card className="h-full bg-gradient-to-br from-card to-secondary/50">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-lg">
                                    <Building2 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-primary font-bold">2023</span>
                                        <h3 className="text-lg font-bold">Amdocs</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Engineering Manager</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">
                                Returned to Colombia after years abroad to continue leading from home.
                                Managing distributed teams across multiple countries and time zones.
                                Working with telecom giants on large-scale digital transformation.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 bg-primary/10 text-xs rounded text-muted-foreground">🇮🇱 Israel</span>
                                <span className="px-2 py-0.5 bg-primary/10 text-xs rounded text-muted-foreground">🇮🇳 India</span>
                                <span className="px-2 py-0.5 bg-primary/10 text-xs rounded text-muted-foreground">🇬🇧 UK</span>
                                <span className="px-2 py-0.5 bg-primary/10 text-xs rounded text-muted-foreground">🇧🇬 Bulgaria</span>
                                <span className="px-2 py-0.5 bg-primary/10 text-xs rounded text-muted-foreground">🇪🇸 Spain</span>
                                <span className="px-2 py-0.5 bg-primary/10 text-xs rounded text-muted-foreground">🇰🇪 Kenya</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Service Fusion */}
                <motion.div variants={item}>
                    <Card className="h-full bg-gradient-to-br from-card to-primary/10 border-primary/30">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-lg">
                                    <Wrench className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-primary font-bold">2024</span>
                                        <h3 className="text-lg font-bold">Service Fusion</h3>
                                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-medium">
                                            Current
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">SM · EM · Lead Engineer</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">
                                Wearing three hats: Scrum Master, Engineering Manager, and Fullstack Lead Engineer.
                                Building field service management software for the US market.
                                15+ years of experience distilled into one multifaceted role.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 bg-primary/10 text-xs rounded text-muted-foreground">🇺🇸 USA</span>
                                <span className="px-2 py-0.5 bg-primary/10 text-xs rounded text-muted-foreground">🇨🇴 Colombia</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
