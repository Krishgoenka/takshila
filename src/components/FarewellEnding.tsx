'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export default function FarewellEnding() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from('.farewell-quote', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 2,
        ease: 'power4.out',
      });

      gsap.from('.farewell-logo', {
        scrollTrigger: {
          trigger: '.farewell-logo',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
        duration: 1.5,
        delay: 0.5,
        ease: 'power4.out',
      });

      gsap.to('.farewell-particles', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'bottom bottom',
          scrub: 2,
        },
        opacity: 0.2,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 sm:px-6"
      id="farewell-section"
    >
      {/* Deep background */}
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%, #000000 100%)',
      }} />

      {/* Crimson ambient light */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(circle at 50% 40%, rgba(220, 20, 60, 0.06) 0%, transparent 40%),
          radial-gradient(circle at 30% 70%, rgba(139, 0, 0, 0.04) 0%, transparent 30%),
          radial-gradient(circle at 70% 30%, rgba(139, 0, 0, 0.03) 0%, transparent 30%)
        `,
      }} />

      {/* Floating embers */}
      <div className="farewell-particles absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: `rgba(220, 20, 60, ${0.3 + Math.random() * 0.4})`,
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animation: `float ${4 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              boxShadow: `0 0 8px rgba(220, 20, 60, 0.5)`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Quote section */}
        <div className="farewell-quote mb-20 sm:mb-24">
          {/* Large ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-crimson-700/40" />
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 rotate-45 border border-crimson-600/40" />
              <div className="absolute inset-1.5 rotate-45 bg-crimson-500/15" />
            </div>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-crimson-700/40" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.3 }}
            className="font-grotesk text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/90 leading-relaxed tracking-wide font-medium"
            style={{
              textShadow: '0 0 40px rgba(220, 20, 60, 0.25)',
            }}
          >
            &ldquo;Memories fade, but
            <br />
            <span className="text-gradient-crimson glow-text-crimson font-bold">
              legacies live forever.
            </span>
            &rdquo;
          </motion.p>

          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-crimson-700/40" />
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 rotate-45 border border-crimson-600/40" />
              <div className="absolute inset-1.5 rotate-45 bg-crimson-500/15" />
            </div>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-crimson-700/40" />
          </div>
        </div>

        {/* Takshila Branding */}
        <div className="farewell-logo">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Takshila logo */}
            <img
              src="/Takshila_White.png"
              alt="Takshila"
              className="w-24 sm:w-32 h-auto object-contain mb-2"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(192, 192, 192, 0.3))',
                opacity: 0.7,
              }}
            />

            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-crimson-700/30" />
              <div className="w-1.5 h-1.5 rotate-45 border border-crimson-600/30" />
              <div className="w-8 h-[1px] bg-crimson-700/30" />
            </div>

            <p className="label-text text-[11px] sm:text-xs tracking-wider text-white/30">
              OFFICIAL TECH CLUB OF TECHNO INDIA UNIVERSITY
            </p>

            {/* Vivarta emblem */}
            <div className="flex items-center gap-4 mt-2">
              <img
                src="/Vivarta_White (1).png"
                alt="Vivarta"
                className="w-6 sm:w-8 h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(220, 20, 60, 0.4))',
                  opacity: 0.5,
                }}
              />
              <p className="label-text text-[11px] sm:text-xs tracking-wider text-crimson-500/40">
                VIVARTA — FAREWELL 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] z-[5] pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent, #000000)',
      }} />
    </section>
  );
}
