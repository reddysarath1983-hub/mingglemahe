import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StudentProfile } from '../types';
import { ASSETS } from '../data/studentProfiles';

interface MatchCelebrationModalProps {
  matchedStudent: StudentProfile;
  onSendMessage: (student: StudentProfile) => void;
  onKeepDiscovering: () => void;
}

export const MatchCelebrationModal: React.FC<MatchCelebrationModalProps> = ({
  matchedStudent,
  onSendMessage,
  onKeepDiscovering,
}) => {
  useEffect(() => {
    // Fire festive confetti animation
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF4B5C', '#6C4AB6', '#ffffff', '#ffb3b3', '#5edda8'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#1e0f10]/95 backdrop-blur-xl flex flex-col items-center justify-center p-5 animate-in fade-in duration-300">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#6C4AB6]/40 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#FF4B5C]/30 rounded-full blur-[140px]"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm text-center">
        {/* Celebration Typography */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FF4B5C]/20 border border-[#FF4B5C]/40 text-[#ffb3b3] text-xs font-bold tracking-widest uppercase mb-2">
            NEW CONNECTION
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold italic tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] mb-2 drop-shadow-lg">
            IT'S A MATCH!
          </h1>
          <p className="text-base text-[#e3bebd]">
            You and <strong className="text-white font-semibold">{matchedStudent.name}</strong> liked each other.
          </p>
        </div>

        {/* Overlapping Profile Circles */}
        <div className="flex items-center justify-center relative mb-12">
          {/* Left Profile (User) */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-[#1e0f10] overflow-hidden relative z-10 -mr-5 match-glow bg-[#2c1b1b] shadow-2xl">
            <img
                src={ASSETS.userAvatar}
              alt="Your Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Profile (Matched Student) */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-[#1e0f10] overflow-hidden relative z-20 -ml-5 match-glow bg-[#2c1b1b] shadow-2xl">
            <img
                src={matchedStudent.avatarUrl}
              alt={`${matchedStudent.name}'s Profile`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative Heart Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#1e0f10]/90 backdrop-blur-md rounded-full p-2.5 border border-white/20 shadow-2xl animate-bounce">
            <span className="material-symbols-outlined text-[#ff5260] text-3xl">
              favorite
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3.5">
          <button
            onClick={() => onSendMessage(matchedStudent)}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] font-bold text-sm text-white shadow-xl shadow-[#FF4B5C]/30 hover:opacity-90 active:scale-[0.98] transition-all uppercase tracking-wider flex justify-center items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            <span>SEND MESSAGE</span>
          </button>

          <button
            onClick={onKeepDiscovering}
            className="w-full py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 font-bold text-sm text-[#f9dcdb] shadow-sm hover:bg-white/15 active:scale-[0.98] transition-colors uppercase tracking-wider cursor-pointer"
          >
            KEEP DISCOVERING
          </button>
        </div>
      </main>
    </div>
  );
};
