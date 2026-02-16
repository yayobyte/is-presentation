import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    {
                        'bg-primary text-primary-foreground shadow hover:bg-primary/90': variant === 'primary',
                        'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80': variant === 'secondary',
                        'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground': variant === 'outline',
                        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
                        'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90': variant === 'destructive',
                        'h-9 px-4 py-2 text-sm': size === 'sm',
                        'h-10 px-8 py-2': size === 'md',
                        'h-12 px-10 text-lg': size === 'lg',
                        'h-9 w-9': size === 'icon',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, cn };
