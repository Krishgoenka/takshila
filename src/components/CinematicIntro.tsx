'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-config';
import { useAppState } from '@/providers/AppStateProvider';

const playSlashSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // 1. The metallic "shing" (blade ring)
    const ringDur = 0.4;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'sine';
    
    // High metallic frequencies that slide down slightly
    osc1.frequency.setValueAtTime(3200, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + ringDur);
    osc2.frequency.setValueAtTime(4500, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + ringDur);

    const ringGain = ctx.createGain();
    ringGain.gain.setValueAtTime(0, ctx.currentTime);
    ringGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.02); // very sharp attack
    ringGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + ringDur);

    osc1.connect(ringGain);
    osc2.connect(ringGain);
    ringGain.connect(ctx.destination);
    
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + ringDur);
    osc2.stop(ctx.currentTime + ringDur);

    // 2. The air "whoosh" (blade swinging)
    const whooshDur = 0.25;
    const bufferSize = ctx.sampleRate * whooshDur;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1000, ctx.currentTime);
    noiseFilter.frequency.linearRampToValueAtTime(3000, ctx.currentTime + 0.1);
    noiseFilter.frequency.linearRampToValueAtTime(500, ctx.currentTime + whooshDur);
    noiseFilter.Q.value = 2;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(1.2, ctx.currentTime + 0.1); // Swell
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + whooshDur);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + whooshDur);

  } catch (e) {
    console.warn('Audio play failed', e);
  }
};


export default function CinematicIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { introComplete, setIntroComplete } = useAppState();
  const [isVisible, setIsVisible] = useState(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Ember particle system for intro
  useEffect(() => {
    if (introComplete) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 80;

    interface IntroParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;
    }

    const particles: IntroParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 1 + 0.3),
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      life: Math.random() * 100,
      maxLife: Math.random() * 200 + 80,
    }));

    let frameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.01;
        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * (1 - lifeRatio);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `rgba(255, 80, 80, ${alpha})`);
        grad.addColorStop(0.5, `rgba(220, 20, 60, ${alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(220, 20, 60, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -50) {
          p.x = Math.random() * window.innerWidth;
          p.y = window.innerHeight + Math.random() * 100;
          p.life = 0;
          p.opacity = Math.random() * 0.6 + 0.2;
        }
      });
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [introComplete]);

  // Main GSAP cinematic timeline
  useEffect(() => {
    if (introComplete) return;
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroComplete();
        setTimeout(() => setIsVisible(false), 500);
      },
    });
    timelineRef.current = tl;

    // Phase 1: Black screen with embers (0-1.5s)
    tl.set('.intro-vivarta', { opacity: 0, scale: 0.8 })
      .set('.intro-takshila', { opacity: 0, scale: 0.8 })
      .set('.intro-slash-1', { scaleX: 0, opacity: 0 })
      .set('.intro-slash-2', { scaleX: 0, opacity: 0 })
      .set('.intro-glitch', { opacity: 0 })
      .set('.intro-subtitle', { opacity: 0, y: 30 });

    // Phase 2: VIVARTA reveal (1.5-3.5s)
    tl.to('.intro-vivarta', {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'power4.out',
    }, 1.5);

    // Phase 3: Glitch distortion (3.5-4s)
    tl.to('.intro-glitch', {
      opacity: 1,
      duration: 0.05,
    }, 3.5)
    .to('.intro-glitch', {
      opacity: 0,
      duration: 0.05,
    }, 3.55)
    .to('.intro-glitch', {
      opacity: 1,
      duration: 0.05,
    }, 3.65)
    .to('.intro-glitch', {
      opacity: 0,
      duration: 0.05,
    }, 3.7)
    .to('.intro-vivarta', {
      x: -5,
      duration: 0.05,
    }, 3.5)
    .to('.intro-vivarta', {
      x: 5,
      duration: 0.05,
    }, 3.55)
    .to('.intro-vivarta', {
      x: 0,
      duration: 0.05,
    }, 3.6);

    // Phase 4: Screen flicker
    tl.to('.intro-flicker', {
      opacity: 0.3,
      duration: 0.05,
    }, 3.8)
    .to('.intro-flicker', {
      opacity: 0,
      duration: 0.1,
    }, 3.85)
    .to('.intro-flicker', {
      opacity: 0.15,
      duration: 0.05,
    }, 3.95)
    .to('.intro-flicker', {
      opacity: 0,
      duration: 0.1,
    }, 4.0);

    // Phase 5: First slash (4.2-4.6s)
    tl.call(playSlashSound, [], 4.2);
    tl.to('.intro-slash-1', {
      scaleX: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power4.in',
    }, 4.2);

    // Screen shake during slash
    tl.to(container, {
      x: -8,
      duration: 0.05,
    }, 4.3)
    .to(container, {
      x: 10,
      duration: 0.05,
    }, 4.35)
    .to(container, {
      x: -6,
      duration: 0.05,
    }, 4.4)
    .to(container, {
      x: 4,
      duration: 0.05,
    }, 4.45)
    .to(container, {
      x: 0,
      duration: 0.1,
    }, 4.5);

    // Fade out VIVARTA
    tl.to('.intro-vivarta', {
      opacity: 0,
      scale: 1.1,
      duration: 0.3,
    }, 4.3);

    // Fade out slash
    tl.to('.intro-slash-1', {
      opacity: 0,
      duration: 0.3,
    }, 4.6);

    // Phase 6: TAKSHILA reveal (4.8-6.5s)
    tl.to('.intro-takshila', {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power4.out',
    }, 4.8);

    // Subtitle reveal
    tl.to('.intro-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, 5.5);

    // Phase 7: Second slash and exit (6.5-8s)
    tl.call(playSlashSound, [], 7.0);
    tl.to('.intro-slash-2', {
      scaleX: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power4.in',
    }, 7.0);

    // Screen shake
    tl.to(container, {
      x: -6,
      duration: 0.05,
    }, 7.1)
    .to(container, {
      x: 8,
      duration: 0.05,
    }, 7.15)
    .to(container, {
      x: 0,
      duration: 0.1,
    }, 7.2);

    // Final fade out
    tl.to(container, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 7.5);

    return () => {
      tl.kill();
    };
  }, [introComplete, setIntroComplete]);

  // Skip intro on click
  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
  };

  if (!isVisible && introComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleSkip}
      id="cinematic-intro"
    >
      {/* Ember particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        style={{ willChange: 'transform' }}
      />

      {/* Glitch overlay */}
      <div className="intro-glitch absolute inset-0 z-[5]">
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(220,20,60,0.03) 0px, transparent 2px, transparent 4px)',
          }}
        />
        <div
          className="absolute top-[30%] left-0 right-0 h-[2px]"
          style={{ background: 'rgba(220, 20, 60, 0.4)' }}
        />
        <div
          className="absolute top-[70%] left-0 right-0 h-[1px]"
          style={{ background: 'rgba(220, 20, 60, 0.3)' }}
        />
      </div>

      {/* Screen flicker */}
      <div className="intro-flicker absolute inset-0 z-[4] bg-white opacity-0" />

      {/* Energy streaks */}
      <div className="absolute inset-0 z-[3] overflow-hidden">
        <div
          className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(220, 20, 60, 0.2), transparent)',
          }}
        />
      </div>

      {/* VIVARTA logo */}
      <div className="intro-vivarta absolute z-[10] flex flex-col items-center justify-center">
        <img
          src="/Vivarta_White (1).png"
          alt="Vivarta"
          className="w-[200px] sm:w-[280px] md:w-[350px] lg:w-[420px] h-auto object-contain"
          style={{
            filter:
              'drop-shadow(0 0 30px rgba(220, 20, 60, 0.8)) drop-shadow(0 0 60px rgba(220, 20, 60, 0.4)) drop-shadow(0 0 100px rgba(220, 20, 60, 0.2))',
          }}
        />
        <div className="mt-5 flex items-center justify-center gap-4">
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-crimson-500" />
          <span className="label-text text-sm text-crimson-400 tracking-widest">
            PRESENTS
          </span>
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-crimson-500" />
        </div>
      </div>

      {/* TAKSHILA logo */}
      <div className="intro-takshila absolute z-[10] flex flex-col items-center justify-center">
        <img
          src="/Takshila_White.png"
          alt="Takshila"
          className="w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto object-contain"
          style={{
            filter:
              'drop-shadow(0 0 20px rgba(192, 192, 192, 0.5)) drop-shadow(0 0 40px rgba(192, 192, 192, 0.2))',
          }}
        />
        <div className="intro-subtitle mt-6">
          <p className="font-grotesk text-base sm:text-lg md:text-xl tracking-widest text-crimson-400 font-semibold uppercase">
            FAREWELL 2026
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-crimson-600" />
            <div className="w-2 h-2 rotate-45 border border-crimson-500" />
            <div className="w-8 h-[1px] bg-crimson-600" />
          </div>
        </div>
      </div>

      {/* Slash 1 */}
      <div
        className="intro-slash-1 absolute z-[15] w-[150%] h-[3px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(220, 20, 60, 0.8), #DC143C, rgba(220, 20, 60, 0.8), transparent)',
          transform: 'translateX(-50%) translateY(-50%) rotate(-15deg)',
          boxShadow: '0 0 20px rgba(220, 20, 60, 0.6), 0 0 40px rgba(220, 20, 60, 0.3)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* Slash 2 */}
      <div
        className="intro-slash-2 absolute z-[15] w-[150%] h-[3px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(220, 20, 60, 0.8), #DC143C, rgba(220, 20, 60, 0.8), transparent)',
          transform: 'translateX(-50%) translateY(-50%) rotate(15deg)',
          boxShadow: '0 0 20px rgba(220, 20, 60, 0.6), 0 0 40px rgba(220, 20, 60, 0.3)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* Ambient red light from bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(220, 20, 60, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Skip indicator */}
      <div className="absolute bottom-8 right-8 z-[20]">
        <span className="font-inter text-xs text-white/40 tracking-wider uppercase">
          Tap to skip
        </span>
      </div>
    </div>
  );
}
