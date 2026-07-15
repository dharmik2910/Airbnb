'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { photos } from '@/data/listing';
import PhotoSkeleton from './PhotoSkeleton';

interface Props {
  onOpenTour: () => void;
  onOpenLightbox: (index: number) => void;
}

export default function Gallery({ onOpenTour, onOpenLightbox }: Props) {
  const grid = photos.slice(0, 5);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const markLoaded = (id: string) =>
    setLoaded((prev) => (prev[id] ? prev : { ...prev, [id]: true }));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      setMobileIndex((i) =>
        delta < 0 ? Math.min(i + 1, photos.length - 1) : Math.max(i - 1, 0)
      );
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative mb-6 md:mb-8">
      {/* Mobile / tablet: single swipeable hero photo with counter overlay */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-none sm:rounded-xl md:hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {!loaded[photos[mobileIndex].id] && <PhotoSkeleton />}

        <button
          onClick={() => onOpenLightbox(mobileIndex)}
          className="absolute inset-0 h-full w-full focus-visible:z-10"
          aria-label={`Open photo ${mobileIndex + 1} of ${photos.length}`}
        >
          <Image
            src={photos[mobileIndex].url}
            alt={photos[mobileIndex].alt}
            fill
            priority={mobileIndex === 0}
            onLoad={() => markLoaded(photos[mobileIndex].id)}
            className={`object-cover transition-opacity duration-300 ${
              loaded[photos[mobileIndex].id] ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="100vw"
          />
        </button>

        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
          {mobileIndex + 1} / {photos.length}
        </span>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === mobileIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onOpenTour}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
          aria-label="Open photo tour"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
            <path d="M0 2a1 1 0 011-1h3v2H2v2H0V2zm16 0v3h-2V3h-2V1h3a1 1 0 011 1zM0 14v-3h2v2h2v2H1a1 1 0 01-1-1zm16 0a1 1 0 01-1 1h-3v-2h2v-2h2v3z" />
          </svg>
        </button>
      </div>

      {/* Desktop: 5-photo grid */}
      <div className="relative hidden grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl md:grid">
        <button
          onClick={onOpenTour}
          className="group relative col-span-2 row-span-2 aspect-square focus-visible:z-10"
          aria-label="Open photo tour, hero image"
        >
          {!loaded[grid[0].id] && <PhotoSkeleton />}
          <Image
            src={grid[0].url}
            alt={grid[0].alt}
            fill
            priority
            onLoad={() => markLoaded(grid[0].id)}
            className={`object-cover transition-opacity duration-300 group-hover:brightness-90 ${
              loaded[grid[0].id] ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </button>

        {grid.slice(1).map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => onOpenLightbox(i + 1)}
            className={`group relative aspect-square focus-visible:z-10 ${i === 1 ? 'rounded-tr-xl' : ''} ${i === 3 ? 'rounded-br-xl' : ''}`}
            aria-label={`Open photo: ${photo.alt}`}
          >
            {!loaded[photo.id] && (
              <PhotoSkeleton className={`${i === 1 ? 'rounded-tr-xl' : ''} ${i === 3 ? 'rounded-br-xl' : ''}`} />
            )}
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              onLoad={() => markLoaded(photo.id)}
              className={`object-cover transition-opacity duration-300 group-hover:brightness-90 ${
                loaded[photo.id] ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="25vw"
            />
          </button>
        ))}

        <button
          onClick={onOpenTour}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-hof bg-white px-4 py-2 text-sm font-medium shadow-sm transition-transform hover:scale-[1.02]"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
            <path d="M0 2a1 1 0 011-1h3v2H2v2H0V2zm16 0v3h-2V3h-2V1h3a1 1 0 011 1zM0 14v-3h2v2h2v2H1a1 1 0 01-1-1zm16 0a1 1 0 01-1 1h-3v-2h2v-2h2v3z" />
          </svg>
          Show all photos
        </button>
      </div>
    </div>
  );
}