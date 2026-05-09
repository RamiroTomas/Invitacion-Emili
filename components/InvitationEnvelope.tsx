'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function InvitationEnvelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c1810] px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative perspective-1000 w-full max-w-sm flex flex-col items-center"
      >
        <div 
          onClick={handleOpen}
          className={`relative w-full aspect-[3/2] bg-[#d4af37] cursor-pointer shadow-2xl transition-all duration-700 ${isOpen ? 'translate-y-40 opacity-0' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Back of envelope */}
          <div className="absolute inset-0 bg-[#c4a027] overflow-hidden">
             <div className="absolute -top-1/2 left-0 w-full h-full bg-[#d4af37] rotate-45 transform origin-bottom-left" />
          </div>

          {/* Front flap */}
          <motion.div
            animate={{ rotateX: isOpen ? -180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute top-0 left-0 w-full h-1/2 bg-[#d4af37] origin-top z-20`}
            style={{ 
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Content preview */}
          <div className="absolute inset-4 bg-[#fdfaf1] shadow-inner flex flex-col items-center justify-center text-center p-4 border border-[#d4af37]/30">
            <h2 className="font-display text-xl text-[#2c1810] mb-2 tracking-widest">EMILIA</h2>
            <div className="w-12 h-[1px] bg-[#d4af37] mb-2" />
            <p className="font-serif text-sm italic text-[#2c1810]/70">Mis XV Años</p>
          </div>

          {/* Seal */}
          {!isOpen && (
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[#8b0000] border-2 border-[#d4af37] rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart className="text-[#d4af37] w-6 h-6 fill-current" />
            </motion.div>
          )}

          {/* Pocket/Sides */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#d4af37]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
            <div className="absolute top-0 left-0 h-full w-1/2 bg-[#c4a027]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
            <div className="absolute top-0 right-0 h-full w-1/2 bg-[#c4a027]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
          </div>
        </div>

        {!isOpen && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[#fdfaf1] font-display text-xs tracking-widest mt-8 text-center uppercase"
          >
            Has recibido una invitación mágica<br/>
            <span className="text-[#d4af37] animate-pulse">Toca para abrir</span>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
