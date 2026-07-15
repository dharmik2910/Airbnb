'use client';

import { listing } from '@/data/listing';

interface Props {
  onReserve: () => void;
}

export default function MobileBookingBar({ onReserve }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="flex items-center justify-between">
        <div>
          <p>
            <span className="text-base font-semibold">
              {listing.currency}
              {listing.totalForStay.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-hof"> for {listing.nightsForTotal} nights</span>
          </p>
          <p className="flex items-center gap-1 text-xs">
            <span className="underline">{listing.defaultCheckIn} – {listing.defaultCheckOut}</span>
          </p>
        </div>
        <button
          onClick={onReserve}
          className="rounded-lg bg-rausch px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:brightness-110"
        >
          Reserve
        </button>
      </div>
    </div>
  );
}
