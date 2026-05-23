import React from 'react';
import { ChunkyButton } from '../ui/ChunkyButton';
import { playClickSound } from '../../utils/soundEffects';
import { Volume2, VolumeX, Flame, Trophy, Compass } from 'lucide-react';

export const Navbar = ({
  xp = 0,
  streak = 1,
  unlockedStickersCount = 0,
  onOpenStickerDrawer,
  isMuted = true,
  onToggleMute,
  currentView = 'landing',
  onBackToLanding,
}) => {
  // Max XP per Level is 100 for visual calculation
  const currentLevelXp = xp % 100;
  const levelNum = Math.floor(xp / 100) + 1;
  const xpPercent = Math.min(100, Math.max(0, currentLevelXp));

  const handleLogoClick = () => {
    playClickSound();
    if (onBackToLanding) onBackToLanding();
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-4 md:px-8 bg-cream border-b-4 border-black select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-brutalPink border-4 border-black px-4 py-1.5 rounded-2xl shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-active transition-all">
            <span className="font-fredoka text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase select-none group-hover:scale-105 inline-block transform transition-transform">
              Tiny<span className="text-brutalYellow">Mind</span> 🧠
            </span>
          </div>
          {currentView !== 'landing' && (
            <ChunkyButton 
              size="sm" 
              color="yellow" 
              onClick={onBackToLanding}
              className="ml-2"
            >
              <Compass className="w-4 h-4" /> Map
            </ChunkyButton>
          )}
        </div>

        {/* Game Stats & Widgets */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 w-full md:w-auto">
          {/* XP Bar */}
          <div className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 rounded-2xl shadow-brutal w-full max-w-[280px] md:w-60">
            <div className="flex flex-col w-full gap-1">
              <div className="flex justify-between items-center text-xs font-fredoka font-bold">
                <span className="text-brutalNavy font-extrabold text-sm">LVL {levelNum}</span>
                <span className="text-gray-500">{currentLevelXp}/100 XP</span>
              </div>
              <div className="w-full bg-cream border-2 border-black h-4 rounded-full overflow-hidden p-[2px]">
                <div
                  className="bg-brutalGreen h-full rounded-full transition-all duration-500 ease-out border-r border-black"
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Flame Streak Widget */}
          <div className="flex items-center gap-1.5 bg-brutalOrange border-4 border-black text-white px-3.5 py-1.5 rounded-2xl shadow-brutal font-fredoka font-bold text-lg select-none hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 fill-white stroke-black stroke-[2.5px] animate-bounce" />
            <span className="text-black stroke-text">{streak} Day Streak!</span>
          </div>

          {/* Sticker drawer Toggle */}
          <ChunkyButton
            color="purple"
            size="sm"
            onClick={onOpenStickerDrawer}
            className="relative"
          >
            <Trophy className="w-5 h-5 text-white" />
            <span className="hidden sm:inline">Stickers</span>
            {unlockedStickersCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-brutalYellow border-2 border-black text-black text-xs font-fredoka font-black rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                {unlockedStickersCount}
              </span>
            )}
          </ChunkyButton>

          {/* Audio Switch */}
          <ChunkyButton
            color={isMuted ? 'cream' : 'green'}
            size="sm"
            onClick={onToggleMute}
            className="w-11 h-11 p-0 flex items-center justify-center"
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-black" />
            ) : (
              <Volume2 className="w-5 h-5 text-black" />
            )}
          </ChunkyButton>
        </div>
      </div>
    </header>
  );
};
