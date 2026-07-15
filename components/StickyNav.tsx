'use client';

import { useEffect, useState } from 'react';
import { listing } from '@/data/listing';

const TABS = [
  { label: 'Photos', href: '#photos' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Location', href: '#location' },
];

export default function StickyNav({ onReserve }: { onReserve: () => void }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('Photos');

  useEffect(() => {
    const getThreshold = () => {
      // Reveal once the photo gallery has been scrolled past — stay visible
      // the whole time we're below that point, regardless of scroll
      // direction. Falls back to a fixed offset if the section isn't in the
      // DOM yet.
      const photos = document.getElementById('photos');
      if (!photos) return 480;
      return photos.getBoundingClientRect().bottom + window.scrollY;
    };

    const handleScroll = () => {
      const current = window.scrollY;
      const threshold = getThreshold();
      setVisible(current > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = TABS.map((t) => t.href.replace('#', ''));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const labelById = new Map<string, string>(
      TABS.map((t) => [t.href.replace('#', ''), t.label])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (!visibleEntries.length) return;

        visibleEntries.sort(
          (a, b) =>
            Math.abs((a.boundingClientRect.top ?? 0) - 120) -
            Math.abs((b.boundingClientRect.top ?? 0) - 120)
        );
        const id = (visibleEntries[0].target as HTMLElement).id;
        const next = labelById.get(id);
        if (next) setActive(next);
      },
      {
        root: null,
        rootMargin: '-120px 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`sticky top-0 z-30 hidden w-full border-b border-border bg-white transition-transform duration-200 md:block ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-4 lg:px-0">
        <nav className="flex items-center gap-8">
          {TABS.map((t) => (
            <a
              key={t.label}
              href={t.href}
              onClick={() => setActive(t.label)}
              className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
                active === t.label
                  ? 'border-hof text-hof'
                  : 'border-transparent text-hof/80 hover:text-hof'
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <p>
              <span className="font-semibold">
                {listing.currency}
                {listing.totalForStay.toLocaleString('en-IN')}
              </span>{' '}
              <span className="text-foggy">for {listing.nightsForTotal} nights</span>
            </p>
            <p className="flex items-center justify-end gap-1 text-foggy">
              <svg viewBox="0 0 32 32" className="h-3 w-3 fill-current">
                <path d="M15.094 1.579a1 1 0 011.812 0l4.406 9.062 10.014 1.454a1 1 0 01.554 1.706l-7.243 7.061 1.71 9.972a1 1 0 01-1.45 1.054L16 27.31l-8.897 4.578a1 1 0 01-1.45-1.054l1.71-9.972-7.243-7.06a1 1 0 01.554-1.707l10.014-1.454z" />
              </svg>
              {listing.rating} · {listing.reviewCount} reviews
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
    </div>
  );
}