'use client';

import { useState } from 'react';
import Image from 'next/image';
import { listing, reviews, guestFavourite } from '@/data/listing';
import ReviewsModal from './ReviewsModal';

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  sparkle: <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></>,
  bubble: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
  map: <path d="M9 20l-5.45 2.16A1 1 0 012 21.24V4.83a1 1 0 01.6-.92L9 1l6 3 5.45-2.18A1 1 0 0122 2.74v16.42a1 1 0 01-.6.92L15 23l-6-3zM9 1v19M15 4v19" />,
  tag: <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3H4a1 1 0 00-1 1v5.59a2 2 0 00.59 1.41l9.58 9.59a2 2 0 002.83 0l4.59-4.59a2 2 0 000-2.99zM7.5 9A1.5 1.5 0 116 7.5 1.5 1.5 0 017.5 9z" />,
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={`h-3 w-3 ${filled ? 'fill-current' : 'fill-gray-300'}`}>
      <path d="M15.094 1.579a1 1 0 011.812 0l4.406 9.062 10.014 1.454a1 1 0 01.554 1.706l-7.243 7.061 1.71 9.972a1 1 0 01-1.45 1.054L16 27.31l-8.897 4.578a1 1 0 01-1.45-1.054l1.71-9.972-7.243-7.06a1 1 0 01.554-1.707l10.014-1.454z" />
    </svg>
  );
}

function LaurelIcon({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 60 96"
      className={`h-14 w-9 sm:h-16 sm:w-10 ${side === 'right' ? 'scale-x-[-1]' : ''}`}
    >
      <path
        d="M44 2C26 10 16 28 16 50c0 20 9 36 22 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-hof"
      />
      {[
        { cy: 16, r: 8, rot: -20 },
        { cy: 30, r: 8.5, rot: -8 },
        { cy: 44, r: 9, rot: 4 },
        { cy: 58, r: 9, rot: 14 },
        { cy: 72, r: 8.5, rot: 24 },
        { cy: 86, r: 7.5, rot: 32 },
      ].map((leaf, i) => (
        <ellipse
          key={i}
          cx={16}
          cy={leaf.cy}
          rx={leaf.r}
          ry={leaf.r / 2.4}
          className="fill-hof"
          transform={`rotate(${leaf.rot} 16 ${leaf.cy})`}
        />
      ))}
    </svg>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 160;

  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        {review.avatar ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={review.avatar} alt={review.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-sm font-semibold text-orange-900">
            {review.name[0]}
          </div>
        )}
        <div>
          <p className="text-sm font-medium">{review.name}</p>
          <p className="text-xs text-foggy">{review.date}</p>
        </div>
      </div>

      <div className="mb-1 flex items-center gap-1.5 text-xs text-hof">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < review.rating} />
          ))}
        </div>
        <span>·</span>
        <span>{review.postedAgo}</span>
      </div>

      <p className={`text-sm leading-relaxed text-hof ${!expanded && isLong ? 'line-clamp-3' : ''}`}>
        {review.text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-1 text-sm font-semibold underline"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

export default function Reviews() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="reviews" className="border-b border-border py-5 sm:py-6">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold sm:mb-6 sm:text-xl">
        <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current">
          <path d="M15.094 1.579a1 1 0 011.812 0l4.406 9.062 10.014 1.454a1 1 0 01.554 1.706l-7.243 7.061 1.71 9.972a1 1 0 01-1.45 1.054L16 27.31l-8.897 4.578a1 1 0 01-1.45-1.054l1.71-9.972-7.243-7.06a1 1 0 01.554-1.707l10.014-1.454z" />
        </svg>
        {listing.rating} · {listing.reviewCount} reviews
      </h2>

      {listing.isGuestFavourite && (
        <div className="mb-10 flex flex-col items-center rounded-2xl bg-gray-50 px-6 py-10 text-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <LaurelIcon side="left" />
            <span className="text-6xl font-semibold tracking-tight">{listing.rating}</span>
            <LaurelIcon side="right" />
          </div>
          <p className="mt-4 text-2xl font-semibold">Guest favourite</p>
          <p className="mt-2 max-w-sm text-sm text-hof">
            This home is a guest favourite based on ratings, reviews and reliability
          </p>
          <button className="mt-3 text-sm font-medium underline">How reviews work</button>
        </div>
      )}

      <div className="-mx-4 mb-10 flex gap-0 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="w-40 shrink-0 border-r border-border pr-6 sm:w-auto sm:flex-1">
          <h3 className="mb-3 text-base font-semibold">Overall rating</h3>
          <div className="space-y-1">
            {guestFavourite.overallDistribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-2">
                <span className="w-2 text-xs text-foggy">{row.stars}</span>
                <div className="h-[3px] flex-1 rounded bg-gray-200">
                  <div className="h-full rounded bg-hof" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {guestFavourite.categories.map((c, i) => (
          <div
            key={c.label}
            className={`w-28 shrink-0 px-6 sm:w-auto sm:flex-1 ${
              i < guestFavourite.categories.length - 1 ? 'border-r border-border' : ''
            }`}
          >
            <p className="text-base font-semibold">{c.label}</p>
            <p className="mt-1 text-lg font-bold">{c.score.toFixed(1)}</p>
            <div className="mt-5 flex">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-hof stroke-[2.5]">
                {CATEGORY_ICONS[c.icon]}
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="-mx-4 mb-8 flex gap-3 overflow-x-auto px-4 no-scrollbar">
        {guestFavourite.tags.map((t) => (
          <span
            key={t.label}
            className="flex shrink-0 items-center gap-2 rounded-full border border-border py-1.5 pl-1.5 pr-4 text-sm font-medium"
          >
            <span className={`flex h-8 w-10 items-center justify-center rounded-full text-base ${t.color}`}>
              {t.emoji}
            </span>
            {t.label}
            <span className="text-foggy">{t.count}</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:gap-y-8 md:grid-cols-2">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      <button
        className="mt-8 rounded-lg border border-hof px-6 py-3 text-sm font-medium hover:bg-gray-100"
      >
        Show all {listing.reviewCount} reviews
      </button>

      {showModal && <ReviewsModal onClose={() => setShowModal(false)} />}
    </div>
  );
}