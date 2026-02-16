import { type ReactNode } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Clock } from '@/components/ui/Clock';

interface MainLayoutProps {
    children: ReactNode;
    showClock?: boolean;
}

export function MainLayout({ children, showClock = true }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/50 backdrop-blur-sm border-b border-border/40">
                <div className="font-display font-bold text-xl text-primary">
                    IS3 Talk
                </div>
                <div className="flex items-center gap-4">
                    {showClock && <Clock />}
                    <ThemeToggle />
                </div>
            </header>
            <main className="pt-20 px-4 min-h-screen">
                {children}
            </main>
        </div>
    );
}
