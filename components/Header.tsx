// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showHeader, setShowHeader] = useState(true);

//   useEffect(() => {
//     const getThreshold = () => {
//       // The main header should only be visible while we're above the photo
//       // gallery — once past it, the StickyNav takes over entirely.
//       const photos = document.getElementById('photos');
//       if (!photos) return 480;
//       return photos.getBoundingClientRect().bottom + window.scrollY;
//     };

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const threshold = getThreshold();
//       setShowHeader(currentScrollY <= threshold);
//     };

//     handleScroll();
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed left-0 right-0 top-0 z-40 border-b border-border bg-white transition-all duration-300 ${
//         showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
//       }`}
//     >
//       <div className="mx-auto flex max-w-[1760px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-20">
//         {/* Logo */}
//         <a href="/" aria-label="Airbnb home" className="flex items-center">
//           <Image
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD1R9-XLXvGb0cMK76wSMJOstn6fWEazt66fJaGuB7eA&s=10"
//             alt="Airbnb"
//             width={280}
//             height={80}
//             priority
//             className="h-14 w-auto object-contain sm:h-20"
//           />
//         </a>

//         {/* Search pill — full pill on desktop, compact icon pill on tablet/mobile */}
//         <button
//           className="hidden items-center gap-2 rounded-full border border-border py-2 pl-6 pr-2 shadow-sm transition-shadow hover:shadow-md md:flex"
//           aria-label="Start your search"
//         >
//           <span className="border-r border-border pr-4 text-sm font-medium">Anywhere</span>
//           <span className="border-r border-border px-4 text-sm font-medium">Anytime</span>
//           <span className="pl-4 pr-2 text-sm text-foggy">Add guests</span>
//           <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rausch text-white">
//             <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]">
//               <circle cx="11" cy="11" r="7" />
//               <line x1="21" y1="21" x2="16.65" y2="16.65" />
//             </svg>
//           </span>
//         </button>
//         <button
//           className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 shadow-sm transition-shadow hover:shadow-md md:hidden"
//           aria-label="Start your search"
//         >
//           <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]">
//             <circle cx="11" cy="11" r="7" />
//             <line x1="21" y1="21" x2="16.65" y2="16.65" />
//           </svg>
//           <span className="text-sm font-medium">Where to?</span>
//         </button>

//         {/* Right nav */}
//         <div className="flex items-center gap-4">
//           <button className="hidden rounded-full px-4 py-2.5 text-sm font-medium hover:bg-gray-100 md:block">
//             Become a host
//           </button>
//           <button
//             className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 md:flex"
//             aria-label="Choose a language and region"
//           >
//             <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.5]">
//               <circle cx="12" cy="12" r="9" />
//               <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
//             </svg>
//           </button>
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen((o) => !o)}
//               className="flex items-center gap-2 rounded-full border border-border p-2 pl-3 shadow-sm transition-shadow hover:shadow-md"
//               aria-haspopup="menu"
//               aria-expanded={menuOpen}
//               aria-label="Main menu"
//             >
//               <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-hof">
//                 <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
//               </svg>
//               <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-500 text-white">
//                 <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
//                   <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-9 2.2-9 5v3h18v-3c0-2.8-4.6-5-9-5z" />
//                 </svg>
//               </span>
//             </button>
//             {menuOpen && (
//               <div
//                 role="menu"
//                 className="absolute right-0 mt-2 w-56 origin-top-right animate-scaleIn rounded-xl border border-border bg-white py-2 shadow-panel"
//               >
//                 <button role="menuitem" className="block w-full px-4 py-3 text-left text-sm font-medium hover:bg-gray-100">
//                   Sign up
//                 </button>
//                 <button role="menuitem" className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100">
//                   Log in
//                 </button>
//                 <hr className="my-2 border-border" />
//                 <button role="menuitem" className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100">
//                   Become a host
//                 </button>
//                 <button role="menuitem" className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100">
//                   Help
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const getThreshold = () => {
      // The main header should only be visible while we're above the photo
      // gallery — once past it, the StickyNav takes over entirely.
      const photos = document.getElementById('photos');
      if (!photos) return 480;
      return photos.getBoundingClientRect().bottom + window.scrollY;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = getThreshold();
      setShowHeader(currentScrollY <= threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 border-b border-border bg-white transition-all duration-300 ${
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-[1760px] items-center justify-between px-4 py-3 sm:px-6 sm:py-0 lg:px-20">
        {/* Logo */}
        <a href="/" aria-label="Airbnb home" className="flex items-center">
          {/* Plain <img>, not next/image — avoids the remotePatterns config
              requirement for external hosts like this one. */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD1R9-XLXvGb0cMK76wSMJOstn6fWEazt66fJaGuB7eA&s=10"
            alt="Airbnb"
            className="h-14 w-auto object-contain sm:h-20"
          />
        </a>

        {/* Search pill — full pill on desktop, compact icon pill on tablet/mobile */}
        <button
          className="hidden items-center gap-2 rounded-full border border-border py-2 pl-6 pr-2 shadow-sm transition-shadow hover:shadow-md md:flex"
          aria-label="Start your search"
        >
          <span className="border-r border-border pr-4 text-sm font-medium">Anywhere</span>
          <span className="border-r border-border px-4 text-sm font-medium">Anytime</span>
          <span className="pl-4 pr-2 text-sm text-foggy">Add guests</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rausch text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </button>
        <button
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 shadow-sm transition-shadow hover:shadow-md md:hidden"
          aria-label="Start your search"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-sm font-medium">Where to?</span>
        </button>

        {/* Right nav */}
        <div className="flex items-center gap-4">
          <button className="hidden rounded-full px-4 py-2.5 text-sm font-medium hover:bg-gray-100 md:block">
            Become a host
          </button>
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 md:flex"
            aria-label="Choose a language and region"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.5]">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
            </svg>
          </button>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-border p-2 pl-3 shadow-sm transition-shadow hover:shadow-md"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Main menu"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-hof">
                <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
              </svg>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-500 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-9 2.2-9 5v3h18v-3c0-2.8-4.6-5-9-5z" />
                </svg>
              </span>
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 origin-top-right animate-scaleIn rounded-xl border border-border bg-white py-2 shadow-panel"
              >
                <button role="menuitem" className="block w-full px-4 py-3 text-left text-sm font-medium hover:bg-gray-100">
                  Sign up
                </button>
                <button role="menuitem" className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100">
                  Log in
                </button>
                <hr className="my-2 border-border" />
                <button role="menuitem" className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100">
                  Become a host
                </button>
                <button role="menuitem" className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100">
                  Help
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}