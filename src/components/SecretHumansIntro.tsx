import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../types';
import { INITIAL_PROFILES } from '../data/studentProfiles';

interface SecretHumansIntroProps {
  onStartOnboarding: () => void;
  onSelectPreviewProfile: (profile: StudentProfile) => void;
}

export const SecretHumansIntro: React.FC<SecretHumansIntroProps> = ({
  onStartOnboarding,
  onSelectPreviewProfile,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Rotate through secret humans every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % INITIAL_PROFILES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentHuman = INITIAL_PROFILES[activeIndex];

  return (
    <div className="w-full my-6 glass-panel rounded-3xl p-5 border border-white/15 shadow-2xl relative overflow-hidden text-left bg-gradient-to-b from-[#2a1420]/80 to-[#1e0f10]/90">
      {/* Decorative Glows */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#FF4B5C]/20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#6C4AB6]/20 blur-3xl rounded-full pointer-events-none"></div>

      {/* Intro Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#5edda8] animate-ping"></span>
          <span className="text-[11px] font-bold text-[#ffb3b3] uppercase tracking-widest">
            SECRET HUMANS OF MANIPAL
          </span>
        </div>
        <span className="text-[10px] text-[#e3bebd] font-mono bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
          SPOTLIGHT #{activeIndex + 1} OF {INITIAL_PROFILES.length}
        </span>
      </div>

      {/* Animated Card Spotlight */}
      <div className="relative min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHuman.id}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 items-center sm:items-start"
          >
            {/* Student Image Avatar with Animated Ring */}
            <div className="relative shrink-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#FF4B5C] shadow-xl group">
                <img
                  src={currentHuman.avatarUrl}
                  alt={currentHuman.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold text-[#5edda8] border border-[#5edda8]/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[11px]">verified</span>
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Pulsing online indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0ba574] text-white flex items-center justify-center border-2 border-[#1e0f10] shadow-md">
                <span className="material-symbols-outlined text-xs">local_fire_department</span>
              </div>
            </div>

            {/* Student Details & Vibes */}
            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  {currentHuman.name}, {currentHuman.age}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#6C4AB6]/30 border border-[#6C4AB6]/50 text-[#d1bcff] text-[10px] font-bold">
                  {currentHuman.campus}
                </span>
              </div>

              <p className="text-xs text-[#ffb3b3] font-medium">
                {currentHuman.major} • {currentHuman.year}
              </p>

              {/* Catchphrase Quote */}
              <p className="text-xs text-[#e3bebd] italic line-clamp-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                "{currentHuman.quote}"
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                {currentHuman.interests.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold text-white border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots & Quick Actions */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {INITIAL_PROFILES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-6 bg-[#FF4B5C]' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              title={`View ${INITIAL_PROFILES[idx].name}`}
            />
          ))}
        </div>

        {/* Quick Preview Button */}
        <button
          onClick={() => onSelectPreviewProfile(currentHuman)}
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-semibold transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm text-[#ffb3b3]">visibility</span>
          <span>PREVIEW CARD</span>
        </button>
      </div>
    </div>
  );
};
