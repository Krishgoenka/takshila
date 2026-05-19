'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap-config';
import { IconType } from 'react-icons';

interface MemoryCardProps {
  title: string;
  category: string;
  description: string;
  icon: IconType;
  gradient: string;
  index: number;
}

export default function MemoryCard({ title, category, description, icon: Icon, gradient, index }: MemoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt effect (desktop only)
  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.5,
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
    <div
      ref={cardRef}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative overflow-hidden rounded-sm" style={{
        clipPath: 'polygon(0% 0%, 92% 0%, 100% 8%, 100% 100%, 8% 100%, 0% 92%)',
      }}>
        {/* Layered background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(220,20,60,0.3) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(220,20,60,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }} />

        {/* Content */}
        <div className="relative min-h-[220px] sm:min-h-[260px] flex flex-col justify-between p-6 sm:p-7">
          {/* Top section — icon + category */}
          <div>
            <div className="w-12 h-12 flex items-center justify-center border border-crimson-700/30 bg-black/40 rounded-sm mb-3 group-hover:border-crimson-500/50 group-hover:bg-crimson-950/30 transition-all duration-500">
              <Icon className="w-5 h-5 text-crimson-400 group-hover:text-crimson-300 transition-colors duration-500" />
            </div>
            <span className="label-text text-[10px] text-crimson-400/50 tracking-wider">
              {category}
            </span>
          </div>

          {/* Bottom section — title + description */}
          <div className="transform transition-transform duration-500 group-hover:translate-y-[-4px]">
            <h3 className="font-grotesk text-xl sm:text-2xl text-white font-bold tracking-wide mb-2">
              {title}
            </h3>
            <p className="font-inter text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-500">
              {description}
            </p>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-crimson-500/20 transition-colors duration-500 group-hover:border-crimson-400/50" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-crimson-500/20 transition-colors duration-500 group-hover:border-crimson-400/50" />

        {/* Hover border glow */}
        <div className="absolute inset-0 pointer-events-none transition-all duration-700 rounded-sm" style={{
          boxShadow: isHovered
            ? 'inset 0 0 40px rgba(220, 20, 60, 0.12), 0 0 30px rgba(220, 20, 60, 0.1)'
            : 'inset 0 0 0px transparent',
          border: isHovered ? '1px solid rgba(220, 20, 60, 0.25)' : '1px solid transparent',
          clipPath: 'polygon(0% 0%, 92% 0%, 100% 8%, 100% 100%, 8% 100%, 0% 92%)',
        }} />
      </div>

      {/* External glow */}
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-500 blur-xl"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: 'rgba(220, 20, 60, 0.12)',
        }}
      />
    </div>
  );
}
