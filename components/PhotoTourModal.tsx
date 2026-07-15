'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { photoRooms, photos } from '@/data/listing';

interface Props {
  onClose: () => void;
  onOpenLightbox: (index: number) => void;
}

export default function PhotoTourModal({ onClose, onOpenLightbox }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Map a room image URL back to its index in the master `photos` array
  // so the lightbox opens on the exact photo that was clicked.
  const indexForUrl = (url: string) => {
    const found = photos.findIndex((p) => p.url === url);
    return found === -1 ? 0 : found;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      ref={scrollerRef}
      className="fixed inset-0 z-50 animate-fadeIn overflow-y-auto bg-white"
    >
      <div className="sticky top-0 z-20 grid grid-cols-3 items-center border-b border-border bg-white px-4 py-3 sm:px-6 sm:py-4">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center justify-self-start rounded-full hover:bg-gray-100"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="justify-self-center text-base font-semibold">Photo tour</p>
        <div className="flex items-center gap-2 justify-self-end">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Share"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M12 5v14M5 12h14" transform="rotate(45 12 12)" />
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.6 10.5l6.8-3.7M8.6 13.5l6.8 3.7" />
            </svg>
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Save"
          >
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M16 28c7-4.73 14-10.44 14-17a7 7 0 00-14-3.5A7 7 0 002 11c0 6.56 7 12.27 14 17z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="min-w-0 flex-1">
          {/* Top category thumbnail grid */}
          <div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {photoRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => scrollToSection(room.id)}
                className="group text-left"
                aria-label={`Jump to ${room.label}`}
              >
                <div className="relative mb-2 aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={room.cover}
                    alt={room.label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="200px"
                  />
                </div>
                <p className="text-sm text-hof">{room.label}</p>
              </button>
            ))}
          </div>

          {/* Full-size sections per room */}
          <div className="space-y-20">
            {photoRooms.map((room) => (
              <div
                key={room.id}
                id={room.id}
                ref={(el) => {
                  sectionRefs.current[room.id] = el;
                }}
                className="grid scroll-mt-24 grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-10"
              >
                <div className="sticky top-24 h-fit">
                  <h2 className="mb-1 text-3xl font-semibold">{room.label}</h2>
                  <p className="text-hof">{room.tags.join(' · ')}</p>
                </div>
                <div className="space-y-4">
                  {room.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => onOpenLightbox(indexForUrl(src))}
                      aria-label={`Open photo: ${room.label}`}
                      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl focus-visible:z-10"
                    >
                      <Image
                        src={src}
                        alt={room.label}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:brightness-90"
                        sizes="(min-width: 1024px) 60vw, 100vw"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}