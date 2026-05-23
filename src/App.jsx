import React, { useState, useEffect } from 'react';
import { Navbar } from './components/game/Navbar';
import { StickerBook } from './components/game/StickerBook';
import { UnlockAnimation } from './components/game/UnlockAnimation';
import { LandingPage } from './views/LandingPage';
import { SpaceStation } from './views/SpaceStation';
import { DeepOceanLab } from './views/DeepOceanLab';
import { toggleMute, getMuteStatus } from './utils/soundEffects';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(2); // Mocked 2-day streak for premium gamified feel!
  const [unlockedWorlds, setUnlockedWorlds] = useState(['space_station']);
  const [unlockedStickers, setUnlockedStickers] = useState([]);
  const [isStickerBookOpen, setIsStickerBookOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeUnlockWorld, setActiveUnlockWorld] = useState(null);

  useEffect(() => {
    // Keep sound effects engine synchronized with React state
    toggleMute(isMuted);
  }, [isMuted]);

  const handleEnterWorld = (worldId) => {
    setCurrentView(worldId);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleLevelComplete = (worldId, xpEarned) => {
    setXp((prev) => prev + xpEarned);

    if (worldId === 'space_station') {
      // Unlock Space Helmet sticker
      if (!unlockedStickers.includes('space_helmet')) {
        setUnlockedStickers((prev) => [...prev, 'space_helmet']);
      }
      // Unlock Deep Ocean world
      if (!unlockedWorlds.includes('deep_ocean')) {
        setUnlockedWorlds((prev) => [...prev, 'deep_ocean']);
        // Trigger intermediate padlock key unlock cutscene overlay!
        setActiveUnlockWorld('Deep Ocean Lab');
      } else {
        // Fall back to landing page if already unlocked
        setCurrentView('landing');
      }
    } else if (worldId === 'deep_ocean') {
      // Unlock Neon Jellyfish sticker
      if (!unlockedStickers.includes('neon_jelly')) {
        setUnlockedStickers((prev) => [...prev, 'neon_jelly']);
      }
      // Complete the MVP loop! Return to map
      setCurrentView('landing');
    }
  };

  const handleUnlockAnimationComplete = () => {
    setActiveUnlockWorld(null);
    setCurrentView('landing');
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    toggleMute(nextMuted);
  };

  return (
    <div className="min-h-screen bg-cream font-sans flex flex-col relative select-none">
      
      {/* GLOBAL HEADER & DASHBOARD */}
      <Navbar
        xp={xp}
        streak={streak}
        unlockedStickersCount={unlockedStickers.length}
        onOpenStickerDrawer={() => setIsStickerBookOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        currentView={currentView}
        onBackToLanding={handleBackToLanding}
      />

      {/* CORE VIEW ROUTER */}
      <main className="flex-grow flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            unlockedWorlds={unlockedWorlds}
            xp={xp}
            onEnterWorld={handleEnterWorld}
          />
        )}

        {currentView === 'space_station' && (
          <SpaceStation
            onLevelComplete={handleLevelComplete}
            onBackToMap={handleBackToLanding}
          />
        )}

        {currentView === 'deep_ocean' && (
          <DeepOceanLab
            onLevelComplete={handleLevelComplete}
            onBackToMap={handleBackToLanding}
          />
        )}
      </main>

      {/* COLLECTIBLE DRAWERS & CELEBRATION CUTSCENES */}
      <StickerBook
        isOpen={isStickerBookOpen}
        onClose={() => setIsStickerBookOpen(false)}
        unlockedStickerIds={unlockedStickers}
      />

      <UnlockAnimation
        isOpen={activeUnlockWorld !== null}
        worldName={activeUnlockWorld || ''}
        onComplete={handleUnlockAnimationComplete}
      />
    </div>
  );
}

export default App;
