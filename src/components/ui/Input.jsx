import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ label, error, className, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm text-gray-400 font-medium ml-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={cn(
                    'bg-surface border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200',
                    error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
                    className
                )}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-400 ml-1">{error}</span>
            )}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
