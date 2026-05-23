import React from 'react';
import { playClickSound } from '../../utils/soundEffects';

const colorClasses = {
  pink: 'bg-brutalPink text-white hover:bg-opacity-95',
  yellow: 'bg-brutalYellow text-black hover:bg-[#ffe775]',
  blue: 'bg-brutalBlue text-white hover:bg-opacity-95',
  green: 'bg-brutalGreen text-black hover:bg-opacity-95',
  orange: 'bg-brutalOrange text-white hover:bg-opacity-95',
  purple: 'bg-brutalPurple text-white hover:bg-opacity-95',
  cream: 'bg-cream text-black hover:bg-opacity-90',
  white: 'bg-white text-black hover:bg-gray-50',
};

export const ChunkyButton = ({
  color = 'pink',
  onClick,
  children,
  className = '',
  size = 'md',
  ...props
}) => {
  const handleClick = (e) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm border-2 shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]',
    md: 'px-6 py-3 text-lg border-4 shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    lg: 'px-8 py-4 text-2xl border-[5px] shadow-brutal-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
  };

  return (
    <button
      onClick={handleClick}
      className={`
        font-fredoka font-bold rounded-2xl border-black
        transition-all duration-150 transform hover:-translate-y-[2px]
        flex items-center justify-center gap-2 select-none
        ${colorClasses[color] || colorClasses.pink}
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
