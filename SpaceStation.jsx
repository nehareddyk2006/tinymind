import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChunkyButton } from '../components/ui/ChunkyButton';
import { FloatingSticker } from '../components/ui/FloatingSticker';
import { playClickSound, playSuccessSound } from '../utils/soundEffects';
import { QuizCard } from '../components/game/QuizCard';
import { Rocket, Eye, Sparkles, BookOpen, AlertCircle, Compass, HelpCircle, ChevronRight } from 'lucide-react';

const PLANETS_DATA = [
  {
    id: 'venus',
    name: 'Venus 🪐',
    color: 'bg-brutalOrange',
    emoji: '🪐',
    fact: 'Venus is a beautiful but super hostile planet shrouded in thick, yellow toxic clouds. It spins backwards compared to Earth, meaning the sun rises in the west and sets in the east! Because its rotation is so slow, it takes Venus longer to complete a single spin than to orbit the sun, making a day longer than its year! It is also the hottest planet in our solar system because its thick atmosphere traps heat like a giant greenhouse, reaching a scorching 900°F (475°C) — hot enough to melt lead!',
    keyPoints: [
      '🌅 Reverse Spin: Sun rises in the West and sets in the East!',
      '🥵 Solar Heater: Hottest planet in the solar system at 900°F!',
      '⏰ Day > Year: One day is 243 Earth days; a year is 225 Earth days!'
    ],
    diameter: 'w-24 h-24'
  },
  {
    id: 'saturn',
    name: 'Saturn 💎',
    color: 'bg-brutalYellow',
    emoji: '🪐',
    fact: "Saturn is a gorgeous gas giant best known for its spectacular, glittering ring system made of billions of chunks of ice, dust, and rock. But its deep atmosphere hiding bizarre secrets is even more shocking! The extreme atmospheric pressure and high temperatures crush methane gas in the clouds into solid diamonds, causing literal diamond rain to fall through the planet's layers like beautiful, sparkling hail! If you could somehow stand in its atmosphere, you would be pelted by thousands of diamonds, but you'd also be crushed by its fierce winds that scream at 1,100 miles per hour!",
    keyPoints: [
      '💎 Gem Shower: Literal diamonds rain down through its clouds!',
      '🧊 Ring Master: Spectacular rings are made of frozen water ice!',
      '💨 Super Winds: Storms rage at a screaming 1,100 miles per hour!'
    ],
    diameter: 'w-28 h-28'
  },
  {
    id: 'jupiter',
    name: 'Jupiter 🌪️',
    color: 'bg-brutalPink',
    emoji: '🔴',
    fact: "Jupiter is the undisputed king of our solar system — a massive gas giant so huge that more than 1,300 Earths could easily fit inside it! Its most famous feature is the Giant Red Spot, a colossal, swirling hurricane twice as wide as our entire planet that has been raging furiously for over 300 years. Jupiter has a ultra-powerful magnetic field and is surrounded by a swarm of over 95 moons, including volcanic worlds and hidden ice oceans. It acts like a giant shield for Earth, using its massive gravity to suck in dangerous comets and asteroids!",
    keyPoints: [
      '🌪️ Eternal Storm: Giant Red Spot is a hurricane raging for 300+ years!',
      '👑 Cosmic Giant: Largest planet, fitting over 1,300 Earths inside!',
      '🛡️ Gravity Shield: Protects Earth by pulling in space rocks!'
    ],
    diameter: 'w-32 h-32'
  },
  {
    id: 'uranus',
    name: 'Uranus 🌌',
    color: 'bg-brutalBlue',
    emoji: '🪐',
    fact: "Uranus is an icy, pale blue gas giant that is famous for being the 'lazy planet' because it spins completely on its side! Scientists believe a massive space rock, possibly twice the size of Earth, smashed into it billions of years ago and knocked it completely over. It has a vertical set of dark rings and is surrounded by 28 moons named after characters written by Shakespeare. It is also the coldest planet in the solar system, with temperature minimums dipping to a freezing -371°F (-224°C), making it a giant, floating cosmic popsicle!",
    keyPoints: [
      '🛹 Sideway Roller: Rolls around the sun on its side like a skateboard!',
      '🥶 Cosmic Popsicle: Coldest planet in the solar system at -371°F!',
      '🎭 Shakespeare Moons: All moons are named after classic plays!'
    ],
    diameter: 'w-26 h-26'
  }
];

const SPACE_QUIZ_QUESTIONS = [
  {
    questionText: "What glittering precious stone literally rains down from the sky on Saturn?",
    options: ["Sparkly Jellybeans 🍬", "Solid Diamonds 💎", "Frozen Ice Cream 🍦", "Gold Gold Gold 🪙"],
    correctAnswer: 1
  },
  {
    questionText: "Which planet spins backwards and has a day that is actually longer than its year?",
    options: ["Mars 🔴", "Venus 🪐", "Saturn 💎", "Earth 🌍"],
    correctAnswer: 1
  },
  {
    questionText: "How long has Jupiter's Giant Red Spot hurricane been screaming across space?",
    options: ["About 2 weeks 📅", "Exactly 5 years 🦖", "Over 300 years! 🌪️", "Since yesterday morning ☀️"],
    correctAnswer: 2
  }
];

export const SpaceStation = ({
  onLevelComplete,
  onBackToMap
}) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [rocketFired, setRocketFired] = useState(false);
  const [foundWhale, setFoundWhale] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Track if they've interacted with all things to encourage them
  const [hasClickedPlanets, setHasClickedPlanets] = useState([]);
  const [launchedRocket, setLaunchedRocket] = useState(false);

  const handlePlanetClick = (planet) => {
    playClickSound();
    setSelectedPlanet(planet);
    if (!hasClickedPlanets.includes(planet.id)) {
      setHasClickedPlanets(prev => [...prev, planet.id]);
    }
  };

  const handleLaunchRocket = () => {
    if (rocketFired) return;
    playSuccessSound();
    setRocketFired(true);
    setLaunchedRocket(true);
    setTimeout(() => {
      setRocketFired(false);
    }, 4000);
  };

  const handleFindWhale = () => {
    if (foundWhale) return;
    playSuccessSound();
    setFoundWhale(true);
  };

  const handleQuizComplete = (xpEarned) => {
    setShowQuiz(false);
    if (onLevelComplete) {
      onLevelComplete('space_station', xpEarned);
    }
  };

  const allTasksDone = hasClickedPlanets.length >= 4 && launchedRocket && foundWhale;

  return (
    <div className="w-full min-h-screen bg-brutalNavy text-white pb-20 relative select-none overflow-x-hidden">
      
      {/* Space Background Elements */}
      <FloatingSticker emoji="✨" className="top-24 left-10 text-3xl animate-sparkle" duration={4} />
      <FloatingSticker emoji="🌌" className="top-40 right-20 text-4xl" duration={7} />
      <FloatingSticker emoji="🛰️" className="top-[60%] left-8 text-5xl" duration={8} delay={1} />
      <FloatingSticker emoji="☄️" className="top-96 right-10 text-4xl animate-pulse" duration={5} />

      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 pt-8 flex justify-between items-center z-10 relative">
        <ChunkyButton color="yellow" size="sm" onClick={onBackToMap}>
          ← Back to Map
        </ChunkyButton>
        <div className="bg-brutalBlue border-4 border-black text-black px-4 py-1.5 rounded-2xl shadow-brutal font-fredoka font-black">
          🚀 SPACE EXPEDITION
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-4xl mx-auto text-center px-4 pt-12 pb-8 z-10 relative">
        <h1 className="text-4xl md:text-6xl font-fredoka font-black text-brutalYellow uppercase leading-none tracking-tight">
          RETRO SPACE LAB 🛰️
        </h1>
        <p className="text-sm md:text-base font-nunito font-extrabold text-purple-200 uppercase tracking-widest mt-2">
          EXPEDITION QUEST: Interact with all widgets to unlock the Boss Quiz!
        </p>
      </section>

      {/* MAIN SCI-FI PLAY PANEL */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative">
        
        {/* LEFT COLUMN (Planet Orbit Clicker) - 7 grid cols */}
        <div className="lg:col-span-7 bg-white border-[6px] border-black p-6 rounded-[36px] shadow-brutal text-black flex flex-col gap-6 min-h-[450px]">
          <div>
            <span className="font-fredoka font-black text-brutalPink text-xs uppercase bg-cream border-2 border-black px-2.5 py-0.5 rounded-full">
              Interactive Lab
            </span>
            <h2 className="text-3xl font-fredoka font-black text-black uppercase mt-1">
              PLANET FACT POPPER 🪐
            </h2>
            <p className="text-xs font-nunito font-bold text-gray-500">
              Orbital simulator. Tap any spinning planet to read its bizarre secrets!
            </p>
          </div>

          {/* Planet Orbit Canvas */}
          <div className="flex-grow bg-brutalNavy border-4 border-black rounded-3xl relative overflow-hidden h-72 flex items-center justify-center">
            {/* Stars background */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
            <div className="absolute w-60 h-60 border-2 border-dashed border-gray-700 rounded-full animate-spin-slow" />
            
            {/* SUN in center */}
            <div className="absolute w-16 h-16 bg-brutalYellow border-4 border-black rounded-full shadow-brutal flex items-center justify-center font-bold text-2xl animate-pulse">
              ☀️
            </div>

            {/* Orbiting Planet 1 (Venus) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
              className="absolute w-52 h-52 flex items-start justify-center cursor-pointer pointer-events-none z-20"
            >
              <div
                onClick={() => handlePlanetClick(PLANETS_DATA[0])}
                className="w-12 h-12 bg-brutalOrange border-2 border-black rounded-full shadow-brutal-sm pointer-events-auto flex items-center justify-center hover:scale-110 active:scale-95 text-lg font-bold z-30"
                title="Click Venus"
              >
                🪐
              </div>
            </motion.div>

            {/* Orbiting Planet 2 (Saturn) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              className="absolute w-72 h-72 flex items-end justify-center cursor-pointer pointer-events-none z-21"
            >
              <div
                onClick={() => handlePlanetClick(PLANETS_DATA[1])}
                className="w-16 h-16 bg-brutalYellow border-2 border-black rounded-full shadow-brutal-sm pointer-events-auto flex items-center justify-center hover:scale-110 active:scale-95 text-xl font-bold z-30"
                title="Click Saturn"
              >
                🪐
              </div>
            </motion.div>

            {/* Orbiting Planet 3 (Jupiter) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="absolute w-80 h-80 flex items-center justify-start cursor-pointer pointer-events-none z-22"
            >
              <div
                onClick={() => handlePlanetClick(PLANETS_DATA[2])}
                className="w-18 h-18 bg-brutalPink border-2 border-black rounded-full shadow-brutal-sm pointer-events-auto flex items-center justify-center hover:scale-110 active:scale-95 text-2xl font-bold z-30"
                title="Click Jupiter"
              >
                🔴
              </div>
            </motion.div>

            {/* Orbiting Planet 4 (Uranus) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              className="absolute w-[340px] h-[340px] flex items-end justify-start cursor-pointer pointer-events-none z-23"
            >
              <div
                onClick={() => handlePlanetClick(PLANETS_DATA[3])}
                className="w-14 h-14 bg-brutalBlue border-2 border-black rounded-full shadow-brutal-sm pointer-events-auto flex items-center justify-center hover:scale-110 active:scale-95 text-xl font-bold z-30"
                title="Click Uranus"
              >
                🪐
              </div>
            </motion.div>
          </div>

          {/* Interactive Scanning Console manual override switches */}
          <div className="bg-gray-50 border-4 border-black p-4 rounded-2xl flex flex-col gap-2 shadow-brutal-sm">
            <span className="font-fredoka text-xs font-black text-gray-400 uppercase tracking-wider block">
              📟 LAB SCANNER CONSOLE (Click to Scan Instantly)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PLANETS_DATA.map((planet) => {
                const isClicked = hasClickedPlanets.includes(planet.id);
                return (
                  <button
                    key={planet.id}
                    onClick={() => handlePlanetClick(planet)}
                    className={`
                      border-2 border-black px-3 py-2.5 rounded-xl font-fredoka text-xs font-black shadow-brutal-sm flex items-center justify-center gap-1.5 active:translate-y-[1px] active:shadow-none transition-all
                      ${isClicked 
                        ? 'bg-brutalGreen text-black font-black scale-102 border-l-[4px]' 
                        : 'bg-white text-black hover:bg-cream'
                      }
                    `}
                  >
                    <span>{planet.emoji}</span>
                    <span>SCAN {planet.name.split(' ')[0].toUpperCase()}</span>
                    {isClicked && <span className="text-[10px] animate-pulse">📡</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Planet Fact Card */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              {selectedPlanet ? (
                <motion.div
                  key={selectedPlanet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-cream border-4 border-black p-5 rounded-[24px] flex flex-col sm:flex-row items-start gap-4 shadow-brutal-sm"
                >
                  <div className="text-5xl p-3 bg-white border-4 border-black rounded-2xl flex-shrink-0 animate-bounce">
                    {selectedPlanet.emoji}
                  </div>
                  <div className="flex-grow flex flex-col gap-3">
                    <div>
                      <h4 className="font-fredoka font-black text-brutalPink text-2xl uppercase leading-none">
                        {selectedPlanet.name} SCAN DATA
                      </h4>
                      <span className="text-[10px] font-nunito font-black text-gray-400 uppercase tracking-widest block mt-1">
                        COSMIC LABORATORY TELEMETRY
                      </span>
                    </div>
                    <p className="text-sm font-nunito font-extrabold text-brutalNavy leading-relaxed">
                      {selectedPlanet.fact}
                    </p>
                    {/* Key Bullet Points */}
                    {selectedPlanet.keyPoints && (
                      <div className="flex flex-col gap-2.5 mt-1 border-t-2 border-black/10 pt-3">
                        <span className="font-fredoka text-xs font-black text-brutalOrange uppercase tracking-wide">
                          🧠 CRITICAL TELEMETRY STICKERS:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedPlanet.keyPoints.map((point, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs font-nunito font-extrabold text-gray-700 bg-white border-2 border-black px-3 py-1 rounded-xl w-fit shadow-brutal-sm">
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="border-4 border-black border-dashed rounded-[24px] p-6 text-center text-gray-500 font-fredoka font-bold text-base bg-gray-50 flex items-center justify-center h-[220px]">
                  💡 Tap one of the orbiting planets above, or press a SCAN button on the Scanner Console to load telemetry data!
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN (Rocket Launch + Telescope Search) - 5 grid cols */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* widget 1: Rocket Launchpad */}
          <div className="bg-white border-[6px] border-black p-6 rounded-[36px] shadow-brutal text-black flex flex-col gap-4 relative overflow-hidden">
            <div>
              <span className="font-fredoka font-black text-brutalBlue text-xs bg-cream border-2 border-black px-2.5 py-0.5 rounded-full">
                Launcher
              </span>
              <h3 className="font-fredoka text-2xl font-black uppercase text-black mt-1">
                LAUNCH ROCKET! 🚀
              </h3>
            </div>

            {/* Launch tube */}
            <div className="bg-brutalNavy border-4 border-black h-36 rounded-2xl relative overflow-hidden flex items-end justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              {/* Rocket flying animation */}
              <motion.div
                animate={rocketFired ? {
                  y: [-10, -180],
                  x: [0, 80],
                  scale: [1, 0.4],
                  rotate: [0, 20]
                } : { y: 0 }}
                transition={{ duration: 3, ease: 'easeIn' }}
                className="z-10 pb-4"
              >
                <Rocket className="w-12 h-12 stroke-black fill-brutalPink stroke-[2.5] text-white" />
                {rocketFired && (
                  <div className="w-4 h-12 bg-gradient-to-t from-brutalOrange to-brutalYellow rounded-full blur-sm mx-auto -mt-2 animate-bounce" />
                )}
              </motion.div>
            </div>

            <ChunkyButton
              color={rocketFired ? 'cream' : 'pink'}
              onClick={handleLaunchRocket}
              disabled={rocketFired}
              className="w-full text-sm uppercase py-2.5"
            >
              {rocketFired ? 'IGNITING ENGINES... 🔥' : 'FIRE ROCKET BOOSTER! 💥'}
            </ChunkyButton>
          </div>

          {/* widget 2: Telescope Hunt */}
          <div className="bg-white border-[6px] border-black p-6 rounded-[36px] shadow-brutal text-black flex flex-col gap-4 relative">
            <div>
              <span className="font-fredoka font-black text-brutalPurple text-xs bg-cream border-2 border-black px-2.5 py-0.5 rounded-full">
                Finder View
              </span>
              <h3 className="font-fredoka text-2xl font-black uppercase text-black mt-1">
                TELESCOPE SCANNER 🐳
              </h3>
              <p className="text-xs font-nunito font-bold text-gray-500">
                A massive cosmic Space Whale is hidden in this coordinate block! Find and tap it!
              </p>
            </div>

            <div className="h-32 bg-brutalNavy border-4 border-black rounded-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:8px_8px]" />
              
              {foundWhale ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [-10, 10, -5, 0] }}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <span className="text-5xl animate-bounce">🐳✨</span>
                  <span className="font-fredoka text-[10px] font-black bg-brutalGreen border-2 border-black px-2 py-0.5 rounded-full text-black">
                    FOUND: SPACE WHALE!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={handleFindWhale}
                  className="w-16 h-16 border-4 border-black border-dashed rounded-full flex items-center justify-center text-3xl cursor-pointer hover:bg-black/40 bg-white/5 animate-pulse"
                  title="Click to search the stars"
                >
                  🔍
                </motion.div>
              )}
            </div>

            <div className="text-xs font-nunito font-extrabold text-center uppercase tracking-wider text-gray-400">
              {foundWhale ? '✅ Star scanner fully locked' : '❌ Space Whale coordinates lost'}
            </div>
          </div>

        </div>
      </div>

      {/* LEVEL END PROGRESS BAR AND BOSS FIGHT UNLOCK */}
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
                <span className={`text-xs font-fredoka font-bold border-2 border-black px-2.5 py-0.5 rounded-full ${hasClickedPlanets.length >= 4 ? 'bg-brutalGreen' : 'bg-gray-100 text-gray-400 border-dashed'}`}>
                  Planets Pop ({hasClickedPlanets.length}/4)
                </span>
                <span className={`text-xs font-fredoka font-bold border-2 border-black px-2.5 py-0.5 rounded-full ${launchedRocket ? 'bg-brutalGreen' : 'bg-gray-100 text-gray-400 border-dashed'}`}>
                  Rocket Launched ({launchedRocket ? 1 : 0}/1)
                </span>
                <span className={`text-xs font-fredoka font-bold border-2 border-black px-2.5 py-0.5 rounded-full ${foundWhale ? 'bg-brutalGreen' : 'bg-gray-100 text-gray-400 border-dashed'}`}>
                  Whale Spotted ({foundWhale ? 1 : 0}/1)
                </span>
              </div>
            </div>
          </div>

          <div>
            {allTasksDone ? (
              <ChunkyButton
                color="green"
                size="lg"
                onClick={() => { playClickSound(); setShowQuiz(true); }}
                className="animate-bounce"
              >
                START SPACE QUIZ! 🚀🏆
              </ChunkyButton>
            ) : (
              <div className="border-4 border-black border-dashed bg-gray-50 text-gray-500 font-fredoka font-black px-6 py-3 rounded-2xl text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brutalOrange" /> COMPLETE THE EXPEDITION!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* QUIZ DRAWER OVERLAY */}
      {showQuiz && (
        <QuizCard
          worldId="space_station"
          questions={SPACE_QUIZ_QUESTIONS}
          stickerReward={{
            id: 'space_helmet',
            name: 'Cosmic Helmet 🧑‍🚀',
            emoji: '🧑‍🚀'
          }}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
};
