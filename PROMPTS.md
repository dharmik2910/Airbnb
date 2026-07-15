# Prompt sequence used for AI-assisted development

This documents the sequence of prompts/instructions used to build this
submission with an AI coding assistant (Claude), organized by phase.

## 1. Discovery
1. "Fetch and inspect the reference listing page
   (https://airbnb-clone-umber-two.vercel.app) — enumerate every section,
   its layout, and the three required views (listing page, photo tour,
   lightbox). Note that direct scraping was blocked by robots.txt, so the
   plan shifted to reproducing the well-known Airbnb listing-page pattern
   from first principles rather than copying source."
2. "List the interaction/animation details that matter for behavioral
   parity: hover states on gallery tiles, overlay open/close transitions,
   keyboard navigation in the lightbox, focus management, sticky reserve
   card behavior."

## 2. Architecture planning (component-architect agent)
3. "Given the three views (listing page, photo tour, lightbox) and desktop
   scope only, propose a Next.js App Router file/component structure.
   Decide Server vs Client component boundaries and where overlay state
   should live."
4. "Confirm state for `tourOpen` and `lightboxIndex` should be lifted to
   `app/page.tsx` since both Gallery and PhotoTourModal need to trigger the
   Lightbox."

## 3. Implementation
5. "Scaffold the Next.js 14 + TypeScript + Tailwind project (package.json,
   next.config.js, tailwind.config.js with Airbnb-style color tokens
   (#FF385C rausch, #00A699 babu), postcss, tsconfig)."
6. "Build the Header: sticky, logo, centered search pill with divided
   segments, right-side user menu with a dropdown (role=menu / menuitem)."
7. "Build Gallery.tsx: 5-photo CSS grid (large hero + 4 thumbnails),
   'Show all photos' button, hover brightness transition on tiles, hero and
   button open the Photo Tour, thumbnails open the Lightbox directly at
   their index."
8. "Build PhotoTourModal.tsx: full-screen scrollable overlay, focus moves to
   close button on open, Escape closes, body scroll is locked while open,
   clicking any photo opens the Lightbox at that index."
9. "Build Lightbox.tsx: single photo view, prev/next buttons, ArrowLeft/
   ArrowRight keyboard handlers, photo counter, thumbnail strip with active
   state, fade transition between photos, focus management matching the
   Photo Tour."
10. "Build the remaining sections: ListingHeader (title/rating/share/save),
    HostAndDescription (host row + superhost badge + highlights +
    description), Amenities (grid + show all/less toggle), Reviews (rating
    category bars + review cards), ReserveCard (sticky, date fields, guest
    stepper dropdown, price breakdown), MapSection, Footer."
11. "Compose everything in app/page.tsx, wiring Gallery/PhotoTourModal/
    Lightbox through shared overlay state."

## 4. Accessibility pass (a11y-auditor agent)
12. "Audit both overlays against the checklist in agents/a11y-auditor.md:
    dialog roles, focus-on-open, Escape-to-close, keyboard arrow nav,
    aria-labels on icon-only buttons, disabled state on stepper bounds.
    Report and fix any gaps."

## 5. Visual fidelity pass (ui-fidelity-reviewer agent)
13. "Define the fidelity-review workflow (agents/ui-fidelity-reviewer.md) to
    be run against reference screenshots for a follow-up pixel-parity pass:
    compare spacing/typography/color/motion and apply minimal Tailwind
    fixes only, never restructuring component logic."

## 6. Architecture diagram
14. "Produce a high-level architecture diagram for a production-scale
    vacation-rental marketplace covering frontend, backend, storage, search,
    and deployment scaling strategy, as an SVG deliverable alongside the
    code."

## 7. Packaging
15. "Write README.md documenting setup, structure, the three views, and the
    accessibility/AI-workflow notes. Zip the project plus the architecture
    diagram for submission."

## 8. Responsive pass (requested follow-up)
16. "Make the app properly responsive across breakpoints, matching real
    Airbnb's mobile patterns: collapsing search pill, swipeable single-photo
    hero carousel with counter badge on mobile, fixed bottom price bar with
    a slide-up booking sheet in place of the desktop sidebar, and
    single-column/stacked layouts for all content sections below `lg`."
17. "Extract the reserve card's form (dates, guests, price breakdown) into a
    shared ReserveCardContent component so the desktop sidebar and the
    mobile bottom sheet render identical booking logic instead of two
    diverging implementations."

## 9. Feature-completeness pass (requested follow-up)
18. "Add the remaining sections a real Airbnb listing page has that were
    still missing: an interactive two-month calendar date-range picker
    wired into live price calculation, a 'Where you'll sleep' per-bedroom
    breakdown, a dedicated 'Meet your host' module with stats, a 'Things to
    know' section (house rules / safety / cancellation) with a details
    modal, and a nearby-listings 'Explore other options' carousel at the
    bottom of the page."
19. "Keep all new content as original placeholder data — no Airbnb
    copyrighted photography, real host/guest data, or literal copy — and
    document that constraint clearly in the README."
