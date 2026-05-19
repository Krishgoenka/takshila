'use client';

import EmberParticles from './EmberParticles';
import FloatingSmoke from './FloatingSmoke';
import NoiseOverlay from './NoiseOverlay';

export default function BackgroundAtmosphere() {
  return (
    <>
      {/* Base ambient gradient */}
      <div className="fixed inset-0 z-0 bg-black">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 80%, rgba(220, 20, 60, 0.06) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(139, 0, 0, 0.04) 0%, transparent 50%)',
          }}
        />
        {/* Subtle animated light shift */}
        <div
          className="absolute inset-0 animate-pulse-red"
          style={{
            background:
              'radial-gradient(circle at 80% 60%, rgba(220, 20, 60, 0.03) 0%, transparent 40%)',
            opacity: 0.3,
          }}
        />
      </div>

      {/* Atmospheric layers */}
      <FloatingSmoke layers={3} opacity={0.12} />
      <EmberParticles count={60} speed={0.7} />
      <NoiseOverlay opacity={0.025} />
    </>
  );
}
