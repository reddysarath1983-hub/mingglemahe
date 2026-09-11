import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../types';
import { DepthCarousel } from './DepthCarousel';

interface DiscoverScreenProps {
  profiles: StudentProfile[];
  onSwipeLike: (profile: StudentProfile) => void;
  onSwipePass: (profile: StudentProfile) => void;
  onSuperLike: (profile: StudentProfile) => void;
  onOpenCampusPass: () => void;
  hasCampusPass: boolean;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  profiles,
  onSwipeLike,
  onSwipePass,
  onSuperLike,
  onOpenCampusPass,
  hasCampusPass,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBioDetails, setShowBioDetails] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const [showFreshersMode, setShowFreshersMode] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const currentProfile = profiles[currentIndex];

  const handleNext = (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile) return;

    if (action === 'like') {
      setSwipeDirection('right');
      setTimeout(() => {
        onSwipeLike(currentProfile);
        setSwipeDirection(null);
        setCurrentIndex((prev) => (prev + 1) % profiles.length);
        setShowBioDetails(false);
      }, 250);
    } else if (action === 'pass') {
      setSwipeDirection('left');
      setTimeout(() => {
        onSwipePass(currentProfile);
        setSwipeDirection(null);
        setCurrentIndex((prev) => (prev + 1) % profiles.length);
        setShowBioDetails(false);
      }, 250);
    } else if (action === 'superlike') {
      setSwipeDirection('up');
      setTimeout(() => {
        onSuperLike(currentProfile);
        setSwipeDirection(null);
        setCurrentIndex((prev) => (prev + 1) % profiles.length);
        setShowBioDetails(false);
      }, 250);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        handleNext('like');
      } else {
        handleNext('pass');
      }
    } else if (deltaY < -70 && Math.abs(deltaY) > Math.abs(deltaX)) {
      handleNext('superlike');
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pb-24 md:pb-6">
        <div className="w-20 h-20 rounded-full bg-[#6C4AB6]/20 flex items-center justify-center mb-4 border border-[#6C4AB6]/40">
          <span className="material-symbols-outlined text-4xl text-[#d1bcff]">sparkles</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">You've seen all profiles!</h2>
        <p className="text-sm text-[#e3bebd] max-w-xs mb-6">
          Check back later for new verified Manipal students or expand your discovery radius with Campus Pass.
        </p>
        <button
          onClick={onOpenCampusPass}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-sm tracking-wide shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          UNLOCK CAMPUS PASS
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full max-w-sm mx-auto px-4 pt-2 pb-24 md:pb-6">
      <button 
        onClick={() => setShowFreshersMode(!showFreshersMode)}
        className="absolute top-2 left-4 z-40 bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white px-3.5 py-1.5 text-xs rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
      >
        {showFreshersMode ? 'Back to Swipe' : 'Freshers 🌟'}
      </button>

      {showFreshersMode ? (
        <div className="flex-1 w-full flex items-center justify-center mt-8 mb-8 relative" style={{ height: '460px' }}>
          <DepthCarousel
            items={profiles.map(p => ({
              image: p.avatarUrl,
              alt: p.name,
              name: p.name,
              course: `${p.major} • ${p.year}`,
              profile: p
            }))}
            depth={220}
            spread={90}
            tilt={22}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.2}
            blur={6}
            autoplay={false}
            loop={true}
            cardWidth={280}
            cardHeight={360}
            radius={18}
            tint="#05060a"
            duration={700}
            ease="power3.out"
            autoplayDelay={3200}
            showControls={true}
            showIndicators={true}
            onLike={(item: any) => onSwipeLike(item.profile)}
          />
        </div>
      ) : (
        <>
          {/* Profile Card Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProfile.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' ? 300 : 0,
                y: swipeDirection === 'up' ? -300 : 0,
                rotate: swipeDirection === 'left' ? -15 : swipeDirection === 'right' ? 15 : 0
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full h-[470px] sm:h-[530px] md:h-[560px] rounded-[24px] overflow-hidden glass-panel shadow-2xl flex-shrink-0 border border-white/10 group cursor-pointer mt-8 sm:mt-10"
              onClick={() => setShowBioDetails(!showBioDetails)}
            >
              {/* Main Photo */}
              <img
                src={currentProfile.avatarUrl}
                alt={`${currentProfile.name}'s Profile`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Verification Badge Header Tag */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white">
                <span className="material-symbols-outlined text-[#5edda8] text-sm">verified</span>
                <span className="font-medium text-[10px] sm:text-[11px] tracking-wide">VERIFIED MANIPAL STUDENT</span>
              </div>

              {/* Distance Indicator */}
              {currentProfile.distance && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white/90">
                  <span className="material-symbols-outlined text-xs text-[#FF4B5C]">near_me</span>
                  <span className="text-[10px] sm:text-[11px] font-medium">{currentProfile.distance}</span>
                </div>
              )}

              {/* Scrim Gradient & Card Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 scrim-gradient pt-20 pb-5 px-5 flex flex-col justify-end z-10 text-left">
                {/* Name & Verified Icon */}
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  {currentProfile.verified && (
                    <span className="material-symbols-outlined text-[#5edda8] text-xl sm:text-2xl" title="Verified Student">
                      verified
                    </span>
                  )}
                </div>

                {/* School & Major */}
                <p className="text-xs sm:text-sm font-medium text-[#e3bebd] mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs sm:text-sm text-[#ffb3b3]">school</span>
                  <span className="truncate">{currentProfile.major} • {currentProfile.year} | {currentProfile.campus}</span>
                </p>

                {/* Quote */}
                <p className="text-xs sm:text-sm font-normal text-white/90 italic mb-2 line-clamp-2">
                  {currentProfile.quote}
                </p>

                {/* Interest Chips */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {currentProfile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-[#ff5260]/20 border border-[#ff5260]/30 text-[#ffb3b3] text-[11px] font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Tap to view bio trigger */}
                <div className="mt-1 flex items-center gap-1 text-[10px] sm:text-[11px] text-[#e3bebd]/80 font-medium">
                  <span className="material-symbols-outlined text-xs">info</span>
                  <span>{showBioDetails ? 'Tap to close full bio' : 'Tap card for bio & Spotify'}</span>
                </div>

                {/* Expanded Bio Drawer */}
                {showBioDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 pt-2 border-t border-white/20 text-xs text-white/90 space-y-1.5 bg-black/50 p-2.5 rounded-xl backdrop-blur-md max-h-40 overflow-y-auto"
                  >
                    <p className="leading-relaxed"><strong className="text-[#ffb3b3]">Bio:</strong> {currentProfile.bio}</p>
                    {currentProfile.spotifyTrack && (
                      <div className="flex items-center gap-1.5 text-emerald-300 font-medium text-[11px]">
                        <span className="material-symbols-outlined text-xs">graphic_eq</span>
                        <span className="truncate">On repeat: {currentProfile.spotifyTrack}</span>
                      </div>
                    )}
                    {currentProfile.coffeeSpot && (
                      <div className="flex items-center gap-1.5 text-amber-300 font-medium text-[11px]">
                        <span className="material-symbols-outlined text-xs">local_cafe</span>
                        <span className="truncate">Go-to spot: {currentProfile.coffeeSpot}</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Action Controls */}
          <div className="mt-3 flex items-center justify-center gap-5 z-30">
            {/* Pass / Dislike (X button) */}
            <button
              onClick={() => handleNext('pass')}
              title="Pass"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-panel flex items-center justify-center text-[#e3bebd] hover:text-white hover:bg-white/15 transition-all active:scale-90 shadow-xl border border-white/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl font-bold">close</span>
            </button>

            {/* Like (Heart Gradient button) */}
            <button
              onClick={() => handleNext('like')}
              title="Like Student"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#FF4B5C] to-[#6C4AB6] flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,75,92,0.5)] hover:opacity-95 active:scale-90 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-3xl sm:text-4xl font-bold">favorite</span>
            </button>

            {/* Superlike (Star button) */}
            <button
              onClick={() => handleNext('superlike')}
              title="Super Like"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-panel flex items-center justify-center text-[#d1bcff] hover:text-white hover:bg-[#6C4AB6]/30 transition-all active:scale-90 shadow-xl border border-white/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl font-bold">star</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
