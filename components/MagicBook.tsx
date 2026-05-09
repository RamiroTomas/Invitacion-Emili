'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Clock, Shirt, Gift, Camera, Send, Heart, Flower } from 'lucide-react';
import { INVITATION_DATA } from '@/lib/invitation-data';
import Image from 'next/image';

export default function MagicBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward
  const totalPages = INVITATION_DATA.pages.length;

  const playPageTurnSound = () => {
    // Play a subtle page turn sound
    const audio = new Audio('https://www.soundjay.com/misc/sounds/page-flip-02.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {}); // Catch in case browser blocks autoplay
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      playPageTurnSound();
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      playPageTurnSound();
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 30;
    if (info.velocity.x < -200 || info.offset.x < -swipeThreshold) {
      nextPage();
    } else if (info.velocity.x > 200 || info.offset.x > swipeThreshold) {
      prevPage();
    }
  };

  const variants = {
    enter: (direction: number) => {
      if (direction > 0) {
        // Next page is revealed underneath
        return { opacity: 1, rotateY: 0, zIndex: 1, filter: 'brightness(0.4)' };
      }
      // Previous page flips back down from the left (spine)
      return { 
        opacity: 0, 
        rotateY: -120, 
        transformOrigin: "0% 50%", 
        zIndex: 10, 
        filter: 'brightness(1) drop-shadow(20px 0px 30px rgba(0,0,0,0.5))' 
      };
    },
    center: {
      opacity: 1,
      rotateY: 0,
      transformOrigin: "0% 50%",
      zIndex: 5,
      filter: 'brightness(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
    },
    exit: (direction: number) => {
      if (direction > 0) {
        // Current page flips left towards the spine
        return { 
          opacity: 0, 
          rotateY: -120, 
          transformOrigin: "0% 50%", 
          zIndex: 10, 
          filter: 'brightness(1) drop-shadow(20px 0px 30px rgba(0,0,0,0.5))' 
        };
      }
      // Current page is covered by the incoming previous page
      return { opacity: 1, rotateY: 0, zIndex: 1, filter: 'brightness(0.4)' };
    },
  };

  return (
    <div className="min-h-screen bg-[#2c1810] flex items-center justify-center p-4 sm:p-8 overflow-hidden perspective-2000">
      {/* Book Container */}
      <div className="relative flex w-full max-w-md sm:max-w-lg md:max-w-xl aspect-[2/3] sm:aspect-[3/4] shadow-[0_0_100px_rgba(0,0,0,1)] perspective-2000">
        
        {/* Left Side Depth (Shows other pages) */}
        <div className="w-3 sm:w-5 bg-[#b49027] rounded-l-xl border-y border-l border-[#8a6b1c] shadow-inner relative overflow-hidden">
          {/* Stack of pages effect */}
          <div className="absolute inset-y-1 right-0 w-2 sm:w-4 bg-[#e6d8b8] rounded-l-md shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)]" />
          <div className="absolute inset-y-2 right-0 w-1 sm:w-2 bg-[#fdfaf1] rounded-l-sm" />
        </div>

        {/* Hidden Preload for Images */}
        <div className="hidden">
          {INVITATION_DATA.pages.map((p, idx) => (
             p.image ? <Image key={idx} src={p.image} alt="preload" width={100} height={100} priority={true} /> : null
          ))}
        </div>

        {/* Right Page (Main Book Cover & Content) */}
        <div className="relative flex-1 bg-[#d4af37] p-1 sm:p-2 pl-2 sm:pl-4 rounded-r-xl border border-l-0 border-[#b49027] shadow-[-5px_0_20px_rgba(0,0,0,0.6)]">
          
          {/* Book Spine Shadow on the left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-40 pointer-events-none" />
        
        <motion.div 
          className="relative w-full h-full bg-[#fdfaf1] rounded-r-lg flex shadow-[inset_-2px_0_10px_rgba(0,0,0,0.05)] cursor-grab active:cursor-grabbing touch-none"
          onPanEnd={handleDragEnd}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.8,
                ease: [0.32, 0.72, 0, 1]
              }}
              className="absolute inset-0 w-full h-full flex flex-col bg-transparent"
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                filter: 'drop-shadow(-5px 5px 15px rgba(0,0,0,0.2))'
              }}
            >
              {/* Page Content Container with Fold Cutout */}
              <div 
                className="absolute inset-0 bg-parchment overflow-hidden rounded-r-lg rounded-l-sm"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}
              >
                {/* Page Curvature Shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5 mix-blend-multiply pointer-events-none z-20" />
                
                {INVITATION_DATA.pages[currentPage].type === 'details' ? (
                  <DetailsPage />
                ) : INVITATION_DATA.pages[currentPage].type === 'extra' ? (
                  <ExtraPage />
                ) : (
                  <StandardPage page={INVITATION_DATA.pages[currentPage]} isPriority={currentPage <= 1} />
                )}
              </div>

              {/* Folded Flap Corner */}
              <div 
                className="absolute bottom-0 right-0 w-[30px] h-[30px] pointer-events-none z-30"
                style={{
                  background: 'linear-gradient(135deg, #efe3c3 0%, #c4a974 50%, transparent 50%)',
                  filter: 'drop-shadow(-2px -2px 3px rgba(0,0,0,0.3))'
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Handlers */}
          <button 
            onClick={prevPage} 
            className={`absolute inset-y-0 left-0 w-16 md:w-24 z-30 flex items-center justify-start pl-1 sm:pl-3 text-[#d4af37] opacity-0 hover:opacity-100 transition-opacity cursor-pointer ${currentPage === 0 ? 'hidden' : ''}`}
          >
            <div className="bg-black/20 p-1 sm:p-2 rounded-full backdrop-blur-sm">
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
            </div>
          </button>
          <button 
            onClick={nextPage} 
            className={`absolute inset-y-0 right-[30px] w-16 md:w-24 z-30 flex items-center justify-end pr-1 sm:pr-3 text-[#d4af37] opacity-0 hover:opacity-100 transition-opacity cursor-pointer ${currentPage === totalPages - 1 ? 'hidden' : ''}`}
          >
            <div className="bg-black/20 p-1 sm:p-2 rounded-full backdrop-blur-sm">
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
            </div>
          </button>
          
          {/* Page Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
            <span className="font-serif text-[10px] text-[#d4af37] tracking-widest uppercase opacity-60">Prev</span>
            <div className="flex gap-2">
              {INVITATION_DATA.pages.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'bg-[#d4af37] scale-150' : 'bg-[#d4af37]/20 group-hover:bg-[#d4af37]/40'}`}
                />
              ))}
            </div>
            <span className="font-serif text-[10px] text-[#d4af37] tracking-widest uppercase opacity-60">Next</span>
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <p className="font-display text-[8px] text-[#d4af37] tracking-[0.4em] uppercase opacity-40">Desliza para pasar página</p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
  );
}

function StandardPage({ page, isPriority }: { page: any, isPriority?: boolean }) {
  return (
    <div className="w-full h-full relative">
      <Image 
        src={page.image} 
        alt={page.title} 
        fill 
        priority={isPriority}
        className="object-cover grayscale-[0.2]" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/95 via-[#2c1810]/60 to-[#2c1810]/20" />
      <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-center z-10 pb-16">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#d4af37] mb-6 tracking-wide drop-shadow-lg uppercase">
          {page.title}
        </h2>
        <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#fdfaf1] italic text-shadow-gold">
          &quot;{page.content}&quot;
        </p>
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="w-32 h-[1px] bg-[#d4af37] opacity-60 rounded-full" />
          <Flower className="w-8 h-8 text-[#d4af37] opacity-80 animate-pulse mt-2" />
        </div>
      </div>
    </div>
  );
}

function DetailsPage() {
  const d = INVITATION_DATA;
  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col overflow-y-auto overflow-x-hidden">
      <h2 className="font-display text-3xl sm:text-4xl text-[#d4af37] text-center mb-8 tracking-widest uppercase shrink-0">
        Nuestra Noche
      </h2>
      
      <div className="flex flex-col gap-8 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37] transition-colors duration-300">
              <Calendar className="w-5 h-5 text-[#d4af37] group-hover:text-[#fdfaf1]" />
            </div>
            <div>
              <p className="font-display text-[10px] text-[#d4af37] tracking-widest uppercase">Fecha</p>
              <p className="font-serif text-lg sm:text-xl">{d.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37] transition-colors duration-300">
              <Clock className="w-5 h-5 text-[#d4af37] group-hover:text-[#fdfaf1]" />
            </div>
            <div>
              <p className="font-display text-[10px] text-[#d4af37] tracking-widest uppercase">Horario</p>
              <p className="font-serif text-lg sm:text-xl">{d.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37] transition-colors duration-300">
              <Shirt className="w-5 h-5 text-[#d4af37] group-hover:text-[#fdfaf1]" />
            </div>
            <div>
              <p className="font-display text-[10px] text-[#d4af37] tracking-widest uppercase">Dress Code</p>
              <p className="font-serif text-lg sm:text-xl">{d.dressCode}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-4 pt-6 border-t border-[#d4af37]/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <p className="font-display text-[10px] text-[#d4af37] tracking-widest uppercase">Ubicación</p>
              <p className="font-serif text-base sm:text-lg">{d.location.name}</p>
              <p className="font-serif text-xs sm:text-sm text-[#2c1810]/60">{d.location.address}</p>
            </div>
          </div>
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#d4af37]/20 shadow-md">
            <iframe 
              src={d.location.mapUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExtraPage() {
  const d = INVITATION_DATA;
  const [rsvpSent, setRsvpSent] = useState(false);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSent(true);
  };

  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col gap-10 pb-12">
        {/* RSVP Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Send className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-display text-lg sm:text-xl text-[#d4af37] tracking-wider uppercase">Confirmar Asistencia</h3>
          </div>
          
          {rsvpSent ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[#d4af37]/10 rounded-xl"
            >
              <div className="w-14 h-14 bg-[#d4af37] rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#fdfaf1]" />
              </div>
              <p className="font-display text-base sm:text-lg text-[#d4af37] mb-2 uppercase">¡Gracias!</p>
              <p className="font-serif italic text-sm text-[#2c1810]/80">Será un honor tenerte en mi gran noche.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-4">
              <div>
                <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1">Nombre Completo</label>
                <input required className="w-full bg-white border border-[#d4af37]/20 rounded-md p-2 focus:outline-none focus:border-[#d4af37] font-serif text-sm" />
              </div>
              <div>
                <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1">¿Restricción alimentaria?</label>
                <input className="w-full bg-white border border-[#d4af37]/20 rounded-md p-2 focus:outline-none focus:border-[#d4af37] font-serif text-sm" placeholder="Opcional" />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-[#d4af37] text-[#fdfaf1] font-display text-sm tracking-[0.2em] rounded-md hover:bg-[#b49027] transition-all transform hover:scale-[1.02] active:scale-95 shadow-md mt-2"
              >
                CONFIRMAR
              </button>
            </form>
          )}

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
               <Camera className="w-5 h-5 text-[#d4af37]" />
              <p className="font-display text-[10px] text-[#d4af37] uppercase tracking-widest">Sube tus recuerdos</p>
            </div>
            <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-[#d4af37]/20 rounded-lg cursor-pointer hover:bg-[#d4af37]/5 transition-colors">
              <div className="flex flex-col items-center justify-center">
                <p className="text-xs text-[#2c1810]/60 italic font-serif mt-1">Click para seleccionar fotos</p>
              </div>
              <input type="file" className="hidden" multiple accept="image/*" />
            </label>
            <p className="font-serif text-[10px] italic opacity-60 text-center">O usa el hashtag: #Mis15Emilia</p>
          </div>
        </div>

        {/* Gift Section */}
        <div className="bg-[#fdfaf1] p-5 sm:p-6 rounded-xl border border-[#d4af37]/10 shadow-sm mt-4">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-display text-lg sm:text-xl text-[#d4af37] tracking-wider uppercase">Regalo</h3>
          </div>
          <p className="font-serif italic text-sm text-[#2c1810]/80 mb-5 leading-relaxed">
            {d.giftRegistry.message}
          </p>
          <div className="bg-[#2c1810]/5 p-4 rounded-lg font-mono text-[10px] sm:text-xs whitespace-pre-line border border-dashed border-[#d4af37]/30">
            {d.giftRegistry.bankDetails}
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-[#d4af37] text-center italic">
            &quot;Dale regalame plata&quot; ✨
          </p>
        </div>
      </div>
    </div>
  );
}
