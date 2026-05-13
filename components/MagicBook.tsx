'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Clock, Shirt, Gift, Camera, Send, Heart } from 'lucide-react';

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
<g>
	<path fill="#41A85F" d="M370.534,414.343c-34.274,17.464-82.126-7.763-82.126-7.763s7.718-53.541,41.992-71.004   s82.126,7.763,82.126,7.763S404.808,396.88,370.534,414.343z"/>
	<path fill="#41A85F" d="M141.464,469.595c34.274,17.464,82.126-7.763,82.126-7.763s-7.718-53.541-41.992-71.004   s-82.126,7.763-82.126,7.763S107.19,452.131,141.464,469.595z"/>
</g>
<g>
	<path fill="#231F20" d="M211.105,176.963c-5.399,0-9.859-4.288-10.035-9.722c-0.003-0.102-0.006-0.191-0.009-0.269   c-0.14-0.805-0.194-1.603-0.234-2.683c-0.209-5.544,4.116-10.207,9.659-10.417c5.535-0.206,10.208,4.116,10.417,9.66   c0.004,0.099,0.007,0.187,0.011,0.263c0.149,0.833,0.2,1.644,0.237,2.799c0.179,5.546-4.172,10.186-9.717,10.364   C211.324,176.961,211.215,176.963,211.105,176.963z"/>
	<path fill="#231F20" d="M258.542,264.876c-31.33,0-56.818-25.488-56.818-56.818c0-5.547,4.497-10.046,10.046-10.046   c5.548,0,10.046,4.498,10.046,10.046c0,20.25,16.475,36.726,36.726,36.726c5.548,0,10.046,4.498,10.046,10.046   C268.588,260.379,264.09,264.876,258.542,264.876z"/>
	<path fill="#231F20" d="M417.21,334.453c-2.142-1.13-52.899-27.432-91.372-7.828c-31.498,16.049-42.941,56.842-46.245,72.42   l-11.65,5.936V304.602c49.091-4.744,87.6-46.229,87.6-96.543c0-3.767-0.372-7.658-1.071-11.575   c0.062-45.046,2.642-89.265,7.672-131.442c0.734-6.157,1.177-9.873-2.925-13.415c-2.494-2.155-5.887-2.947-9.074-2.127   c-4.008,1.024-8.017,2.118-12.009,3.26c1.331-18.908,2.925-32.292,3.607-38.012c0.58-4.868,1.038-8.714-2.97-12.242   c-2.492-2.194-5.911-3.016-9.127-2.193c-31.007,7.919-59.51,19.997-82.828,35.059c-17.1-7.536-35.474-13.851-54.687-18.756   c-3.214-0.839-6.642-0.039-9.149,2.145c-4.057,3.534-3.597,7.387-2.961,12.718c0.589,4.939,1.774,14.876,2.974,28.711   c-5.747-1.718-11.551-3.337-17.374-4.826c-3.192-0.82-6.593-0.023-9.087,2.139c-4.089,3.543-3.666,7.08-2.899,13.499   c5.248,43.944,7.909,90.056,7.909,137.058c0,49.872,37.835,91.068,86.31,96.408v157.7l-15.447-7.871   c-3.304-15.578-14.747-56.371-46.245-72.42c-38.47-19.601-89.229,6.697-91.372,7.828c-3.759,1.982-5.864,6.114-5.258,10.319   c0.346,2.397,8.904,58.919,47.375,78.521c10.385,5.292,21.664,7.238,32.642,7.238c23.602-0.001,45.792-8.996,54.69-13.1   l23.616,12.033v17.239c0,5.547,4.497,10.046,10.046,10.046c5.548,0,10.046-4.498,10.046-10.046v-74.425l19.819-10.098   c8.896,4.105,31.085,13.1,54.691,13.1c10.976,0,22.258-1.947,32.642-7.238c38.471-19.602,47.028-76.124,47.375-78.521   C423.074,340.567,420.969,336.435,417.21,334.453z M146.025,460.643c-22.269-11.347-31.838-42.127-35.146-56.24   c13.373-5.624,43.894-15.968,66.158-4.625c16.352,8.331,25.851,27.135,31.056,42.131l-34.537-17.597   c-4.946-2.52-10.993-0.554-13.511,4.39c-2.518,4.943-0.554,10.992,4.39,13.511l35.805,18.243   C184.029,465.52,162.289,468.931,146.025,460.643z M330.308,76.134c3.539-1.144,7.12-2.246,10.724-3.304   c-2.91,26.621-4.874,53.98-5.876,81.796l0.001,0.005c-14.326-19.495-35.554-38.264-61.808-54.602   c9.072-4.818,18.643-9.321,28.608-13.457C311.023,82.806,320.564,79.293,330.308,76.134z M268.303,45.851   c15.574-8.804,33.236-16.286,52.205-22.11c-0.904,8.58-2.025,20.661-2.93,35.459l0.014,0.006   c-6.091,2.086-12.075,4.303-17.911,6.621c-9.514-7.151-20.015-13.832-31.391-19.976L268.303,45.851z M243.544,55.917   c12.558,5.817,24.135,12.262,34.585,19.246h0.002c-8.759,4.143-17.172,8.564-25.169,13.225   c-15.338-8.056-31.856-15.248-49.268-21.446l0.013-0.005c-0.851-10.983-1.75-20.097-2.491-26.957   C216.081,44.44,230.269,49.778,243.544,55.917z M181.634,208.06c0-44.221-2.319-87.689-6.896-129.371   c5.477,1.6,10.901,3.303,16.224,5.094c20.589,6.956,39.919,15.347,57.452,24.942c37.191,20.359,65.146,45.428,78.716,70.593   c3.697,6.85,6.196,13.545,7.431,19.904c0.591,3.032,0.89,6.005,0.89,8.837c0,42.408-34.501,76.909-76.909,76.909   C216.135,284.968,181.634,250.467,181.634,208.06z M365.973,405.392c-17.02,8.674-38.856,4.67-54.173-0.208l35.763-18.222   c4.944-2.519,6.908-8.568,4.39-13.512c-2.519-4.943-8.569-6.911-13.512-4.39l-34.564,17.611   c5.561-15.721,15.428-34.168,31.084-42.145c22.305-11.364,52.891-0.963,66.22,4.65C397.327,365.798,386.741,394.81,365.973,405.392   z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
);
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
    <div className="min-h-screen bg-[#2c1810] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden perspective-2000 relative select-none">
      {/* Subtle particle effect or roses in background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10"><Rose className="w-20 h-20 text-[#c62828] blur-sm" /></div>
        <div className="absolute bottom-20 right-10"><Rose className="w-32 h-32 text-[#c62828] blur-sm" /></div>
      </div>

      {/* Book Container Content with instructions above */}
      <div className="flex flex-col items-center gap-6 w-full max-w-md sm:max-w-lg md:max-w-xl">
        {/* Swiping Instructions Outside */}
        <div className="flex items-center gap-4 animate-bounce">
          <ChevronLeft className="w-5 h-5 text-[#d4af37] opacity-60" />
          <p className="font-display text-[10px] text-[#d4af37] tracking-[0.4em] uppercase font-bold">Desliza para pasar página</p>
          <ChevronRight className="w-5 h-5 text-[#d4af37] opacity-60" />
        </div>

        <div className="relative flex w-full aspect-[2/3] sm:aspect-[3/4] shadow-[0_0_100px_rgba(0,0,0,1)] perspective-2000">
          
          {/* Left Side Depth (Spine/Stack) */}
          <div className={`w-3 sm:w-5 rounded-l-xl border-y border-l shadow-inner relative overflow-hidden transition-colors duration-500 ${currentPage === 0 ? 'bg-[#b49027] border-[#8a6b1c]' : 'bg-[#e6d8b8] border-[#8a6b1c]'}`}>
            {/* Stack of pages effect - Only show when book is 'open' */}
            <div className={`absolute inset-y-1 right-0 w-2 sm:w-4 bg-[#e6d8b8] rounded-l-md shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] transition-opacity duration-500 ${currentPage === 0 ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute inset-y-2 right-0 w-1 sm:w-2 bg-[#fdfaf1] rounded-l-sm transition-opacity duration-500 ${currentPage === 0 ? 'opacity-0' : 'opacity-100'}`} />
          </div>

          {/* Hidden Preload for Images */}
          <div className="hidden">
            {INVITATION_DATA.pages.map((p, idx) => (
              p.image ? <Image key={idx} src={p.image} alt="preload" width={100} height={100} /> : null
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
                  
                  {INVITATION_DATA.pages[currentPage].type === 'schedule' ? (
                    <SchedulePage />
                  ) : INVITATION_DATA.pages[currentPage].type === 'location' ? (
                    <LocationPage />
                  ) : INVITATION_DATA.pages[currentPage].type === 'rsvp' ? (
                    <RSVPPage />
                  ) : INVITATION_DATA.pages[currentPage].type === 'gift' ? (
                    <GiftPage />
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
              className={`absolute inset-y-0 right-1 w-16 md:w-24 z-30 flex items-center justify-end pr-1 sm:pr-3 text-[#d4af37] opacity-0 hover:opacity-100 transition-opacity cursor-pointer ${currentPage === totalPages - 1 ? 'hidden' : ''}`}
            >
              <div className="bg-black/20 p-1 sm:p-2 rounded-full backdrop-blur-sm">
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
              </div>
            </button>
            
          </motion.div>
        </div>
      </div>

      {/* Page Indicators Outside, Below the book */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 z-30 py-4 w-full">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`font-serif text-[10px] sm:text-xs text-[#d4af37] tracking-widest uppercase transition-opacity ${currentPage === 0 ? 'opacity-10' : 'opacity-60 hover:opacity-100'}`}
          >
            Prev
          </button>
          <div className="flex gap-2 sm:gap-3 px-2">
            {INVITATION_DATA.pages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                className={`w-1.5 h-1.5 sm:w-2 rounded-full transition-all duration-300 ${i === currentPage ? 'bg-[#d4af37] scale-125 sm:scale-150 shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'bg-[#d4af37]/20 hover:bg-[#d4af37]/40'}`}
              />
            ))}
          </div>
          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`font-serif text-[10px] sm:text-xs text-[#d4af37] tracking-widest uppercase transition-opacity ${currentPage === totalPages - 1 ? 'opacity-10' : 'opacity-60 hover:opacity-100'}`}
          >
            Next
          </button>
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
        className="object-cover" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/95 via-[#2c1810]/60 to-[#2c1810]/20" />
      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 flex flex-col justify-end text-center z-10 pb-24 sm:pb-20">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#d4af37] mb-6 tracking-wide drop-shadow-lg uppercase">
          {page.title}
        </h2>
        <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#fdfaf1] italic text-shadow-gold">
          &quot;{page.content}&quot;
        </p>
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="w-32 h-[1px] bg-[#d4af37] opacity-60 rounded-full" />
          <div className="relative mt-2">
            <Rose className="w-8 h-8 text-[#c62828] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SchedulePage() {
  const d = INVITATION_DATA;
  return (
    <div className="w-full h-full p-4 sm:p-10 flex flex-col items-center justify-center text-center relative overflow-y-auto select-none">
      <h2 className="font-display text-2xl sm:text-4xl text-[#d4af37] mb-4 sm:mb-8 tracking-widest uppercase relative z-10 shrink-0">
        Nuestra Noche
      </h2>
      
      <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-4 sm:gap-y-10 w-full max-w-sm px-2">
        {/* Row 1: Rose | Date */}
        <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#d4af37]/5 rounded-full flex items-center justify-center border border-[#d4af37]/20 shadow-inner">
                <Rose className="w-10 h-10 sm:w-14 sm:h-14 text-[#c62828]" />
            </div>
        </div>
        
        <div className="flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 mb-2">
            <Calendar className="w-4 h-4 text-[#c62828]" />
          </div>
          <div>
            <p className="font-display text-[9px] text-[#d4af37] tracking-widest uppercase">Fecha</p>
            <p className="font-serif text-base sm:text-lg">{d.date}</p>
          </div>
        </div>

        {/* Row 2: Time | Dress Code */}
        <div className="flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 mb-2">
            <Clock className="w-4 h-4 text-[#c62828]" />
          </div>
          <div>
            <p className="font-display text-[9px] text-[#d4af37] tracking-widest uppercase">Horario</p>
            <p className="font-serif text-base sm:text-lg">{d.time}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 mb-2">
            <Shirt className="w-4 h-4 text-[#c62828]" />
          </div>
          <div className="max-w-[120px]">
            <p className="font-display text-[9px] text-[#d4af37] tracking-widest uppercase">Dress Code</p>
            <p className="font-serif text-xs sm:text-sm leading-tight">{d.dressCode}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 opacity-20 pointer-events-none">
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto" />
      </div>
    </div>
  );
}

function LocationPage() {
  const d = INVITATION_DATA;
  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col">
       <h2 className="font-display text-2xl sm:text-3xl text-[#d4af37] text-center mb-6 tracking-widest uppercase shrink-0">
        ¿Dónde irás?
      </h2>
      
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex items-center gap-4 group justify-center">
          <div className="w-12 h-12 shrink-0 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30">
            <MapPin className="w-5 h-5 text-[#c62828]" />
          </div>
          <div className="text-center">
            <p className="font-display text-[10px] text-[#d4af37] tracking-widest uppercase">Castillo</p>
            <p className="font-serif text-base sm:text-lg">{d.location.name}</p>
            <p className="font-serif text-xs text-[#2c1810]/60">{d.location.address}</p>
          </div>
        </div>
        
        <div className="flex-1 rounded-lg overflow-hidden border border-[#d4af37]/20 shadow-md">
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
        
        <a 
          href="https://maps.app.goo.gl/Q8aDnLi7PFcJQi8u5" 
          target="_blank" 
          rel="noopener noreferrer"
          className="py-3 bg-[#2c1810] text-[#fdfaf1] font-display text-[10px] tracking-[0.2em] rounded-md text-center hover:bg-[#1a110d] transition-colors uppercase"
        >
          Abrir en Mapas
        </a>
      </div>
    </div>
  );
}

function RSVPPage() {
  const [rsvpSent, setRsvpSent] = useState(false);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSent(true);
  };

  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col overflow-y-auto">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <Send className="w-5 h-5 text-[#c62828]" />
        <h3 className="font-display text-xl text-[#d4af37] tracking-wider uppercase">Confirmar</h3>
      </div>
      
      {rsvpSent ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[#d4af37]/5 rounded-xl border border-[#d4af37]/10"
        >
          <div className="w-14 h-14 bg-[#c62828] rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Heart className="w-6 h-6 text-[#fdfaf1] fill-current" />
          </div>
          <p className="font-display text-base text-[#d4af37] mb-2 uppercase tracking-widest">¡Gracias!</p>
          <p className="font-serif italic text-sm text-[#2c1810]/80">Será un honor tenerte en mi gran noche.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleRSVP} className="space-y-4">
          <div>
            <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1">Nombre Completo</label>
            <input required className="w-full bg-white/50 border border-[#d4af37]/20 rounded-md p-2 focus:outline-none focus:border-[#d4af37] font-serif text-sm" />
          </div>
          <div>
            <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1">¿Restricción alimentaria?</label>
            <input className="w-full bg-white/50 border border-[#d4af37]/20 rounded-md p-2 focus:outline-none focus:border-[#d4af37] font-serif text-sm" placeholder="Opcional" />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-[#c62828] text-[#fdfaf1] font-display text-sm tracking-[0.2em] rounded-md hover:bg-[#a51a1a] transition-all transform hover:translate-y-[-2px] active:translate-y-0 shadow-lg mt-2"
          >
            CONFIRMAR ASISTENCIA
          </button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-[#d4af37]/10">
        <div className="flex items-center gap-3 mb-4 justify-center">
            <Camera className="w-4 h-4 text-[#c62828]" />
          <p className="font-display text-[10px] text-[#d4af37] uppercase tracking-widest">Sube tus recuerdos</p>
        </div>
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#d4af37]/20 rounded-lg cursor-pointer hover:bg-[#d4af37]/5 transition-colors">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <p className="text-[10px] text-[#2c1810]/60 italic font-serif">Ayúdame a guardar la magia de esta noche</p>
            <p className="text-[9px] text-[#d4af37] uppercase mt-1 tracking-widest font-display">Toca para subir fotos</p>
          </div>
          <input type="file" className="hidden" multiple accept="image/*" />
        </label>
      </div>
    </div>
  );
}

function GiftPage() {
  const d = INVITATION_DATA;
  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col items-center justify-center text-center">
      <div className="mb-8">
        <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 mx-auto">
          <Gift className="w-8 h-8 text-[#c62828]" />
        </div>
      </div>
      
      <h2 className="font-display text-2xl sm:text-3xl text-[#d4af37] mb-6 tracking-widest uppercase">
        Regalo
      </h2>
      
      <p className="font-serif italic text-sm sm:text-base text-[#2c1810]/80 mb-8 leading-relaxed px-4">
        {d.giftRegistry.message}
      </p>

      <div className="w-full max-w-xs space-y-4">
        <div className="bg-[#d4af37]/5 p-5 rounded-xl border border-dashed border-[#d4af37]/40 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fdfaf1] px-3 font-display text-[8px] text-[#d4af37] tracking-widest uppercase border border-[#d4af37]/20 rounded-full">
            Datos Bancarios
          </div>
          <p className="font-mono text-[11px] sm:text-xs whitespace-pre-line text-[#2c1810]/80 leading-relaxed">
            {d.giftRegistry.bankDetails}
          </p>
        </div>
        
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c62828] italic font-semibold pt-4">
           #BellezaYMagia ✨
        </p>
      </div>
    </div>
  );
}
