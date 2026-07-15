'use client';

import { useEffect, useRef, useState } from 'react';
import { listing } from '@/data/listing';
import Calendar from './Calendar';

function formatDate(d: Date | null, fallback: string) {
  if (!d) return fallback;
  return d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
}

export default function ReserveCardContent() {
  const [guests, setGuests] = useState(2);
  const [guestMenuOpen, setGuestMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    if (calendarOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [calendarOpen]);

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
      : listing.nightsForTotal;
  const subtotal = checkIn && checkOut ? listing.pricePerNight * nights : listing.totalForStay;
  const serviceFee = Math.round(subtotal * 0.07);
  const fmt = (n: number) => `${listing.currency}${n.toLocaleString('en-IN')}`;

  return (
    <>
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-lg font-semibold">{fmt(subtotal)}</span>
        <span className="text-hof">for {nights} nights</span>
      </div>

      <div ref={calendarRef} className="relative mb-4 overflow-visible rounded-lg border border-border">
        <div className="grid grid-cols-2 divide-x divide-border">
          <button
            onClick={() => setCalendarOpen((o) => !o)}
            className="p-3 text-left"
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
          >
            <p className="text-[10px] font-semibold uppercase">Check-in</p>
            <p className="text-sm">{formatDate(checkIn, listing.defaultCheckIn)}</p>
          </button>
          <button
            onClick={() => setCalendarOpen((o) => !o)}
            className="p-3 text-left"
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
          >
            <p className="text-[10px] font-semibold uppercase">Checkout</p>
            <p className="text-sm">{formatDate(checkOut, listing.defaultCheckOut)}</p>
          </button>
        </div>
        <div className="relative border-t border-border">
          <button
            onClick={() => setGuestMenuOpen((o) => !o)}
            className="flex w-full items-center justify-between p-3 text-left"
            aria-haspopup="listbox"
            aria-expanded={guestMenuOpen}
          >
            <span>
              <span className="block text-[10px] font-semibold uppercase">Guests</span>
              <span className="text-sm">{guests} guest{guests > 1 ? 's' : ''}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {guestMenuOpen && (
            <div className="absolute z-10 mt-1 w-full animate-scaleIn rounded-xl border border-border bg-white p-4 shadow-panel">
              <div className="flex items-center justify-between">
                <span className="text-sm">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border disabled:opacity-30"
                    disabled={guests <= 1}
                    aria-label="Decrease guests"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm">{guests}</span>
                  <button
                    onClick={() => setGuests((g) => Math.min(listing.guests, g + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border disabled:opacity-30"
                    disabled={guests >= listing.guests}
                    aria-label="Increase guests"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {calendarOpen && (
          <div
            role="dialog"
            aria-modal="false"
            aria-label="Select check-in and check-out dates"
            className="absolute left-1/2 top-full z-20 mt-2 w-[320px] -translate-x-1/2 animate-scaleIn rounded-xl border border-border bg-white p-4 shadow-panel sm:w-[560px]"
          >
            <Calendar
              checkIn={checkIn}
              checkOut={checkOut}
              onSelect={(inD, outD) => {
                setCheckIn(inD);
                setCheckOut(outD);
                if (inD && outD) setCalendarOpen(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="mb-4 rounded-lg border border-border px-4 py-3 text-center text-sm">
        Free cancellation before <span className="font-medium">{listing.freeCancellationDate}</span>
      </div>

      <button className="mb-4 w-full rounded-lg bg-rausch py-3.5 text-center font-semibold text-white transition-transform hover:scale-[1.01] hover:brightness-110">
        Reserve
      </button>
      <p className="mb-4 text-center text-sm text-foggy">You won&apos;t be charged yet</p>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="hover-underline">{fmt(listing.pricePerNight)} x {nights} nights</span>
          <span>{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="hover-underline">Service fee</span>
          <span>{fmt(serviceFee)}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold">
        <span>Total before taxes</span>
        <span>{fmt(subtotal + serviceFee)}</span>
      </div>
    </>
  );
}
