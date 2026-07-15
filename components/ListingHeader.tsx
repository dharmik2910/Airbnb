'use client';

import { useState } from 'react';
import { listing } from '@/data/listing';

export default function ListingHeader() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6">
      <h1 className="text-xl font-semibold leading-tight sm:text-2xl md:text-[26px]">
        {listing.title}
      </h1>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-gray-100 sm:px-3">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
            <path d="M12 5v14M5 12h14" />
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 10.5l6.8-3.7M8.6 13.5l6.8 3.7" />
          </svg>
          <span className="hidden underline sm:inline">Share</span>
        </button>
        <button
          onClick={() => setSaved((s) => !s)}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-gray-100 sm:px-3"
          aria-pressed={saved}
        >
          <svg
            viewBox="0 0 32 32"
            className={`h-4 w-4 stroke-current stroke-2 transition-colors ${saved ? 'fill-rausch text-rausch' : 'fill-none text-hof'}`}
          >
            <path d="M16 28c7-4.73 14-10.44 14-17a7 7 0 00-14-3.5A7 7 0 002 11c0 6.56 7 12.27 14 17z" />
          </svg>
          <span className="hidden underline sm:inline">{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}
