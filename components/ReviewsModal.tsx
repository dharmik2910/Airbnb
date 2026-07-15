'use client';

import Image from 'next/image';
import { reviews, listing } from '@/data/listing';

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={`h-3 w-3 ${filled ? 'fill-current' : 'fill-gray-300'}`}>
      <path d="M15.094 1.579a1 1 0 011.812 0l4.406 9.062 10.014 1.454a1 1 0 01.554 1.706l-7.243 7.061 1.71 9.972a1 1 0 01-1.45 1.054L16 27.31l-8.897 4.578a1 1 0 01-1.45-1.054l1.71-9.972-7.243-7.06a1 1 0 01.554-1.707l10.014-1.454z" />
    </svg>
  );
}

export default function ReviewsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full flex-col bg-white sm:h-[85vh] sm:max-w-3xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <p className="flex items-center gap-1.5 pr-2 text-sm font-medium">
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current">
              <path d="M15.094 1.579a1 1 0 011.812 0l4.406 9.062 10.014 1.454a1 1 0 01.554 1.706l-7.243 7.061 1.71 9.972a1 1 0 01-1.45 1.054L16 27.31l-8.897 4.578a1 1 0 01-1.45-1.054l1.71-9.972-7.243-7.06a1 1 0 01.554-1.707l10.014-1.454z" />
            </svg>
            {listing.rating} · {listing.reviewCount} reviews
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {reviews.map((r) => (
              <div key={r.id}>
                <div className="mb-2 flex items-center gap-3">
                  {r.avatar ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-sm font-semibold text-orange-900">
                      {r.name[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-foggy">{r.date}</p>
                  </div>
                </div>
                <div className="mb-1 flex items-center gap-1.5 text-xs text-hof">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} filled={i < r.rating} />
                    ))}
                  </div>
                  <span>·</span>
                  <span>{r.postedAgo}</span>
                </div>
                <p className="text-sm leading-relaxed text-hof">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}