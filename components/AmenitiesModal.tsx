'use client';

import { amenityCategories } from '@/data/listing';
import { ICONS } from './AmenityIcons';

export default function AmenitiesModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full flex-col bg-white sm:h-[85vh] sm:max-w-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border p-4">
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {amenityCategories.map((cat, i) => (
            <div key={cat.category} className={i > 0 ? 'mt-8 border-t border-border pt-8' : ''}>
              <h3 className="mb-5 text-lg font-medium">{cat.category}</h3>
              <div className="space-y-5">
                {cat.items.map((a) => (
                  <div key={a.label} className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 flex-shrink-0 fill-none stroke-hof stroke-[1.5]">
                      {ICONS[a.icon] ?? <circle cx="12" cy="12" r="9" />}
                    </svg>
                    <span>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}