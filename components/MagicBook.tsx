'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Clock, Shirt, Gift, Camera, Send, Heart, MessageCircle, CheckCircle2, Music, Utensils, X, Maximize2, ExternalLink, Share2, Trash2, Phone, Upload, Loader2, Check, CloudUpload, LogOut, CreditCard, Image as ImageIcon } from 'lucide-react';
import { initAuth, googleSignIn, logout, uploadFileToDrive, getOrCreateDriveFolder } from '@/lib/firebase-auth';
import type { User } from 'firebase/auth';

const Rose = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512" 
    fill="currentColor"
    className={`shrink-0 ${className || 'w-8 h-8'}`}
  >
    <g>
      <path d="M345.497,208.059c0,48.021-38.934,86.955-86.955,86.955s-86.955-38.934-86.955-86.955   c0-85.977-8.911-143.084-8.471-142.967c10.776,2.756,21.133,5.833,31.059,9.175c21.836,7.377,41.582,16.081,59.061,25.647   c40.625,22.237,68.968,49.104,82.734,74.635c4.191,7.767,7.025,15.407,8.451,22.755   C345.135,200.965,345.497,204.561,345.497,208.059z"/>
      <path d="M344.422,197.302c-1.427-7.347-4.259-14.987-8.451-22.755c-4.758-8.813-11.255-17.791-19.384-26.682   c-15.427-16.854-36.755-33.395-63.35-47.952c13.385-8.148,28.382-15.779,44.864-22.618c9.243-3.839,18.954-7.425,29.115-10.718   c8.187-2.648,16.668-5.11,25.432-7.347C353.078,59.113,344.481,114.227,344.422,197.302z"/>
      <path d="M298.102,77.294c-16.482,6.839-31.479,14.47-44.864,22.618   c-12.692-6.947-26.575-13.434-41.582-19.287c-5.667-2.218-11.489-4.338-17.479-6.36c-2.13-30.22-4.817-47.991-4.592-47.932   c21.426,5.471,40.878,12.467,58.182,20.468C267.424,55.908,284.296,66.313,298.102,77.294z"/>
      <path d="M327.217,66.577c-10.161,3.293-19.872,6.878-29.115,10.718   c-13.805-10.982-30.679-21.386-50.336-30.493c21.74-14.88,50.209-28.031,84.366-36.755   C332.366,9.988,329.093,31.365,327.217,66.577z"/>
    </g>
  </svg>
);

const Sparkle = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-5 h-5 text-[#FFCE59] drop-shadow-[0_0_10px_rgba(255,206,89,0.9)] ${className || ''}`}
    style={style}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
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
          <div className={`w-3 sm:w-5 rounded-l-xl border-y border-l shadow-inner relative overflow-hidden transition-colors duration-500 ${currentPage === 0 ? 'bg-[#FFCE59] border-[#e6b840]' : 'bg-[#f0d48d] border-[#e6b840]'}`}>
            {/* Stack of pages effect - Only show when book is 'open' */}
            <div className={`absolute inset-y-1 right-0 w-2 sm:w-4 bg-[#f0d48d] rounded-l-md shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] transition-opacity duration-500 ${currentPage === 0 ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute inset-y-2 right-0 w-1 sm:w-2 bg-[#fdfaf1] rounded-l-sm transition-opacity duration-500 ${currentPage === 0 ? 'opacity-0' : 'opacity-100'}`} />
          </div>

          {/* Hidden Preload for Images */}
          <div className="hidden">
            {INVITATION_DATA.pages.map((p, idx) => (
              p.image ? <Image key={idx} src={p.image} alt="preload" width={100} height={100} unoptimized /> : null
            ))}
          </div>

          {/* Right Page (Main Book Cover & Content) */}
          <div className="relative flex-1 bg-[#FFCE59] p-1 sm:p-2 pl-2 sm:pl-4 rounded-r-xl border border-l-0 border-[#e6b840] shadow-[-5px_0_20px_rgba(0,0,0,0.6)]">
            
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
                  ) : INVITATION_DATA.pages[currentPage].type === 'teespero' ? (
                    <TeEsperoPage page={INVITATION_DATA.pages[currentPage]} />
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

        <div className="flex items-center justify-center gap-4 sm:gap-8 z-30 py-4 w-full">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`font-serif text-[10px] sm:text-xs text-[#FFCE59] tracking-widest uppercase transition-opacity ${currentPage === 0 ? 'opacity-10' : 'opacity-60 hover:opacity-100'}`}
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
                className={`w-1.5 h-1.5 sm:w-2 rounded-full transition-all duration-300 ${i === currentPage ? 'bg-[#FFCE59] scale-125 sm:scale-150 shadow-[0_0_8px_rgba(255,206,89,0.6)]' : 'bg-[#FFCE59]/20 hover:bg-[#FFCE59]/40'}`}
              />
            ))}
          </div>
          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`font-serif text-[10px] sm:text-xs text-[#FFCE59] tracking-widest uppercase transition-opacity ${currentPage === totalPages - 1 ? 'opacity-10' : 'opacity-60 hover:opacity-100'}`}
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
        alt="Foto" 
        fill 
        priority={isPriority}
        unoptimized
        className="object-cover" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/98 via-[#2c1810]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-6 sm:px-12 pb-12 sm:pb-16 flex flex-col justify-end text-center z-10">
        <p className="font-serif text-base sm:text-xl leading-relaxed text-[#fdfaf1] italic text-shadow-gold max-w-sm sm:max-w-md mx-auto">
          {page.content}
        </p>
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-2">
          <div className="w-24 sm:w-32 h-[1px] bg-[#d4af37] opacity-60 rounded-full" />
          <div className="relative mt-1 sm:mt-2">
            <Rose className="w-7 h-7 sm:w-8 sm:h-8 text-[#c62828] animate-pulse" />
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
      <h2 className="font-display text-2xl sm:text-3xl text-[#d4af37] mb-6 sm:mb-8 tracking-widest uppercase relative z-10 shrink-0">
        Nuestra Noche
      </h2>
      
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-sm px-2">
        {/* Date */}
        <div className="flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 mb-2">
            <Calendar className="w-4 h-4 text-[#c62828]" />
          </div>
          <div>
            <p className="font-display text-[10px] sm:text-xs text-[#d4af37] tracking-widest uppercase mb-0.5">Fecha</p>
            <p className="font-serif text-lg sm:text-xl font-medium text-[#2c1810]">{d.date}</p>
          </div>
        </div>

        {/* Time */}
        <div className="flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 mb-2">
            <Clock className="w-4 h-4 text-[#c62828]" />
          </div>
          <div>
            <p className="font-display text-[10px] sm:text-xs text-[#d4af37] tracking-widest uppercase mb-0.5">Horario</p>
            <p className="font-serif text-lg sm:text-xl font-medium text-[#2c1810]">{d.time}</p>
          </div>
        </div>

        {/* Dress Code */}
        <div className="flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 mb-2">
            <Shirt className="w-4 h-4 text-[#c62828]" />
          </div>
          <div className="max-w-[260px] sm:max-w-[280px]">
            <p className="font-display text-[10px] sm:text-xs text-[#d4af37] tracking-widest uppercase mb-1">Dress Code</p>
            <p className="font-serif text-sm sm:text-base leading-snug italic font-medium text-[#2c1810]">{d.dressCode}</p>
          </div>
        </div>

        {/* Rose at the bottom */}
        <div className="mt-2 flex flex-col items-center justify-center">
            <Rose className="w-8 h-8 sm:w-10 sm:h-10 text-[#c62828]" />
        </div>
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
            <p className="font-display text-[10px] sm:text-xs text-[#d4af37] tracking-widest uppercase mb-0.5">Castillo</p>
            <p className="font-serif text-base sm:text-lg text-[#2c1810] font-semibold">{d.location.name}</p>
            <p className="font-serif text-xs sm:text-sm text-[#2c1810] font-medium">{d.location.address}</p>
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
  const [name, setName] = useState('');
  const [ci, setCi] = useState('');
  const [attending, setAttending] = useState<'si' | 'no'>('si');
  const [diet, setDiet] = useState('');
  const [song, setSong] = useState('');
  const [phone, setPhone] = useState(INVITATION_DATA.whatsappNumber || '');
  const [adultResponsiblePhone, setAdultResponsiblePhone] = useState('');
  const [showPhoneEdit, setShowPhoneEdit] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpError, setRsvpError] = useState('');
  const [rsvpSavedToSupabase, setRsvpSavedToSupabase] = useState(false);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmittingRsvp(true);
    setRsvpError('');

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          ci: ci.trim(),
          attending,
          diet: diet.trim(),
          song: song.trim(),
          phone: phone.trim(),
          adultResponsiblePhone: adultResponsiblePhone.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'No se pudo guardar la asistencia');
      }

      setRsvpSavedToSupabase(true);
      setRsvpSent(true);
    } catch (err: any) {
      console.error('Error enviando RSVP:', err);
      // If Supabase fail or missing, offer fallback to WhatsApp or display error
      setRsvpError(err.message || 'Error al conectar con Supabase.');
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const handleOpenWhatsAppBackup = () => {
    const cleanNum = phone.replace(/[^0-9]/g, '') || "59899000000";
    const attendanceText = attending === 'si' ? '¡Sí, asistiré con mucho gusto! ✨' : 'Lamentablemente no podré asistir 💔';
    const ciText = ci.trim() ? `\n• *C.I.:* ${ci.trim()}` : '';
    const dietText = diet.trim() ? `\n• *Menú / Restricciones:* ${diet}` : '';
    const songText = song.trim() ? `\n• *Canción recomendada:* ${song}` : '';

    const message = `¡Hola ${INVITATION_DATA.name}! 🌹\n\nConfirmación de asistencia a tus XV Años:\n• *Nombre:* ${name}${ciText}\n• *Asistencia:* ${attendanceText}${dietText}${songText}\n\n¡Nos vemos pronto!`;

    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 justify-center">
        <Send className="w-5 h-5 text-[#c62828]" />
        <h3 className="font-display text-xl text-[#d4af37] tracking-wider uppercase">Confirmar Asistencia</h3>
      </div>

      {/* Supabase RSVP Form */}
      {rsvpSent ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-5 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/30 text-center mb-6 shadow-sm flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-3 shadow-md">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <p className="font-display text-base text-[#d4af37] uppercase tracking-widest font-bold mb-1">
            ¡Asistencia Confirmada!
          </p>
          <p className="font-serif italic text-xs text-[#2c1810]/80 mb-4 max-w-xs">
            {rsvpSavedToSupabase 
              ? 'Tu confirmación se guardó con éxito. ¡Gracias por avisarnos!'
              : 'Se envió tu confirmación.'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={handleOpenWhatsAppBackup}
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-display tracking-wider rounded-md flex items-center gap-2 shadow transition-all font-semibold"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Enviar copia por WhatsApp
            </button>
            <button
              onClick={() => {
                setRsvpSent(false);
                setRsvpSavedToSupabase(false);
              }}
              className="px-4 py-2 bg-[#2c1810]/10 hover:bg-[#2c1810]/20 text-[#2c1810] text-xs font-display tracking-wider rounded-md transition-colors"
            >
              Editar respuesta
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleRSVPSubmit} className="space-y-3 mb-6 bg-white/40 p-4 rounded-xl border border-[#d4af37]/20 shadow-sm">
          {/* Asistencia Toggle */}
          <div>
            <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1 font-semibold">
              ¿Nos acompañas?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAttending('si')}
                className={`py-2 px-3 rounded-md text-xs font-display tracking-wider border transition-all flex items-center justify-center gap-1.5 ${
                  attending === 'si'
                    ? 'bg-[#2c1810] text-[#FFCE59] border-[#d4af37] shadow-sm font-bold'
                    : 'bg-white/60 text-[#2c1810]/70 border-[#d4af37]/20 hover:bg-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${attending === 'si' ? 'fill-current text-[#EF584F]' : ''}`} />
                ¡Sí, asistiré!
              </button>
              <button
                type="button"
                onClick={() => setAttending('no')}
                className={`py-2 px-3 rounded-md text-xs font-display tracking-wider border transition-all flex items-center justify-center gap-1.5 ${
                  attending === 'no'
                    ? 'bg-[#2c1810] text-[#FFCE59] border-[#d4af37] shadow-sm font-bold'
                    : 'bg-white/60 text-[#2c1810]/70 border-[#d4af37]/20 hover:bg-white'
                }`}
              >
                No podré ir
              </button>
            </div>
          </div>

          {/* Nombre Completo */}
          <div>
            <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1 font-semibold">
              Nombre Completo *
            </label>
            <input 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Emilia Tomas"
              className="w-full bg-white/80 border border-[#d4af37]/30 rounded-md p-2 focus:outline-none focus:border-[#d4af37] font-serif text-xs sm:text-sm text-[#2c1810]" 
            />
          </div>

          {/* C.I. / Cédula de Identidad */}
          <div>
            <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1 font-semibold flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-[#c62828]" /> Cédula de Identidad (C.I.)
            </label>
            <input 
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              placeholder="Ej: 1.234.567-8"
              className="w-full bg-white/80 border border-[#d4af37]/30 rounded-md p-2 focus:outline-none focus:border-[#d4af37] font-serif text-xs text-[#2c1810]" 
            />
          </div>

          {/* Menú / Restricción Alimentaria */}
          <div>
            <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1 font-semibold flex items-center gap-1">
              <Utensils className="w-3 h-3 text-[#c62828]" /> Restricción Alimentaria / Menú
            </label>
            <input 
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              placeholder="Ej: Vegetariano, Celíaco, Ninguno"
              className="w-full bg-white/80 border border-[#d4af37]/30 rounded-md p-2 focus:outline-none focus:border-[#d4af37] font-serif text-xs text-[#2c1810]" 
            />
          </div>

          {/* Canción sugerida */}
          <div>
            <label className="block font-display text-[10px] text-[#d4af37] uppercase tracking-widest mb-1 font-semibold flex items-center gap-1">
              <Music className="w-3 h-3 text-[#c62828]" /> Canción infaltable para el DJ
            </label>
            <input 
              value={song}
              onChange={(e) => setSong(e.target.value)}
              placeholder="Ej: Milo J - Rara Vez"
              className="w-full bg-white/80 border border-[#d4af37]/30 rounded-md p-2 focus:outline-none focus:border-[#d4af37] font-serif text-xs text-[#2c1810]" 
            />
          </div>

          {/* Error Banner */}
          {rsvpError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center space-y-2">
              <p className="text-xs text-red-800 font-serif">{rsvpError}</p>
              <button
                type="button"
                onClick={handleOpenWhatsAppBackup}
                className="w-full py-1.5 px-3 bg-[#25D366] text-white text-[11px] font-display uppercase tracking-wider rounded flex items-center justify-center gap-1 font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" /> Confirmar por WhatsApp en su lugar
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmittingRsvp}
            className="w-full py-3 bg-[#c62828] hover:bg-[#a51a1a] disabled:opacity-50 text-white font-display text-xs tracking-[0.15em] uppercase rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95 font-bold mt-2"
          >
            {isSubmittingRsvp ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Confirmando asistencia...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>CONFIRMAR ASISTENCIA</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActivePhotoModal(null)}
          >
            <div className="relative max-w-xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img 
                src={activePhotoModal} 
                alt="Foto ampliada" 
                className="max-w-full max-h-full object-contain rounded-lg border border-[#d4af37]/40 shadow-2xl" 
              />
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MemoryWall() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedGallery, setUploadedGallery] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
  const [uploadErrorMessage, setUploadErrorMessage] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrls((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleAnonymousUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadSuccessMessage('');
    setUploadErrorMessage('');
    setUploadProgress(`Procesando ${selectedFiles.length} foto(s)...`);

    try {
      const formData = new FormData();
      selectedFiles.forEach((f) => formData.append('file', f));

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'No se pudo completar la subida.');
      }

      const newUrls = data.urls || [];
      setUploadedGallery((prev) => [...prev, ...newUrls]);
      setUploadSuccessMessage(`¡${newUrls.length} foto(s) subida(s) con éxito al muro! ✨`);
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (err: any) {
      console.error('Error al subir fotos:', err);
      setUploadErrorMessage(err.message || 'Error al subir fotos. Intenta de nuevo.');
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#c62828]" />
          <p className="font-display text-sm text-[#d4af37] uppercase tracking-widest font-semibold">
            Muro de Recuerdos
          </p>
        </div>
        <span className="text-[10px] text-[#2c1810]/80 bg-[#d4af37]/20 px-2 py-1 rounded-full font-display uppercase tracking-[0.35em]">
          {uploadedGallery.length + previewUrls.length} {uploadedGallery.length + previewUrls.length === 1 ? 'foto' : 'fotos'}
        </span>
      </div>

      <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-[#d4af37]/40 rounded-xl cursor-pointer bg-white/10 hover:bg-[#d4af37]/10 transition-colors text-center group">
        <Upload className="w-5 h-5 text-[#d4af37] mb-1 group-hover:scale-110 transition-transform" />
        <p className="text-xs text-[#fdfaf1] font-serif italic">Seleccionar fotos o recuerdos</p>
        <p className="text-[9px] text-[#d4af37] uppercase mt-0.5 tracking-widest font-display font-bold">
          Toca aquí para elegir imágenes
        </p>
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
        />
      </label>

      {previewUrls.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-[10px] font-display uppercase tracking-wider text-[#d4af37] font-semibold">
            Fotos seleccionadas ({previewUrls.length}):
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {previewUrls.map((src, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-[#d4af37]/30 bg-black/10">
                <img src={src} alt={`Foto seleccionada ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAnonymousUpload}
            disabled={isUploading}
            className="w-full py-2.5 bg-[#c62828] hover:bg-[#a51a1a] disabled:opacity-50 text-white text-xs font-display uppercase tracking-[0.15em] rounded-md transition-all"
          >
            {isUploading ? 'Subiendo...' : `Subir ${selectedFiles.length} foto(s) al muro`}
          </button>
        </div>
      )}

      {uploadedGallery.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-[10px] font-display uppercase tracking-wider text-[#d4af37] font-semibold">
            Fotos del muro ({uploadedGallery.length}):
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {uploadedGallery.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#d4af37] shadow-sm">
                <img src={url} alt={`Foto subida ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-[#d4af37] text-[#2c1810] rounded-full px-1 text-[10px] font-bold">
                  ✓
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadProgress && (
        <div className="mt-4 p-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl text-xs text-[#fdfaf1]">
          {uploadProgress}
        </div>
      )}

      {uploadSuccessMessage && (
        <div className="mt-3 p-3 bg-emerald-600/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-200">
          {uploadSuccessMessage}
        </div>
      )}

      {uploadErrorMessage && (
        <div className="mt-3 p-3 bg-red-600/10 border border-red-500/20 rounded-xl text-xs text-red-200">
          {uploadErrorMessage}
        </div>
      )}
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
        {d.pages.find(p => p.type === 'gift')?.title || "Un Detalle"}
      </h2>
      
      <p className="font-serif italic text-sm sm:text-base text-[#2c1810] font-medium mb-8 leading-relaxed px-4">
        {d.giftRegistry.message}
      </p>

      <div className="w-full max-w-xs space-y-4">
        <div className="bg-[#d4af37]/10 p-5 rounded-xl border border-dashed border-[#d4af37]/50 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fdfaf1] px-3 font-display text-[9px] text-[#d4af37] tracking-widest uppercase border border-[#d4af37]/30 rounded-full font-bold">
            Datos Bancarios
          </div>
          <p className="font-mono text-xs sm:text-sm whitespace-pre-line text-[#2c1810] font-semibold leading-relaxed">
            {d.giftRegistry.bankDetails}
          </p>
        </div>
      </div>

      <MemoryWall />
    </div>
  );
}

function TeEsperoPage({ page }: { page: any }) {
  return (
    <div className="w-full h-full relative flex flex-col justify-between items-center text-center p-8 sm:p-12 overflow-hidden">
      <Image 
        src={page.image} 
        alt={page.title} 
        fill 
        unoptimized
        className="object-cover" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810] via-[#2c1810]/75 to-[#2c1810]/50 z-0" />

      {/* Decorative Top Accent */}
      <div className="relative z-10 pt-4 flex flex-col items-center gap-2">
        <p className="font-display text-[10px] sm:text-xs text-[#d4af37] tracking-[0.35em] uppercase font-semibold">
          {INVITATION_DATA.name} • XV AÑOS
        </p>
        <div className="w-24 h-[1px] bg-[#d4af37]/60" />
      </div>

      {/* Main Title & Message */}
      <div className="relative z-10 flex flex-col items-center my-auto px-2">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <Rose className="w-14 h-14 sm:w-18 sm:h-18 text-[#EF584F] drop-shadow-[0_0_15px_rgba(239,88,79,0.7)] animate-pulse mx-auto" />
        </motion.div>

        <h2 className="font-display text-4xl sm:text-5xl text-[#FFCE59] tracking-widest uppercase mb-6 text-shadow-gold">
          {page.title || "¡TE ESPERO!"}
        </h2>

        {page.content ? (
          <p className="font-serif text-base sm:text-xl leading-relaxed text-[#fdfaf1] italic max-w-xs text-shadow-gold mb-6">
            {page.content}
          </p>
        ) : null}

        <div className="inline-block px-5 py-2.5 bg-[#d4af37]/15 rounded-full border border-[#d4af37]/40 backdrop-blur-sm shadow-lg">
          <p className="font-display text-sm sm:text-base text-[#FFCE59] tracking-[0.25em] uppercase font-bold">
            19 • SEPTIEMBRE • 2026
          </p>
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="relative z-10 pb-12 sm:pb-8 flex flex-col items-center gap-2">
        <div className="w-16 h-[1px] bg-[#d4af37]/40" />
      </div>
    </div>
  );
}
