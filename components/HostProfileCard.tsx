import Image from 'next/image';
import { listing, hostStats, coHosts } from '@/data/listing';

export default function HostProfileCard() {
  return (
    <div className="border-b border-border py-6 sm:py-8">
      <h2 className="mb-6 text-lg font-semibold sm:mb-8 sm:text-xl">Meet your host</h2>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left column: host card + fun facts */}
        <div>
          <div className="relative max-w-md overflow-hidden rounded-2xl border border-border shadow-sm transition-shadow hover:shadow-md">
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-emerald-50 to-transparent" />
            <div className="relative flex items-center gap-6 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-emerald-800 shadow-md ring-4 ring-white">
                  <Image
                    src={listing.host.avatar}
                    alt={`${listing.host.name}, host`}
                    fill
                    className="object-cover"
                  />
                  {hostStats.isVerified && (
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-rausch text-white ring-2 ring-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[3]">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="mt-3 text-xl font-semibold leading-tight">{listing.host.name}</p>
                <p className="text-sm text-hof">Host</p>
              </div>

              <div className="flex flex-1 flex-col gap-4 border-l border-border pl-6">
                <div>
                  <p className="text-xl font-bold leading-none">{hostStats.reviewCount.toLocaleString()}</p>
                  <p className="mt-1.5 text-sm text-foggy">Reviews</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-xl font-bold leading-none">
                    {hostStats.rating}
                    <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current">
                      <path d="M15.094 1.579a1 1 0 011.812 0l4.406 9.062 10.014 1.454a1 1 0 01.554 1.706l-7.243 7.061 1.71 9.972a1 1 0 01-1.45 1.054L16 27.31l-8.897 4.578a1 1 0 01-1.45-1.054l1.71-9.972-7.243-7.06a1 1 0 01.554-1.707l10.014-1.454z" />
                    </svg>
                  </p>
                  <p className="mt-1.5 text-sm text-foggy">Rating</p>
                </div>
                <div>
                  <p className="text-xl font-bold leading-none">{hostStats.yearsHosting}</p>
                  <p className="mt-1.5 text-sm text-foggy">Years hosting</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-md space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-hof stroke-[1.5]">
                  <path d="M12 2c-2.5 3-4 5.5-4 8a4 4 0 008 0c0-2.5-1.5-5-4-8zM9 18h6M10 21h4" />
                </svg>
              </span>
              <span className="text-sm">{hostStats.bornDecade}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-hof stroke-[1.5]">
                  <path d="M12 3l10 5-10 5-10-5zM6 10.5v5c0 1.5 2.7 3.5 6 3.5s6-2 6-3.5v-5M22 8v6" />
                </svg>
              </span>
              <span className="text-sm">Where I went to school: {hostStats.school}</span>
            </div>
          </div>
        </div>

        {/* Right column: co-hosts + host details */}
        <div>
          <h3 className="mb-4 text-base font-semibold">Co-Hosts</h3>
          <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
            {coHosts.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50"
              >
                {c.avatar ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
                    <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-900">
                    {c.name[0]}
                  </div>
                )}
                <span className="text-sm font-medium">{c.name}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border p-5">
            <h3 className="mb-4 text-base font-semibold">Host details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-green-700 stroke-[2]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-sm">
                  Response rate: <span className="font-semibold">{hostStats.responseRate}%</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-blue-700 stroke-[2]">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <p className="text-sm">
                  Responds <span className="font-semibold">{hostStats.responseTime}</span>
                </p>
              </div>
            </div>

            <button className="mt-5 w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 sm:w-auto">
              Message host
            </button>
          </div>

          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-foggy">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 fill-none stroke-foggy stroke-[1.5]">
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
            </svg>
            To help protect your payment, always use Airbnb to send money and communicate with hosts.
          </p>
        </div>
      </div>
    </div>
  );
}