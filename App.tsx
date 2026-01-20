
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppStage } from './types.ts';
import { HER_NAME, YOUR_NAME, TAGLINE } from './constants.tsx';
import BackgroundEffect from './components/BackgroundEffect.tsx';
import Constellation from './components/Constellation.tsx';
import Zodiac from './components/Zodiac.tsx';
import Moments from './components/Moments.tsx';
import { ChevronDown, Volume2, VolumeX, ExternalLink } from 'lucide-react';

const TypingText: React.FC<{ text: string; className?: string; stagger?: number; delay?: number }> = ({ text, className, stagger = 0.05, delay = 0 }) => {
  const characters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20 },
  };
  return (
    <motion.span variants={container} initial="hidden" animate="visible" className={`flex flex-wrap justify-center ${className}`}>
      {characters.map((char, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.VEIL);
  const [isMuted, setIsMuted] = useState(true);
  const [showTagline, setShowTagline] = useState(false);
  const [showFinalLink, setShowFinalLink] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  useEffect(() => {
    if (stage === AppStage.MAIN) {
      setTimeout(() => setShowTagline(true), 2000);
    }
    if (stage === AppStage.CLOSURE) {
      const timer = setTimeout(() => setShowFinalLink(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const initAudio = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNode.current = audioContext.current.createGain();
      gainNode.current.connect(audioContext.current.destination);
      gainNode.current.gain.setValueAtTime(0, audioContext.current.currentTime);

      oscillator.current = audioContext.current.createOscillator();
      oscillator.current.type = 'sine';
      oscillator.current.frequency.setValueAtTime(110, audioContext.current.currentTime);
      oscillator.current.connect(gainNode.current);
      oscillator.current.start();
    }
    
    if (isMuted) {
      gainNode.current?.gain.linearRampToValueAtTime(0.05, audioContext.current!.currentTime + 1);
      setIsMuted(false);
    } else {
      gainNode.current?.gain.linearRampToValueAtTime(0, audioContext.current!.currentTime + 1);
      setIsMuted(true);
    }
  };

  const handleBegin = () => {
    if (isMuted) initAudio();
    setStage(AppStage.MAIN);
  };

  const handleClosure = () => {
    setStage(AppStage.CLOSURE);
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundEffect stage={stage} />

      {stage !== AppStage.VEIL && stage !== AppStage.CLOSURE && (
        <button 
          onClick={initAudio}
          className="fixed top-8 right-8 z-50 p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gray-400 hover:text-white transition-all shadow-xl"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {stage === AppStage.VEIL && (
          <motion.div
            key="veil"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="relative mb-24">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
                className="text-[18rem] md:text-[24rem] serif text-white/5 select-none pointer-events-none"
              >
                {HER_NAME.charAt(0)}
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-full h-full border-t border-white/30 rounded-full"
                  />
                  <span className="text-white/40 tracking-[0.5em] text-xs uppercase serif">The Void</span>
                </motion.div>
              </div>
            </div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              whileHover={{ scale: 1.05, letterSpacing: '0.3em', backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBegin}
              className="px-12 py-4 border border-white/20 text-white/60 rounded-full tracking-[0.2em] text-xs uppercase transition-all backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              Enter {HER_NAME}'s Constellation
            </motion.button>
          </motion.div>
        )}

        {stage === AppStage.MAIN && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
            <section className="h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden">
              <div className="text-center w-full max-w-5xl mx-auto">
                <div className="text-7xl md:text-9xl font-bold serif mb-10 tracking-tight flex justify-center">
                  <TypingText text={HER_NAME} stagger={0.15} delay={0.5} />
                </div>
                
                <div className="h-16 flex justify-center overflow-hidden">
                  <AnimatePresence>
                    {showTagline && (
                      <TypingText 
                        text={TAGLINE} 
                        stagger={0.03} 
                        className="text-xl md:text-2xl text-gray-500 font-light italic tracking-widest max-w-3xl"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4, y: [0, 15, 0] }}
                transition={{ 
                  opacity: { delay: 4, duration: 2 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-16 flex flex-col items-center gap-4"
              >
                <div className="h-12 w-px bg-gradient-to-b from-white to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.4em]">Descend into Light</span>
              </motion.div>
            </section>

            <Constellation />
            <Zodiac />
            <Moments />

            <section className="min-h-screen flex flex-col items-center justify-center px-8 bg-black/40 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
              <div className="max-w-3xl z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
                  <p className="text-white/20 mb-12 uppercase tracking-[0.6em] text-[10px]">A Digital Love Letter</p>
                  <h2 className="text-4xl md:text-5xl serif leading-relaxed mb-16 font-light text-white/90">
                    This space exists as a fraction of the <span className="text-white font-normal underline decoration-white/20 underline-offset-8">inspiration</span> you ignite.<br/>
                    In a galaxy of ordinary, you remain the brightest constant.
                  </h2>
                  <p className="text-gray-500 italic mb-20 tracking-widest text-sm">— {YOUR_NAME}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255,255,255,0.1)' }}
                    onClick={handleClosure}
                    className="px-12 py-5 bg-white text-black rounded-full font-bold tracking-widest uppercase text-xs transition-all"
                  >
                    Close this chapter, but the story continues...
                  </motion.button>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {stage === AppStage.CLOSURE && (
          <motion.div key="closure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white text-black p-8 text-center">
            <div className="max-w-2xl flex flex-col items-center gap-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="text-4xl md:text-6xl serif font-light italic"
              >
                Have a wonderful day, {HER_NAME}.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="h-px w-12 bg-black/10" />
                <p className="text-2xl md:text-3xl serif italic text-gray-800 tracking-tight">
                  Ghumne Chalogye Mere Sath?
                </p>
              </motion.div>
              
              <AnimatePresence>
                {showFinalLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-6 mt-12"
                  >
                    <div className="h-px w-24 bg-black/10" />
                    <p className="text-sm text-gray-400 tracking-widest uppercase font-light">Continue the journey through the stars</p>
                    <a 
                      href="https://stellarium-web.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-6 py-3 border border-black/20 rounded-full hover:bg-black hover:text-white transition-all text-sm font-medium tracking-wide"
                    >
                      Explore Stellarium <ExternalLink className="w-4 h-4" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .serif { font-family: 'Playfair Display', serif; }
        .canvas-container { z-index: -1; }
      `}</style>
    </div>
  );
};

export default App;
