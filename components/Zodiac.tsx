
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ZODIAC_ITEMS, HER_NAME } from '../constants.tsx';
import { X, ChevronRight, Sparkles, Scissors, Play } from 'lucide-react';

const CoffeeAnimation = () => (
  <div className="relative flex flex-col items-center">
    <div className="relative w-24 h-16 bg-white/10 rounded-b-3xl border-2 border-white/20">
      <div className="absolute -right-4 top-2 w-6 h-8 border-2 border-l-0 border-white/20 rounded-r-full" />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute -top-8 w-1 h-8 bg-white/40 blur-[2px] rounded-full"
          style={{ left: `${25 + i * 25}%` }}
          animate={{
            y: [-10, -30],
            opacity: [0, 1, 0],
            x: [0, (i - 1) * 5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
    <p className="mt-4 text-sm font-light italic text-gray-400">Extra steam, extra comfort.</p>
  </div>
);

const FoodAnimation = () => (
  <div className="flex flex-col items-center gap-6">
    <div className="flex gap-4">
      <motion.div 
        animate={{ rotate: [0, 5, -5, 0] }} 
        transition={{ duration: 3, repeat: Infinity }}
        className="w-16 h-16 bg-pink-400/20 rounded-full flex items-center justify-center border border-pink-400/30"
      >
        🍦
      </motion.div>
      <motion.div 
        animate={{ y: [0, -5, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center border border-yellow-400/30"
      >
        🥟
      </motion.div>
    </div>
    <div className="text-center bg-white/5 p-4 rounded-xl border border-white/10">
      <p className="text-white font-serif italic text-lg">"Ice Cream & Momos"</p>
    </div>
  </div>
);

const DestinationAnimation = () => (
  <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
    <motion.div 
      initial={{ x: -100, y: 50, opacity: 0 }}
      animate={{ x: 100, y: -50, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute text-4xl"
    >
      ✈️
    </motion.div>
    <div className="text-center z-10">
      <h4 className="text-2xl font-bold serif mb-2">Germany</h4>
      <div className="flex justify-center gap-1">
        <div className="w-8 h-1 bg-black" />
        <div className="w-8 h-1 bg-red-600" />
        <div className="w-8 h-1 bg-yellow-400" />
      </div>
    </div>
  </div>
);

const TalentAnimation = () => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="relative w-64 h-32 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group"
        onClick={() => setRevealed(!revealed)}
      >
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div 
              key="hidden"
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <div className="p-4 bg-white/10 rounded-full mb-2">🧩</div>
              <p className="text-xs tracking-widest uppercase text-gray-500 group-hover:text-white transition-colors">Tap to reveal talent</p>
            </motion.div>
          ) : (
            <motion.div 
              key="revealed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-4"
            >
              <p className="text-2xl font-bold italic serif mb-1">"Dumb and Lazy"</p>
              <p className="text-xs text-gray-500 tracking-tighter">— A specialized skill set 😂</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const EditingAnimation = () => (
  <div className="flex flex-col items-center w-full max-w-sm">
    <div className="relative w-full aspect-video bg-black/60 rounded-xl border border-white/10 overflow-hidden mb-8 shadow-2xl">
      {/* Viewport simulation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div 
           animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.7, 0.3] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-purple-500/10 to-transparent"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-dashed border-white/5 rounded-full"
        />
        <div className="z-10 flex flex-col items-center">
            <motion.div
               animate={{ y: [-2, 2, -2] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            </motion.div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-4 font-mono">Rendering Magic...</div>
        </div>
      </div>

      {/* Frame counters */}
      <div className="absolute top-2 left-2 flex gap-1 items-center">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[8px] font-mono text-white/30">REC 00:00:24:12</span>
      </div>
      
      {/* Timeline Controls Overlay */}
      <div className="absolute bottom-2 right-2 flex gap-3 opacity-40">
        <Scissors className="w-3 h-3 text-white" />
        <Play className="w-3 h-3 text-white fill-current" />
      </div>
    </div>

    {/* Timeline Interface */}
    <div className="w-full h-12 bg-white/5 border border-white/10 rounded-lg relative overflow-hidden px-2 py-1 flex items-center gap-1">
      {/* Timeline blocks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="h-full bg-white/10 rounded-sm"
          style={{ width: `${Math.random() * 40 + 20}px` }}
          animate={{
            backgroundColor: ["rgba(255,255,255,0.05)", "rgba(250,204,21,0.2)", "rgba(255,255,255,0.05)"]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      
      {/* Playhead */}
      <motion.div 
        animate={{ left: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-px bg-yellow-400 shadow-[0_0_10px_#facc15] z-20 pointer-events-none"
      />
      
      {/* Audio Waveform simulation */}
      <div className="absolute bottom-1 left-0 right-0 h-2 flex items-end justify-center gap-[1px] opacity-20">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i} 
            className="w-[2px] bg-white rounded-full" 
            style={{ height: `${Math.random() * 100}%` }} 
          />
        ))}
      </div>
    </div>
    
    <p className="mt-6 text-sm font-light italic text-gray-400 px-4">
      "Every frame is a brushstroke. Every cut is a heartbeat."
    </p>
  </div>
);

const Zodiac: React.FC = () => {
  const [activeItem, setActiveItem] = useState<typeof ZODIAC_ITEMS[0] | null>(null);
  const rotation = useMotionValue(0);
  
  const handleDrag = (_: any, info: any) => {
    rotation.set(rotation.get() + info.delta.x * 0.5);
  };

  const renderContent = (id: string) => {
    switch(id) {
      case 'coffee': return <CoffeeAnimation />;
      case 'food': return <FoodAnimation />;
      case 'destination': return <DestinationAnimation />;
      case 'talent': return <TalentAnimation />;
      case 'editing': return <EditingAnimation />;
      default: return null;
    }
  };

  return (
    <section className="min-h-screen py-32 flex flex-col items-center justify-center relative bg-[#080808]">
      <div className="text-center mb-16 px-8 z-10">
        <h2 className="text-4xl md:text-5xl font-bold serif mb-4">The Zodiac of {HER_NAME}</h2>
        <p className="text-gray-500 font-light italic tracking-wide max-w-md mx-auto">
          Drag the lunar wheel to rotate. Explore the orbits of her favorite things.
        </p>
      </div>

      <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center">
        {/* Central Glowing Moon */}
        <div className="absolute w-48 h-48 md:w-72 md:h-72 bg-gradient-to-tr from-white/5 to-white/10 rounded-full blur-3xl opacity-30 animate-pulse" />
        
        {/* Draggable Wheel */}
        <motion.div 
          style={{ rotate: rotation }}
          drag="x"
          onDrag={handleDrag}
          dragConstraints={{ left: 0, right: 0 }}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {ZODIAC_ITEMS.map((item, index) => {
            const angle = (index / ZODIAC_ITEMS.length) * 360;
            return (
              <motion.div
                key={item.id}
                className="absolute"
                style={{
                  transform: `rotate(${angle}deg) translate(${window.innerWidth < 768 ? 120 : 200}px) rotate(-${angle}deg)`
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.2, boxShadow: `0 0 30px ${item.color}44` }}
                  onClick={() => setActiveItem(item)}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#111] border border-white/10 flex flex-col items-center justify-center gap-1 shadow-2xl group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: item.color }} />
                  <div style={{ color: item.color }}>{item.icon}</div>
                  <span className="text-[8px] uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors">{item.id}</span>
                </motion.button>
              </motion.div>
            );
          })}
          
          {/* Wheel Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            <circle cx="50%" cy="50%" r={window.innerWidth < 768 ? "120" : "200"} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" />
          </svg>
        </motion.div>

        {/* Center Label */}
        <div className="absolute pointer-events-none flex flex-col items-center">
            <div className="w-1 h-12 bg-gradient-to-t from-white/20 to-transparent mb-2" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Drag to Shift</span>
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-8"
            onClick={() => setActiveItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg bg-[#0d0d0d] rounded-3xl border border-white/10 p-10 relative overflow-hidden text-center"
              onClick={e => e.stopPropagation()}
            >
              {/* Visual Flair */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <button 
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center">
                <div className="p-4 rounded-2xl bg-white/5 mb-6" style={{ color: activeItem.color }}>
                  {activeItem.icon}
                </div>
                <h3 className="text-3xl font-bold serif mb-4">{activeItem.title}</h3>
                <p className="text-gray-400 font-light italic text-lg leading-relaxed mb-12">
                  &ldquo;{activeItem.content}&rdquo;
                </p>

                <div className="w-full min-h-[220px] flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 p-6">
                  {renderContent(activeItem.id)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Zodiac;
