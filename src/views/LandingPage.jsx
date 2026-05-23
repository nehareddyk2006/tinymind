import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChunkyButton } from '../components/ui/ChunkyButton';
import { FloatingSticker } from '../components/ui/FloatingSticker';
import { playClickSound, playLockedSound } from '../utils/soundEffects';
import { ChevronLeft, ChevronRight, Lock, Play, Sparkles, Star, Flame, Trophy, Award, BookOpen } from 'lucide-react';

const WORLDS_CONFIG = [
  {
    id: 'space_station',
    name: 'Space Station',
    emoji: '🪐',
    level: 1,
    xpReward: 60,
    difficulty: 'Easy',
    color: 'blue',
    previewImage: '/images/space_station.png'
  },
  {
    id: 'deep_ocean',
    name: 'Deep Ocean Lab',
    emoji: '🪼',
    level: 2,
    xpReward: 80,
    difficulty: 'Medium',
    color: 'pink',
    previewImage: '/images/deep_ocean.png'
  },
  {
    id: 'dino_jungle',
    name: 'Dino Jungle',
    emoji: '🦖',
    level: 3,
    xpReward: 100,
    difficulty: 'Medium',
    color: 'green',
    isLocked: true,
    comingSoon: true,
    previewImage: '/images/dino_jungle.png'
  },
  {
    id: 'weird_science',
    name: 'Weird Science Lab',
    emoji: '🧪',
    level: 4,
    xpReward: 120,
    difficulty: 'Hard',
    color: 'purple',
    isLocked: true,
    comingSoon: true,
    previewImage: '/images/weird_science.png'
  },
  {
    id: 'future_robots',
    name: 'Future Robots',
    emoji: '🤖',
    level: 5,
    xpReward: 140,
    difficulty: 'Hard',
    color: 'orange',
    isLocked: true,
    comingSoon: true,
    previewImage: '/images/space_station.png'
  }
];

export const LandingPage = ({
  unlockedWorlds = ['space_station'],
  xp = 0,
  onEnterWorld
}) => {
  const scrollContainerRef = useRef(null);

  const scrollMap = (direction) => {
    playClickSound();
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (world) => {
    const isWorldUnlocked = unlockedWorlds.includes(world.id);
    if (isWorldUnlocked && !world.comingSoon) {
      playClickSound();
      if (onEnterWorld) onEnterWorld(world.id);
    } else {
      playLockedSound();
    }
  };

  return (
    <div className="w-full relative pb-20 select-none overflow-x-hidden">
      {/* Premium Neobrutalist SVG Stickers floating in background */}
      
      {/* 1. Sparkly Star Sticker */}
      <FloatingSticker className="top-24 left-8 z-0" duration={5}>
        <div className="bg-brutalYellow border-4 border-black p-3 rounded-2xl shadow-brutal rotate-[-12deg] flex items-center justify-center w-16 h-16 hover:scale-105 transition-transform select-none">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white stroke-black stroke-[2.5px]">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </div>
      </FloatingSticker>

      {/* 2. Space Rocket Sticker */}
      <FloatingSticker className="top-96 right-12 z-0 hidden md:block" duration={7} delay={1}>
        <div className="bg-brutalPink border-4 border-black p-3.5 rounded-2xl shadow-brutal rotate-[15deg] flex flex-col items-center justify-center w-20 h-20 select-none">
          <span className="text-3xl">🚀</span>
          <span className="text-[9px] font-fredoka font-black text-white leading-none mt-1">SPACE QUEST</span>
        </div>
      </FloatingSticker>

      {/* 3. Neon Jellyfish Sticker */}
      <FloatingSticker className="top-1/3 left-16 z-0 hidden lg:block" duration={6} delay={2}>
        <div className="bg-brutalGreen border-4 border-black p-3 rounded-2xl shadow-brutal rotate-[-8deg] flex flex-col items-center justify-center w-20 h-20 select-none">
          <span className="text-3xl">🪼</span>
          <span className="text-[9px] font-fredoka font-black text-black leading-none mt-1">DEEP DEEP</span>
        </div>
      </FloatingSticker>

      {/* 4. Prehistoric Dinosaur Footprint/Fossil Sticker */}
      <FloatingSticker className="top-[60%] right-20 z-0 hidden md:block" duration={5}>
        <div className="bg-brutalOrange border-4 border-black p-3 rounded-2xl shadow-brutal rotate-[12deg] flex flex-col items-center justify-center w-20 h-20 select-none">
          <span className="text-3xl">🦕</span>
          <span className="text-[9px] font-fredoka font-black text-white leading-none mt-1">DINO LAB</span>
        </div>
      </FloatingSticker>

      {/* 5. Weird Bubbles Flask Sticker */}
      <FloatingSticker className="top-[82%] left-12 z-0" duration={8}>
        <div className="bg-brutalPurple border-4 border-black p-3 rounded-2xl shadow-brutal rotate-[-15deg] flex flex-col items-center justify-center w-20 h-20 select-none">
          <span className="text-3xl">🧪</span>
          <span className="text-[9px] font-fredoka font-black text-white leading-none mt-1">MAD SCIENCE</span>
        </div>
      </FloatingSticker>

      {/* SECTION 1 - HERO */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 z-10">
          
          {/* Glowing Cosmic Portal Asset - Cropped to its actual boundaries and drop-shadowed directly on its outline */}
          <motion.div
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative cursor-pointer group select-none z-10"
            onClick={() => {
              const mapSection = document.getElementById('explore-levels');
              if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-[2deg]">
              <img 
                src="/images/glowing_portal.png" 
                alt="Glowing Cosmic Portal" 
                className="w-full h-full object-contain filter drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]"
              />
            </div>
            {/* Sparkles around portal */}
            <div className="absolute -top-4 -right-4 text-5xl animate-bounce">✨</div>
            <div className="absolute -bottom-4 -left-4 text-5xl animate-bounce delay-150">🚀</div>
            <div className="absolute top-1/2 -right-10 text-4xl animate-bounce hidden md:block">👾</div>
          </motion.div>

          {/* Epic Headlines */}
          <div className="flex flex-col gap-4">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-fredoka font-black leading-none text-black uppercase tracking-tight"
            >
              FEED YOUR <span className="text-brutalPink stroke-text">TINY BRAIN</span> <span className="text-brutalYellow bg-black px-4 rounded-3xl inline-block rotate-[2deg] shadow-brutal-sm border border-black mt-2">WEIRD STUFF</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl font-nunito font-extrabold text-brutalNavy max-w-2xl mx-auto leading-relaxed mt-2"
            >
              Unlock bizarre animated worlds, play wacky curiosity quizzes, and collect cool digital stickers. This is NOT a school app — this is a gamified arcade! 🎮🚀
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <ChunkyButton
              color="pink"
              size="lg"
              onClick={() => {
                const mapSection = document.getElementById('explore-levels');
                if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto uppercase tracking-wide"
            >
              START ADVENTURE! 🚀
            </ChunkyButton>
            <ChunkyButton
              color="yellow"
              size="lg"
              onClick={() => {
                playClickSound();
                alert("🎬 Watch Trailer: Welcome to TinyMind! Ready to learn about floating space-whales and neon underwater synth-jellyfish?");
              }}
              className="w-full sm:w-auto flex items-center gap-2 uppercase"
            >
              <Play className="w-6 h-6 fill-black" /> Watch Trailer
            </ChunkyButton>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - EXPLORE LEVELS MAP */}
      <section id="explore-levels" className="py-16 px-4 md:px-8 border-t-8 border-b-8 border-black bg-brutalYellow relative select-none">
        
        {/* Banner Title */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-fredoka font-black text-brutalPink text-lg uppercase tracking-wider block bg-white border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm w-fit mb-2 animate-bounce">
              🗺️ MISSION MAP
            </span>
            <h2 className="text-4xl md:text-6xl font-fredoka font-black text-black leading-none uppercase">
              EXPLORE WEIRD WORLDS
            </h2>
            <p className="text-base md:text-lg font-nunito font-extrabold text-brutalNavy max-w-xl leading-snug mt-2">
              Progression unlocks next worlds. Tap an open world card to start learning and play the Quiz!
            </p>
          </div>

          {/* Scroll controls */}
          <div className="flex gap-2">
            <ChunkyButton
              color="white"
              size="sm"
              onClick={() => scrollMap('left')}
              className="w-12 h-12 p-0 flex items-center justify-center rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </ChunkyButton>
            <ChunkyButton
              color="white"
              size="sm"
              onClick={() => scrollMap('right')}
              className="w-12 h-12 p-0 flex items-center justify-center rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </ChunkyButton>
          </div>
        </div>

        {/* Scrollable Map Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 px-4 scrollbar-none snap-x snap-mandatory max-w-7xl mx-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {WORLDS_CONFIG.map((world) => {
            const isUnlocked = unlockedWorlds.includes(world.id);
            const isFullyLocked = world.isLocked || !isUnlocked;
            
            let cardBg = 'bg-white hover:bg-cream';
            let cardHeaderBg = 'bg-gray-100';

            if (!isFullyLocked) {
              if (world.color === 'blue') {
                cardHeaderBg = 'bg-brutalBlue';
              } else if (world.color === 'pink') {
                cardHeaderBg = 'bg-brutalPink';
              }
            } else {
              cardBg = 'bg-gray-100 opacity-80';
            }

            return (
              <motion.div
                key={world.id}
                whileHover={!isFullyLocked ? { scale: 1.03, y: -8, rotate: -1 } : { scale: 0.98 }}
                onClick={() => handleCardClick(world)}
                className={`
                  snap-start flex-shrink-0 w-[300px] md:w-[320px] border-4 border-black rounded-[32px] overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all cursor-pointer select-none flex flex-col gap-0
                  ${cardBg}
                `}
              >
                {/* Visual Header */}
                <div className={`h-40 border-b-4 border-black relative flex items-center justify-center ${cardHeaderBg}`}>
                  {isFullyLocked ? (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-2">
                      <Lock className="w-12 h-12 stroke-[2.5]" />
                      {world.comingSoon ? (
                        <span className="font-fredoka text-xs font-black uppercase bg-brutalOrange px-3 py-1 rounded-full border-2 border-black mt-2 shadow-brutal-sm">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="font-fredoka text-xs font-bold uppercase bg-brutalPurple px-3 py-1 rounded-full border-2 border-black mt-2 shadow-brutal-sm">
                          Needs Level {world.level - 1} Completion
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-white border-2 border-black px-2.5 py-0.5 rounded-full font-fredoka text-xs font-black">
                      LVL {world.level}
                    </div>
                  )}

                  {/* World Preview Render using generated images */}
                  {!isFullyLocked && (
                    <img 
                      src={world.previewImage} 
                      alt={world.name} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  {isFullyLocked && (
                    <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                      <img 
                        src={world.previewImage} 
                        alt={world.name} 
                        className="w-full h-full object-cover filter grayscale opacity-25"
                      />
                    </div>
                  )}

                  {/* Level XP Banner */}
                  {!isFullyLocked && (
                    <div className="absolute bottom-3 right-3 bg-brutalGreen border-2 border-black px-2 py-0.5 rounded-xl font-fredoka text-xs font-black text-black">
                      +{world.xpReward} XP!
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex flex-col gap-4 flex-grow bg-white">
                  <div className="flex justify-between items-start">
                    <h3 className="font-fredoka text-2xl font-black text-brutalNavy leading-tight uppercase">
                      {world.name}
                    </h3>
                    <span className="text-3xl">{world.emoji}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-nunito font-extrabold uppercase text-gray-400">
                      Difficulty:
                    </span>
                    <span className={`
                      text-xs font-fredoka font-bold border-2 border-black px-2.5 py-0.5 rounded-full
                      ${world.difficulty === 'Easy' ? 'bg-brutalGreen' : 'bg-brutalOrange text-white'}
                    `}>
                      {world.difficulty}
                    </span>
                  </div>

                  {/* Button Action */}
                  <div className="mt-2">
                    {isFullyLocked ? (
                      <div className="w-full bg-gray-200 border-4 border-black text-gray-500 py-2.5 rounded-2xl font-fredoka font-black text-center border-dashed">
                        LOCKED
                      </div>
                    ) : (
                      <ChunkyButton
                        color={world.color}
                        size="sm"
                        className="w-full text-center py-2.5"
                      >
                        ENTER WORLD 🚀
                      </ChunkyButton>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 - HOW IT WORKS */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto select-none">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-fredoka font-black text-black uppercase">
            HOW THE PLAYGROUND WORKS 🧩
          </h2>
          <p className="text-lg font-nunito font-extrabold text-gray-500 max-w-xl mx-auto mt-2">
            Collect, earn, unlock, and learn weird stuff in 4 easy steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: '1', title: 'Pick a World 🗺️', color: 'blue', desc: 'Select an open world card like the retro Space Station.' },
            { step: '2', title: 'Discover Facts 🧠', color: 'pink', desc: 'Flip crazy cards to reveal weird facts and tap floating items.' },
            { step: '3', title: 'Beat the Quiz 🎯', color: 'green', desc: 'Score 100% on the quiz to prove you mastered the world.' },
            { step: '4', title: 'Get Stickers 🏆', color: 'purple', desc: 'Collect funny stickers, earn XP, and unlock new zones!' }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white border-4 border-black p-6 rounded-3xl shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all h-full flex flex-col gap-3">
                <div className={`w-12 h-12 rounded-2xl border-4 border-black ${
                  item.color === 'blue' ? 'bg-brutalBlue' :
                  item.color === 'pink' ? 'bg-brutalPink' :
                  item.color === 'green' ? 'bg-brutalGreen' : 'bg-brutalPurple'
                } flex items-center justify-center font-fredoka font-black text-xl text-white shadow-brutal-sm`}>
                  {item.step}
                </div>
                <h3 className="font-fredoka text-xl font-black text-brutalNavy uppercase">
                  {item.title}
                </h3>
                <p className="text-sm font-nunito font-bold text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 - REWARDS / XP GAMIFICATION SHOWCASE */}
      <section className="py-16 px-4 md:px-8 border-t-8 border-black bg-cream relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Hero Text */}
          <div className="flex flex-col gap-4">
            <span className="font-fredoka font-black text-brutalGreen text-lg uppercase tracking-wider block bg-white border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm w-fit mb-1 animate-pulse">
              🏆 LEVEL UP YOUR MIND
            </span>
            <h2 className="text-4xl md:text-6xl font-fredoka font-black text-black leading-none uppercase">
              BECOME A CURIOSITY CHAMPION!
            </h2>
            <p className="text-lg font-nunito font-extrabold text-brutalNavy leading-relaxed">
              Every correct quiz question awards XP. Earning 100 XP levels you up and grants shiny achievements. Build a streak by visiting every day to multiply your XP gains!
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="bg-white border-4 border-black px-4 py-2 rounded-2xl shadow-brutal font-fredoka font-bold text-sm flex items-center gap-2">
                <Flame className="w-5 h-5 text-brutalOrange fill-brutalOrange" /> Streak Multiplier Active
              </div>
              <div className="bg-white border-4 border-black px-4 py-2 rounded-2xl shadow-brutal font-fredoka font-bold text-sm flex items-center gap-2">
                <Trophy className="w-5 h-5 text-brutalYellow fill-brutalYellow" /> 4 Badge Slots Unlocked
              </div>
            </div>
          </div>

          {/* Right - Interactive Fake Gamification Showcase */}
          <div className="bg-white border-[6px] border-black p-6 rounded-[36px] shadow-brutal flex flex-col gap-5 relative">
            <div className="absolute top-4 right-4 text-xs font-fredoka font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded-lg uppercase">
              Profile Showcase
            </div>

            <div className="flex items-center gap-4">
              <div className="text-4xl bg-brutalYellow border-4 border-black p-3 rounded-full w-16 h-16 flex items-center justify-center shadow-brutal-sm">
                🦖
              </div>
              <div>
                <h3 className="font-fredoka font-black text-xl text-brutalNavy">
                  Galaxy Explorer Alpha
                </h3>
                <span className="text-xs font-nunito font-extrabold text-brutalPink uppercase tracking-widest">
                  RANK: DINO GENIUS 🦕
                </span>
              </div>
            </div>

            <div className="border-4 border-black bg-cream p-4 rounded-2xl flex justify-between items-center text-center">
              <div>
                <span className="block text-2xl font-fredoka font-black text-black">
                  {xp}
                </span>
                <span className="text-xs font-nunito font-bold text-gray-400 uppercase">
                  TOTAL XP
                </span>
              </div>
              <div className="border-r border-black/20 h-10" />
              <div>
                <span className="block text-2xl font-fredoka font-black text-brutalPink">
                  {unlockedWorlds.length}
                </span>
                <span className="text-xs font-nunito font-bold text-gray-400 uppercase">
                  WORLDS OPEN
                </span>
              </div>
              <div className="border-r border-black/20 h-10" />
              <div>
                <span className="block text-2xl font-fredoka font-black text-brutalPurple">
                  {unlockedWorlds.includes('deep_ocean') ? 2 : 1}
                </span>
                <span className="text-xs font-nunito font-bold text-gray-400 uppercase">
                  BADGES EARNED
                </span>
              </div>
            </div>

            {/* Simulated Badge Row */}
            <div className="flex flex-col gap-2">
              <span className="font-fredoka text-sm font-black text-gray-500 uppercase tracking-wide">
                Recent Trophies
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-brutalBlue/20 border-2 border-black p-2.5 rounded-xl flex flex-col items-center gap-1">
                  <span className="text-2xl animate-bounce">🧑‍🚀</span>
                  <span className="text-[10px] font-fredoka font-black uppercase leading-tight text-center">
                    Galaxy Cadet
                  </span>
                </div>
                <div className={`
                  border-2 border-black p-2.5 rounded-xl flex flex-col items-center gap-1
                  ${unlockedWorlds.includes('deep_ocean') ? 'bg-brutalPink/20' : 'bg-gray-100 opacity-40 border-dashed'}
                `}>
                  <span className="text-2xl">{unlockedWorlds.includes('deep_ocean') ? '🪼' : '❓'}</span>
                  <span className="text-[10px] font-fredoka font-black uppercase leading-tight text-center">
                    Abyss Explorer
                  </span>
                </div>
                <div className="bg-gray-100 border-2 border-black border-dashed opacity-40 p-2.5 rounded-xl flex flex-col items-center gap-1">
                  <span className="text-2xl">❓</span>
                  <span className="text-[10px] font-fredoka font-black uppercase leading-tight text-center">
                    Locked
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - FINAL CTA */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto select-none mt-8">
        <div className="bg-brutalPink border-[6px] border-black p-10 md:p-14 rounded-[40px] shadow-brutal flex flex-col items-center gap-6 relative">
          <div className="absolute top-4 left-6 text-3xl animate-bounce">🦖</div>
          <div className="absolute bottom-4 right-6 text-3xl animate-bounce">✨</div>
          
          <h2 className="text-4xl md:text-6xl font-fredoka font-black text-white uppercase leading-none text-shadow-brutal">
            READY TO UNLOCK WEIRD WORLDS?
          </h2>
          <p className="text-base md:text-xl font-nunito font-extrabold text-white/90 max-w-xl leading-relaxed">
            Grab your cosmic helmet, pack your underwater searchlight, and feed your tiny brain. Let's enter TinyMind!
          </p>

          <ChunkyButton
            color="yellow"
            size="lg"
            onClick={() => {
              const mapSection = document.getElementById('explore-levels');
              if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-2 text-2xl px-12 md:py-5"
          >
            ENTER TINYMIND! 🧠✨
          </ChunkyButton>
        </div>
      </section>
    </div>
  );
};
