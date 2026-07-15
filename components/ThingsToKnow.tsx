'use client';

import { useEffect, useRef, useState } from 'react';
import { houseRules, safetyAndProperty, cancellationPolicy } from '@/data/listing';

type PanelKey = 'rules' | 'safety' | 'cancellation' | null;

const PANEL_CONTENT: Record<Exclude<PanelKey, null>, { title: string; items: string[] }> = {
  rules: { title: 'House rules', items: houseRules },
  safety: { title: 'Safety & property', items: safetyAndProperty },
  cancellation: { title: 'Cancellation policy', items: [cancellationPolicy.summary] },
};

export default function ThingsToKnow() {
  const [openPanel, setOpenPanel] = useState<PanelKey>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!openPanel) return;
    closeBtnRef.current?.focus();
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPanel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openPanel]);

  return (
    <div className="border-b border-border py-5 sm:py-6">
      <h2 className="mb-4 text-lg font-semibold sm:text-xl font-bold">Things to know</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <svg viewBox="0 0 24 24" className="mb-3 h-6 w-6 fill-none stroke-hof stroke-[1.5]">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <h3 className="mb-3 text-md font-bold">House rules</h3>
          <ul className="space-y-1.5 text-sm text-hof ">
            {houseRules.slice(0, 3).map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <button
            onClick={() => setOpenPanel('rules')}
            className="mt-3 text-sm font-semibold underline"
          >
            Show more
          </button>
        </div>
        <div>
          <svg viewBox="0 0 24 24" className="mb-3 h-6 w-6 fill-none stroke-hof stroke-[1.5]">
            <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
          </svg>
          <h3 className="mb-3 text-md font-bold">Safety & property</h3>
          <ul className="space-y-1.5 text-sm text-hof">
            {safetyAndProperty.slice(0, 3).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <button
            onClick={() => setOpenPanel('safety')}
            className="mt-3 text-sm font-semibold underline"
          >
            Show more
          </button>
        </div>
        <div>
          <svg viewBox="0 0 24 24" className="mb-3 h-6 w-6 fill-none stroke-hof stroke-[1.5]">
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M3 9h18M8 2v4M16 2v4M9 15l6 6M15 15l-6 6" />
          </svg>
          <h3 className="mb-3 text-md font-bold">Cancellation policy</h3>
          <p className="text-sm text-hof">{cancellationPolicy.summary}</p>
          <button
            onClick={() => setOpenPanel('cancellation')}
            className="mt-3 text-sm font-semibold underline"
          >
            Show more
          </button>
        </div>
      </div>

      {openPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            className="absolute inset-0 h-full w-full animate-fadeIn bg-black/50"
            aria-label="Close"
            onClick={() => setOpenPanel(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={PANEL_CONTENT[openPanel].title}
            className="relative max-h-[80vh] w-full max-w-md animate-scaleIn overflow-y-auto rounded-xl bg-white p-6 shadow-panel"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{PANEL_CONTENT[openPanel].title}</h3>
              <button
                ref={closeBtnRef}
                onClick={() => setOpenPanel(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2 text-sm text-hof">
              {PANEL_CONTENT[openPanel].items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}