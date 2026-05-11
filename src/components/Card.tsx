import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  as?: 'div' | 'article' | 'section';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6 sm:p-7',
  lg: 'p-7 sm:p-9',
};

export function Card({
  padding = 'md',
  className,
  children,
  as: Tag = 'div',
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        'bg-surface border border-line-light rounded-2xl shadow-card',
        paddingClasses[padding],
        className,
      )}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </Tag>
  );
}
