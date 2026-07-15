# Airbnb Listing Page Clone

A production-structured clone of an Airbnb listing page, built with Next.js 14
(App Router), React 18, TypeScript, and Tailwind CSS. Fully responsive —
designed mobile-first and scaled up through tablet and desktop breakpoints.

## Live demo

_Add your deployed URL here once published (e.g. Vercel)._

## Note on the reference site

The reference (`https://airbnb-clone-umber-two.vercel.app`) blocks automated
fetch/scrape access via `robots.txt`, and the task instructions explicitly
prohibit lift-and-shift of its codebase. This project was therefore built
from the well-documented, publicly known layout and interaction patterns of
a standard Airbnb listing page — hero photo grid, photo tour, single-photo
lightbox, sticky reserve card, amenities, reviews, host section, map — and
reproduced independently in original code. If direct screenshots or an
export of the reference become available, a follow-up pass with the
`ui-fidelity-reviewer` agent (see `/agents`) would tighten pixel-level
spacing/color parity against it directly.

## Stack

| Tool | Purpose |
|---|---|
| **Next.js 14** | App Router, Server Components by default |
| **TypeScript** | End-to-end type safety |
| **Tailwind CSS** | All styling — no component library, matching Airbnb's own bespoke design system |
| **Typed mock data** | `data/listing.ts` stands in for a backend, which is optional per the task instructions |

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx               Root layout, font/meta setup
  page.tsx                 Composes the page, owns overlay state (tour/lightbox)
  globals.css               Tailwind base + focus-ring / underline utilities

components/
  Header.tsx                Sticky nav, search pill (collapses to icon on mobile), user menu
  ListingHeader.tsx          Title, rating, share/save (icon-only on mobile)
  Gallery.tsx                Desktop 5-photo grid / mobile swipeable carousel
  PhotoSkeleton.tsx          Reusable pulsing placeholder shown while photos load
  PhotoTourModal.tsx         Full-screen scrollable gallery overlay
  Lightbox.tsx                Single-photo viewer, keyboard nav, thumbnail strip
  HostAndDescription.tsx     Host summary row, highlights, description
  SleepingArrangements.tsx    Per-bedroom bed breakdown
  Amenities.tsx               Amenities grid with show all/less
  Reviews.tsx                 Rating breakdown + review cards
  HostProfileCard.tsx        Full host module: stats, response rate, message host
  MapSection.tsx              Location placeholder
  ThingsToKnow.tsx            House rules / safety / cancellation + detail modal
  Calendar.tsx                Two-month interactive date-range picker
  ReserveCardContent.tsx      Shared booking form (calendar, guests, price breakdown)
  ReserveCard.tsx              Desktop sticky sidebar wrapper around ReserveCardContent
  MobileBookingBar.tsx        Fixed bottom price bar (mobile/tablet)
  MobileReserveSheet.tsx      Slide-up booking sheet (mobile/tablet)
  ExploreMore.tsx              Nearby listings carousel
  Footer.tsx

data/
  listing.ts                 Typed mock content (photos, amenities, reviews, host)

agents/                      Subagent configs used during development (see below)
architecture-diagram.svg     Production-scale system architecture
PROMPTS.md                    Prompt sequence used for AI-assisted development
```

## Feature overview

Beyond the original scope, the page includes every major module a real
Airbnb listing page has:

- **Interactive calendar** (`Calendar.tsx`) — real two-month date picker.
  Click check-in, then check-out; the selected range highlights and past
  dates are disabled. Wired into both the desktop reserve card and the
  mobile sheet, so pricing (`nights × price`) updates live instead of using
  a static placeholder date.
- **Where you'll sleep** (`SleepingArrangements.tsx`) — per-bedroom bed
  breakdown with a show more/less toggle.
- **Meet your host** (`HostProfileCard.tsx`) — dedicated host module with
  review count, rating, years hosting, response rate/time, and a "Message
  host" action, separate from the compact "Hosted by X" summary row at the
  top of the description.
- **Things to know** (`ThingsToKnow.tsx`) — three-column house rules /
  safety & property / cancellation policy summary, each with a "Show more"
  that opens a focus-managed modal with the full list.
- **Explore other options** (`ExploreMore.tsx`) — horizontally scrollable
  (mobile) / grid (desktop) carousel of nearby listings below the fold,
  matching the "more places to stay" section on real listing pages.
- **Photo loading skeletons** (`PhotoSkeleton.tsx`) — a pulsing placeholder
  renders behind every gallery photo until it finishes loading, then
  cross-fades in, avoiding layout pop-in.

All content in these sections is original placeholder data
(`data/listing.ts`) — no Airbnb copyrighted photography, real host/guest
data, or literal copy was reproduced; see the note above for why.

## The three views

1. **Listing page** (`/`) — the full page composed from the components above.
2. **Photo tour** — opened via "Show all photos" or the large hero photo.
   A full-screen scrollable grid of every photo, each of which opens the
   Lightbox at that index.
3. **Lightbox** — opened from any thumbnail in the hero grid or the photo
   tour. Prev/next arrow buttons, `ArrowLeft` / `ArrowRight` keyboard
   navigation, a thumbnail strip with active-state highlighting, `Escape`
   to close, and focus sent to the close button on open.

## Responsive behavior

Built mobile-first with Tailwind breakpoints (`sm`, `md`, `lg`), matching
the real Airbnb site's responsive patterns:

- **Header** — full search pill (Anywhere / Any week / guests) on desktop
  collapses to a single "Where to?" search button below `md`.
- **Gallery** — 5-photo grid on desktop (`md:` and up). Below that, a
  single swipeable hero photo with a `1 / 8` counter badge, dot indicators,
  and a compact photo-tour icon button in the corner; touch swipe
  (`onTouchStart` / `onTouchEnd`) moves between photos.
- **Listing header** — title and meta row stack on mobile; Share/Save
  labels collapse to icon-only below `sm`.
- **Main layout** — the 2/3 + 1/3 (content + reserve card) grid becomes a
  single column below `lg`. The reserve card itself is hidden below `lg`.
- **Mobile booking** — a fixed bottom price bar (`MobileBookingBar`) shows
  price/night and a Reserve button below `lg`, matching Airbnb's mobile
  pattern. Tapping Reserve opens `MobileReserveSheet`, a slide-up bottom
  sheet (`role="dialog"`, focus-managed, `Escape` to close) containing the
  same date/guest/price content as the desktop card — content is shared via
  `ReserveCardContent.tsx` so desktop and mobile never drift out of sync.
- **Amenities / Reviews / Map** — grids collapse from 3/2 columns down to a
  single column, with reduced section padding on small screens.
- **Photo tour / Lightbox** — the tour's 2-column photo grid becomes a
  single column below `sm`; the lightbox's prev/next arrows and image
  height shrink on small screens so they never overlap the photo.

Main content also gets `pb-24` on mobile so the fixed bottom booking bar
never covers the last section.

## Accessibility

- Both overlays use `role="dialog"` + `aria-modal="true"`, move focus to
  the close button on open, and restore body scroll on close.
- All icon-only buttons carry `aria-label`.
- Keyboard support: `Escape` closes both overlays; `ArrowLeft` /
  `ArrowRight` navigate the Lightbox; guest stepper buttons disable at
  min/max and expose their state via `disabled`.
- Visible focus rings (`:focus-visible`) matching Airbnb's dark outline
  style are preserved on every interactive element rather than suppressed.

## AI-assisted development

This project was built using an agentic workflow (see `agents/*.md` for the
subagent configs):

- **component-architect** — planned the Server/Client component split and
  file structure before implementation.
- **ui-fidelity-reviewer** — intended to be run against reference
  screenshots to close visual gaps (spacing, color, motion) iteratively.
- **a11y-auditor** — checklist-driven audit of focus management, ARIA, and
  keyboard support on both overlays.

See `PROMPTS.md` for the actual prompt sequence used.

## Deployment

Any static-friendly Node host works (Vercel recommended, matching the
reference's own hosting):

```bash
npm run build
npm start
```
