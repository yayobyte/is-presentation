import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Linkedin, Github, Instagram } from 'lucide-react';
import profileImage from '@/assets/IMG_1757.jpg';

export default function ProfileSlide() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left: Profile Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                        <img
                            src={profileImage}
                            alt="Cristian Gutierrez"
                            className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-primary/30 shadow-2xl"
                        />
                    </div>
                </motion.div>

                {/* Right: Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                >
                    <div>
                        <h1 className="text-5xl lg:text-6xl font-display font-bold text-primary mb-2">
                            Cristian Gutierrez
                        </h1>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl lg:text-3xl text-foreground font-bold">
                                aka <span className="text-primary">YAYO</span>
                            </h2>
                            <span className="text-lg text-muted-foreground">@yayobyte</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-lg lg:text-xl font-semibold text-foreground">
                            Engineering Manager
                        </p>
                        <p className="text-lg lg:text-xl font-semibold text-foreground">
                            Scrum Master
                        </p>
                        <p className="text-lg lg:text-xl font-semibold text-foreground">
                            Full-Stack Lead Engineer
                        </p>
                        <p className="text-lg lg:text-xl font-semibold text-primary/80 italic">
                            Life & Career Coach
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <motion.a
                            href="https://www.linkedin.com/in/cristian-gutierrez-yayobyte/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                            <Linkedin className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">LinkedIn</span>
                        </motion.a>

                        <motion.a
                            href="https://github.com/yayobyte"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                            <Github className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">GitHub</span>
                        </motion.a>

                        <motion.a
                            href="https://instagram.com/yayobyte"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                            <Instagram className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">@yayobyte</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Bottom: Quick Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <Card className="bg-gradient-to-br from-card to-secondary/50">
                    <CardContent className="p-6 text-center">
                        <p className="text-3xl font-bold text-primary mb-1">15+</p>
                        <p className="text-sm text-muted-foreground">Years of Experience</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-secondary/50">
                    <CardContent className="p-6 text-center">
                        <p className="text-3xl font-bold text-primary mb-1">11</p>
                        <p className="text-sm text-muted-foreground mb-3">Countries Worked In/For</p>
                        <div className="flex flex-wrap gap-1.5 justify-center text-xs text-muted-foreground">
                            <span className="px-2 py-1 bg-primary/10 rounded">🇦🇪 UAE</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇸🇦 Saudi Arabia</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇪🇸 Spain</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇧🇬 Bulgaria</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇺🇸 USA</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇮🇳 India</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇬🇧 UK</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇨🇴 Colombia</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇰🇪 Kenya</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇮🇱 Israel</span>
                            <span className="px-2 py-1 bg-primary/10 rounded">🇸🇬 Singapore</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-secondary/50">
                    <CardContent className="p-6 text-center">
                        <p className="text-3xl font-bold text-primary mb-1">Tech Stack</p>
                        <p className="text-sm text-muted-foreground mb-3">Core Technologies</p>
                        <div className="flex flex-wrap gap-1.5 justify-center text-xs text-muted-foreground">
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Node.js</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">React & React Native</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">TypeScript</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Supabase & Firebase</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Express.js</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Material UI</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">PHP (Laravel, Yii)</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Chakra-UI</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">SQLite</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">PostgreSQL</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">MySQL</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">MongoDB</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Redis</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Docker</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Git</span>
                            <span className="px-2 py-1 bg-primary/10 rounded font-medium">Jira</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
