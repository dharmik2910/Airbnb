import Image from 'next/image';
import { listing, hostStats } from '@/data/listing';

const HIGHLIGHT_ICONS: Record<string, JSX.Element> = {
  hottub: (
    <path d="M3 17c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0M6 13V6l6-3 6 3v7" />
  ),
  fan: (
    <path d="M12 3s4 4 4 8a4 4 0 11-8 0c0-1 .5-2 1-2 0 1.5 1 2 1 2-.5-3 2-4 2-8z" />
  ),
  door: (
    <path d="M5 21V4a1 1 0 011-1h9v18M5 21h14M9 12h.01" />
  ),
};

export default function HostAndDescription() {
  return (
    <div className="border-b border-border py-5 sm:py-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        {listing.propertyType} in {listing.location}
      </h2>
      <p className="mt-1 text-sm text-hof sm:text-base">
        {listing.guests} guests · {listing.bedrooms} bedroom · {listing.beds} bed · {listing.baths} bathroom
      </p>

      <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {listing.isGuestFavourite && (
            <>
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-hof">
                <path d="M12 2c-1 2-4 5-4 8a4 4 0 108 0c0-3-3-6-4-8z" />
              </svg>
              <div>
                <p className="font-semibold">Guest favourite</p>
                <p className="text-sm text-foggy">One of the most loved homes on Airbnb, according to guests</p>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <div className="text-center">
            <p className="flex items-center gap-1 text-lg font-semibold">
              {listing.rating}
              <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-current">
                <path d="M15.094 1.579a1 1 0 011.812 0l4.406 9.062 10.014 1.454a1 1 0 01.554 1.706l-7.243 7.061 1.71 9.972a1 1 0 01-1.45 1.054L16 27.31l-8.897 4.578a1 1 0 01-1.45-1.054l1.71-9.972-7.243-7.06a1 1 0 01.554-1.707l10.014-1.454z" />
              </svg>
            </p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-lg font-semibold">{listing.reviewCount}</p>
            <p className="text-xs text-foggy">Reviews</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-emerald-800 sm:h-14 sm:w-14">
          <Image
            src={listing.host.avatar}
            alt={`${listing.host.name}, host`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium">Hosted by {listing.host.name}</p>
          <p className="text-sm text-foggy">{hostStats.yearsHosting} years hosting</p>
        </div>
      </div>

      <ul className="mt-6 space-y-5">
        {listing.highlights.map((h) => (
          <li key={h.title} className="flex gap-4">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 fill-none stroke-hof stroke-[1.5]">
              {HIGHLIGHT_ICONS[h.icon]}
            </svg>
            <div>
              <p className="font-medium">{h.title}</p>
              <p className="text-sm text-foggy">{h.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-4 text-sm">
        <span>Some info has been automatically translated.</span>
        <button className="shrink-0 font-medium underline">Show original</button>
      </div>

      <p className="mt-6 max-w-3xl leading-relaxed text-hof">{listing.description}</p>
      <button className="mt-2 flex items-center gap-1 text-sm font-medium underline font-semibold">
        Show more
        <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current stroke-[3]">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
