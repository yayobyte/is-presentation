import { type ReactNode } from 'react';
import { cn } from './Button';

interface TabsProps {
    tabs: { id: string; label: string; icon?: ReactNode }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
    return (
        <div className={cn("flex space-x-1 bg-muted/50 p-1 rounded-lg border border-border/50", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                        activeTab === tab.id
                            ? "bg-background text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
