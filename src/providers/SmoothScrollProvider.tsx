'use client';

import { ReactNode, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';

function LenisScrollHandler() {
  useLenis(() => {
    // Scroll handler - can be used for scroll-based effects
  });
  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      }}
    >
      <LenisScrollHandler />
      {children}
    </ReactLenis>
  );
}
