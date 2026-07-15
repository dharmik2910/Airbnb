'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import StickyNav from '@/components/StickyNav';
import ListingHeader from '@/components/ListingHeader';
import Gallery from '@/components/Gallery';
import PhotoTourModal from '@/components/PhotoTourModal';
import Lightbox from '@/components/Lightbox';
import HostAndDescription from '@/components/HostAndDescription';
import SleepingArrangements from '@/components/SleepingArrangements';
import Amenities from '@/components/Amenities';
import Reviews from '@/components/Reviews';
import HostProfileCard from '@/components/HostProfileCard';
import MapSection from '@/components/MapSection';
import ThingsToKnow from '@/components/ThingsToKnow';
import ReserveCard from '@/components/ReserveCard';
import MobileBookingBar from '@/components/MobileBookingBar';
import MobileReserveSheet from '@/components/MobileReserveSheet';
import ExploreMore from '@/components/ExploreMore';
import Footer from '@/components/Footer';

export default function Home() {
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  return (
    <>
      <Header />
      {/* Spacer to reserve the fixed header's height, since it's removed from normal flow */}
      <div className="h-[57px] sm:h-[65px]" />
      <StickyNav onReserve={() => document.getElementById('reserve-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />

      <main className="mx-auto max-w-[1235px] px-4 pb-24 sm:px-6 lg:px-0">
        <ListingHeader />

        <div id="photos" />
        <Gallery
          onOpenTour={() => setTourOpen(true)}
          onOpenLightbox={(i) => setLightboxIndex(i)}
        />

        {/* Section 1: content ABOVE Reviews, paired with the sticky reserve card.
            ReserveCard only sticks within this grid's height — once this
            section ends (right before Reviews), it stops following the scroll. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <HostAndDescription />
            <SleepingArrangements />
            <Amenities />
          </div>
          <div id="reserve-card" className="lg:col-span-1">
            <ReserveCard />
          </div>
        </div>

        {/* Section 2: Reviews onward, full width, no sticky sidebar here */}
        <div className="mt-8 lg:mt-10">
          <Reviews />
          <HostProfileCard />
          <MapSection />
          <ThingsToKnow />
        </div>
      </main>

      <ExploreMore />

      <Footer />

      <MobileBookingBar onReserve={() => setMobileSheetOpen(true)} />

      {mobileSheetOpen && (
        <MobileReserveSheet onClose={() => setMobileSheetOpen(false)} />
      )}

      {tourOpen && (
        <PhotoTourModal
          onClose={() => setTourOpen(false)}
          onOpenLightbox={(i) => setLightboxIndex(i)}
        />
      )}

      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}