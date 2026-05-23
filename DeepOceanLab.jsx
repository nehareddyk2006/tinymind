import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChunkyButton } from '../components/ui/ChunkyButton';
import { FloatingSticker } from '../components/ui/FloatingSticker';
import { playClickSound, playSuccessSound } from '../utils/soundEffects';
import { QuizCard } from '../components/game/QuizCard';
import { HelpCircle, AlertCircle, Eye, RefreshCw, Layers } from 'lucide-react';

const JELLYFISH_SYNTH = [
  { id: 'pink', name: 'Coral Pop', color: 'bg-brutalPink', emoji: '🪼', frequency: 330, note: 'E4' },
  { id: 'yellow', name: 'Sunny Wave', color: 'bg-brutalYellow', emoji: '🪼', frequency: 392, note: 'G4' },
  { id: 'blue', name: 'Abyss Deep', color: 'bg-brutalBlue', emoji: '🪼', frequency: 440, note: 'A4' },
  { id: 'green', name: 'Mint Shimmer', color: 'bg-brutalGreen', emoji: '🪼', frequency: 523, note: 'C5' }
];

const OCEAN_QUIZ_QUESTIONS = [
  {
    questionText: "How many hearts does a squishy, wobbly octopus actually have?",
    options: ["Only one ❤️", "Three separate hearts! 🐙", "Exactly five 💖", "Zero - they have no hearts!"],
    correctAnswer: 1
  },
  {
    questionText: "What do deep-sea Anglerfish grow on their heads to lure food in the pitch black?",
    options: ["A glowing lightbulb lantern 🔦", "A tiny television screen 📺", "A cute feathered pirate hat 🏴‍☠️", "A pair of fluffy bunny ears 🐰"],
    correctAnswer: 0
  },
  {
    questionText: "How do neon deep-sea animals make their beautiful glowing lights?",
    options: ["Eating electrical eels ⚡", "Sticking glowsticks to their tails 🪄", "Bioluminescent chemical reactions! 🪼", "Plugging into coral-reef wall sockets 🔌"],
    correctAnswer: 2
  }
];

export const DeepOceanLab = ({
  onLevelComplete,
  onBackToMap
}) => {
  const [darkActive, setDarkActive] = useState(false);
  const [jellyBounceId, setJellyBounceId] = useState(null);
  const [squidFound, setSquidFound] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Track progress
  const [pulledLever, setPulledLever] = useState(false);
  const [playedNotes, setPlayedNotes] = useState([]);
  const [spottedSquid, setSpottedSquid] = useState(false);

  const handleLeverPull = () => {
    playSuccessSound();
    setDarkActive(!darkActive);
    setPulledLever(true);
  };

  const handleJellyClick = (jelly) => {
    // Play custom synthesised note using Web Audio API!
    if (window.AudioContext || window.webkitAudioContext) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(jelly.frequency, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } catch (e) {
        console.error(e);
      }
    }

    setJellyBounceId(jelly.id);
    if (!playedNotes.includes(jelly.id)) {
      setPlayedNotes(prev => [...prev, jelly.id]);
    }
    setTimeout(() => {
      setJellyBounceId(null);
    }, 4000);
  };

  const handleSpotSquid = () => {
    if (squidFound) return;
    playSuccessSound();
    setSquidFound(true);
    setSpottedSquid(true);
  };

  const handleQuizComplete = (xpEarned) => {
    setShowQuiz(false);
    if (onLevelComplete) {
      onLevelComplete('deep_ocean', xpEarned);
    }
  };

  const allTasksDone = pulledLever && playedNotes.length >= 4 && spottedSquid;

  return (
    <div className="w-full min-h-screen bg-[#071330] text-white pb-20 relative select-none overflow-x-hidden">
      
      {/* Ocean background bubbles */}
      <FloatingSticker emoji="🫧" className="top-20 left-10 text-2xl animate-bounce" duration={3} />
      <FloatingSticker emoji="🫧" className="top-60 right-20 text-3xl animate-bounce" duration={4} delay={1} />
      <FloatingSticker emoji="🐠" className="top-1/3 left-16 text-4xl" duration={5} />
      <FloatingSticker emoji="🐙" className="top-[70%] right-10 text-5xl" duration={7} delay={2} />

      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 pt-8 flex justify-between items-center z-10 relative">
        <ChunkyButton color="yellow" size="sm" onClick={onBackToMap}>
          ← Back to Map
        </ChunkyButton>
        <div className="bg-brutalPink border-4 border-black text-white px-4 py-1.5 rounded-2xl shadow-brutal font-fredoka font-black">
          🪼 DEEP SEA LAB
        </div>
      </div>

      {/* Level Title */}
      <section className="max-w-4xl mx-auto text-center px-4 pt-12 pb-8 z-10 relative">
        <h1 className="text-4xl md:text-6xl font-fredoka font-black text-brutalPink uppercase leading-none tracking-tight">
          UNDERWATER NEON LAB 🌊
        </h1>
        <p className="text-sm md:text-base font-nunito font-extrabold text-blue-200 uppercase tracking-widest mt-2">
          EXPEDITION QUEST: Unlock bioluminescence, play synth jellyfish, and find the Squid!
        </p>
      </section>

      {/* MAIN GAMES GRID */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative">
        
        {/* LEFT COLUMN: Bioluminescent light switch lever (7 grid cols) */}
        <div className="lg:col-span-7 bg-white border-[6px] border-black p-6 rounded-[36px] shadow-brutal text-black flex flex-col gap-6 min-h-[450px]">
          <div>
            <span className="font-fredoka font-black text-brutalPink text-xs bg-cream border-2 border-black px-2.5 py-0.5 rounded-full">
              Biolume Panel
            </span>
            <h2 className="text-3xl font-fredoka font-black text-black uppercase mt-1">
              LIGHTS OUT LEVER 🔌
            </h2>
            <p className="text-xs font-nunito font-bold text-gray-500">
              Flip the high-voltage lever to trigger pitch black night and spotlight secret glowing fish!
            </p>
          </div>

          {/* Aquarium Viewport */}
          <div className={`
            flex-grow border-4 border-black rounded-3xl relative overflow-hidden h-72 flex items-center justify-center transition-colors duration-500
            ${darkActive ? 'bg-[#000411]' : 'bg-[#E1F7FF]'}
          `}>
            
            {/* Ambient water filter */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(0,180,255,0.06)_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />

            {/* Glowing content on dark mode */}
            {darkActive ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 text-center p-4"
              >
                <div className="text-7xl animate-bounce">🏮🪼✨</div>
                <div className="bg-[#00F5FF]/10 border-2 border-[#00F5FF] p-3 rounded-2xl max-w-sm">
                  <span className="font-fredoka text-[#00F5FF] font-black text-base uppercase block">
                    🌟 NEON SECRETS DETECTED!
                  </span>
                  <p className="text-xs font-nunito font-extrabold text-[#00F5FF] leading-snug mt-1">
                    Anglerfish use a biological GLOWING LANTERN hanging over their eyes like a fishing rod to trick prey in the deep black! Amazing!
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center p-4">
                <div className="text-7xl">🪸🐳🐟</div>
                <p className="font-fredoka font-black text-sm text-brutalNavy max-w-xs leading-snug">
                  The deep sea is too bright! Pull the heavy lever below to activate bioluminescent lights!
                </p>
              </div>
            )}
          </div>

          {/* Bouncy Neobrutalist Lever */}
          <div className="flex justify-center mt-2">
            <ChunkyButton
              color={darkActive ? 'green' : 'orange'}
              size="lg"
              onClick={handleLeverPull}
              className="w-full uppercase tracking-wider text-xl py-3.5"
            >
              {darkActive ? '💡 TURN LIGHTS ON!' : '🔌 PLUCK THE LIGHT LEVER!'}
            </ChunkyButton>
          </div>
        </div>

        {/* RIGHT COLUMN: Jellyfish Keyboard + Spotlight Squid (5 grid cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* widget 1: Jellyfish Keyboard */}
          <div className="bg-white border-[6px] border-black p-6 rounded-[36px] shadow-brutal text-black flex flex-col gap-4 relative">
            <div>
              <span className="font-fredoka font-black text-brutalBlue text-xs bg-cream border-2 border-black px-2.5 py-0.5 rounded-full">
                Sound Synth
              </span>
              <h3 className="font-fredoka text-2xl font-black uppercase text-black mt-1">
                JELLY SYNTH PIANO 🎹
              </h3>
              <p className="text-xs font-nunito font-bold text-gray-500">
                Tap each jellyfish to trigger unique pitch frequencies! Played ({playedNotes.length}/4)
              </p>
            </div>

            {/* Keys grid */}
            <div className="grid grid-cols-4 gap-2 bg-[#091E30] p-3 rounded-2xl border-4 border-black">
              {JELLYFISH_SYNTH.map((jelly) => {
                const isBouncing = jellyBounceId === jelly.id;
                return (
                  <motion.div
                    key={jelly.id}
                    animate={isBouncing ? {
                      y: [0, -35, 0],
                      scale: [1, 1.15, 1]
                    } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    onClick={() => handleJellyClick(jelly)}
                    className={`
                      ${jelly.color} border-2 border-black p-3.5 rounded-2xl cursor-pointer shadow-brutal-sm text-center flex flex-col items-center justify-center gap-1 active:translate-y-1 active:shadow-none hover:opacity-90 select-none
                    `}
                  >
                    <span className="text-3xl leading-none">{jelly.emoji}</span>
                    <span className="font-fredoka text-[10px] font-black text-black uppercase">
                      {jelly.note}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* widget 2: Spotlight searchlight Squid finder */}
          <div className="bg-white border-[6px] border-black p-6 rounded-[36px] shadow-brutal text-black flex flex-col gap-4 relative">
            <div>
              <span className="font-fredoka font-black text-brutalPurple text-xs bg-cream border-2 border-black px-2.5 py-0.5 rounded-full">
                Abyss Scanner
              </span>
              <h3 className="font-fredoka text-2xl font-black uppercase text-black mt-1">
                SQUID SPOTTER 🦑
              </h3>
            </div>

            <div className="h-32 bg-black border-4 border-black rounded-2xl relative overflow-hidden flex items-center justify-center">
              {squidFound ? (
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-5xl animate-bounce">🦑✨</span>
                  <span className="font-fredoka text-[10px] font-black bg-brutalPink border-2 border-black px-2.5 py-0.5 rounded-full text-white">
                    SPOTTED: GIANT SQUID!
                  </span>
                </motion.div>
              ) : (
                <div 
                  onClick={handleSpotSquid}
                  className="w-16 h-16 border-4 border-black border-dashed rounded-full flex items-center justify-center text-3xl cursor-pointer hover:bg-white/10 animate-pulse bg-white/5"
                  title="Click to fire sonar searchlight"
                >
                  📡
                </div>
              )}
            </div>

            <div className="text-xs font-nunito font-extrabold text-center uppercase tracking-wider text-gray-400">
              {squidFound ? '✅ Sonar radar locked' : '❌ Sonar scan complete: empty'}
            </div>
          </div>

        </div>
      </div>

      {/* TRACKER & BOSS QUEST BUTTON */}
      <section className="max-w-6xl mx-auto px-4 mt-12 text-center select-none z-10 relative">
        <div className="bg-white border-4 border-black p-6 rounded-3xl shadow-brutal flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left flex items-start gap-4">
            <div className="text-4xl p-2 bg-cream border-2 border-black rounded-2xl shadow-brutal-sm">
              📝
            </div>
            <div>
              <h3 className="font-fredoka font-black text-xl text-black uppercase">
                Quest Progress Tracker
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className={`text-xs font-fredoka font-bold border-2 border-black px-2.5 py-0.5 rounded-full ${pulledLever ? 'bg-brutalGreen' : 'bg-gray-100 text-gray-400 border-dashed'}`}>
                  Biolume Lever ({pulledLever ? 1 : 0}/1)
                </span>
                <span className={`text-xs font-fredoka font-bold border-2 border-black px-2.5 py-0.5 rounded-full ${playedNotes.length >= 4 ? 'bg-brutalGreen' : 'bg-gray-100 text-gray-400 border-dashed'}`}>
                  Jelly Synth Keyboard ({playedNotes.length}/4)
                </span>
                <span className={`text-xs font-fredoka font-bold border-2 border-black px-2.5 py-0.5 rounded-full ${spottedSquid ? 'bg-brutalGreen' : 'bg-gray-100 text-gray-400 border-dashed'}`}>
                  Squid Spotted ({spottedSquid ? 1 : 0}/1)
                </span>
              </div>
            </div>
          </div>

          <div>
            {allTasksDone ? (
              <ChunkyButton
                color="pink"
                size="lg"
                onClick={() => { playClickSound(); setShowQuiz(true); }}
                className="animate-bounce"
              >
                START DEEP QUIZ! 🌊🧠
              </ChunkyButton>
            ) : (
              <div className="border-4 border-black border-dashed bg-gray-50 text-gray-500 font-fredoka font-black px-6 py-3 rounded-2xl text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brutalOrange" /> COMPLETE DEEP SEA ADVENTURE!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* QUIZ MODAL OVERLAY */}
      {showQuiz && (
        <QuizCard
          worldId="deep_ocean"
          questions={OCEAN_QUIZ_QUESTIONS}
          stickerReward={{
            id: 'neon_jelly',
            name: 'Neon Jellyfish 🪼',
            emoji: '🪼'
          }}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
};
