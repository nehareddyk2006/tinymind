import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playUnlockSound } from '../../utils/soundEffects';
import { Key, Lock, Unlock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const UnlockAnimation = ({
  worldName = 'Deep Ocean Lab',
  isOpen,
  onComplete
}) => {
  useEffect(() => {
    if (isOpen) {
      playUnlockSound();
      
      // Delay confetti to match padlock opening
      const timer = setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }, 1600);

      const closeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brutalNavy/95 text-white select-none p-4"
        >
          {/* Background Sparks */}
          <div className="absolute top-20 text-4xl animate-pulse">✨</div>
          <div className="absolute bottom-20 left-10 text-4xl animate-bounce">🦖</div>
          <div className="absolute bottom-40 right-10 text-4xl animate-bounce">🪐</div>

          <div className="text-center max-w-lg flex flex-col items-center gap-6 relative">
            <motion.div
              initial={{ scale: 0.5, y: -50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="bg-brutalPink border-4 border-black text-black px-6 py-2 rounded-2xl shadow-brutal text-2xl font-fredoka font-black rotate-[-3deg]"
            >
              🎉 LEVEL COMPLETE!
            </motion.div>

            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-fredoka font-black text-brutalYellow uppercase leading-none tracking-wider text-shadow-brutal"
            >
              NEW WORLD UNLOCKED!
            </motion.h1>

            {/* Animation Scene */}
            <div className="h-64 flex items-center justify-center relative w-full mt-4">
              {/* Padlock */}
              <motion.div
                initial={{ scale: 0.8, rotate: 0 }}
                animate={{
                  scale: [1, 1.2, 1, 1.1, 1],
                  rotate: [0, -10, 10, 0, 0]
                }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="bg-white border-[6px] border-black p-6 rounded-[32px] shadow-brutal text-black flex items-center justify-center z-10 w-36 h-36 relative"
              >
                {/* Padlock arc / handle */}
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ y: [0, -20, -20] }}
                  transition={{ duration: 0.3, delay: 1.5 }}
                  className="absolute -top-12 left-8 right-8 border-[6px] border-black border-b-0 h-16 rounded-t-full -z-10 bg-transparent"
                />
                
                {/* Lock icon switching to Unlock */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 0, 1.3, 1] }}
                  transition={{ duration: 0.4, delay: 1.6 }}
                >
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ delay: 1.6 }} className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-16 h-16 stroke-black fill-brutalYellow stroke-[2.5]" />
                  </motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ delay: 1.6 }} className="flex items-center justify-center">
                    <Unlock className="w-16 h-16 stroke-black fill-brutalGreen stroke-[2.5] animate-bounce" />
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Floating key */}
              <motion.div
                initial={{ x: -250, y: 50, rotate: -45, opacity: 0 }}
                animate={{
                  x: [-250, 0, -20, 0],
                  y: [50, 0, 0, 0],
                  rotate: [-45, 90, 90, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute z-20"
              >
                <div className="bg-brutalYellow border-4 border-black p-3.5 rounded-full shadow-brutal flex items-center justify-center">
                  <Key className="w-12 h-12 stroke-black fill-white stroke-[2.5]" />
                </div>
              </motion.div>

              {/* Sparks/Stars */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="absolute text-5xl text-brutalGreen z-30"
              >
                💥
              </motion.div>
            </div>

            {/* Unlocked World Announcement */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 1.8 }}
              className="bg-white border-4 border-black p-4 rounded-2xl shadow-brutal text-black font-fredoka text-xl font-bold flex flex-col gap-1 items-center"
            >
              <span className="text-xs text-gray-400 uppercase tracking-widest font-nunito font-extrabold">
                Current Active Quest
              </span>
              <span className="text-2xl text-brutalPink font-black uppercase flex items-center gap-1.5">
                🌊 {worldName} is Open!
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
