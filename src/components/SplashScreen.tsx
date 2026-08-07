import React, { useState } from 'react';
import { ASSETS } from '../data/studentProfiles';
import { SecretHumansIntro } from './SecretHumansIntro';
import { CampusPreviewsModal } from './CampusPreviewsModal';
import { StudentProfile } from '../types';
import Ferrofluid from './Ferrofluid';

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
        <Ferrofluid
          colors={["#FF4B5C", "#FFD1DC", "#FF9FFC"]}
          speed={0.1}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.35}
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

        <button
          onClick={onOpenAdmin}
          className="px-3 py-1.5 rounded-full bg-[#FF4B5C]/20 hover:bg-[#FF4B5C]/30 border border-[#FF4B5C]/40 text-[#ffb3b3] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg backdrop-blur-md"
          title="Registrar Admin Access (Passcode 3000)"
        >
          <span className="material-symbols-outlined text-sm text-[#FF4B5C]">lock</span>
          <span>ADMIN (3000)</span>
        </button>
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
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="inline-block px-3 py-1 rounded-full bg-[#6C4AB6]/20 border border-[#6C4AB6]/40 text-[#d1bcff] text-xs font-semibold tracking-wider uppercase">
              EXCLUSIVELY FOR MANIPAL STUDENTS
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5edda8]/20 border border-[#5edda8]/40 text-[#5edda8] text-xs font-black tracking-wider uppercase animate-bounce">
              <span className="material-symbols-outlined text-xs">local_offer</span>
              <span>FRESHER OFFER ₹6.69</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f9dcdb] leading-tight tracking-tight">
            Someone on campus might already like you.
          </h1>
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
            <span className="material-symbols-outlined text-xl">login</span>
            <span>[ CONTINUE WITH GOOGLE ]</span>
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
        <div className="mt-auto pt-4 border-t border-[#5b4040]/30 w-full">
          <p className="text-[10px] text-[#e3bebd] opacity-75 uppercase tracking-widest font-semibold">
            18+ ONLY | STUDENTS ONLY • PRIVATE • VERIFIED ACCESS
          </p>
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
