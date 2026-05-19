'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap-config';

interface TributeCardProps {
  name: string;
  role: string;
  message: string;
  index: number;
}

export default function TributeCard({ name, role, message, index }: TributeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Hover animation
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
        transformPerspective: 1000,
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

  // Generate initials
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden transition-all duration-500"
        style={{
          clipPath: 'polygon(0% 0%, 92% 0%, 100% 8%, 100% 100%, 8% 100%, 0% 92%)',
        }}
      >
        {/* Card background */}
        <div className="absolute inset-0" style={{
          background: isHovered
            ? 'linear-gradient(135deg, rgba(30, 5, 10, 0.95), rgba(15, 0, 0, 0.9))'
            : 'linear-gradient(135deg, rgba(18, 18, 18, 0.9), rgba(8, 8, 8, 0.95))',
          transition: 'background 0.7s ease',
        }} />

        {/* Subtle diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(45deg, rgba(220,20,60,0.5) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }} />

        <div className="relative p-6 sm:p-8">
          {/* Top accent line */}
          <div className="absolute top-0 left-[8%] right-0 h-[1px] bg-gradient-to-r from-crimson-500/40 to-transparent transition-all duration-700 group-hover:from-crimson-400/60" />

          {/* Avatar/Initials + Info */}
          <div className="relative mb-6 flex items-center gap-5">
            {/* Hexagonal avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-16 h-16 sm:w-[72px] sm:h-[72px] flex items-center justify-center overflow-hidden transition-all duration-700"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(220, 20, 60, 0.5), rgba(139, 0, 0, 0.4))'
                    : 'linear-gradient(135deg, rgba(35, 35, 35, 0.9), rgba(20, 20, 20, 0.95))',
                  border: 'none',
                }}
              >
                <span
                  className="font-grotesk text-xl sm:text-2xl font-bold transition-colors duration-500"
                  style={{
                    color: isHovered ? '#ffffff' : 'rgba(220, 20, 60, 0.65)',
                  }}
                >
                  {initials}
                </span>
              </div>
              {/* Glow ring on hover */}
              <div className="absolute -inset-1 transition-opacity duration-500 pointer-events-none" style={{
                opacity: isHovered ? 1 : 0,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                boxShadow: '0 0 25px rgba(220, 20, 60, 0.4)',
              }} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-grotesk text-xl sm:text-2xl text-white tracking-wide font-bold transition-all duration-500 group-hover:text-gradient-crimson leading-tight">
                {name}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-3 h-[1px] bg-crimson-500/40" />
                <p className="label-text text-[11px] text-crimson-500/60 tracking-wider">
                  {role}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="relative pl-2 border-l-2 border-crimson-800/25 group-hover:border-crimson-600/40 transition-colors duration-500">
            <p className="font-inter text-sm text-white/45 italic leading-relaxed group-hover:text-white/60 transition-colors duration-500">
              &ldquo;{message}&rdquo;
            </p>
          </div>

          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-crimson-700/20 transition-colors duration-500 group-hover:border-crimson-500/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-crimson-700/20 transition-colors duration-500 group-hover:border-crimson-500/40" />

          {/* Hover particles */}
          <div className="absolute top-5 right-6 w-1 h-1 rounded-full bg-crimson-500/40 transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0, animation: isHovered ? 'float 3s ease-in-out infinite' : 'none' }} />
          <div className="absolute bottom-10 right-5 w-0.5 h-0.5 rounded-full bg-crimson-400/50 transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0, animation: isHovered ? 'float 4s ease-in-out infinite' : 'none', animationDelay: '1s' }} />
        </div>

        {/* Border */}
        <div className="absolute inset-0 pointer-events-none transition-all duration-700" style={{
          clipPath: 'polygon(0% 0%, 92% 0%, 100% 8%, 100% 100%, 8% 100%, 0% 92%)',
          border: `1px solid rgba(220, 20, 60, ${isHovered ? 0.3 : 0.12})`,
          boxShadow: isHovered ? 'inset 0 0 30px rgba(220, 20, 60, 0.06)' : 'none',
        }} />
      </div>

      {/* External glow */}
      <div className="absolute inset-0 -z-10 blur-2xl transition-opacity duration-700"
        style={{ background: 'rgba(220, 20, 60, 0.1)', opacity: isHovered ? 0.5 : 0 }} />
    </div>
  );
}
