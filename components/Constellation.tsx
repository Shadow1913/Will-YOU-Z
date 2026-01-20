
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUALITIES } from '../constants.tsx';
import { X } from 'lucide-react';

const BinaryStar: React.FC = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute w-full h-full"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_#facc15]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_#fb923c]" />
    </motion.div>
    <div className="w-1 h-1 bg-white rounded-full opacity-50" />
  </div>
);

const SpiralGalaxy: React.FC = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="relative w-14 h-14"
  >
    <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-[50%] scale-y-50" />
    <div className="absolute inset-0 border border-indigo-400/20 rounded-[50%] scale-y-50 rotate-45" />
    <div className="absolute inset-2 bg-indigo-500/20 blur-xl rounded-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
  </motion.div>
);

const WarmSun: React.FC = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <motion.div 
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-yellow-300 rounded-full shadow-[0_0_30px_#f97316]"
    />
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-4 bg-yellow-400/40"
        style={{ rotate: `${i * 45}deg`, transformOrigin: 'center 20px' }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </div>
);

const NeutronStar: React.FC = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
    <motion.div 
      animate={{ scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 0.2, repeat: Infinity }}
      className="w-4 h-4 bg-cyan-200 rounded-full shadow-[0_0_20px_#22d3ee]"
    />
    <div className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rotate-45" />
    <div className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent -rotate-45" />
  </div>
);

const Constellation: React.FC = () => {
  const [selected, setSelected] = useState<typeof QUALITIES[0] | null>(null);

  const renderCelestialBody = (type: string) => {
    switch(type) {
      case 'binary': return <BinaryStar />;
      case 'galaxy': return <SpiralGalaxy />;
      case 'sun': return <WarmSun />;
      case 'neutron': return <NeutronStar />;
      default: return <div className="w-8 h-8 bg-white/20 rounded-full" />;
    }
  };

  return (
    <section className="min-h-screen py-24 px-8 relative overflow-hidden flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-center mb-20 z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 serif">The Celestial Atlas</h2>
        <p className="text-gray-400 max-w-lg mx-auto italic font-light">
          Each trait a unique world, radiating its own light across the cosmos.
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[700px] rounded-3xl overflow-visible">
        {/* Background Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <motion.path 
            d="M 25 30 L 70 25 L 80 70 L 45 60 L 25 30"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="5 5"
          />
        </svg>

        {QUALITIES.map((q) => (
          <motion.div
            key={q.id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="absolute z-10"
            style={{ left: `${q.position.x}%`, top: `${q.position.y}%` }}
          >
            <motion.button
              whileHover={{ scale: 1.3 }}
              onClick={() => setSelected(q)}
              className="relative group p-4"
            >
              {renderCelestialBody(q.type)}
              <motion.span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white/60">
                {q.title}
              </motion.span>
            </motion.button>
          </motion.div>
        ))}

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl p-8 z-[100]"
              onClick={() => setSelected(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-[#0a0a0a] p-12 rounded-3xl border border-white/10 max-w-xl relative shadow-[0_0_100px_rgba(255,255,255,0.05)] text-center"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex justify-center mb-10 scale-150">
                  {renderCelestialBody(selected.type)}
                </div>
                <h3 className="text-3xl font-bold mb-6 serif text-white tracking-wide">{selected.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-lg italic">
                  &ldquo;{selected.description}&rdquo;
                </p>
                <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Constellation;
