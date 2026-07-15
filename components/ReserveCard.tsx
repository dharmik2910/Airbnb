import ReserveCardContent from './ReserveCardContent';

export default function ReserveCard() {
  return (
    <aside className="sticky top-24 hidden h-fit space-y-4 lg:block">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4 shadow-card">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-none stroke-hof stroke-[1.5]">
            <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3H4a1 1 0 00-1 1v5.59a2 2 0 00.59 1.41l9.58 9.59a2 2 0 002.83 0l4.59-4.59a2 2 0 000-2.99z" />
            <circle cx="7.5" cy="7.5" r="1.5" />
          </svg>
          <p className="text-sm">
            Get 10% off your next stay.
            <br />
            <span className="underline">Terms apply</span>
          </p>
        </div>
        <button className="shrink-0 rounded-lg bg-hof px-4 py-2 text-sm font-medium text-white">
          Claim
        </button>
      </div>

      <div className="rounded-xl border border-border p-6 shadow-card">
        <ReserveCardContent />
      </div>
    </aside>
  );
}