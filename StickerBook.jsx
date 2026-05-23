import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChunkyButton } from '../ui/ChunkyButton';
import { playClickSound, playSuccessSound, playLockedSound } from '../../utils/soundEffects';
import { X, Sparkles, HelpCircle } from 'lucide-react';

const STICKERS_DATA = [
  {
    id: 'space_helmet',
    name: 'Cosmic Helmet 🧑‍🚀',
    emoji: '🧑‍🚀',
    description: 'Cosmic Wanderer',
    fact: 'Space suits are fully pressurized! Without them, the lack of atmospheric pressure would make your blood literally boil! Eeew! 🩸💨',
    unlockedBy: 'Space Station Quiz',
    color: 'blue'
  },
  {
    id: 'neon_jelly',
    name: 'Neon Jellyfish 🪼',
    emoji: '🪼',
    description: 'Deep Sea Voyager',
    fact: 'Bioluminescent jellyfish make their own light using chemical reactions inside their squishy bodies! Some can even glow in neon pink! 🪼✨',
    unlockedBy: 'Deep Ocean Lab Quiz',
    color: 'pink'
  },
  {
    id: 'dino_egg',
    name: 'Glittery Dino Egg 🥚',
    emoji: '🥚',
    description: 'Prehistoric Explorer',
    fact: 'Some dinosaur eggs had colorful shells, similar to birds today! Scientists have even found fossilized dinosaur nests with blue-green eggs! 🦖🥚',
    unlockedBy: 'Dino Jungle Quiz (Coming Soon!)',
    color: 'green'
  },
  {
    id: 'robo_cat',
    name: 'Robo Kitty 🐱',
    emoji: '🐱',
    description: 'Future Cybercat',
    fact: 'In the future, robotic pets could have fully advanced AI that mimics real purring frequencies to soothe their human friends! Purr-fect science! 🤖🐾',
    unlockedBy: 'Future Robots Quiz (Coming Soon!)',
    color: 'purple'
  }
];

export const StickerBook = ({
  isOpen,
  onClose,
  unlockedStickerIds = []
}) => {
  const [selectedSticker, setSelectedSticker] = useState(null);

  const handleStickerClick = (sticker) => {
    const isUnlocked = unlockedStickerIds.includes(sticker.id);
    if (isUnlocked) {
      playSuccessSound();
      setSelectedSticker(sticker);
    } else {
      playLockedSound();
      setSelectedSticker(null);
      // Brief alerts or vibration/shake
    }
  };

  const handleCloseDetail = () => {
    playClickSound();
    setSelectedSticker(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => { playClickSound(); onClose(); }}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FFF6E9] border-l-[6px] border-black p-6 z-50 flex flex-col shadow-[-10px_0px_0px_0px_rgba(0,0,0,1)] select-none overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-6">
              <h2 className="text-3xl font-fredoka font-black tracking-wide text-brutalPurple flex items-center gap-2">
                <Sparkles className="w-8 h-8 fill-brutalPurple text-black" />
                STICKER BOOK
              </h2>
              <ChunkyButton
                color="yellow"
                size="sm"
                onClick={onClose}
                className="w-10 h-10 p-0 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </ChunkyButton>
            </div>

            {/* Sticker Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {STICKERS_DATA.map((sticker) => {
                const isUnlocked = unlockedStickerIds.includes(sticker.id);
                return (
                  <motion.div
                    key={sticker.id}
                    whileHover={isUnlocked ? { scale: 1.05, rotate: -2 } : { scale: 0.98 }}
                    onClick={() => handleStickerClick(sticker)}
                    className={`
                      border-4 border-black p-4 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer shadow-brutal transition-all text-center
                      ${isUnlocked 
                        ? 'bg-white hover:shadow-brutal-lg' 
                        : 'bg-gray-200 opacity-60 border-dashed cursor-not-allowed shadow-none hover:translate-y-0'
                      }
                    `}
                  >
                    <div className={`
                      text-5xl mb-2 flex items-center justify-center w-16 h-16 rounded-full border-2 border-black
                      ${isUnlocked ? 'bg-cream' : 'bg-gray-300'}
                    `}>
                      {isUnlocked ? sticker.emoji : '❓'}
                    </div>
                    <span className="font-fredoka font-bold text-sm leading-tight text-brutalNavy">
                      {isUnlocked ? sticker.name : 'Secret Sticker'}
                    </span>
                    <span className="text-xs font-nunito font-semibold text-gray-500">
                      {isUnlocked ? 'Tap to Inspect' : `Unlock in: ${sticker.unlockedBy}`}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Inspect / Detail view */}
            <AnimatePresence mode="wait">
              {selectedSticker && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="bg-white border-4 border-black p-5 rounded-3xl shadow-brutal flex flex-col gap-3 relative mt-auto border-t-[6px]"
                >
                  <div className="absolute top-3 right-3">
                    <button 
                      onClick={handleCloseDetail}
                      className="text-gray-400 hover:text-black font-extrabold text-xl p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-5xl p-2 bg-cream border-2 border-black rounded-2xl">
                      {selectedSticker.emoji}
                    </div>
                    <div>
                      <h3 className="font-fredoka font-black text-xl text-brutalPink leading-tight">
                        {selectedSticker.name}
                      </h3>
                      <p className="text-xs font-nunito font-extrabold text-gray-400 uppercase tracking-widest">
                        {selectedSticker.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-cream border-2 border-black p-3.5 rounded-2xl font-nunito font-bold text-sm text-brutalNavy leading-relaxed">
                    <span className="font-fredoka text-brutalOrange font-black text-base block mb-1">
                      🧠 WEIRD TINY FACT:
                    </span>
                    {selectedSticker.fact}
                  </div>

                  <div className="flex justify-end mt-1">
                    <ChunkyButton 
                      color="green" 
                      size="sm" 
                      onClick={handleCloseDetail}
                    >
                      Awesome!
                    </ChunkyButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedSticker && (
              <div className="mt-auto border-4 border-black border-dashed rounded-3xl p-4 bg-white text-center flex flex-col items-center gap-2">
                <HelpCircle className="w-8 h-8 text-gray-400 stroke-[2.5]" />
                <h4 className="font-fredoka font-black text-brutalNavy">Need more Stickers?</h4>
                <p className="text-xs font-nunito font-bold text-gray-500 leading-snug">
                  Explore new worlds on the Map, read weird facts, and score a perfect 100% on their quizzes to fill up your Sticker Book!
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
