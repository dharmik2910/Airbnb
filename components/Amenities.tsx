'use client';

import { useState } from 'react';
import { amenities } from '@/data/listing';
import { ICONS } from './AmenityIcons';
import AmenitiesModal from './AmenitiesModal';

export default function Amenities() {
  const [showModal, setShowModal] = useState(false);
  const preview = amenities.slice(0, 6);

  return (
    <div id="amenities" className="border-b border-border py-5 sm:py-6">
      <h2 className="mb-4 text-lg font-semibold sm:text-xl">What this place offers</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {preview.map((a) => (
          <div key={a.label} className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-hof stroke-[1.5]">
              {ICONS[a.icon] ?? <circle cx="12" cy="12" r="9" />}
            </svg>
            <span>{a.label}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="mt-8 rounded-lg border border-hof px-6 py-3 text-sm font-medium hover:bg-gray-100"
      >
        Show all {amenities.length} amenities
      </button>
      {showModal && <AmenitiesModal onClose={() => setShowModal(false)} />}
    </div>
  );
}