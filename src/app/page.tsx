'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AppStateProvider, useAppState } from '@/providers/AppStateProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';

// Dynamic imports for code-splitting
const CinematicIntro = dynamic(() => import('@/components/CinematicIntro'), {
  ssr: false,
});
const EntryPortal = dynamic(() => import('@/components/EntryPortal'), {
  ssr: false,
});
const BackgroundAtmosphere = dynamic(
  () => import('@/components/effects/BackgroundAtmosphere'),
  { ssr: false }
);
const InvitationCard = dynamic(() => import('@/components/InvitationCard'), {
  ssr: false,
});
const MemoriesSection = dynamic(() => import('@/components/MemoriesSection'), {
  ssr: false,
});
const PastMemories = dynamic(() => import('@/components/PastMemories'), {
  ssr: false,
});
const FarewellEnding = dynamic(() => import('@/components/FarewellEnding'), {
  ssr: false,
});
const PosterGenerator = dynamic(() => import('@/components/PosterGenerator'), {
  ssr: false,
});

function MainContent() {
  const { portalOpen } = useAppState();

  return (
    <>
      <BackgroundAtmosphere />
      <CinematicIntro />
      <EntryPortal />

      {portalOpen && (
        <main className="relative z-[20]">
          <InvitationCard />
          <MemoriesSection />
          <PastMemories />

          <FarewellEnding />
          <PosterGenerator />

          {/* Final spacer for smooth ending */}
          <div className="h-20 bg-black" />
        </main>
      )}
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / Initial load: show black screen
    return (
      <div className="fixed inset-0 bg-black z-[200]" />
    );
  }

  return (
    <AppStateProvider>
      <SmoothScrollProvider>
        <MainContent />
      </SmoothScrollProvider>
    </AppStateProvider>
  );
}
