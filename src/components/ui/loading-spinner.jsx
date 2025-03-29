// src/components/ui/loading-spinner.jsx
import { cn } from '@/lib/utils';

export default function LoadingSpinner({ className = "", fullscreen = false }) {
    return (
        <div className={cn(
            "flex items-center justify-center",
            fullscreen ? "h-screen w-full" : "",
            className
        )}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
    );
}