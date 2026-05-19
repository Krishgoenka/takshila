'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  hue: number;
}

interface EmberParticlesProps {
  count?: number;
  className?: string;
  color?: string;
  speed?: number;
}

export default function EmberParticles({
  count = 80,
  className = '',
  speed = 1,
}: EmberParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const createParticle = useCallback(
    (canvas: HTMLCanvasElement): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5 * speed,
        vy: -(Math.random() * 1.5 + 0.5) * speed,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        life: 0,
        maxLife: Math.random() * 200 + 100,
        hue: Math.random() * 20 - 10, // slight hue variation around red
      };
    },
    [speed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Determine particle count based on device
    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.floor(count * 0.4) : count;

    // Initialize particles
    particlesRef.current = Array.from({ length: actualCount }, () =>
      createParticle(canvas)
    );

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.02;

        const lifeRatio = p.life / p.maxLife;
        const currentOpacity = p.opacity * (1 - lifeRatio);

        // Draw ember glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        );
        gradient.addColorStop(0, `hsla(${355 + p.hue}, 90%, 55%, ${currentOpacity})`);
        gradient.addColorStop(0.4, `hsla(${355 + p.hue}, 85%, 45%, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${355 + p.hue}, 80%, 30%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${20 + p.hue}, 100%, 70%, ${currentOpacity})`;
        ctx.fill();

        // Reset particle if dead
        if (p.life >= p.maxLife || p.y < -50) {
          particlesRef.current[i] = createParticle(canvas);
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [count, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
}
