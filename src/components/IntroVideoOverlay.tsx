import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ASSETS } from '../data/studentProfiles';
import { MoltenMetal } from './MoltenMetal';

interface IntroVideoOverlayProps {
  onFinish: () => void;
}

export const IntroVideoOverlay: React.FC<IntroVideoOverlayProps> = ({ onFinish }) => {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Intro duration is ~8 seconds total, 2s per scene
  useEffect(() => {
    const totalDuration = 8000;
    const intervalTime = 50;
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          onFinish();
          return 100;
        }

        // Change scenes based on progress percentage
        if (next < 25) setCurrentScene(0);
        else if (next < 55) setCurrentScene(1);
        else if (next < 80) setCurrentScene(2);
        else setCurrentScene(3);

        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none font-sans bg-black">
      {/* Intro Background */}
      <div className="absolute inset-0 z-0">
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={1}
        />
      </div>

      {/* Top Bar: Progress & Skip Intro Button */}
      <div className="relative z-30 flex items-center justify-between gap-4 pt-2">
        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* TOP RIGHT SKIP INTRO BUTTON */}
        <button
          onClick={onFinish}
          className="px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl flex items-center gap-1.5 backdrop-blur-lg shrink-0"
        >
          <span>SKIP INTRO</span>
          <span className="material-symbols-outlined text-sm">fast_forward</span>
        </button>
      </div>

      {/* Main Animated Scene Display */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden rounded-3xl border border-white/10 shadow-2xl z-10 bg-black/40 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {/* SCENE 0: Lockscreen Notification Banner */}
          {currentScene === 0 && (
            <motion.div
              key="scene-0"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-cover bg-center"
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, rgba(255, 75, 92, 0.15) 0%, rgba(13, 6, 7, 0.95) 100%), url("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80")',
              }}
            >
              {/* iPhone Glass Mockup */}
              <div className="w-full max-w-sm glass-panel rounded-3xl p-5 border border-white/25 shadow-2xl space-y-4 backdrop-blur-2xl">
                <div className="flex justify-between items-center text-xs text-[#e3bebd]">
                  <span className="font-semibold">9:48 PM</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">wifi</span>
                    <span className="material-symbols-outlined text-sm">battery_full</span>
                  </span>
                </div>

                {/* Animated Pop-up Notification */}
                <motion.div
                  initial={{ y: 30, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-2xl flex items-center gap-3.5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF4B5C] to-[#6C4AB6] p-0.5 shadow-lg shrink-0">
                    <img src={ASSETS.logo} alt="Logo" className="w-full h-full rounded-2xl object-cover" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-extrabold text-white truncate">New Message!</h4>
                      <span className="text-[10px] text-[#e3bebd]">now</span>
                    </div>
                    <p className="text-xs text-[#ffb3b3] font-semibold truncate">MingleManipal</p>
                    <p className="text-[11px] text-[#e3bebd] line-clamp-1">
                      Manipal resident: "Hey! Are you on campus?"
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SCENE 1: Split Screen Cafe & Rain Student Chat */}
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-1 p-1 bg-black"
            >
              {/* Female Student in Cafe */}
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Student 1"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-2.5 rounded-xl text-left"
                >
                  <span className="text-[10px] text-[#5edda8] font-mono font-bold block uppercase">Anya (SOC '25)</span>
                  <p className="text-xs text-white font-medium">"bet, coming over right now!"</p>
                </motion.div>
              </div>

              {/* Male Student in Rain Cafe */}
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Student 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-2.5 rounded-xl text-left"
                >
                  <span className="text-[10px] text-[#d1bcff] font-mono font-bold block uppercase">Kabir (MIT '24)</span>
                  <p className="text-xs text-white font-medium">"See you at Astra Cafe in 5 mins ☕"</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SCENE 2: Glowing Pink Neon Chat Bubbles Overlay */}
          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-cover bg-center"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, rgba(30, 15, 16, 0.85), rgba(13, 6, 7, 0.95)), url("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80")',
              }}
            >
              <div className="space-y-4 max-w-xs w-full text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-extrabold text-sm shadow-2xl border border-white/30"
                >
                  only for Manipal students
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-5 py-3 rounded-2xl bg-black/80 backdrop-blur-xl text-[#5edda8] border border-[#5edda8]/40 font-bold text-sm shadow-2xl"
                >
                  See on campus! 💕
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SCENE 3: Logo & Brand Reveal */}
          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-gradient-to-b from-[#2a1420] to-[#120708]"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] rounded-full blur-2xl opacity-75 animate-pulse"></div>
                <img
                  src={ASSETS.logo}
                  alt="Mingle@Manipal Logo"
                  className="relative w-28 h-28 rounded-3xl object-cover border-2 border-white/30 shadow-2xl"
                />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B5C] via-[#ffb3b3] to-[#6C4AB6] tracking-tight">
                  minglemanipal
                </h1>
                <p className="text-xs text-[#e3bebd] uppercase tracking-widest font-bold mt-1">
                  only for Manipal students
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Status Caption */}
      <div className="relative z-30 flex justify-between items-center text-[11px] text-[#e3bebd] px-2">
        <span className="flex items-center gap-1.5 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#5edda8] animate-ping"></span>
          <span>INTRO CLIP PLAYBACK</span>
        </span>
        <button
          onClick={onFinish}
          className="text-white hover:underline cursor-pointer font-bold uppercase tracking-wider"
        >
          Skip to App ➔
        </button>
      </div>
    </div>
  );
};
