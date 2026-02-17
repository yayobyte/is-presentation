import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Landmark, ShoppingCart, Building2, Rocket } from 'lucide-react';

const DUBAI_CAREER = [
    {
        year: '2016',
        company: 'PEGB',
        role: 'Senior Developer',
        desc: 'The bridge to Dubai. Pivoted into fintech and international projects that opened the door to the Middle East.',
        icon: Rocket,
        flag: '🇨🇴',
    },
    {
        year: '2017',
        company: 'Mashreq Bank',
        role: 'Senior Developer',
        desc: 'Banking learning path. Managed operations and projects for UAE and Singapore markets. Learned enterprise-scale financial systems, compliance, and security-first development.',
        icon: Landmark,
        flag: '🇦🇪 🇸🇬',
    },
    {
        year: '2019',
        company: 'Tradeling.com',
        role: 'Lead Engineer',
        desc: 'Stable work in Dubai with a government-backed B2B ecommerce company. Grew into a leadership position.',
        icon: ShoppingCart,
        flag: '🇦🇪',
    },
    {
        year: '2021',
        company: 'Banque Saudi Fransi',
        role: 'Lead → Engineering Manager',
        desc: 'The rise of my career. Escalated from Team Lead to Engineering Manager in one of Saudi Arabia\'s largest banks.',
        icon: Building2,
        flag: '🇸🇦',
    },
];

export default function DubaiSlide() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 },
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-primary mb-1">The Dubai Chapter</h1>
                <h2 className="text-xl text-muted-foreground">From Colombia to the Middle East 🇦🇪 🇸🇦</h2>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative border-l-2 border-primary/20 ml-4 space-y-4"
            >
                {DUBAI_CAREER.map((entry) => {
                    const Icon = entry.icon;
                    return (
                        <motion.div key={entry.company} variants={item} className="relative pl-8">
                            <div className="absolute -left-[7px] top-4 w-3 h-3 rounded-full bg-primary/60" />
                            <Card className="bg-gradient-to-br from-card to-secondary/30">
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-primary/10 rounded-lg shrink-0 mt-1">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm font-mono text-primary font-bold">{entry.year}</span>
                                                <span className="text-lg">{entry.flag}</span>
                                                <h3 className="text-base font-bold">{entry.company}</h3>
                                            </div>
                                            <p className="text-sm font-medium text-foreground/80 mt-0.5">{entry.role}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{entry.desc}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
