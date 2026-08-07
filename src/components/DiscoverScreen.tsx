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

  if (!currentProfile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
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
    <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full max-w-sm mx-auto">
      <button 
        onClick={() => setShowFreshersMode(!showFreshersMode)}
        className="absolute top-4 left-4 z-40 bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white px-4 py-2 rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
      >
        {showFreshersMode ? 'Back to Swipe' : 'Freshers 🌟'}
      </button>

      {showFreshersMode ? (
        <div className="flex-1 w-full flex items-center justify-center mt-12 mb-8 relative" style={{ height: '500px' }}>
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
            cardWidth={300}
            cardHeight={380}
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
              className="relative w-full h-[530px] sm:h-[570px] rounded-[24px] overflow-hidden glass-panel shadow-2xl flex-shrink-0 border border-white/10 group cursor-pointer mt-12"
              onClick={() => setShowBioDetails(!showBioDetails)}
            >
              {/* Main Photo */}
              <img
                src={currentProfile.avatarUrl}
                alt={`${currentProfile.name}'s Profile`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Verification Badge Header Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white">
                <span className="material-symbols-outlined text-[#5edda8] text-sm">verified</span>
                <span className="font-medium text-[11px] tracking-wide">VERIFIED MANIPAL STUDENT</span>
              </div>

              {/* Distance Indicator */}
              {currentProfile.distance && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white/90">
                  <span className="material-symbols-outlined text-xs text-[#FF4B5C]">near_me</span>
                  <span className="text-[11px] font-medium">{currentProfile.distance}</span>
                </div>
              )}

              {/* Scrim Gradient & Card Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 scrim-gradient pt-24 pb-6 px-6 flex flex-col justify-end z-10">
                {/* Name & Verified Icon */}
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  {currentProfile.verified && (
                    <span className="material-symbols-outlined text-[#5edda8] text-2xl" title="Verified Student">
                      verified
                    </span>
                  )}
                </div>

                {/* School & Major */}
                <p className="text-sm font-medium text-[#e3bebd] mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#ffb3b3]">school</span>
                  <span>{currentProfile.major} • {currentProfile.year} | {currentProfile.campus}</span>
                </p>

                {/* Quote */}
                <p className="text-sm font-normal text-white/90 italic mb-3">
                  {currentProfile.quote}
                </p>

                {/* Interest Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {currentProfile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#ff5260]/20 border border-[#ff5260]/30 text-[#ffb3b3] text-xs font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Tap to view bio trigger */}
                <div className="mt-1 flex items-center gap-1 text-[11px] text-[#e3bebd]/80 font-medium">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span>{showBioDetails ? 'Tap to close full bio' : 'Tap card for bio & Spotify'}</span>
                </div>

                {/* Expanded Bio Drawer */}
                {showBioDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/20 text-xs text-white/90 space-y-2 bg-black/40 p-3 rounded-xl backdrop-blur-md"
                  >
                    <p className="leading-relaxed"><strong className="text-[#ffb3b3]">Bio:</strong> {currentProfile.bio}</p>
                    {currentProfile.spotifyTrack && (
                      <div className="flex items-center gap-2 text-emerald-300 font-medium">
                        <span className="material-symbols-outlined text-sm">graphic_eq</span>
                        <span>On repeat: {currentProfile.spotifyTrack}</span>
                      </div>
                    )}
                    {currentProfile.coffeeSpot && (
                      <div className="flex items-center gap-2 text-amber-300 font-medium">
                        <span className="material-symbols-outlined text-sm">local_cafe</span>
                        <span>Go-to spot: {currentProfile.coffeeSpot}</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Action Controls */}
          <div className="mt-4 flex items-center justify-center gap-6 z-30">
            {/* Pass / Dislike (X button) */}
            <button
              onClick={() => handleNext('pass')}
              title="Pass"
              className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-[#e3bebd] hover:text-white hover:bg-white/15 transition-all active:scale-90 shadow-xl border border-white/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl font-bold">close</span>
            </button>

            {/* Like (Heart Gradient button) */}
            <button
              onClick={() => handleNext('like')}
              title="Like Student"
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF4B5C] to-[#6C4AB6] flex items-center justify-center text-white shadow-[0_0_35px_rgba(255,75,92,0.5)] hover:opacity-95 active:scale-90 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl font-bold">favorite</span>
            </button>

            {/* Superlike (Star button) */}
            <button
              onClick={() => handleNext('superlike')}
              title="Super Like"
              className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-[#d1bcff] hover:text-white hover:bg-[#6C4AB6]/30 transition-all active:scale-90 shadow-xl border border-white/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl font-bold">star</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
