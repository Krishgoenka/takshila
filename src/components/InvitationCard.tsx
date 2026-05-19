'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { useGSAP } from '@gsap/react';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

const invitationDetails = [
  {
    icon: FiCalendar,
    label: 'Date',
    value: '31 May 2026',
    sublabel: 'Sunday',
  },
  {
    icon: FiClock,
    label: 'Time',
    value: '11:00 AM Onwards',
    sublabel: 'Be there to witness the legacy',
  },
  {
    icon: FiMapPin,
    label: 'Venue',
    value: 'Seminar Hall',
    sublabel: 'Techno India University',
  },
];

const staggerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function InvitationCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from('.invitation-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power4.out',
      });
    },
    { scope: sectionRef }
  );

  // 3D tilt effect on desktop
  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 6,
        rotateX: -y * 6,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1200,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6"
      id="invitation-section"
    >
      {/* Rich background layers */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(220, 20, 60, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 70%, rgba(139, 0, 0, 0.04) 0%, transparent 40%),
          radial-gradient(ellipse at 70% 80%, rgba(220, 20, 60, 0.03) 0%, transparent 40%)
        `,
      }} />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(220, 20, 60, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220, 20, 60, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Title block */}
        <div className="invitation-title text-center mb-12 sm:mb-16">
          {/* Takshila logo small */}
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            src="/Takshila_White.png"
            alt="Takshila"
            className="w-20 sm:w-28 h-auto mx-auto mb-6 object-contain"
            style={{ filter: 'drop-shadow(0 0 10px rgba(192, 192, 192, 0.3))' }}
          />

          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-crimson-500/50" />
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rotate-45 bg-crimson-500/40" />
              <div className="w-2 h-2 rotate-45 border border-crimson-500/60" />
              <div className="w-1 h-1 rotate-45 bg-crimson-500/40" />
            </div>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-crimson-500/50" />
          </div>

          <motion.div
            initial={{ opacity: 0, letterSpacing: '0em', scale: 1.1 }}
            whileInView={{ opacity: 1, letterSpacing: '0.15em', scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            className="label-text text-xs sm:text-sm text-crimson-400/80 block mb-4 uppercase tracking-[0.2em] relative"
          >
            <span className="relative z-10 drop-shadow-[0_0_10px_rgba(220,20,60,0.8)]">YOU ARE CORDIALLY INVITED</span>
            <div className="absolute inset-0 w-full h-[1px] bg-crimson-500/30 top-1/2 -translate-y-1/2 blur-sm" />
          </motion.div>

          <div className="relative inline-block perspective-1000 mt-2">
            {/* Split RGB glitch effect layers for FAREWELL 2026 */}
            <motion.h3
              initial={{ opacity: 0, x: -10, filter: 'blur(20px)', rotateX: 90 }}
              whileInView={{ opacity: 0.6, x: 2, filter: 'blur(2px)', rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, type: 'spring' }}
              className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bebas text-red-500 z-0 select-none mix-blend-screen tracking-widest"
            >
              FAREWELL 2026
            </motion.h3>
            <motion.h3
              initial={{ opacity: 0, x: 10, filter: 'blur(20px)', rotateX: 90 }}
              whileInView={{ opacity: 0.6, x: -2, filter: 'blur(2px)', rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.35, type: 'spring' }}
              className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bebas text-blue-500 z-0 select-none mix-blend-screen tracking-widest"
            >
              FAREWELL 2026
            </motion.h3>
            
            <motion.h3
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', rotateX: 90 }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4, type: 'spring', bounce: 0.4 }}
              className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bebas tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-crimson-900 drop-shadow-[0_0_20px_rgba(220,20,60,0.6)] z-10"
              style={{ WebkitTextStroke: '1px rgba(220, 20, 60, 0.3)' }}
            >
              FAREWELL 2026
            </motion.h3>
          </div>
          


          {/* Bottom divider */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-8 h-[1px] bg-crimson-700/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-crimson-600/30" />
            <div className="w-8 h-[1px] bg-crimson-700/30" />
          </div>
        </div>

        {/* THE Invitation Card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-sm overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card background layers */}
          <div className="absolute inset-0" style={{
            background: `
              linear-gradient(135deg, rgba(15, 0, 0, 0.9) 0%, rgba(30, 5, 10, 0.85) 50%, rgba(15, 0, 0, 0.9) 100%)
            `,
            backdropFilter: 'blur(30px)',
          }} />

          {/* Ornamental corner flourishes */}
          <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-crimson-500/60 to-transparent" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-crimson-500/60 to-transparent" />
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-crimson-400/40" />
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-crimson-500/60 to-transparent" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-crimson-500/60 to-transparent" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-crimson-400/40" />
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-crimson-500/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-crimson-500/60 to-transparent" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-crimson-400/40" />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20">
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-crimson-500/60 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-crimson-500/60 to-transparent" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-crimson-400/40" />
          </div>

          {/* Outer border */}
          <div className="absolute inset-0 border border-crimson-800/30 rounded-sm" />
          {/* Inner border */}
          <div className="absolute inset-3 sm:inset-4 border border-crimson-900/20 rounded-sm" />

          {/* Card content */}
          <div className="relative z-10 p-8 sm:p-10 md:p-12">
            {/* Card header with Vivarta emblem */}
            <div className="text-center mb-8 sm:mb-10">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                src="/Vivarta_White (1).png"
                alt="Vivarta"
                className="w-10 sm:w-12 h-auto mx-auto mb-4 object-contain"
                style={{ filter: 'drop-shadow(0 0 12px rgba(220, 20, 60, 0.5))' }}
              />
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="flex-1 max-w-[80px] h-[1px] bg-gradient-to-r from-transparent to-crimson-500/40" />
                <span className="label-text text-[10px] sm:text-xs text-crimson-400/60 tracking-widest">
                  EVENT DETAILS
                </span>
                <div className="flex-1 max-w-[80px] h-[1px] bg-gradient-to-l from-transparent to-crimson-500/40" />
              </div>
            </div>

            {/* Detail items */}
            <div className="space-y-7 sm:space-y-8">
              {invitationDetails.map((detail, i) => (
                <motion.div
                  key={detail.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerVariants}
                  className="flex items-start gap-4 sm:gap-5 group"
                >
                  {/* Icon container */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-crimson-700/30 bg-gradient-to-br from-crimson-950/40 to-black/60 rounded-sm group-hover:border-crimson-500/50 group-hover:from-crimson-900/30 transition-all duration-700">
                      <detail.icon className="w-5 h-5 sm:w-6 sm:h-6 text-crimson-400 group-hover:text-crimson-300 transition-colors duration-500" />
                    </div>
                    {/* Glow dot */}
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-crimson-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="label-text text-[10px] sm:text-xs text-crimson-500/60 tracking-wider mb-1.5">
                      {detail.label}
                    </p>
                    <p className="font-grotesk text-lg sm:text-xl md:text-2xl text-white font-bold tracking-wide">
                      {detail.value}
                    </p>
                    <p className="font-inter text-sm text-white/45 mt-1">
                      {detail.sublabel}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Card footer */}
            <div className="mt-10 sm:mt-12">
              {/* Ornamental divider */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-crimson-800/30 to-transparent" />
              </div>

              <p className="font-inter text-center text-sm sm:text-base text-white/35 tracking-wide italic leading-relaxed">
                &quot;Where memories become legacy,<br className="sm:hidden" /> and legends live forever.&quot;
              </p>

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-6 h-[1px] bg-crimson-700/30" />
                <div className="w-1 h-1 rotate-45 bg-crimson-600/30" />
                <div className="w-3 h-3 rotate-45 border border-crimson-600/25" />
                <div className="w-1 h-1 rotate-45 bg-crimson-600/30" />
                <div className="w-6 h-[1px] bg-crimson-700/30" />
              </div>
            </div>
          </div>

          {/* Ambient glow orbs */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-crimson-500/5 blur-3xl animate-float pointer-events-none" />
          <div
            className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-crimson-500/3 blur-3xl animate-float pointer-events-none"
            style={{ animationDelay: '3s' }}
          />

          {/* Edge glow */}
          <div className="absolute inset-0 pointer-events-none rounded-sm" style={{
            boxShadow: 'inset 0 0 60px rgba(220, 20, 60, 0.05), 0 0 40px rgba(220, 20, 60, 0.1), 0 0 80px rgba(0, 0, 0, 0.5)',
          }} />
        </motion.div>
      </div>
    </section>
  );
}
