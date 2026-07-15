'use client';

import { useState } from 'react';
import { sleepingArrangements } from '@/data/listing';

export default function SleepingArrangements() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? sleepingArrangements : sleepingArrangements.slice(0, 2);

  return (
    <div className="border-b border-border py-5 sm:py-6">
      <h2 className="mb-4 text-lg font-semibold sm:text-xl">Where you&apos;ll sleep</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visible.map((room) => (
          <div key={room.room} className="rounded-xl border border-border p-4">
            <svg viewBox="0 0 24 24" className="mb-3 h-6 w-6 fill-none stroke-hof stroke-[1.5]">
              <path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 18v2M21 18v2M3 12V8a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
            <p className="text-sm font-medium">{room.room}</p>
            <p className="text-sm text-foggy">{room.beds}</p>
          </div>
        ))}
      </div>
      {sleepingArrangements.length > 2 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 flex items-center gap-1 text-sm font-medium underline font-semibold"
        >
          {expanded ? 'Show less' : 'Show more'}
          <svg
            viewBox="0 0 24 24"
            className={`h-3 w-3 fill-none stroke-current stroke-[3] transition-transform ${expanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
