'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import MemoryCard from './MemoryCard';
import { HiOutlineMusicalNote, HiOutlineSparkles, HiOutlineTrophy, HiOutlineHeart, HiOutlineSpeakerWave } from 'react-icons/hi2';
import { FiMusic, FiStar, FiUserCheck } from 'react-icons/fi';

const memories = [
  {
    id: 1,
    title: 'Dance Performances',
    category: 'Stage',
    description: 'Electrifying performances that will move your soul',
    icon: FiMusic,
    gradient: 'from-crimson-900/50 to-blood-dark/70',
  },
  {
    id: 2,
    title: 'Singing Performances',
    category: 'Music',
    description: 'Melodies and voices that resonate with the heart',
    icon: HiOutlineMusicalNote,
    gradient: 'from-crimson-800/40 to-smoke-dark/70',
  },
  {
    id: 3,
    title: 'Fun Activities & Interactive Moments',
    category: 'Fun',
    description: 'Games and challenges to make lasting memories together',
    icon: HiOutlineSparkles,
    gradient: 'from-blood/40 to-crimson-950/60',
  },
  {
    id: 4,
    title: 'Certificate Distribution Ceremony',
    category: 'Recognition',
    description: 'Honoring excellence and dedication of our graduating batch',
    icon: HiOutlineTrophy,
    gradient: 'from-crimson-900/40 to-smoke/50',
  },
  {
    id: 5,
    title: 'Recognition of Members',
    category: 'Awards',
    description: 'Celebrating the core pillars of Takshila',
    icon: FiUserCheck,
    gradient: 'from-blood-dark/50 to-crimson-900/40',
  },
  {
    id: 6,
    title: 'New Domain Lead Announcements',
    category: 'Leadership',
    description: 'Passing the torch to the next generation of leaders',
    icon: HiOutlineSpeakerWave,
    gradient: 'from-crimson-800/50 to-blood/40',
  },
  {
    id: 7,
    title: 'Celebration of Senior Legacy',
    category: 'Tribute',
    description: 'A tribute to the legends who defined our era',
    icon: FiStar,
    gradient: 'from-crimson-900/50 to-smoke-dark/60',
  },
  {
    id: 8,
    title: 'Emotional Farewell Moments',
    category: 'Emotions',
    description: 'The final chapter — tears, laughter, and eternal bonds',
    icon: HiOutlineHeart,
    gradient: 'from-blood/40 to-crimson-950/50',
  }
];

export default function MemoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from('.memories-title', {
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

      // Parallax effect on cards
      const cards = sectionRef.current.querySelectorAll('.memory-card-wrapper');
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: 1,
          },
          y: 40 + (i % 2 === 0 ? 20 : 0),
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6"
      id="memories-section"
    >
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at 30% 40%, rgba(220, 20, 60, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 70%, rgba(139, 0, 0, 0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 10%, rgba(220, 20, 60, 0.03) 0%, transparent 40%)
        `,
      }} />

      {/* Title */}
      <div className="memories-title text-center mb-16 sm:mb-24">
        {/* Ornamental top */}
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
          WHAT AWAITS YOU
        </span>
        <h2 className="section-title text-4xl sm:text-5xl md:text-6xl text-gradient-crimson glow-text-crimson">
          EVENT HIGHLIGHTS
        </h2>
        <p className="font-inter text-base sm:text-lg text-white/40 mt-4 tracking-wide max-w-lg mx-auto">
          An unforgettable lineup of experiences at Vivarta
        </p>
      </div>

      {/* Memory grid — redesigned */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="memory-card-wrapper"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <MemoryCard
              title={memory.title}
              category={memory.category}
              description={memory.description}
              icon={memory.icon}
              gradient={memory.gradient}
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
