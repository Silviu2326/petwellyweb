import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'
  | 'blue'
  | 'secondary'
  | 'neutral';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-lighter text-primary border-primary-light',
  success: 'bg-success-lighter text-success border-success-light',
  warning: 'bg-warning-lighter text-warning border-warning-light',
  danger: 'bg-danger-lighter text-danger border-danger-light',
  info: 'bg-info-lighter text-info border-info-light',
  purple: 'bg-purple-lighter text-purple border-purple-light',
  blue: 'bg-blue-lighter text-blue border-blue-light',
  secondary: 'bg-secondary-lighter text-secondary border-secondary-light',
  neutral: 'bg-background-secondary text-ink-secondary border-line-light',
};

interface BadgeProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function Badge({ variant = 'primary', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
