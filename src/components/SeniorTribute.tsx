'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import TributeCard from './TributeCard';

const seniors = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'President',
    message: 'Leading by example, inspiring by action.',
    color: 'crimson',
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Vice President',
    message: 'The force behind every success.',
    color: 'blood',
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    role: 'Tech Lead',
    message: 'Turning visions into reality.',
    color: 'crimson',
  },
  {
    id: 4,
    name: 'Ananya Singh',
    role: 'Creative Head',
    message: 'Art speaks where words fail.',
    color: 'blood',
  },
  {
    id: 5,
    name: 'Vikram Reddy',
    role: 'Events Head',
    message: 'Making every moment legendary.',
    color: 'crimson',
  },
  {
    id: 6,
    name: 'Ishita Gupta',
    role: 'PR Lead',
    message: 'Connecting hearts, building bridges.',
    color: 'blood',
  },
];

export default function SeniorTribute() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from('.tribute-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.2,
        ease: 'power4.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      id="tribute-section"
    >
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(220, 20, 60, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 70%, rgba(192, 192, 192, 0.02) 0%, transparent 40%)
        `,
      }} />

      {/* Title */}
      <div className="tribute-title text-center mb-16 sm:mb-24">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-crimson-600/40" />
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rotate-45 bg-crimson-600/40" />
            <div className="w-2.5 h-2.5 rotate-45 border border-crimson-600/50" />
            <div className="w-1 h-1 rotate-45 bg-crimson-600/40" />
          </div>
          <div className="w-10 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-crimson-600/40" />
        </div>

        <span className="label-text text-xs text-crimson-500/60 tracking-widest block mb-3">
          HONORING OUR LEGENDS
        </span>
        <h2 className="section-title text-4xl sm:text-5xl md:text-6xl text-gradient-steel">
          SENIOR TRIBUTE
        </h2>
        <p className="font-inter text-base sm:text-lg text-white/40 mt-4 tracking-wide max-w-lg mx-auto">
          The 4th Year pioneers who shaped Takshila&apos;s legacy
        </p>
      </div>

      {/* Tribute cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {seniors.map((senior, index) => (
          <motion.div
            key={senior.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <TributeCard
              name={senior.name}
              role={senior.role}
              message={senior.message}
              index={index}
            />
          </motion.div>
        ))}
      </div>

      {/* Decorative bottom */}
      <div className="flex items-center justify-center gap-3 mt-20 sm:mt-24">
        <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-crimson-800/30" />
        <div className="w-1 h-1 rotate-45 bg-crimson-700/30" />
        <div className="w-2 h-2 rotate-45 border border-crimson-700/25" />
        <div className="w-1 h-1 rotate-45 bg-crimson-700/30" />
        <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-crimson-800/30" />
      </div>
    </section>
  );
}
