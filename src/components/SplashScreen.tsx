import React, { useState } from 'react';
import { ASSETS } from '../data/studentProfiles';
import { SecretHumansIntro } from './SecretHumansIntro';
import { CampusPreviewsModal } from './CampusPreviewsModal';
import { StudentProfile } from '../types';
import Scanner from './Scanner';
import DepthText from './DepthText';

interface SplashScreenProps {
  onContinueWithGoogle: () => void;
  onOpenHowItWorks: () => void;
  onOpenAdmin: () => void;
  onOpenStudentLogin?: () => void;
  onPlayIntroClip?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onContinueWithGoogle,
  onOpenHowItWorks,
  onOpenAdmin,
  onOpenStudentLogin,
  onPlayIntroClip,
}) => {
  const [showPreviewsModal, setShowPreviewsModal] = useState(false);
  const [selectedPreviewProfile, setSelectedPreviewProfile] = useState<StudentProfile | null>(null);

  const handleOpenPreviewCard = (profile: StudentProfile) => {
    setSelectedPreviewProfile(profile);
    setShowPreviewsModal(true);
  };

  return (
    <div className="bg-[#1e0f10] text-[#f9dcdb] min-h-screen flex flex-col relative overflow-hidden font-sans antialiased selection:bg-[#ff5260] selection:text-[#5b0011]">
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <Scanner
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.5}
          sweepSpeed={0.25}
          sweepWidth={1.6}
          sweepFalloff={6}
          scale={1.5}
          frequency={2}
          ripple={0.22}
          bandDensity={11}
          lineSharpness={5.5}
          glow={0.22}
          scanDirection="vertical"
          colorSpread={0.7}
          brightness={1}
          contrast={1.15}
          softness={1.4}
          vignette={0.45}
          scanline={true}
          grain={true}
          grainIntensity={0.05}
          opacity={1}
          mouseInteraction={true}
          mouseRadius={0.5}
          mouseStrength={0.5}
        />
      </div>

      {/* Top Right Header Buttons */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        {onOpenStudentLogin && (
          <button
            onClick={onOpenStudentLogin}
            className="px-3 py-1.5 rounded-full bg-[#5edda8]/20 hover:bg-[#5edda8]/30 border border-[#5edda8]/40 text-[#5edda8] text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg backdrop-blur-md"
            title="Student Login dialogue (Name & Passcode)"
          >
            <span className="material-symbols-outlined text-sm">key</span>
            <span>LOGIN</span>
          </button>
        )}

      </div>

      {/* Ambient Background Glows */}
      <div className="ambient-glow top-[-100px] right-[-50px]"></div>
      <div className="ambient-glow bottom-[-50px] left-[-100px]"></div>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-5 py-6 max-w-md mx-auto w-full text-center">
        {/* Logo Area */}
        <div className="mb-4 relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <img 
            src={ASSETS.logo} 
            alt="Mingle@Manipal Logo" 
            className="relative w-24 h-24 mx-auto object-cover rounded-2xl shadow-2xl border border-white/20" 
          />
        </div>

        {/* Brand Title & Typography */}
        <div className="mb-4 space-y-2">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B5C] to-[#FF9FFC] tracking-widest uppercase pb-2 drop-shadow-md">
            MINGLE@MANIPAL
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="inline-block px-3 py-1 rounded-full bg-[#6C4AB6]/20 border border-[#6C4AB6]/40 text-[#d1bcff] text-xs font-semibold tracking-wider uppercase">
              EXCLUSIVELY FOR MANIPAL STUDENTS
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5edda8]/20 border border-[#5edda8]/40 text-[#5edda8] text-xs font-black tracking-wider uppercase animate-bounce">
              <span className="material-symbols-outlined text-xs">local_offer</span>
              <span>FRESHER OFFER ₹6.69</span>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-4">
            <DepthText
              text="Secret Crushes"
              layers={12}
              depth={1.5}
              faceColor="#f9dcdb"
              depthColor="#FF4B5C"
              tilt={5}
              pointerTracking={true}
              smoothing={0.15}
              perspective={800}
              autoOrbit={true}
              orbitSpeed={0.2}
              fontSize="clamp(2rem, 8vw, 3.5rem)"
              fontWeight={900}
              shadow={true}
            />
            <h2 className="text-sm sm:text-base font-bold text-[#e3bebd] mt-2">
              Someone on campus might already like you.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#e3bebd]/90 max-w-[320px] mx-auto font-normal leading-relaxed">
            A private dating and secret crush discovery network strictly for verified Manipal students.
          </p>
        </div>

        {/* ANIMATED INTRO: Secret Humans of Manipal */}
        <SecretHumansIntro
          onStartOnboarding={onContinueWithGoogle}
          onSelectPreviewProfile={handleOpenPreviewCard}
        />

        {/* Action Buttons */}
        <div className="w-full space-y-3 mb-6">
          <button
            onClick={onContinueWithGoogle}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#FF4B5C]/25 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">app_registration</span>
            <span>[ REGISTER HERE ]</span>
          </button>

          {onOpenStudentLogin && (
            <button
              onClick={onOpenStudentLogin}
              className="w-full py-3 rounded-full bg-[#5edda8]/15 hover:bg-[#5edda8]/25 border border-[#5edda8]/40 text-[#5edda8] font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-base">key</span>
              <span>STUDENT LOGIN (2 DEFAULT LOGINS ACTIVE)</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowPreviewsModal(true)}
              className="py-3 px-3 rounded-full bg-white/10 border border-white/15 text-[#f9dcdb] font-bold text-xs tracking-wide hover:bg-white/20 active:scale-[0.98] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base text-[#ffb3b3]">style</span>
              <span>SHOW PREVIEWS</span>
            </button>

            {onPlayIntroClip ? (
              <button
                onClick={onPlayIntroClip}
                className="py-3 px-3 rounded-full bg-gradient-to-r from-[#FF4B5C]/30 to-[#6C4AB6]/30 border border-[#FF4B5C]/40 text-white font-bold text-xs tracking-wide hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base text-[#5edda8]">play_circle</span>
                <span>INTRO CLIP</span>
              </button>
            ) : (
              <button
                onClick={onOpenHowItWorks}
                className="py-3 px-3 rounded-full glass-panel text-[#f9dcdb] font-bold text-xs tracking-wide hover:bg-white/10 active:scale-[0.98] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">help_outline</span>
                <span>How it works</span>
              </button>
            )}
          </div>
        </div>

        {/* Verification Requirements Footer */}
        <div className="mt-auto pt-4 border-t border-[#5b4040]/30 w-full flex items-center justify-between">
          <p className="text-[10px] text-[#e3bebd] opacity-75 uppercase tracking-widest font-semibold">
            18+ ONLY | STUDENTS ONLY • PRIVATE • VERIFIED ACCESS
          </p>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-[#e3bebd]/40 hover:text-white transition-colors cursor-pointer p-1"
              title="Admin Authentication"
            >
              <span className="material-symbols-outlined text-xs">lock</span>
            </button>
          )}
        </div>
      </main>

      {/* Campus Previews Gallery Modal */}
      {showPreviewsModal && (
        <CampusPreviewsModal
          onClose={() => setShowPreviewsModal(false)}
          onStartRegistration={onContinueWithGoogle}
          initialSelectedProfile={selectedPreviewProfile}
        />
      )}
    </div>
  );
};
