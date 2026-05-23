import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChunkyButton } from '../ui/ChunkyButton';
import { playSuccessSound, playFailureSound, playUnlockSound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, XCircle, Sparkles, ArrowRight } from 'lucide-react';

export const QuizCard = ({
  worldId,
  questions = [],
  stickerReward = {},
  onComplete,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleOptionClick = (optionIndex) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      playSuccessSound();
      setScore((prev) => prev + 1);
      // Small localized confetti pop
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.7 }
      });
    } else {
      playFailureSound();
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz complete!
      triggerQuizCompletion();
    }
  };

  const triggerQuizCompletion = () => {
    // Blast huge confetti
    playUnlockSound();
    setShowReward(true);

    // Multi-angle confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleClaimReward = () => {
    playSuccessSound();
    if (onComplete) {
      onComplete(score * 20); // Earn 20 XP per correct answer
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
      <AnimatePresence mode="wait">
        {!showReward ? (
          <motion.div
            key="quiz-card"
            initial={{ scale: 0.85, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: -50, opacity: 0 }}
            className="w-full max-w-xl bg-white border-[6px] border-black p-6 rounded-3xl shadow-brutal flex flex-col gap-6 relative text-black"
          >
            {/* Header progress info */}
            <div className="flex justify-between items-center border-b-4 border-black pb-3">
              <span className="font-fredoka font-black text-brutalOrange uppercase tracking-wide">
                🧠 CURIOSITY BRAIN CHALLENGE
              </span>
              <span className="font-fredoka font-bold text-sm bg-brutalBlue text-white border-2 border-black px-2.5 py-0.5 rounded-xl">
                Q: {currentIdx + 1}/{questions.length}
              </span>
            </div>

            {/* Question Text */}
            <div className="bg-[#FFF6E9] border-4 border-black p-5 rounded-2xl relative">
              <div className="absolute -top-3 left-4 bg-brutalPink border-2 border-black px-3 py-0.5 rounded-full text-xs font-fredoka font-bold text-white uppercase tracking-wider">
                Question
              </div>
              <h3 className="font-fredoka font-extrabold text-xl md:text-2xl text-brutalNavy leading-snug mt-1">
                {currentQuestion?.questionText}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="flex flex-col gap-3">
              {currentQuestion?.options.map((option, idx) => {
                let borderClass = 'border-black';
                let bgClass = 'bg-white text-black hover:bg-cream';
                let icon = null;

                if (isAnswered) {
                  const isCorrect = idx === currentQuestion.correctAnswer;
                  const isSelected = idx === selectedOption;

                  if (isCorrect) {
                    bgClass = 'bg-[#E1FFD4] text-black'; // Brutal Light Green
                    borderClass = 'border-black ring-4 ring-brutalGreen/30';
                    icon = <CheckCircle className="w-6 h-6 stroke-brutalGreen fill-black stroke-[2.5]" />;
                  } else if (isSelected) {
                    bgClass = 'bg-[#FFD4E5] text-black'; // Brutal Light Pink
                    borderClass = 'border-black ring-4 ring-brutalPink/30';
                    icon = <XCircle className="w-6 h-6 stroke-brutalPink fill-black stroke-[2.5]" />;
                  } else {
                    bgClass = 'bg-gray-50 text-gray-400 opacity-60';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleOptionClick(idx)}
                    className={`
                      w-full border-4 ${borderClass} ${bgClass} p-4 rounded-2xl font-fredoka font-bold text-lg text-left flex items-center justify-between transition-all shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-brutal-active
                    `}
                  >
                    <span>{option}</span>
                    {icon}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback & Actions */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between border-t-4 border-black pt-4 mt-2"
              >
                <div className="font-fredoka text-sm font-extrabold text-brutalNavy">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <span className="text-brutalGreen flex items-center gap-1.5">
                      ⭐ SPECTACULAR! +20 XP
                    </span>
                  ) : (
                    <span className="text-brutalPink">
                      Oops! The correct answer was: {currentQuestion.options[currentQuestion.correctAnswer]}
                    </span>
                  )}
                </div>

                <ChunkyButton
                  color="green"
                  size="sm"
                  onClick={handleNext}
                  className="flex items-center gap-1.5"
                >
                  {currentIdx < questions.length - 1 ? 'Next' : 'Finish'} <ArrowRight className="w-4 h-4" />
                </ChunkyButton>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="reward-card"
            initial={{ scale: 0.8, rotate: -3, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            className="w-full max-w-md bg-brutalPurple border-[6px] border-black p-8 rounded-[36px] shadow-brutal text-center flex flex-col items-center gap-6 relative"
          >
            {/* Sparkly graphics */}
            <div className="absolute top-4 left-6 text-3xl animate-bounce">✨</div>
            <div className="absolute top-8 right-8 text-3xl animate-bounce">🎈</div>

            <div className="bg-brutalYellow border-4 border-black p-4 rounded-full shadow-brutal w-20 h-20 flex items-center justify-center -mt-16">
              <Award className="w-12 h-12 stroke-black stroke-[2.5]" />
            </div>

            <div>
              <h2 className="text-4xl font-fredoka font-black tracking-wider text-brutalYellow uppercase leading-none mb-1">
                COMPLETED!
              </h2>
              <p className="text-sm font-nunito font-extrabold text-purple-200 uppercase tracking-widest">
                Curiosity Level Mastered
              </p>
            </div>

            <div className="bg-white border-4 border-black p-5 rounded-3xl shadow-brutal w-full flex flex-col items-center gap-3">
              <span className="font-fredoka text-gray-500 font-extrabold text-xs uppercase tracking-widest">
                Sticker Badge Unlocked!
              </span>

              <div className="text-6xl p-3 bg-cream border-2 border-black rounded-2xl animate-bounce">
                {stickerReward.emoji}
              </div>

              <h3 className="font-fredoka font-black text-2xl text-brutalPink">
                {stickerReward.name}
              </h3>

              <p className="font-nunito font-bold text-sm text-gray-600 leading-relaxed px-2">
                "You explored, questioned, and conquered! This beautiful badge has been officially pasted inside your Sticker Book."
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="font-fredoka font-black text-white text-lg bg-black/30 py-2 rounded-2xl">
                💰 EARNED: +{score * 20} XP!
              </div>

              <ChunkyButton
                color="yellow"
                size="lg"
                onClick={handleClaimReward}
                className="w-full mt-2"
              >
                CLAIM REWARD! 🚀
              </ChunkyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
