import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: 'narrow' | 'default' | 'wide';
  spacing?: 'sm' | 'md' | 'lg';
  background?: 'default' | 'secondary' | 'mesh' | 'primary';
  id?: string;
  as?: 'section' | 'article' | 'div';
}

const spacingClasses = {
  sm: 'py-12',
  md: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-28 lg:py-32',
};

const backgroundClasses = {
  default: 'bg-background',
  secondary: 'bg-background-secondary',
  mesh: 'bg-background bg-mesh-primary',
  primary: 'bg-primary text-white',
};

export function Section({
  children,
  className,
  containerClassName,
  size = 'default',
  spacing = 'md',
  background = 'default',
  id,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag id={id} className={cn(backgroundClasses[background], spacingClasses[spacing], className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
}
