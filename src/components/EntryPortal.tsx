'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap-config';
import { useAppState } from '@/providers/AppStateProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function EntryPortal() {
  const { introComplete, portalOpen, setPortalOpen } = useAppState();
  const portalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Button hover glow animation
  useEffect(() => {
    if (!buttonRef.current || !introComplete || portalOpen) return;
    const btn = buttonRef.current;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(btn, {
      boxShadow: '0 0 60px rgba(220, 20, 60, 0.7), 0 0 120px rgba(220, 20, 60, 0.3), inset 0 0 30px rgba(220, 20, 60, 0.15)',
      duration: 2,
      ease: 'sine.inOut',
    });

    return () => { tl.kill(); };
  }, [introComplete, portalOpen]);

  const handleEnter = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const circle = circleRef.current;
    const portal = portalRef.current;
    if (!circle || !portal) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPortalOpen();
      },
    });

    tl.to('.portal-flash', { opacity: 0.6, duration: 0.1 })
      .to('.portal-flash', { opacity: 0, duration: 0.3 });

    tl.to(circle, { scale: 50, opacity: 1, duration: 1.5, ease: 'power3.inOut' }, 0.1);
    tl.to('.portal-content', { opacity: 0, scale: 0.9, duration: 0.5 }, 0);
    tl.to(portal, { opacity: 0, duration: 0.5 }, 1.2);
  };

  if (portalOpen) return null;

  return (
    <AnimatePresence>
      {introComplete && !portalOpen && (
        <motion.div
          ref={portalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[90] bg-black flex items-center justify-center overflow-hidden"
          id="entry-portal"
        >
          {/* Deep background texture */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 50% 40%, rgba(220, 20, 60, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(139, 0, 0, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(139, 0, 0, 0.04) 0%, transparent 40%)
            `,
          }} />

          {/* Ornamental radial rings */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${120 + i * 110}px`,
                height: `${120 + i * 110}px`,
                border: `1px solid rgba(220, 20, 60, ${0.15 - i * 0.03})`,
                animation: `glow-pulse ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}

          {/* Diagonal accent lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-crimson-500 to-transparent" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-crimson-500 to-transparent" />
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson-500 to-transparent" />
            <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson-500 to-transparent" />
          </div>

          {/* Portal content */}
          <div className="portal-content relative z-10 text-center px-6">
            {/* Vivarta logo at top */}
            <motion.img
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              src="/Vivarta_White (1).png"
              alt="Vivarta"
              className="w-16 sm:w-20 h-auto mx-auto mb-8 object-contain"
              style={{ filter: 'drop-shadow(0 0 15px rgba(220, 20, 60, 0.5))' }}
            />

            {/* Ornamental top divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-crimson-600/40 to-crimson-500" />
              <div className="relative w-4 h-4">
                <div className="absolute inset-0 rotate-45 border border-crimson-500/60 animate-glow-pulse" />
                <div className="absolute inset-1 rotate-45 bg-crimson-500/20" />
              </div>
              <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent via-crimson-600/40 to-crimson-500" />
            </div>

            {/* Title Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="mb-12 relative"
            >
              <div className="absolute -inset-10 bg-crimson-600/10 blur-3xl rounded-full opacity-50 animate-pulse-slow" />
              <h2 className="relative font-grotesk text-2xl sm:text-4xl md:text-5xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-crimson-300 to-white uppercase font-black drop-shadow-[0_0_15px_rgba(220,20,60,0.5)]">
                SYSTEM SECURED
              </h2>
              <div className="flex flex-col gap-1 mt-4">
                <p className="font-mono text-xs sm:text-sm text-crimson-400/80 tracking-[0.3em] uppercase">
                  INITIALIZING VIVARTA PROTOCOL
                </p>
                <p className="font-mono text-[10px] sm:text-xs text-white/30 tracking-widest uppercase mt-1">
                  ACCESS LEVEL: SENIOR
                </p>
              </div>
            </motion.div>

            {/* ENTER Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button
                ref={buttonRef}
                onClick={handleEnter}
                disabled={isAnimating}
                className="group relative px-16 sm:px-24 py-7 sm:py-8 font-grotesk text-2xl sm:text-3xl md:text-4xl tracking-widest text-white uppercase transition-all duration-500 hover:tracking-[0.25em] focus:outline-none font-black"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 0, 5, 0.8), rgba(220, 20, 60, 0.15))',
                  border: '1px solid rgba(220, 20, 60, 0.4)',
                  boxShadow: '0 0 40px rgba(220, 20, 60, 0.2), inset 0 0 20px rgba(220, 20, 60, 0.1)',
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                }}
                id="enter-button"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-crimson-600/0 via-crimson-500/20 to-crimson-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Cybernetic scanner line */}
                <div className="absolute left-0 top-0 w-full h-[2px] bg-crimson-400/50 -translate-y-full group-hover:translate-y-[4000%] transition-transform duration-[1.5s] ease-linear opacity-0 group-hover:opacity-100" />
                
                {/* Inner corner accents */}
                <div className="absolute top-1 left-[9%] w-4 h-4 border-t-2 border-l-2 border-crimson-400/60" />
                <div className="absolute bottom-1 right-[9%] w-4 h-4 border-b-2 border-r-2 border-crimson-400/60" />
                
                <span className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(220,20,60,0.8)] transition-all duration-500">INITIATE SEQUENCE</span>
              </button>
            </motion.div>

            {/* Event info below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-4 text-white/35">
                <span className="font-inter text-xs tracking-wider">📅 31 MAY 2026</span>
                <div className="w-1 h-1 rounded-full bg-crimson-500/50" />
                <span className="font-inter text-xs tracking-wider">🕐 11:00 AM</span>
              </div>
              <p className="font-inter text-[11px] tracking-wider text-white/25 uppercase">
                Seminar Hall — Techno India University
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-[1px] bg-crimson-900/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-crimson-700/50 animate-pulse-red" />
                <div className="w-8 h-[1px] bg-crimson-900/40" />
              </div>
            </motion.div>
          </div>

          {/* Circle wipe transition */}
          <div
            ref={circleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full z-[20] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #000000 60%, rgba(220, 20, 60, 0.1) 100%)',
              opacity: 0,
            }}
          />

          {/* Flash */}
          <div className="portal-flash absolute inset-0 z-[15] bg-crimson-500 opacity-0 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
