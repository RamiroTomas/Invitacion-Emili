'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import InvitationEnvelope from '@/components/InvitationEnvelope';
import MagicBook from '@/components/MagicBook';

export default function Home() {
  const [showInvitation, setShowInvitation] = useState(false);

  return (
    <main className="min-h-screen relative bg-[#2c1810]">
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          <InvitationEnvelope key="envelope" onOpen={() => setShowInvitation(true)} />
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            {/* Background elements (Beauty and the Beast theme) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
               <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-900/10 blur-3xl rounded-full" />
               <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-900/10 blur-3xl rounded-full" />
               
               {/* Decorative corners */}
               <div className="absolute top-0 left-0 p-8">
                 <div className="w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/30" />
               </div>
               <div className="absolute top-0 right-0 p-8">
                 <div className="w-16 h-16 border-t-2 border-r-2 border-[#d4af37]/30" />
               </div>
               <div className="absolute bottom-0 left-0 p-8">
                 <div className="w-16 h-16 border-b-2 border-l-2 border-[#d4af37]/30" />
               </div>
               <div className="absolute bottom-0 right-0 p-8">
                 <div className="w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/30" />
               </div>
            </div>

            <MagicBook />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
