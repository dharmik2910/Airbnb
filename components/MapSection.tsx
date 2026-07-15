import { listing } from '@/data/listing';

export default function MapSection() {
  return (
    <div id="location" className="border-b border-border py-5 sm:py-6">
      <h2 className="mb-1 text-lg font-semibold sm:text-xl">Where you&apos;ll be</h2>
      <p className="mb-4 text-sm text-hof">{listing.location}</p>

      <div className="relative mb-4 h-[280px] w-full overflow-hidden rounded-xl sm:h-[400px]">
        {/* Decorative map background: coastline + terrain blocks + grid */}
        <div className="absolute inset-0 bg-[#dcecd7]">
          <div
            className="absolute inset-0 bg-[#a9cbe8]"
            style={{ clipPath: 'polygon(0 0, 45% 0, 15% 100%, 0 100%)' }}
          />
          <div className="absolute left-[32%] top-[32%] h-24 w-24 rounded-full bg-[#c7e0bf]" />
          <div className="absolute left-[57%] top-[42%] h-32 w-32 rounded-full bg-[#c7e0bf]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '90px 90px',
            }}
          />
        </div>

        {/* Search button */}
        <button
          aria-label="Search this area"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>

        {/* Zoom controls */}
        <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-lg shadow-md">
          <button
            aria-label="Zoom in"
            className="flex h-9 w-9 items-center justify-center bg-white text-lg text-hof hover:bg-gray-50"
          >
            +
          </button>
          <div className="h-px w-full bg-border" />
          <button
            aria-label="Zoom out"
            className="flex h-9 w-9 items-center justify-center bg-white text-lg text-hof hover:bg-gray-50"
          >
            &minus;
          </button>
        </div>

        {/* Approximate location pin */}
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900 shadow-lg">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-2">
            <path d="M4 11l8-7 8 7" />
            <path d="M6 10v9a1 1 0 001 1h3v-5h4v5h3a1 1 0 001-1v-9" />
          </svg>
        </div>
      </div>

      <p className="mb-6 text-sm text-hof">Exact location will be provided after booking.</p>

      <h3 className="mb-2 text-base font-semibold">Neighbourhood highlights</h3>
      <p className="text-sm text-hof">
        Located in the heart of {listing.location.split(',')[0]}, {listing.title ?? listing.host?.name} offers a
        peaceful stay with easy access to beaches, cafés, and popular attractions.
      </p>
      <button className="mt-2 flex items-center gap-1 text-sm font-medium font-semibold underline font-semibold">
        Show more
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}