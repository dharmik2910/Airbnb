import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { nearbyListings } from '@/data/listing';

export default function ExploreMore() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const cardWidth = card ? card.getBoundingClientRect().width + 20 : el.clientWidth / 4;
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 sm:py-10 lg:px-0">
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h2 className="text-lg font-semibold sm:text-xl font-bold">More stays nearby</h2>
        <div className="hidden items-center gap-3 sm:flex">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canScrollNext}
            aria-label="Next"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="-mx-4 flex snap-x scroll-pl-4 gap-5 overflow-x-auto px-4 no-scrollbar scroll-smooth sm:mx-0 sm:px-0"
      >
        {nearbyListings.map((item) => (
          <a
            key={item.id}
            href="#"
            data-card
            className="group w-64 shrink-0 snap-start lg:w-[calc((100%-4*20px)/5)]"
            aria-label={`${item.title}, ${item.location}, ₹${item.price} per night`}
          >
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 20vw, 60vw"
              />
            </div>
            <p className="text-sm font-medium leading-snug line-clamp-2">{item.title}</p>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm">
              <span className="font-medium">₹{item.price.toLocaleString('en-IN')}</span>
              <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-current">
                <path d="M15.094 1.579a1 1 0 011.812 0l4.406 9.062 10.014 1.454a1 1 0 01.554 1.706l-7.243 7.061 1.71 9.972a1 1 0 01-1.45 1.054L16 27.31l-8.897 4.578a1 1 0 01-1.45-1.054l1.71-9.972-7.243-7.06a1 1 0 01.554-1.707l10.014-1.454z" />
              </svg>
              <span>{item.rating}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}