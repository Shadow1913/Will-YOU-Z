
import React from 'react';
import { motion } from 'framer-motion';
import { MOMENTS } from '../constants.tsx';

const Jar: React.FC<{ moment: typeof MOMENTS[0] }> = ({ moment }) => (
  <motion.div 
    whileHover={{ y: -20, scale: 1.05 }}
    className="flex-shrink-0 w-80 group cursor-pointer"
  >
    <div className="relative h-96 bg-gradient-to-b from-white/10 to-transparent rounded-t-[100px] rounded-b-3xl border border-white/10 p-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Jar Gloss Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      
      {/* Floating Object */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="mb-8 p-6 rounded-full bg-white/5 shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all"
      >
        {moment.icon}
      </motion.div>

      <h4 className="text-lg font-medium text-white/80 group-hover:text-white transition-colors text-center mb-2">
        {moment.label}
      </h4>
      <p className="text-sm text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 italic">
        {moment.description}
      </p>
    </div>
  </motion.div>
);

const Moments: React.FC = () => {
  return (
    <section className="py-32 px-4 overflow-hidden bg-black/30">
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-bold serif mb-4"
        >
          Shared Echoes
        </motion.h2>
        <p className="text-gray-400 font-light italic">Small jars holding moments that left a lasting imprint.</p>
      </div>

      <div className="flex gap-12 overflow-x-auto pb-12 px-4 no-scrollbar mask-gradient">
        {MOMENTS.map((m) => (
          <Jar key={m.id} moment={m} />
        ))}
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
};

export default Moments;
