'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';

const Rose = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    version="1.1" 
    id="Layer_1" 
    x="0px" 
    y="0px" 
    viewBox="0 0 512 512" 
    className={className}
  >
<g>
	<path fill="#EF584F" d="M345.497,208.059c0,48.021-38.934,86.955-86.955,86.955s-86.955-38.934-86.955-86.955   c0-85.977-8.911-143.084-8.471-142.967c10.776,2.756,21.133,5.833,31.059,9.175c21.836,7.377,41.582,16.081,59.061,25.647   c40.625,22.237,68.968,49.104,82.734,74.635c4.191,7.767,7.025,15.407,8.451,22.755   C345.135,200.965,345.497,204.561,345.497,208.059z"/>
	<path fill="#EF584F" d="M344.422,197.302c-1.427-7.347-4.259-14.987-8.451-22.755c-4.758-8.813-11.255-17.791-19.384-26.682   c-15.427-16.854-36.755-33.395-63.35-47.952c13.385-8.148,28.382-15.779,44.864-22.618c9.243-3.839,18.954-7.425,29.115-10.718   c8.187-2.648,16.668-5.11,25.432-7.347C353.078,59.113,344.481,114.227,344.422,197.302z"/>
	<path fill="#EF584F" d="M298.102,77.294c-16.482,6.839-31.479,14.47-44.864,22.618   c-12.692-6.947-26.575-13.434-41.582-19.287c-5.667-2.218-11.489-4.338-17.479-6.36c-2.13-30.22-4.817-47.991-4.592-47.932   c21.426,5.471,40.878,12.467,58.182,20.468C267.424,55.908,284.296,66.313,298.102,77.294z"/>
	<path fill="#EF584F" d="M327.217,66.577c-10.161,3.293-19.872,6.878-29.115,10.718   c-13.805-10.982-30.679-21.386-50.336-30.493c21.74-14.88,50.209-28.031,84.366-36.755   C332.366,9.988,329.093,31.365,327.217,66.577z"/>
</g>
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
        <div className="w-3 sm:w-5 bg-[#FFCE59] rounded-l-xl border-y border-l border-[#e6b840] shadow-inner relative overflow-hidden z-10">
          <div className="absolute inset-y-1 right-0 w-2 sm:w-4 bg-[#f0d48d] rounded-l-md shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] opacity-100" />
          <div className="absolute inset-y-2 right-0 w-1 sm:w-2 bg-[#fdfaf1] rounded-l-sm opacity-20" />
        </div>

        {/* Right Page (Main Book Cover & Content) */}
        <div 
          onClick={handleOpen}
          className="relative flex-1 bg-[#FFCE59] rounded-r-xl border border-l-0 border-[#e6b840] shadow-[-5px_0_20px_rgba(0,0,0,0.6)] cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Spine styling */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-40 rounded-l-sm pointer-events-none" />

          {/* Front Cover that opens */}
          <motion.div
            animate={{ rotateY: isOpen ? -120 : 0 }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 bg-[#FFCE59] rounded-r-xl shadow-[-5px_0_20px_rgba(0,0,0,0.6)] origin-left z-50 flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Inner Spine shadow on the cover itself */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black/50 via-black/10 to-transparent z-40 pointer-events-none" />
            
            {/* Vintage borders / decorations */}
            <div className="absolute inset-4 sm:inset-6 border-2 border-double border-[#e6b840]/30 rounded-lg pointer-events-none" />
            <div className="absolute inset-6 sm:inset-8 border border-[#e6b840]/20 rounded-md pointer-events-none" />

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
                   <div className="px-4 py-2 bg-[#2c1810]/80 rounded-full backdrop-blur-sm shadow-md border border-[#e6b840]/30">
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
