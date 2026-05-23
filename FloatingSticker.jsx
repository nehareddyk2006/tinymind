import React from 'react';
import { motion } from 'framer-motion';

export const FloatingSticker = ({
  emoji,
  className = '',
  delay = 0,
  duration = 6,
  yOffset = 15,
  rotateOffset = 8,
  children
}) => {
  return (
    <motion.div
      initial={{ y: 0, rotate: -rotateOffset / 2 }}
      animate={{
        y: [yOffset, -yOffset, yOffset],
        rotate: [rotateOffset, -rotateOffset, rotateOffset],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`
        absolute select-none pointer-events-none z-0
        ${className}
      `}
    >
      {emoji ? (
        <span className="text-4xl filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {emoji}
        </span>
      ) : (
        children
      )}
    </motion.div>
  );
};
