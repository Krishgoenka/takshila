'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

const photos = [
  { id: 1, src: '/1.jpg', alt: 'Memory 1' },
  { id: 2, src: '/2.jpg', alt: 'Memory 2' },
  { id: 3, src: '/4.jpg', alt: 'Memory 4' },
  { id: 4, src: '/3.jpg', alt: 'Memory 3' },
  { id: 5, src: '/5.jpg', alt: 'Memory 5' },
  { id: 6, src: '/6.jpg', alt: 'Memory 6' },
];

export default function PastMemories() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from('.gallery-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      id="past-memories"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 50%, rgba(220, 20, 60, 0.04) 0%, transparent 60%)`,
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="gallery-title text-center mb-16 sm:mb-20">
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
            GLIMPSES OF THE PAST
          </span>
          <h2 className="section-title text-4xl sm:text-5xl md:text-6xl text-gradient-crimson glow-text-crimson">
            CHERISHED MEMORIES
          </h2>
          <p className="font-inter text-base sm:text-lg text-white/40 mt-4 tracking-wide max-w-lg mx-auto">
            Moments that shaped our legacy over the years
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden"
              style={{
                clipPath: 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)',
              }}
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Outer borders */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-crimson-500/50 transition-colors duration-500" style={{
                clipPath: 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)',
              }} />

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-crimson-500/0 group-hover:border-crimson-500/80 transition-colors duration-500" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-crimson-500/0 group-hover:border-crimson-500/80 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
