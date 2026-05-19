'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiShare2, FiUser } from 'react-icons/fi';
import { generatePoster, downloadPoster, sharePoster } from '@/lib/poster-canvas';

type GeneratorStep = 'input' | 'generating' | 'preview';

export default function PosterGenerator() {
  const [step, setStep] = useState<GeneratorStep>('input');
  const [name, setName] = useState('');
  const [posterDataUrl, setPosterDataUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!name.trim()) return;

    setStep('generating');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const dataUrl = await generatePoster({
        name: name.trim(),
      });
      setPosterDataUrl(dataUrl);
      setStep('preview');
    } catch (err) {
      console.error('Poster generation failed:', err);
      setStep('input');
    }
  };

  const handleReset = () => {
    setStep('input');
    setName('');
    setPosterDataUrl(null);
  };

  return (
    <section
      className="relative py-24 sm:py-32 px-4 sm:px-6"
      id="poster-generator"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(220, 20, 60, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 80%, rgba(139, 0, 0, 0.03) 0%, transparent 40%)
        `,
      }} />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-14 sm:mb-20"
      >
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
          GET YOUR TICKET
        </span>
        <h2 className="section-title text-4xl sm:text-5xl md:text-6xl text-gradient-crimson glow-text-crimson">
          OFFICIAL INVITATION
        </h2>
        <p className="font-inter text-base sm:text-lg text-white/40 mt-4 tracking-wide max-w-md mx-auto">
          Generate your personalized invitation pass
        </p>
      </motion.div>

      {/* Generator container */}
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {/* STEP 1: Input */}
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-sm"
              style={{
                clipPath: 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)',
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(15, 0, 0, 0.9), rgba(10, 10, 10, 0.95))',
                backdropFilter: 'blur(24px)',
              }} />

              {/* Border */}
              <div className="absolute inset-0 pointer-events-none" style={{
                clipPath: 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)',
                border: '1px solid rgba(220, 20, 60, 0.15)',
              }} />

              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-crimson-500/30" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-crimson-500/30" />

              <div className="relative p-7 sm:p-9">
                {/* Name input */}
                <div className="mb-9">
                  <label className="label-text text-xs text-crimson-500/60 tracking-wider block mb-3">
                    YOUR NAME
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-crimson-600/35" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      maxLength={30}
                      className="w-full bg-black/30 border border-crimson-800/20 rounded-sm py-4 pl-11 pr-4 font-inter text-white/90 placeholder:text-white/20 focus:outline-none focus:border-crimson-600/50 transition-colors text-lg"
                      id="name-input"
                    />
                  </div>
                </div>

                {/* Generate button */}
                <button
                  onClick={handleGenerate}
                  disabled={!name.trim()}
                  className="w-full py-5 font-grotesk text-base tracking-wider text-white uppercase transition-all duration-500 disabled:opacity-25 disabled:cursor-not-allowed group relative overflow-hidden font-bold"
                  style={{
                    background: name.trim()
                      ? 'linear-gradient(135deg, rgba(220, 20, 60, 0.35), rgba(139, 0, 0, 0.45))'
                      : 'rgba(26, 26, 26, 0.5)',
                    border: '1px solid rgba(220, 20, 60, 0.35)',
                    clipPath: 'polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)',
                    boxShadow: name.trim() ? '0 0 20px rgba(220, 20, 60, 0.2)' : 'none',
                  }}
                  id="generate-button"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson-500/15 to-transparent opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.5s' }} />
                  <span className="relative z-10">GENERATE INVITATION</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Generating */}
          {step === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-sm p-12 sm:p-16 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(15, 0, 0, 0.9), rgba(10, 10, 10, 0.95))' }}
            >
              <div className="absolute inset-0 border border-crimson-800/15 rounded-sm" />

              <div className="relative w-28 h-28 mx-auto mb-10">
                <div className="absolute inset-0 border-2 border-crimson-800/15 rounded-full" />
                <div className="absolute inset-0 border-2 border-transparent border-t-crimson-500 rounded-full" style={{ animation: 'spin 1s linear infinite' }} />
                <div className="absolute inset-3 border border-transparent border-b-crimson-400/40 rounded-full" style={{ animation: 'spin 1.5s linear infinite reverse' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-crimson-500 rounded-full animate-pulse-red" />
                </div>
              </div>

              <p className="font-grotesk text-base text-crimson-400/80 tracking-wider mb-2 font-bold uppercase">
                GENERATING
              </p>
              <p className="font-inter text-sm text-white/35">
                Crafting your farewell invitation...
              </p>

              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(220, 20, 60, 0.06) 0%, transparent 50%)',
                animation: 'glow-pulse 2s ease-in-out infinite',
              }} />
            </motion.div>
          )}

          {/* STEP 3: Preview */}
          {step === 'preview' && posterDataUrl && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative p-2 sm:p-3 rounded-sm" style={{
                background: 'linear-gradient(135deg, rgba(15, 0, 0, 0.9), rgba(10, 10, 10, 0.95))',
                border: '1px solid rgba(220, 20, 60, 0.2)',
                boxShadow: '0 0 30px rgba(220, 20, 60, 0.15), 0 0 60px rgba(0, 0, 0, 0.5)',
              }}>
                <img
                  src={posterDataUrl}
                  alt="Generated farewell invitation"
                  className="w-full h-auto rounded-sm"
                  id="poster-preview"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => downloadPoster(posterDataUrl, name)}
                  className="flex-1 flex items-center justify-center gap-2.5 py-5 font-grotesk text-sm tracking-wider text-white uppercase transition-all duration-300 hover:bg-crimson-900/30 font-bold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.3), rgba(139, 0, 0, 0.35))',
                    border: '1px solid rgba(220, 20, 60, 0.35)',
                    clipPath: 'polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)',
                    boxShadow: '0 0 15px rgba(220, 20, 60, 0.15)',
                  }}
                  id="download-button"
                >
                  <FiDownload className="w-4 h-4" />
                  DOWNLOAD
                </button>

                <button
                  onClick={() => sharePoster(posterDataUrl, name)}
                  className="flex-1 flex items-center justify-center gap-2.5 py-5 font-grotesk text-sm tracking-wider text-white uppercase transition-all duration-300 hover:bg-white/5 font-bold"
                  style={{
                    background: 'rgba(20, 20, 20, 0.8)',
                    border: '1px solid rgba(192, 192, 192, 0.15)',
                    clipPath: 'polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)',
                  }}
                  id="share-button"
                >
                  <FiShare2 className="w-4 h-4" />
                  SHARE
                </button>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-4 font-inter text-sm tracking-wider text-white/35 hover:text-white/55 transition-colors uppercase"
                id="create-another-button"
              >
                ← Create Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
