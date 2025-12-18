import { ImgHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = 'md', fallback, alt, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    };

    return (
      <img
        ref={ref}
        className={cn(
          'rounded-full object-cover',
          sizes[size],
          className
        )}
        alt={alt || 'User avatar'}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
