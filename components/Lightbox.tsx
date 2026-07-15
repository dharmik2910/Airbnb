'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { photos } from '@/data/listing';

interface Props {
  index: number;
  onClose: () => void;
}

export default function Lightbox({ index, onClose }: Props) {
  const [current, setCurrent] = useState(index);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const goNext = useCallback(() => {
    setDirection('next');
    setCurrent((c) => (c + 1) % photos.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection('prev');
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, goNext, goPrev]);

  const photo = photos[current];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${current + 1} of ${photos.length}`}
      className="fixed inset-0 z-[60] flex animate-fadeIn flex-col bg-black/95"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
          aria-label="Close photo viewer"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <span className="text-sm text-white">
          {current + 1} / {photos.length}
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-2 sm:px-16">
        <button
          onClick={goPrev}
          className="absolute left-1 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-hof shadow-md transition-transform hover:scale-105 disabled:opacity-40 sm:left-4 sm:h-10 sm:w-10"
          aria-label="Previous photo"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <div key={photo.id} className="relative h-[65vh] w-full max-w-4xl animate-fadeIn sm:h-[80vh]">
          <Image src={photo.url} alt={photo.alt} fill className="object-contain" sizes="90vw" priority />
        </div>

        <button
          onClick={goNext}
          className="absolute right-1 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-hof shadow-md transition-transform hover:scale-105 disabled:opacity-40 sm:right-4 sm:h-10 sm:w-10"
          aria-label="Next photo"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 overflow-x-auto px-4 py-3 no-scrollbar sm:px-6 sm:py-4">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setDirection(i > current ? 'next' : 'prev');
              setCurrent(i);
            }}
            className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-opacity ${
              i === current ? 'opacity-100 ring-2 ring-white' : 'opacity-50 hover:opacity-80'
            }`}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === current}
          >
            <Image src={p.url} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
