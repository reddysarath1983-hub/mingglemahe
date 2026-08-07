import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroVideoOverlayProps {
  onFinish: () => void;
}

export const IntroVideoOverlay: React.FC<IntroVideoOverlayProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState<number>(0);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      setProgress((currentTime / duration) * 100);

      if (currentTime >= 3 && !canSkip) {
        setCanSkip(true);
      }
      
      if (currentTime < 3) {
        setCountdown(Math.ceil(3 - currentTime));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col justify-between font-sans">
      <video
        ref={videoRef}
        src="/intro.mp4"
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={onFinish}
        className="absolute inset-0 w-full h-full object-cover z-0 cursor-pointer"
        onClick={() => {
          if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
          }
        }}
      />
      
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
            <span className="material-symbols-outlined text-3xl text-white animate-pulse">play_circle</span>
            <span className="text-white font-bold tracking-widest uppercase text-xs">Tap to Play</span>
          </div>
        </div>
      )}

      {/* Top Bar: Progress & Skip Intro Button */}
      <div className="relative z-30 flex items-center justify-between gap-4 p-4 sm:p-6 pt-6 w-full pointer-events-none">
        <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          {canSkip ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onFinish}
              className="pointer-events-auto px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl flex items-center gap-1.5 backdrop-blur-lg shrink-0"
            >
              <span>SKIP INTRO</span>
              <span className="material-symbols-outlined text-sm">fast_forward</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 py-2 rounded-full bg-black/40 border border-white/10 text-white/70 font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-1.5 backdrop-blur-lg shrink-0"
            >
              <span>Skip in {countdown}s</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-30 flex justify-between items-center text-[11px] text-[#e3bebd] p-4 sm:p-6 pointer-events-none">
        <span className="flex items-center gap-1.5 font-mono bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#5edda8] animate-ping"></span>
          <span>INTRO CLIP PLAYBACK</span>
        </span>
      </div>
    </div>
  );
};
