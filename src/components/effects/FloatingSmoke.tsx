'use client';

import { useEffect, useRef } from 'react';

interface FloatingSmokeProps {
  layers?: number;
  className?: string;
  opacity?: number;
}

export default function FloatingSmoke({
  layers = 3,
  className = '',
  opacity = 0.15,
}: FloatingSmokeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduce layers on mobile for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile && containerRef.current) {
      const children = containerRef.current.children;
      for (let i = Math.ceil(layers / 2); i < children.length; i++) {
        (children[i] as HTMLElement).style.display = 'none';
      }
    }
  }, [layers]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden z-[5] ${className}`}
    >
      {Array.from({ length: layers }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: opacity * (1 - i * 0.2),
            animation: `smoke-drift ${18 + i * 8}s linear infinite`,
            animationDelay: `${-i * 6}s`,
          }}
        >
          <div
            className="absolute w-[200%] h-full"
            style={{
              background: `radial-gradient(ellipse at ${30 + i * 20}% ${50 + i * 10}%, rgba(220, 20, 60, ${0.04 + i * 0.01}), transparent 70%)`,
              filter: 'blur(60px)',
              transform: `scaleY(${1 + i * 0.3})`,
            }}
          />
        </div>
      ))}
      {/* Fog at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          opacity: 0.6,
        }}
      />
    </div>
  );
}
