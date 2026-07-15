'use client';

import { useState } from 'react';

interface Props {
  onSelect: (checkIn: Date | null, checkOut: Date | null) => void;
  checkIn: Date | null;
  checkOut: Date | null;
}

function getMonthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Calendar({ onSelect, checkIn, checkOut }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const isSameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.toDateString() === b.toDateString();

  const isInRange = (d: Date) =>
    checkIn && checkOut && d > checkIn && d < checkOut;

  const isPast = (d: Date) => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const handleClick = (d: Date) => {
    if (isPast(d)) return;
    if (!checkIn || (checkIn && checkOut)) {
      onSelect(d, null);
    } else if (d > checkIn) {
      onSelect(checkIn, d);
    } else {
      onSelect(d, null);
    }
  };

  const renderMonth = (year: number, month: number) => (
    <div className="w-full">
      <p className="mb-3 text-center text-sm font-medium">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-foggy">
        {WEEKDAY_LABELS.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {getMonthGrid(year, month).map((d, i) => {
          if (!d) return <span key={i} />;
          const selected = isSameDay(d, checkIn) || isSameDay(d, checkOut);
          const inRange = isInRange(d);
          const disabled = isPast(d);
          return (
            <button
              key={i}
              onClick={() => handleClick(d)}
              disabled={disabled}
              aria-label={d.toDateString()}
              aria-pressed={selected}
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors
                ${disabled ? 'cursor-not-allowed text-gray-300' : 'hover:border hover:border-hof'}
                ${selected ? 'bg-hof text-white' : ''}
                ${inRange && !selected ? 'bg-gray-100' : ''}
              `}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextViewMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextViewYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="Previous month"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="Next month"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {renderMonth(viewYear, viewMonth)}
        <div className="hidden sm:block">{renderMonth(nextViewYear, nextViewMonth)}</div>
      </div>
    </div>
  );
}
