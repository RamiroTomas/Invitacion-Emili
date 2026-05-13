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
