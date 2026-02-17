import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Clock } from '@/components/ui/Clock';

interface MainLayoutProps {
    children: ReactNode;
    showClock?: boolean;
}

export function MainLayout({ children, showClock = true }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
            <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-border/40">
                <Link to="/" className="font-display font-bold text-xl text-primary hover:text-primary/80 transition-colors tracking-wider">
                    Cristian (Yayo) - Market Talk
                </Link>
                <div className="flex items-center gap-4">
                    {showClock && <Clock />}
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-1 px-4 py-12">
                {children}
            </main>
        </div>
    );
}
