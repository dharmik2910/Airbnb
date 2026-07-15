'use client';

import { useEffect, useRef } from 'react';
import ReserveCardContent from './ReserveCardContent';

interface Props {
  onClose: () => void;
}

export default function MobileReserveSheet({ onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        className="absolute inset-0 h-full w-full animate-fadeIn bg-black/50"
        aria-label="Close booking sheet"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Reserve this place"
        className="absolute inset-x-0 bottom-0 max-h-[90vh] animate-slideUp overflow-y-auto rounded-t-2xl bg-white p-6 shadow-panel"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Confirm and pay</h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <ReserveCardContent />
      </div>
    </div>
  );
}
