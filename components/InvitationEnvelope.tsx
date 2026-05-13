'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';

const Rose = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Stem */}
    <path d="M12 15v8" stroke="#1a1a1a" strokeWidth="1.5" />
    {/* Leaves */}
    <path d="M12 19c0 0 3.5-0.5 5 1.5s-1 4-5 3" fill="#4ade80" stroke="#1a1a1a" strokeWidth="1" />
    <path d="M12 19c0 0-3.5-0.5-5 1.5s1 4 5 3" fill="#4ade80" stroke="#1a1a1a" strokeWidth="1" />
    {/* Bud Layers */}
    <path d="M8 8L12 2l4 6" fill="#ef4444" stroke="#1a1a1a" strokeWidth="1.5" />
    <path d="M6 10L9 4l3 6" fill="#dc2626" stroke="#1a1a1a" strokeWidth="1" />
    <path d="M18 10l-3-6-3 6" fill="#dc2626" stroke="#1a1a1a" strokeWidth="1" />
    {/* Main Body */}
    <path d="M6 9c0 0 0 8 6 8s6-8 6-8" fill="#f87171" stroke="#1a1a1a" strokeWidth="1.5" />
    {/* Details (Dotted eyes/mouth feel from image) */}
    <circle cx="10" cy="11.5" r="0.6" fill="#1a1a1a" />
    <path d="M10 13.5c1 0.5 2.5 0.5 3 0" stroke="#1a1a1a" strokeWidth="0.8" />
  </svg>
);

interface EnvelopeProps {
  onOpen: () => void;
}

export default function InvitationEnvelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Trigger transition after cover starts opening
    setTimeout(onOpen, 1000); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c1810] px-4 perspective-2000">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Floating roses effect */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[10%] left-[15%]"
        >
          <Rose className="w-16 h-16 text-[#c62828] blur-[1px]" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[20%] right-[10%]"
        >
          <Rose className="w-24 h-24 text-[#c62828] blur-[2px]" />
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex w-full max-w-md sm:max-w-lg md:max-w-xl aspect-[2/3] sm:aspect-[3/4] shadow-[0_0_100px_rgba(0,0,0,1)] perspective-2000"
      >
        
        {/* Left Side Depth (Spine) */}
        <div className="w-3 sm:w-5 bg-[#b49027] rounded-l-xl border-y border-l border-[#8a6b1c] shadow-inner relative overflow-hidden z-10">
          <div className="absolute inset-y-1 right-0 w-2 sm:w-4 bg-[#e6d8b8] rounded-l-md shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] opacity-30" />
          <div className="absolute inset-y-2 right-0 w-1 sm:w-2 bg-[#fdfaf1] rounded-l-sm opacity-20" />
        </div>

        {/* Right Page (Main Book Cover & Content) */}
        <div 
          onClick={handleOpen}
          className="relative flex-1 bg-[#d4af37] rounded-r-xl border border-l-0 border-[#b49027] shadow-[-5px_0_20px_rgba(0,0,0,0.6)] cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Spine styling */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-40 rounded-l-sm pointer-events-none" />

          {/* Front Cover that opens */}
          <motion.div
            animate={{ rotateY: isOpen ? -120 : 0 }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 bg-[#d4af37] rounded-r-xl shadow-[-5px_0_20px_rgba(0,0,0,0.6)] origin-left z-50 flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Inner Spine shadow on the cover itself */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black/50 via-black/10 to-transparent z-40 pointer-events-none" />
            
            {/* Vintage borders / decorations */}
            <div className="absolute inset-4 sm:inset-6 border-2 border-double border-[#d4af37]/30 rounded-lg pointer-events-none" />
            <div className="absolute inset-6 sm:inset-8 border border-[#d4af37]/20 rounded-md pointer-events-none" />

            <div className="relative z-30 flex flex-col items-center justify-center h-full pt-10">
              <Rose className="w-12 h-12 text-[#c62828] mb-4 drop-shadow-[0_0_8px_rgba(198,40,40,0.5)]" />
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#2c1810] mb-6 tracking-widest uppercase text-shadow-sm">
                EMILIA
              </h1>
              <div className="w-16 h-[2px] bg-[#2c1810]/40 mb-6" />
              <p className="font-serif text-xl sm:text-2xl italic text-[#2c1810]/80">Mis 15 Años</p>
              
              <div className="mt-12 flex flex-col items-center gap-4 group">
                 <div className="w-16 h-16 rounded-full border-2 border-[#2c1810] flex items-center justify-center group-hover:bg-[#2c1810]/20 transition-all duration-300 bg-[#fdfaf1]/70 shadow-lg scale-110">
                    <BookOpen className="w-8 h-8 text-[#2c1810]" />
                 </div>
                 {!isOpen && (
                   <div className="px-4 py-2 bg-[#2c1810]/80 rounded-full backdrop-blur-sm shadow-md border border-[#d4af37]/30">
                     <p className="font-display text-[10px] sm:text-xs text-[#fdfaf1] tracking-[0.2em] uppercase animate-pulse">
                       Toca para abrir el libro de magia
                     </p>
                   </div>
                 )}
              </div>
            </div>
            
            {/* Elegant corner details */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[#2c1810]/40 pointer-events-none" />
            <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-[#2c1810]/40 pointer-events-none" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-[#2c1810]/40 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#2c1810]/40 pointer-events-none" />

          </motion.div>

          {/* Under the Cover (The First Page Fake View to prevent flashing white) */}
          <div className="absolute inset-1 sm:inset-2 pl-2 sm:pl-4 bg-[#parchment] rounded-r-lg shadow-inner flex items-center justify-center overflow-hidden z-10 bg-[#fdfaf1]" />
        </div>
      </motion.div>
    </div>
  );
}
