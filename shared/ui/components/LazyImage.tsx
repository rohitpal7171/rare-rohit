import { useState } from 'react'

import { cn } from '../../utils/cn'

export interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholderClassName?: string
  width?: number
  height?: number
}

export const LazyImage = ({
  src,
  alt,
  className,
  placeholderClassName,
  width,
  height,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!isLoaded && !hasError && (
        <div
          className={cn(
            'absolute inset-0 animate-pulse bg-gradient-to-r from-ivory via-gold/20 to-ivory',
            placeholderClassName
          )}
        />
      )}
      {hasError ? (
        <div className="flex h-full items-center justify-center bg-ivory/50 text-gold/60">
          <span className="text-sm">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  )
}
